module Generate.Route exposing (generate)

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Case.Branch as Branch
import Elm.Let
import Elm.Op
import Gen.AppUrl
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Dict
import Gen.Html
import Gen.Http
import Gen.Json.Encode
import Gen.List
import Gen.Markdown.Parser
import Gen.Markdown.Renderer
import Gen.Maybe
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.String
import Gen.Tuple
import Gen.Url
import Gen.Url.Parser
import Gen.Url.Parser.Query
import Json.Decode
import Model
import Parser exposing ((|.), (|=))
import Path
import Set exposing (Set)


routeOrder : Model.Page -> List ( Int, String )
routeOrder page =
    case page.url of
        Model.UrlPattern { path } ->
            List.map
                (\piece ->
                    case piece of
                        Model.Token token ->
                            ( 0, token )

                        Model.Variable name ->
                            ( 1, name )
                )
                path


generate : List Model.Page -> Elm.File
generate unsorted =
    let
        routes =
            List.sortBy routeOrder unsorted
    in
    Elm.fileWith [ "App", "Route" ]
        { docs =
            \groups ->
                groups
                    |> List.sortBy
                        (\doc ->
                            case doc.group of
                                Nothing ->
                                    0

                                Just "Route" ->
                                    1

                                Just "Params" ->
                                    2

                                Just "Encodings" ->
                                    3

                                _ ->
                                    4
                        )
                    |> List.map Elm.docs
        , aliases = []
        }
        (List.concat
            [ [ Elm.customType "Route"
                    (List.map
                        (\route ->
                            Elm.variantWith
                                route.id
                                [ paramType route
                                ]
                        )
                        routes
                    )
                    |> Elm.exposeWith
                        { exposeConstructor = True
                        , group = Just "Route"
                        }
              ]
            , List.map
                (\route ->
                    Elm.alias (route.id ++ "_Params")
                        (paramType route)
                        |> Elm.exposeWith
                            { exposeConstructor = False
                            , group = Just "Params"
                            }
                )
                routes
            , urlEncoder routes
            , urlParser routes
            , urlToId routes
            , assetLookup routes
            ]
        )


hasVars : List Model.UrlPiece -> Bool
hasVars pieces =
    List.any
        (\piece ->
            case piece of
                Model.Token _ ->
                    False

                Model.Variable _ ->
                    True
        )
        pieces


hasNoParams : Model.QueryParams -> Bool
hasNoParams params =
    Set.isEmpty params.specificFields
        && not params.includeCatchAll


paramType : Model.Page -> Type.Annotation
paramType route =
    let
        (Model.UrlPattern { queryParams, includePathTail, path }) =
            route.url
    in
    if hasNoParams queryParams && not includePathTail && route.assets == Nothing && not (hasVars path) then
        Type.record []

    else
        let
            addCatchall fields =
                if queryParams.includeCatchAll then
                    ( "params", Type.dict Type.string Type.string )
                        :: fields

                else
                    fields

            addFullTail fields =
                if includePathTail then
                    ( "path", Type.list Type.string ) :: fields

                else
                    fields
        in
        Type.record
            (List.concat
                [ case route.assets of
                    Nothing ->
                        []

                    Just assets ->
                        [ ( "src", Type.string ) ]
                , List.filterMap
                    (\piece ->
                        case piece of
                            Model.Token _ ->
                                Nothing

                            Model.Variable name ->
                                Just ( name, Type.string )
                    )
                    path
                    |> addFullTail
                , queryParams.specificFields
                    |> Set.toList
                    |> List.map
                        (\field ->
                            ( field, Type.maybe Type.string )
                        )
                    |> addCatchall
                ]
            )


