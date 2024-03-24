module Generate.Route exposing
    ( Error(..)
    , checkForErrors
    , errorToDetails
    , generate
    , routeOrder
    , toUrlPatterns
    )

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Case.Branch as Branch
import Elm.Let
import Elm.Op
import Extra.Parser
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
import Options.Route
import Parser exposing ((|.), (|=))
import Path
import Set exposing (Set)


{-|

  - Tokens come before variables
  - Catchall path tails should be last

-}
routeOrder : Options.Route.UrlPattern -> ( Int, List ( Int, String ) )
routeOrder (Options.Route.UrlPattern pattern) =
    ( if pattern.includePathTail then
        1

      else
        0
    , List.map
        (\piece ->
            case piece of
                Options.Route.Token token ->
                    ( 0, token )

                Options.Route.Variable name ->
                    ( 1, name )
        )
        pattern.path
    )


type Error
    = FieldCollision
        { name : String
        , pattern : String
        , collisions : Set String
        }
    | OverlappingRoutes
        { nameOne : String
        , patternOne : String
        , nameTwo : String
        , patternTwo : String
        }
    | ParserError Options.Route.ParserError
    | Unreachable
        { name : String
        , pattern : String
        }


errorToDetails : Error -> { title : String, description : String }
errorToDetails error =
    case error of
        FieldCollision { name, pattern, collisions } ->
            { title = "Field collision in route " ++ name
            , description =
                "The field "
                    ++ name
                    ++ " in route "
                    ++ name
                    ++ " is used in multiple places in the URL pattern "
                    ++ pattern
                    ++ ". The fields that collide are: "
                    ++ (Set.toList collisions
                            |> String.join ", "
                       )
            }

        ParserError err ->
            { title = err.name ++ ": Parser error"
            , description =
                case err.deadEnds of
                    [] ->
                        "I ran into something weird with " ++ err.pattern

                    _ ->
                        Extra.Parser.annotate err.deadEnds err.pattern
            }

        OverlappingRoutes { nameOne, patternOne, nameTwo, patternTwo } ->
            { title = "Overlapping routes"
            , description = "The routes " ++ nameOne ++ " and " ++ nameTwo ++ " have overlapping URL patterns. The patterns are: " ++ patternOne ++ " and " ++ patternTwo
            }

        Unreachable { name, pattern } ->
            { title = "Unreachable route"
            , description = "The route " ++ name ++ " with pattern " ++ pattern ++ " is unreachable ore general pattern."
            }


checkForErrors : List Options.Route.ParsedPage -> Result (List Error) (List Options.Route.Page)
checkForErrors routes =
    List.foldl (check routes)
        { collisions = Set.empty
        , result = Ok []
        }
        routes
        |> .result


maybeToList : Maybe a -> List a
maybeToList maybe =
    case maybe of
        Just value ->
            [ value ]

        Nothing ->
            []


check :
    List Options.Route.ParsedPage
    -> Options.Route.ParsedPage
    ->
        { collisions : Set String
        , result : Result (List Error) (List Options.Route.Page)
        }
    ->
        { collisions : Set String
        , result : Result (List Error) (List Options.Route.Page)
        }
check allRoutes route cursor =
    let
        ( redirectRoutes, foundErrors ) =
            List.foldl
                (\redirect ( reds, pErrors ) ->
                    case redirect of
                        Options.Route.UrlParsedPattern pattern ->
                            ( Options.Route.UrlPattern pattern :: reds
                            , pErrors
                            )

                        Options.Route.UrlError err ->
                            ( reds
                            , ParserError err :: pErrors
                            )
                )
                ( [], [] )
                route.redirectFrom
    in
    case cursor.result of
        Err errs ->
            { collisions = cursor.collisions
            , result = Err (errs ++ foundErrors)
            }

        Ok pages ->
            case foundErrors of
                [] ->
                    case route.url of
                        Options.Route.UrlParsedPattern pattern ->
                            let
                                fieldCollisions =
                                    maybeToList (checkForFieldCollisions newRoute)

                                ( newCollisions, overlaps ) =
                                    checkForOverlaps pages newRoute cursor.collisions

                                newRoute =
                                    { id = route.id
                                    , url = Options.Route.UrlPattern pattern
                                    , redirectFrom = redirectRoutes
                                    }

                                newErrors =
                                    fieldCollisions ++ overlaps
                            in
                            if List.isEmpty newErrors then
                                { collisions = newCollisions
                                , result = Ok (newRoute :: pages)
                                }

                            else
                                { collisions = newCollisions
                                , result = Err newErrors
                                }

                        Options.Route.UrlError err ->
                            { collisions = cursor.collisions
                            , result = Err (ParserError err :: foundErrors)
                            }

                _ ->
                    { collisions = cursor.collisions
                    , result = Err foundErrors
                    }



