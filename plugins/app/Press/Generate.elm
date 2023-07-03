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
import Markdown.Block as Block
import Markdown.Parser
import Parser exposing ((|.), (|=))
import Path
import Press.Generate.Engine
import Press.Model exposing (..)
import Set exposing (Set)



{- Decode source data -}


type alias Options =
    List Page


decode : Json.Decode.Decoder Options
decode =
    Json.Decode.field "pages" (Json.Decode.list decodePage)


decodePage : Json.Decode.Decoder Page
decodePage =
    Json.Decode.map6 Page
        (Json.Decode.field "id" (Json.Decode.map (String.join "_") (Json.Decode.list Json.Decode.string)))
        (Json.Decode.field "moduleName" (Json.Decode.list Json.Decode.string))
        (Json.Decode.field "url" decodeUrlPattern)
        (Json.Decode.field "deprecatedUrls" (Json.Decode.list decodeUrlPattern))
        (Json.Decode.field "source" Json.Decode.string)
        (Json.Decode.field "assets" (Json.Decode.maybe decodeDirectory))


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
                { path = path.path
                , includePathTail = path.includePathTail
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


parsePath :
    Parser.Parser
        { includePathTail : Bool
        , path : List UrlPiece
        }
parsePath =
    Parser.loop []
        (\pieces ->
            Parser.oneOf
                [ Parser.succeed (\val -> val)
                    |. Parser.symbol "/"
                    |= Parser.oneOf
                        [ Parser.succeed
                            (Parser.Done
                                { includePathTail = True
                                , path = List.reverse pieces
                                }
                            )
                            |. Parser.symbol "*"
                        , Parser.succeed
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
                        ]
                , Parser.succeed
                    (Parser.Done
                        { includePathTail = False
                        , path = List.reverse pieces
                        }
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
generate routes =
    let
        pages =
            generateSourceReference routes
    in
    Press.Generate.Engine.generate routes
        :: generateRoutes routes
        :: pages


generateSourceReference : List Page -> List Elm.File
generateSourceReference routes =
    let
        sources =
            routes
                |> List.concatMap
                    (\route ->
                        -- case route.type_ of
                        --     Elm ->
                        --         []
                        --     Markdown { files } ->
                        --         files
                        -- Debug.todo "SOURCE REFERENCE!"
                        []
                    )
    in
    case sources of
        [] ->
            []

        _ ->
            [ Elm.fileWith [ "Markdown", "Source" ]
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
            , Elm.fileWith [ "Markdown", "Search" ]
                { docs =
                    List.map Elm.docs
                , aliases = []
                }
                [ Elm.declaration "items"
                    (Elm.list
                        (List.map
                            (\src ->
                                let
                                    headers =
                                        getHeaders src.source
                                            |> List.map Elm.string
                                in
                                Elm.record
                                    [ ( "title"
                                      , List.head headers
                                            |> Maybe.withDefault (Elm.string src.path)
                                      )
                                    , ( "crumbs"
                                      , String.split "/" src.path
                                            |> List.filterMap
                                                (\str ->
                                                    if String.isEmpty str then
                                                        Nothing

                                                    else
                                                        Just (Elm.string str)
                                                )
                                            |> List.reverse
                                            |> List.drop 1
                                            |> List.reverse
                                            |> Elm.list
                                      )
                                    , ( "sourceUrl", Elm.string src.path )
                                    , ( "tags", Elm.list headers )
                                    ]
                            )
                            sources
                        )
                    )
                ]
            ]


getHeaders src =
    case Markdown.Parser.parse src of
        Ok blocks ->
            List.filterMap
                (\block ->
                    case block of
                        Block.Heading level contents ->
                            Just
                                (Block.extractInlineText contents)

                        _ ->
                            Nothing
                )
                blocks

        Err _ ->
            []


generateRoutes : List Page -> Elm.File
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


hasNoParams : QueryParams -> Bool
hasNoParams params =
    Set.isEmpty params.specificFields
        && not params.includeCatchAll


paramType : Page -> Type.Annotation
paramType route =
    let
        (UrlPattern { queryParams, includePathTail, path }) =
            route.url
    in
    if hasNoParams queryParams && not includePathTail then
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
                [ List.filterMap
                    (\piece ->
                        case piece of
                            Token _ ->
                                Nothing

                            Variable name ->
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


urlToId : List Page -> List Elm.Declaration
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
                                    (\_ ->
                                        Elm.string individualRoute.id
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


urlEncoder : List Page -> List Elm.Declaration
urlEncoder routes =
    [ Elm.declaration "toUrl"
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
                                            (UrlPattern { path, includePathTail, queryParams }) =
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


renderPath : List UrlPiece -> Bool -> QueryParams -> Elm.Expression -> Elm.Expression
renderPath path includePathTail queryParams paramValues =
    let
        base =
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
                                    , Elm.get field paramValues
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


sameRoute : List Page -> Elm.Declaration
sameRoute routes =
    Elm.declaration "sameRoute"
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


parseAppUrl : List Page -> Elm.Declaration
parseAppUrl routes =
    let
        paths =
            routes
                |> List.reverse
                |> List.concatMap
                    (\route ->
                        case route.url of
                            UrlPattern { path, includePathTail, queryParams } ->
                                let
                                    branch =
                                        if includePathTail then
                                            path
                                                |> List.map
                                                    (\piece ->
                                                        case piece of
                                                            Token token ->
                                                                surround "\"" "\"" token

                                                            Variable var ->
                                                                var
                                                    )
                                                |> wrapOpenList "andPathTail"

                                        else
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
                                            |> (\innerFields ->
                                                    if includePathTail then
                                                        "path = andPathTail" :: innerFields

                                                    else
                                                        innerFields
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
                                        route.id
                                            ++ " "
                                            ++ (fieldsFromPath
                                                    ++ queryParamFields
                                                    |> wrapRecord
                                               )
                                in
                                [ "        " ++ branch ++ " ->\n            Just <| " ++ constructedRoute
                                ]
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


urlParser : List Page -> List Elm.Declaration
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