urlToId : List Model.Page -> List Elm.Declaration
urlToId routes =
    [ Elm.declaration "toId"
        (Elm.fn ( "route", Just (Type.named [] "Route") )
            (\route ->
                Elm.Case.custom route
                    (Type.named [] "Route")
                    (routes
                        |> List.map
                            (\individualRoute ->
                                Elm.Case.branch1 individualRoute.id
                                    ( "params", paramType individualRoute )
                                    (\params ->
                                        let
                                            variables =
                                                getParamVariableList individualRoute
                                                    |> List.map
                                                        (\name ->
                                                            Elm.get name params
                                                        )
                                        in
                                        case variables of
                                            [] ->
                                                Elm.string individualRoute.id

                                            _ ->
                                                Gen.String.call_.join (Elm.string "/")
                                                    (Elm.list
                                                        (Elm.string individualRoute.id
                                                            :: variables
                                                        )
                                                    )
                                    )
                            )
                    )
            )
            |> Elm.withType
                (Type.function [ Type.named [] "Route" ] Type.string)
        )
        |> Elm.exposeWith
            { exposeConstructor = True
            , group = Just "Encodings"
            }
    ]


getParamVariableList : Model.Page -> List String
getParamVariableList page =
    case page.url of
        Model.UrlPattern { path } ->
            List.filterMap
                (\piece ->
                    case piece of
                        Model.Token _ ->
                            Nothing

                        Model.Variable name ->
                            Just name
                )
                path


assetLookup : List Model.Page -> List Elm.Declaration
assetLookup routes =
    let
        branches =
            routes
                |> List.concatMap
                    (\individualRoute ->
                        case individualRoute.assets of
                            Nothing ->
                                []

                            Just assets ->
                                List.map
                                    (\file ->
                                        let
                                            appUrlString =
                                                Path.relative assets.base file.path
                                                    |> Path.removeExtension

                                            serverUrlString =
                                                Path.join assets.baseOnServer
                                                    (Path.relative assets.base file.path)
                                        in
                                        ( appUrlString
                                        , Elm.just
                                            (Elm.string serverUrlString)
                                        )
                                    )
                                    assets.files
                    )
    in
    case branches of
        [] ->
            []

        _ ->
            [ Elm.declaration "lookupAsset"
                (Elm.fn ( "path", Just Type.string )
                    (\path ->
                        Elm.Case.string path
                            { cases = branches
                            , otherwise =
                                Elm.nothing
                            }
                    )
                    |> Elm.withType
                        (Type.function [ Type.string ] (Type.maybe Type.string))
                )
            ]


urlEncoder : List Model.Page -> List Elm.Declaration
urlEncoder routes =
    [ Elm.declaration "toString"
        (Elm.fn ( "route", Just (Type.named [] "Route") )
            (\route ->
                Elm.Case.custom route
                    (Type.named [] "Route")
                    (routes
                        |> List.map
                            (\individualRoute ->
                                Elm.Case.branch1 individualRoute.id
                                    ( "params", paramType individualRoute )
                                    (\params ->
                                        let
                                            (Model.UrlPattern { path, includePathTail, queryParams }) =
                                                individualRoute.url
                                        in
                                        renderPath path includePathTail queryParams params
                                    )
                            )
                    )
            )
            |> Elm.withType
                (Type.function [ Type.named [] "Route" ] Type.string)
        )
        |> Elm.exposeWith
            { exposeConstructor = True
            , group = Just "Encodings"
            }
    ]


