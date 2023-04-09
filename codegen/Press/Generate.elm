module Press.Generate exposing (decode, generate)

{-| Press generates the minimal amount needed to have a working app.

The goal is to generate pieces that you can integrate into an existing Elm app.

List of things to generate

1.  The directory of all source files used to generate stuff.
    This can be used to show a sidebar r a directory of all informations.

2.  A route parser and encoder.

3.  Files for each markdown file.

It will also generate a full app for you??

-}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Elm.Op
import Gen.App
import Gen.App.Markdown
import Gen.App.State
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
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.String
import Gen.Tuple
import Gen.Url
import Gen.Url.Parser
import Gen.Url.Parser.Query
import Json.Decode
import Parser exposing ((|.), (|=))
import Path
import Press.Generate.Engine
import Press.Model exposing (..)
import Set exposing (Set)



{- Decode source data -}


type alias Options =
    { assets : Maybe SourceDirectory
    , elmPages : List ElmPage
    }


type alias ElmPage =
    { urls : List UrlPattern
    , id : List String
    , source : String
    }


type alias SourceDirectory =
    { base : String
    , files : List Source
    }


type alias Source =
    { path : String
    , contents : String
    }


decode : Json.Decode.Decoder Options
decode =
    Json.Decode.map2 Options
        (Json.Decode.field "assets" (Json.Decode.maybe decodeDirectory))
        (Json.Decode.field "elmFiles" (Json.Decode.list decodeElmPage))


decodeElmPage : Json.Decode.Decoder ElmPage
decodeElmPage =
    Json.Decode.map3 ElmPage
        (Json.Decode.field "urls" (Json.Decode.list decodeUrlPattern))
        (Json.Decode.field "id" (Json.Decode.list Json.Decode.string))
        (Json.Decode.field "source" Json.Decode.string)


decodeUrlPattern : Json.Decode.Decoder UrlPattern
decodeUrlPattern =
    Json.Decode.string
        |> Json.Decode.andThen
            (\string ->
                case Parser.run parseUrlPattern string of
                    Ok urlPattern ->
                        Json.Decode.succeed urlPattern

                    Err err ->
                        Json.Decode.fail ("I don't understand this route:" ++ string)
            )


parseUrlPattern : Parser.Parser UrlPattern
parseUrlPattern =
    Parser.succeed
        (\path queryParams ->
            UrlPattern
                { path = path
                , queryParams = queryParams
                }
        )
        |= parsePath
        |= parseQueryParams


parseQueryParams : Parser.Parser QueryParams
parseQueryParams =
    Parser.oneOf
        [ Parser.succeed
            { includeCatchAll = False
            , specificFields = Set.empty
            }
            |. Parser.end
        , Parser.succeed (\params -> params)
            |. Parser.symbol "?"
            |. Parser.symbol "{"
            |= Parser.oneOf
                [ Parser.succeed
                    { includeCatchAll = True
                    , specificFields = Set.empty
                    }
                    |. Parser.symbol "**"
                , Parser.loop
                    { includeCatchAll = False
                    , specificFields = Set.empty
                    }
                    (\params ->
                        Parser.oneOf
                            [ Parser.succeed
                                (\fieldName ->
                                    Parser.Loop { params | specificFields = Set.insert fieldName params.specificFields }
                                )
                                |= Parser.getChompedString
                                    (Parser.succeed ()
                                        |. Parser.chompIf Char.isAlpha
                                        |. Parser.chompWhile Char.isAlpha
                                    )
                                |. Parser.chompWhile (\c -> c == ',')
                            , Parser.succeed (Parser.Done params)
                            ]
                    )
                ]
            |. Parser.symbol "}"
        ]


isBlank : String -> Bool
isBlank str =
    String.isEmpty (String.trim str)


parsePath : Parser.Parser (List UrlPiece)
parsePath =
    Parser.loop []
        (\pieces ->
            Parser.oneOf
                [ Parser.succeed
                    (\isVariable label ->
                        if isBlank label then
                            Parser.Loop pieces

                        else
                            Parser.Loop <|
                                if isVariable then
                                    Variable label :: pieces

                                else
                                    Token label :: pieces
                    )
                    |. Parser.symbol "/"
                    |= Parser.oneOf
                        [ Parser.succeed True
                            |. Parser.chompIf (\c -> c == ':')
                        , Parser.succeed False
                        ]
                    |= Parser.getChompedString
                        (Parser.chompWhile
                            (\c ->
                                not (List.member c [ '/', ':', '?' ])
                            )
                        )
                , Parser.succeed
                    (Parser.Done
                        (List.reverse pieces)
                    )
                ]
        )