-- ++ List.foldl checkForUnreachable [] routes
-- {-|
-- A path is unreachable if
-- -}
-- checkForUnreachable : Options.Route.Page -> List Error -> List Error
-- checkForUnreachable route errors =
--     let
--         (Options.Route.UrlPattern { path, queryParams }) =
--             route.url
--         ( _, collisionsFound ) =
--             List.foldl
--                 (\piece ( found, collisions ) ->
--                     case piece of
--                         Options.Route.Token _ ->
--                             ( found, collisions )
--                         Options.Route.Variable name ->
--                             ( found, collisions )
--                 )
--                 ( queryParams.specificFields
--                 , Set.empty
--                 )
--                 path
--     in
--     if Set.isEmpty collisionsFound then
--         Unreachable
--             { name = route.id
--             , pattern = route.id
--             }
--             :: errors
--     else
--         errors


checkForOverlaps :
    List Options.Route.Page
    -> Options.Route.Page
    -> Set String
    -> ( Set String, List Error )
checkForOverlaps routes route alreadyOverlapping =
    List.foldl (isOverlapping route) ( alreadyOverlapping, [] ) routes


{-| Collisions happen when two routes are the same length and have the same tokens in the same position

    /token/two
    /:token/two
    /token/:two
    /:token/:two

-}
isOverlapping : Options.Route.Page -> Options.Route.Page -> ( Set String, List Error ) -> ( Set String, List Error )
isOverlapping route otherRoute ( alreadyOverlapping, errors ) =
    if
        (route.id == otherRoute.id)
            || Set.member route.id alreadyOverlapping
            || Set.member otherRoute.id alreadyOverlapping
    then
        ( alreadyOverlapping, errors )

    else
        let
            (Options.Route.UrlPattern one) =
                route.url

            (Options.Route.UrlPattern two) =
                otherRoute.url
        in
        if List.length one.path /= List.length two.path then
            ( alreadyOverlapping, errors )

        else
            let
                ( foundOverlap, _ ) =
                    List.foldl
                        (\piece ( overlap, second ) ->
                            if not overlap then
                                ( overlap, [] )

                            else
                                case second of
                                    [] ->
                                        ( overlap, [] )

                                    (Options.Route.Token secondToken) :: rest ->
                                        case piece of
                                            Options.Route.Token token ->
                                                ( token == secondToken, rest )

                                            Options.Route.Variable name ->
                                                ( False
                                                , rest
                                                )

                                    (Options.Route.Variable _) :: rest ->
                                        case piece of
                                            Options.Route.Variable _ ->
                                                ( True, rest )

                                            Options.Route.Token token ->
                                                ( False
                                                , rest
                                                )
                        )
                        ( True, two.path )
                        one.path
            in
            if foundOverlap then
                ( alreadyOverlapping
                    |> Set.insert route.id
                    |> Set.insert otherRoute.id
                , OverlappingRoutes
                    { nameOne = route.id
                    , patternOne = route.id
                    , nameTwo = otherRoute.id
                    , patternTwo = otherRoute.id
                    }
                    :: errors
                )

            else
                ( alreadyOverlapping, errors )


checkForFieldCollisions : Options.Route.Page -> Maybe Error
checkForFieldCollisions route =
    let
        (Options.Route.UrlPattern { path, queryParams }) =
            route.url

        ( _, collisionsFound ) =
            List.foldl
                (\piece ( found, collisions ) ->
                    case piece of
                        Options.Route.Token _ ->
                            ( found, collisions )

                        Options.Route.Variable name ->
                            if Set.member name found then
                                ( found
                                , Set.insert name collisions
                                )

                            else
                                ( Set.insert name found
                                , collisions
                                )
                )
                ( queryParams.specificFields
                , Set.empty
                )
                path
    in
    if Set.isEmpty collisionsFound then
        Nothing

    else
        Just <|
            FieldCollision
                { name = route.id
                , pattern = route.id
                , collisions = collisionsFound
                }


generate : List Options.Route.ParsedPage -> Result (List Error) Elm.File
generate parsedRoutes =
    case checkForErrors parsedRoutes of
        Err errs ->
            Err errs

        Ok routes ->
            Ok <|
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
                        ]
                    )


hasVars : List Options.Route.UrlPiece -> Bool
hasVars pieces =
    List.any
        (\piece ->
            case piece of
                Options.Route.Token _ ->
                    False

                Options.Route.Variable _ ->
                    True
        )
        pieces


hasNoParams : Options.Route.QueryParams -> Bool
hasNoParams params =
    Set.isEmpty params.specificFields
        && not params.includeCatchAll