renderPath : List Model.UrlPiece -> Bool -> Model.QueryParams -> Elm.Expression -> Elm.Expression
renderPath path includePathTail queryParams paramValues =
    let
        base =
            path
                |> List.map
                    (\piece ->
                        case piece of
                            Model.Token token ->
                                Elm.string token

                            Model.Variable var ->
                                Elm.get var paramValues
                    )
                |> Elm.list

        fullPath =
            if includePathTail then
                Elm.Op.append base
                    (Elm.get "path" paramValues)

            else
                base

        allParams =
            if hasNoParams queryParams then
                Gen.Dict.empty

            else if queryParams.includeCatchAll then
                Elm.get "params" paramValues

            else
                Set.foldl
                    (\field dict ->
                        dict
                            |> Elm.Op.pipe
                                (Elm.apply
                                    Gen.Dict.values_.insert
                                    [ Elm.string field
                                    , Elm.Case.maybe (Elm.get field paramValues)
                                        { nothing = Elm.list []
                                        , just =
                                            ( "param"
                                            , \param ->
                                                Elm.list [ param ]
                                            )
                                        }
                                    ]
                                )
                    )
                    Gen.Dict.empty
                    queryParams.specificFields
    in
    Gen.AppUrl.toString
        (Elm.record
            [ ( "path", fullPath )
            , ( "queryParameters", allParams )
            , ( "fragment", Elm.nothing )
            ]
        )


surround first last middle =
    first ++ middle ++ last


wrapRecord fields =
    case fields of
        [] ->
            "{}"

        _ ->
            surround "\n                { "
                "\n                }"
                (fields
                    |> String.join "\n                , "
                )


wrapOpenList remaining fields =
    case fields of
        [] ->
            "[]"

        _ ->
            String.join " :: " fields
                ++ " :: "
                ++ remaining


wrapList fields =
    case fields of
        [] ->
            "[]"

        _ ->
            surround "[ "
                " ]"
                (fields
                    |> String.join ", "
                )


sameRoute : List Model.Page -> Elm.Declaration
sameRoute routes =
    if List.length routes <= 1 then
        Elm.declaration "sameRouteBase"
            (Elm.fn2
                ( "one", Just (Type.named [] "Route") )
                ( "two", Just (Type.named [] "Route") )
                (\one two ->
                    Elm.bool True
                )
            )
            |> Elm.exposeWith
                { exposeConstructor = False
                , group = Just "Route"
                }

    else
        Elm.declaration "sameRouteBase"
            (Elm.fn2
                ( "one", Just (Type.named [] "Route") )
                ( "two", Just (Type.named [] "Route") )
                (\one two ->
                    Elm.Case.custom one
                        (Type.named [] "Route")
                        (routes
                            |> List.map
                                (\route ->
                                    Elm.Case.branch1 route.id
                                        ( "params", Type.var "params" )
                                        (\_ ->
                                            Elm.Case.custom two
                                                (Type.named [] "Route")
                                                [ Elm.Case.branch1 route.id
                                                    ( "params2", Type.var "params2" )
                                                    (\_ ->
                                                        Elm.bool True
                                                    )
                                                , Elm.Case.otherwise
                                                    (\_ ->
                                                        Elm.bool False
                                                    )
                                                ]
                                        )
                                )
                        )
                )
            )
            |> Elm.exposeWith
                { exposeConstructor = False
                , group = Just "Route"
                }


urlParser : List Model.Page -> List Elm.Declaration
urlParser routes =
    [ Elm.declaration "parse"
        (Elm.fn ( "url", Just Gen.Url.annotation_.url )
            (\url ->
                let
                    appUrl =
                        Gen.AppUrl.fromUrl url
                in
                Elm.apply (Elm.val "parseAppUrl") [ appUrl ]
            )
            |> Elm.withType
                (Type.function [ Gen.Url.annotation_.url ] (Type.maybe (Type.named [] "Route")))
        )
        |> Elm.exposeWith
            { exposeConstructor = True
            , group = Just "Encodings"
            }
    , sameRoute routes
    , parseAppUrl routes
    , Elm.unsafe """
getSingle : String -> AppUrl.QueryParameters -> Maybe String
getSingle field appUrlParams =
    case Dict.get field appUrlParams of
        Nothing ->
            Nothing

        Just [] ->
            Nothing

        Just (single :: _) ->
            Just single


getList : String -> AppUrl.QueryParameters -> List String
getList field appUrlParams =
    Dict.get field appUrlParams
        |> Maybe.withDefault []

"""
    ]