decodeDirectory : Json.Decode.Decoder SourceDirectory
decodeDirectory =
    Json.Decode.map2 SourceDirectory
        (Json.Decode.field "base" Json.Decode.string)
        (Json.Decode.field "files" (Json.Decode.list decodeSource))


decodeSource : Json.Decode.Decoder Source
decodeSource =
    Json.Decode.map2 Source
        (Json.Decode.field "path" Json.Decode.string)
        (Json.Decode.field "contents" Json.Decode.string)



{- GENERATES -}


generate : Options -> List Elm.File
generate options =
    let
        routes =
            toRouteInfo options

        pages =
            case generateSourceReference routes of
                Nothing ->
                    generatePages routes

                Just sources ->
                    sources :: generatePages routes
    in
    Press.Generate.Engine.generate routes
        :: generateRoutes routes
        :: pages


generateSourceReference : List RouteInfo -> Maybe Elm.File
generateSourceReference routes =
    let
        sources =
            routes
                |> List.concatMap
                    (\route ->
                        case route.type_ of
                            Elm ->
                                []

                            Markdown { files } ->
                                files
                    )
    in
    case sources of
        [] ->
            Nothing

        _ ->
            Just <|
                Elm.fileWith [ "Markdown", "Source" ]
                    { docs =
                        \groups ->
                            groups
                                |> List.map Elm.docs
                    , aliases = []
                    }
                    (sources
                        |> List.map
                            (\source ->
                                Elm.declaration
                                    (source.path
                                        |> String.split "/"
                                        |> List.filter (not << String.isEmpty)
                                        |> String.join "_"
                                    )
                                    (Elm.string source.source)
                            )
                    )


generateRoutes : List RouteInfo -> Elm.File
generateRoutes routes =
    Elm.fileWith [ "Route" ]
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
                                route.name
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
                    Elm.alias (route.name ++ "_Params")
                        (paramType route)
                        |> Elm.exposeWith
                            { exposeConstructor = False
                            , group = Just "Params"
                            }
                )
                routes
            , urlEncoder routes
            , urlParser routes
            ]
        )


hasNoParams : QueryParams -> Bool
hasNoParams params =
    Set.isEmpty params.specificFields
        && not params.includeCatchAll


paramType : RouteInfo -> Type.Annotation
paramType route =
    case route.type_ of
        Markdown _ ->
            Type.record [ ( "sourceUrl", Type.string ) ]

        Elm ->
            let
                (UrlPattern { queryParams, path }) =
                    route.pattern
            in
            if hasNoParams queryParams then
                Type.record []

            else
                let
                    addCatchall fields =
                        if queryParams.includeCatchAll then
                            ( "params", Type.dict Type.string Type.string )
                                :: fields

                        else
                            fields
                in
                Type.record
                    (List.concat
                        [ List.filterMap
                            (\piece ->
                                case piece of
                                    Token _ ->
                                        Nothing

                                    Variable name ->
                                        Just ( name, Type.string )
                            )
                            path
                        , queryParams.specificFields
                            |> Set.toList
                            |> List.map
                                (\field ->
                                    ( field, Type.maybe Type.string )
                                )
                            |> addCatchall
                        ]
                    )


