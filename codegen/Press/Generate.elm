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
    { assets : SourceDirectory
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
        (Json.Decode.field "assets" decodeDirectory)
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
    in
    Press.Generate.Engine.generate routes
        :: generateRoutes routes
        :: generatePages routes


generateRoutes : List RouteInfo -> Elm.File
generateRoutes routes =
    Elm.file [ "Route" ]
        (List.concat
            [ [ Elm.customType "Route"
                    (List.map
                        (\route ->
                            Elm.variantWith
                                route.name
                                [ paramType route.pattern
                                ]
                        )
                        routes
                    )
                    |> Elm.exposeWith
                        { exposeConstructor = True
                        , group = Nothing
                        }
              ]
            , urlEncoder routes
            , urlParser routes
            ]
        )


hasNoParams : QueryParams -> Bool
hasNoParams params =
    Set.isEmpty params.specificFields
        && not params.includeCatchAll


paramType : UrlPattern -> Type.Annotation
paramType (UrlPattern { path, queryParams }) =
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
            List.filterMap
                (\file ->
                    let
                        ( relativePath, ext ) =
                            Path.relative options.assets.base file.path
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
                            { name = name
                            , moduleName = "Page" :: modulePath
                            , type_ =
                                Markdown
                                    { source = file.contents
                                    , path = relativePath
                                    }
                            , pattern =
                                UrlPattern
                                    { path = path
                                    , queryParams =
                                        { includeCatchAll = False
                                        , specificFields = Set.empty
                                        }
                                    }
                            }

                    else
                        Nothing
                )
                options.assets.files

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
                            (\{ name, pattern } ->
                                Elm.Case.branch1 name
                                    ( "params", paramType pattern )
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
        |> Elm.expose
    ]


renderPath : List UrlPiece -> QueryParams -> Elm.Expression -> Elm.Expression
renderPath path queryParams paramValues =
    let
        addParamString base =
            if hasNoParams queryParams then
                base

            else if queryParams.includeCatchAll then
                Gen.String.call_.concat
                    (Elm.list
                        [ base
                        , Elm.apply (Elm.val "queryDictToString")
                            [ Elm.get "params" paramValues ]
                        ]
                    )

            else
                Gen.String.call_.concat
                    (Elm.list
                        [ base
                        , Elm.apply
                            (Elm.val "paramsToString")
                            [ Set.foldl
                                (\field rendered ->
                                    Elm.tuple
                                        (Elm.string field)
                                        (Elm.get field paramValues)
                                        :: rendered
                                )
                                []
                                queryParams.specificFields
                                |> Elm.list
                            ]
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
        |> Gen.String.call_.join (Elm.string "/")
        |> addParamString


urlParser : List RouteInfo -> List Elm.Declaration
urlParser routes =
    [ Elm.declaration "parse"
        (Elm.fn ( "url", Just Gen.Url.annotation_.url )
            (\url ->
                let
                    paramDict =
                        parseParamDict url
                in
                Gen.Url.Parser.parse
                    (Elm.apply
                        (Elm.val "parser")
                        [ paramDict ]
                    )
                    url
            )
            |> Elm.withType (Type.function [ Gen.Url.annotation_.url ] (Type.maybe (Type.named [] "Route")))
        )
        |> Elm.expose
    , Elm.declaration "queryDictToString"
        (Elm.fn ( "dict", Just (Gen.Dict.annotation_.dict Type.string Type.string) )
            (\dict ->
                Elm.ifThen (Gen.Dict.isEmpty dict)
                    (Elm.string "")
                    (Gen.Dict.call_.foldl
                        (Elm.val "gatherString")
                        (Elm.string "?")
                        dict
                    )
            )
        )
    , Elm.unsafe """

gatherString : String -> String -> String -> String
gatherString key val rendered =
    case rendered of
        "?" ->
            rendered ++ key ++ "=" ++ val 

        _ ->
            rendered ++ "&" ++ key ++ "=" ++ val 

paramToString : (String, Maybe String) -> Maybe String
paramToString (key, maybeVal) =
    case maybeVal of
        Nothing ->
            Nothing

        Just val ->
            Just (key ++ "=" ++ val)


paramsToString : List ( String, Maybe String ) -> String
paramsToString fields =
    case List.filterMap paramToString fields of
        [] ->
            ""

        params ->
            "?" ++ String.join "&" params



queryParams : Url.Url -> Dict.Dict String String
queryParams url =
    case url.query of
        Nothing ->
            Dict.empty

        Just queryString ->
            String.split "&" queryString
                |> List.filterMap
                    (\\str ->
                        case String.split "=" str of
                            [] ->
                                Nothing

                            key :: value ->
                                Just
                                    ( decodeUrlParam key
                                    , decodeUrlParam (String.join "=" value)
                                    )
                    )
                |> Dict.fromList


decodeUrlParam : String -> String
decodeUrlParam val =
    Url.percentDecode val
        |> Maybe.withDefault val
"""
    , Elm.declaration "parser"
        (Elm.fn ( "paramDict", Just (Type.dict Type.string Type.string) )
            (\paramDict ->
                Gen.Url.Parser.oneOf
                    (routes
                        |> List.map (generateUrlPatternParser paramDict)
                    )
            )
        )
    ]


parseParamDict : Elm.Expression -> Elm.Expression
parseParamDict url =
    Elm.apply (Elm.val "queryParams") [ url ]


generateUrlPatternParser : Elm.Expression -> RouteInfo -> Elm.Expression
generateUrlPatternParser paramDict route =
    Gen.Url.Parser.map (Elm.val route.name)
        (patternToUrlParser paramDict route.pattern)


patternToUrlParser : Elm.Expression -> UrlPattern -> Elm.Expression
patternToUrlParser paramDict (UrlPattern { path, queryParams }) =
    let
        ( pathParser, pathFields ) =
            List.foldl pathToUrlParser ( Nothing, [] ) path
                |> Tuple.mapFirst (Maybe.withDefault Gen.Url.Parser.top)

        queryFields =
            Set.toList queryParams.specificFields
                |> List.map
                    (\name ->
                        ( name, Gen.Dict.get (Elm.string name) paramDict )
                    )
    in
    Gen.Url.Parser.map
        (Elm.function pathFields
            (\args ->
                Elm.record
                    (List.concat
                        [ List.map2
                            (\( fieldName, _ ) value ->
                                Tuple.pair fieldName value
                            )
                            pathFields
                            args
                        , queryFields
                        , if queryParams.includeCatchAll then
                            [ ( "params", paramDict ) ]

                          else
                            []
                        ]
                    )
            )
        )
        pathParser


specificQueryParamParser field maybeParser =
    case maybeParser of
        Nothing ->
            Just (Gen.Url.Parser.Query.string field)

        Just currentQueryParser ->
            Just (Gen.Url.Parser.Query.string field)


pathToUrlParser piece ( maybeParser, fields ) =
    case maybeParser of
        Nothing ->
            case piece of
                Token token ->
                    ( Just (Gen.Url.Parser.s token)
                    , fields
                    )

                Variable variable ->
                    ( Just Gen.Url.Parser.string
                    , ( variable, Just Type.string ) :: fields
                    )

        Just urlPieceParser ->
            case piece of
                Token token ->
                    ( Just (Elm.Op.slash urlPieceParser (Gen.Url.Parser.s token))
                    , fields
                    )

                Variable variable ->
                    ( Just (Elm.Op.slash urlPieceParser Gen.Url.Parser.string)
                    , ( variable, Just Type.string ) :: fields
                    )


toUrlParser pieces =
    case pieces of
        [] ->
            Gen.Url.Parser.top

        top :: [] ->
            Gen.Url.Parser.s top

        top :: remaining ->
            Elm.Op.slash
                (Gen.Url.Parser.s top)
                (toUrlParser remaining)


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

        Markdown { source } ->
            Just <|
                Elm.file route.moduleName
                    [ Elm.declaration "page"
                        (Gen.App.Markdown.call_.page
                            (Elm.val "source")
                            |> Elm.withType (Gen.App.Markdown.annotation_.page (Type.var "frame"))
                        )
                        |> Elm.expose
                    , Elm.alias "Model" Gen.App.Markdown.annotation_.model
                        |> Elm.expose
                    , Elm.alias "Msg" Gen.App.Markdown.annotation_.msg
                        |> Elm.expose
                    , Elm.declaration "source"
                        (Elm.string source)
                    ]