parseAppUrl : List Model.Page -> Elm.Declaration
parseAppUrl routes =
    Elm.declaration "parseAppUrl"
        (Elm.fn
            ( "appUrl", Just Gen.AppUrl.annotation_.appUrl )
            (\appUrl ->
                Elm.Case.custom
                    (Elm.get "path" appUrl)
                    (Type.list Type.string)
                    (List.map (toBranchPattern appUrl) routes
                        ++ [ Branch.ignore Elm.nothing
                           ]
                    )
                    |> Elm.withType
                        (Type.maybe (Type.named [] "Route"))
            )
        )


toBranchPattern : Elm.Expression -> Model.Page -> Branch.Pattern Elm.Expression
toBranchPattern appUrl page =
    urlToPatterns appUrl page page.url


urlToPatterns : Elm.Expression -> Model.Page -> Model.UrlPattern -> Branch.Pattern Elm.Expression
urlToPatterns appUrl page (Model.UrlPattern pattern) =
    if pattern.includePathTail then
        Branch.listWithRemaining
            { patterns = List.map toTokenPattern pattern.path
            , remaining = Branch.var "andPathTail"
            , startWith = []
            , gather =
                \fields gathered ->
                    fields ++ gathered
            , finally =
                \pathFields remaining ->
                    let
                        fields =
                            pathFields ++ queryParamFields

                        queryParamFields =
                            pattern.queryParams.specificFields
                                |> Set.foldl
                                    (\queryField gathered ->
                                        ( queryField
                                        , Elm.get "queryParameters" appUrl
                                            |> Gen.Dict.get (Elm.string queryField)
                                            |> Gen.Maybe.call_.andThen Gen.List.values_.head
                                        )
                                            :: gathered
                                    )
                                    []
                    in
                    case page.assets of
                        Nothing ->
                            Elm.apply
                                (Elm.val page.id)
                                [ Elm.record (( "path", remaining ) :: fields)
                                ]
                                |> Elm.just

                        Just assets ->
                            let
                                lookupAsset =
                                    Elm.apply (Elm.val "lookupAsset")
                                        [ Elm.Op.append
                                            (Elm.string "/")
                                            (Gen.String.call_.join (Elm.string "/") remaining)
                                        ]
                            in
                            Elm.Case.custom lookupAsset
                                (Type.maybe Type.string)
                                [ Branch.just (Branch.var "src")
                                    |> Branch.map
                                        (\src ->
                                            Elm.apply
                                                (Elm.val page.id)
                                                [ Elm.record
                                                    (( "src", src )
                                                        :: ( "path", remaining )
                                                        :: fields
                                                    )
                                                ]
                                                |> Elm.just
                                        )
                                , Branch.nothing Elm.nothing
                                ]
            }

    else
        Branch.list
            { patterns = List.map toTokenPattern pattern.path
            , startWith = []
            , gather =
                \fields gathered ->
                    fields ++ gathered
            , finally =
                \pathFields ->
                    let
                        fields =
                            pathFields ++ queryParamFields

                        queryParamFields =
                            pattern.queryParams.specificFields
                                |> Set.foldl
                                    (\queryField gathered ->
                                        ( queryField
                                        , Elm.get "queryParameters" appUrl
                                            |> Gen.Dict.get (Elm.string queryField)
                                            |> Gen.Maybe.call_.andThen Gen.List.values_.head
                                        )
                                            :: gathered
                                    )
                                    []
                    in
                    Elm.apply
                        (Elm.val page.id)
                        [ Elm.record fields
                        ]
                        |> Elm.just
            }


toTokenPattern : Model.UrlPiece -> Branch.Pattern (List ( String, Elm.Expression ))
toTokenPattern token =
    case token of
        Model.Token string ->
            Branch.string string []

        Model.Variable varname ->
            Branch.var varname
                |> Branch.map
                    (\var ->
                        [ ( varname, var ) ]
                    )