toRouteInfo : Options -> List RouteInfo
toRouteInfo options =
    let
        assetFileRouteInfo : List RouteInfo
        assetFileRouteInfo =
            case options.assets of
                Nothing ->
                    []

                Just assets ->
                    let
                        sources =
                            List.filterMap
                                (\file ->
                                    let
                                        ( relativePath, ext ) =
                                            Path.relative assets.base file.path
                                                |> Path.extension
                                    in
                                    if ext == "md" || ext == "markdown" then
                                        let
                                            path =
                                                relativePath
                                                    |> String.split "/"
                                                    |> List.map camelToKebab
                                                    |> List.filter (not << String.isEmpty)
                                                    |> List.map Token

                                            modulePath =
                                                relativePath
                                                    |> String.split "/"
                                                    |> List.map toElmTypeName
                                                    |> List.filter (not << String.isEmpty)

                                            name =
                                                modulePath
                                                    |> String.join ""
                                        in
                                        Just
                                            { source = file.contents
                                            , path = relativePath
                                            }

                                    else
                                        Nothing
                                )
                                assets.files
                    in
                    [ { name = "Markdown"
                      , moduleName = [ "Page", "Markdown" ]
                      , type_ =
                            Markdown { files = sources }
                      , pattern =
                            UrlPattern
                                { path = [ Token "assets" ]
                                , queryParams =
                                    { includeCatchAll = False
                                    , specificFields = Set.empty
                                    }
                                }
                      }
                    ]

        elmFileRouteInfo =
            options.elmPages
                |> List.filterMap
                    (\elmPage ->
                        Just
                            { name = String.join "" elmPage.id
                            , moduleName = "Page" :: elmPage.id
                            , type_ = Elm
                            , pattern =
                                List.head elmPage.urls
                                    |> Maybe.withDefault
                                        (UrlPattern
                                            { path = List.map (Token << camelToKebab) elmPage.id
                                            , queryParams =
                                                { includeCatchAll = False
                                                , specificFields = Set.empty
                                                }
                                            }
                                        )
                            }
                    )
    in
    elmFileRouteInfo ++ assetFileRouteInfo


pathToUrlPieces : String -> String -> Maybe ( String, List UrlPiece )
pathToUrlPieces base filepath =
    let
        ( relativePath, ext ) =
            Path.relative base filepath
                |> Path.extension
    in
    if ext == "md" || ext == "markdown" then
        let
            tokens =
                relativePath
                    |> String.split "/"
                    |> List.map camelToKebab
                    |> List.filter (not << String.isEmpty)
                    |> List.map Token

            name =
                relativePath
                    |> String.split "/"
                    |> List.map toElmTypeName
                    |> List.filter (not << String.isEmpty)
                    |> String.join ""
        in
        Just ( name, tokens )

    else
        Nothing