paramType : Options.Route.Page -> Type.Annotation
paramType route =
    let
        (Options.Route.UrlPattern { queryParams, includePathTail, path }) =
            route.url
    in
    if hasNoParams queryParams && not includePathTail && not (hasVars path) then
        Type.record []

    else
        let
            addCatchall fields =
                if queryParams.includeCatchAll then
                    ( "params_", Type.dict Type.string Type.string )
                        :: fields

                else
                    fields

            addFullTail fields =
                if includePathTail then
                    ( "path_", Type.list Type.string ) :: fields

                else
                    fields
        in
        Type.record
            (List.concat
                [ List.filterMap
                    (\piece ->
                        case piece of
                            Options.Route.Token _ ->
                                Nothing

                            Options.Route.Variable name ->
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


urlToId : List Options.Route.Page -> List Elm.Declaration
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


getParamVariableList : Options.Route.Page -> List String
getParamVariableList page =
    case page.url of
        Options.Route.UrlPattern { path } ->
            List.filterMap
                (\piece ->
                    case piece of
                        Options.Route.Token _ ->
                            Nothing

                        Options.Route.Variable name ->
                            Just name
                )
                path


urlEncoder : List Options.Route.Page -> List Elm.Declaration
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
                                            (Options.Route.UrlPattern { path, includePathTail, queryParams }) =
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


renderPath : List Options.Route.UrlPiece -> Bool -> Options.Route.QueryParams -> Elm.Expression -> Elm.Expression
renderPath path includePathTail queryParams paramValues =
    let
        base =
            path
                |> List.map
                    (\piece ->
                        case piece of
                            Options.Route.Token token ->
                                Elm.string token

                            Options.Route.Variable var ->
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


sameRoute : List Options.Route.Page -> Elm.Declaration
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


urlParser : List Options.Route.Page -> List Elm.Declaration
urlParser routes =
    [ Elm.declaration "parse"
        (Elm.fn ( "url", Just Gen.Url.annotation_.url )
            (\url ->
                let
                    appUrl =
                        Gen.AppUrl.fromUrl url
                in
                Elm.apply
                    (Elm.val "parseAppUrl")
                    [ appUrl ]
            )
            |> Elm.withType
                (Type.function [ Gen.Url.annotation_.url ]
                    (Type.maybe
                        (Type.record
                            [ ( "route", Type.named [] "Route" )
                            , ( "isRedirect", Type.bool )
                            ]
                        )
                    )
                )
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


parseAppUrl : List Options.Route.Page -> Elm.Declaration
parseAppUrl unsorted =
    let
        paths =
            unsorted
                |> List.concatMap toUrlPatterns
                |> List.sortBy (.pattern >> routeOrder)
    in
    Elm.declaration "parseAppUrl"
        (Elm.fn
            ( "appUrl", Just Gen.AppUrl.annotation_.appUrl )
            (\appUrl ->
                Elm.Case.custom
                    (Elm.get "path" appUrl)
                    (Type.list Type.string)
                    (List.map (toBranchPattern appUrl) paths
                        ++ [ Branch.ignore Elm.nothing
                           ]
                    )
                    |> Elm.withType
                        (Type.maybe
                            (Type.record
                                [ ( "route", Type.named [] "Route" )
                                , ( "isRedirect", Type.bool )
                                ]
                            )
                        )
            )
        )


toUrlPatterns :
    Options.Route.Page
    ->
        List
            { page : Options.Route.Page
            , redirect : Bool
            , pattern : Options.Route.UrlPattern
            }
toUrlPatterns page =
    { page = page
    , redirect = False
    , pattern = page.url
    }
        :: List.map
            (\from ->
                { page = page
                , redirect = True
                , pattern = from
                }
            )
            page.redirectFrom


toBranchPattern :
    Elm.Expression
    ->
        { page : Options.Route.Page
        , redirect : Bool
        , pattern : Options.Route.UrlPattern
        }
    -> Branch.Pattern Elm.Expression
toBranchPattern appUrl routeInfo =
    let
        page =
            routeInfo.page

        (Options.Route.UrlPattern pattern) =
            routeInfo.pattern

        toResult route =
            Elm.record
                [ ( "route", route )
                , ( "isRedirect", Elm.bool routeInfo.redirect )
                ]
                |> Elm.just
    in
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
                    Elm.apply
                        (Elm.val page.id)
                        [ Elm.record (( "path", remaining ) :: fields)
                        ]
                        |> toResult
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
                        |> toResult
            }


toTokenPattern : Options.Route.UrlPiece -> Branch.Pattern (List ( String, Elm.Expression ))
toTokenPattern token =
    case token of
        Options.Route.Token string ->
            Branch.string string []

        Options.Route.Variable varname ->
            Branch.var varname
                |> Branch.map
                    (\var ->
                        [ ( varname, var ) ]
                    )