urlEncoder : List RouteInfo -> List Elm.Declaration
urlEncoder routes =
    [ Elm.declaration "toUrl"
        (Elm.fn ( "route", Just (Type.named [] "Route") )
            (\route ->
                Elm.Case.custom route
                    (Type.named [] "Route")
                    (routes
                        |> List.map
                            (\({ name, pattern } as individualRoute) ->
                                Elm.Case.branch1 name
                                    ( "params", paramType individualRoute )
                                    (\params ->
                                        let
                                            (UrlPattern { path, queryParams }) =
                                                pattern
                                        in
                                        renderPath path queryParams params
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


renderPath : List UrlPiece -> QueryParams -> Elm.Expression -> Elm.Expression
renderPath path queryParams paramValues =
    let
        addParamString base =
            if hasNoParams queryParams then
                Gen.AppUrl.toString
                    (Elm.record
                        [ ( "path", base )
                        , ( "queryParameters", Gen.Dict.empty )
                        , ( "fragment", Elm.nothing )
                        ]
                    )

            else if queryParams.includeCatchAll then
                Gen.AppUrl.toString
                    (Elm.record
                        [ ( "path", base )
                        , ( "queryParameters", Elm.get "params" paramValues )
                        , ( "fragment", Elm.nothing )
                        ]
                    )

            else
                Gen.AppUrl.toString
                    (Elm.record
                        [ ( "path", base )
                        , ( "queryParameters"
                          , Set.foldl
                                (\field dict ->
                                    dict
                                        |> Elm.Op.pipe
                                            (Elm.apply
                                                Gen.Dict.values_.insert
                                                [ Elm.string field
                                                , Elm.get field paramValues
                                                ]
                                            )
                                )
                                Gen.Dict.empty
                                queryParams.specificFields
                          )
                        , ( "fragment", Elm.nothing )
                        ]
                    )
    in
    path
        |> List.map
            (\piece ->
                case piece of
                    Token token ->
                        Elm.string token

                    Variable var ->
                        Elm.get var paramValues
            )
        |> Elm.list
        |> addParamString


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


parseAppUrl : List RouteInfo -> Elm.Declaration
parseAppUrl routes =
    let
        paths =
            routes
                |> List.reverse
                |> List.concatMap
                    (\route ->
                        case route.type_ of
                            Elm ->
                                case route.pattern of
                                    UrlPattern { path, queryParams } ->
                                        let
                                            branch =
                                                path
                                                    |> List.map
                                                        (\piece ->
                                                            case piece of
                                                                Token token ->
                                                                    surround "\"" "\"" token

                                                                Variable var ->
                                                                    var
                                                        )
                                                    |> wrapList

                                            fieldsFromPath =
                                                path
                                                    |> List.filterMap
                                                        (\piece ->
                                                            case piece of
                                                                Token token ->
                                                                    Nothing

                                                                Variable var ->
                                                                    Just (var ++ " = " ++ var)
                                                        )

                                            queryParamFields =
                                                if queryParams.includeCatchAll then
                                                    [ "params = appUrl.queryParameters" ]

                                                else
                                                    case Set.toList queryParams.specificFields of
                                                        [] ->
                                                            []

                                                        specificFields ->
                                                            List.map
                                                                (\field ->
                                                                    field ++ " = getSingle " ++ field ++ " appUrl.queryParameters"
                                                                )
                                                                specificFields

                                            constructedRoute =
                                                route.name
                                                    ++ " "
                                                    ++ (fieldsFromPath
                                                            ++ queryParamFields
                                                            |> wrapRecord
                                                       )
                                        in
                                        [ "        " ++ branch ++ " ->\n            Just <| " ++ constructedRoute
                                        ]

                            Markdown { files } ->
                                List.map
                                    (\file ->
                                        let
                                            constructedRoute =
                                                route.name
                                                    ++ " { sourceUrl = \"/assets"
                                                    ++ file.path
                                                    ++ ".md\" }"

                                            pieces =
                                                String.split "/" file.path
                                                    |> List.filter
                                                        (not << String.isEmpty)
                                                    |> List.map (surround "\"" "\"")
                                                    |> String.join ", "
                                        in
                                        "        [ " ++ pieces ++ " ] ->\n            Just <| " ++ constructedRoute
                                    )
                                    files
                    )
                |> String.join "\n\n"
    in
    Elm.unsafe
        ("""

parseAppUrl : AppUrl.AppUrl -> Maybe Route
parseAppUrl appUrl = 
    case appUrl.path of
${paths}

        _ -> 
            Nothing
"""
            |> String.replace "${paths}" paths
        )


urlParser : List RouteInfo -> List Elm.Declaration
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


camelToKebab : String -> String
camelToKebab str =
    str
        |> String.foldl
            (\char ( isFirstChar, string ) ->
                Tuple.pair False <|
                    if isFirstChar then
                        string ++ String.fromChar (Char.toLower char)

                    else
                        let
                            isUpperCase =
                                Char.isUpper char
                        in
                        if isUpperCase then
                            string ++ "-" ++ String.fromChar (Char.toLower char)

                        else
                            string ++ String.fromChar char
            )
            ( True, "" )
        |> Tuple.second


toElmTypeName : String -> String
toElmTypeName source =
    source
        |> String.split "-"
        |> List.concatMap (String.split "_")
        |> List.map capitalize
        |> String.join ""


capitalize : String -> String
capitalize str =
    case String.uncons str of
        Nothing ->
            str

        Just ( first, tail ) ->
            String.fromChar (Char.toUpper first) ++ tail



{- GENERATE PAGES -}


generatePages : List RouteInfo -> List Elm.File
generatePages routes =
    List.filterMap
        generatePage
        routes


generatePage : RouteInfo -> Maybe Elm.File
generatePage route =
    case route.type_ of
        Elm ->
            Nothing

        Markdown { files } ->
            Just <|
                Elm.file route.moduleName
                    [ Elm.declaration "page"
                        (Gen.App.Markdown.call_.page
                            (Elm.string "## Hello")
                            |> Elm.withType (Gen.App.Markdown.annotation_.page (Type.var "frame"))
                        )
                        |> Elm.expose
                    , Elm.alias "Model" Gen.App.Markdown.annotation_.model
                        |> Elm.expose
                    , Elm.alias "Msg" Gen.App.Markdown.annotation_.msg
                        |> Elm.expose
                    ]
