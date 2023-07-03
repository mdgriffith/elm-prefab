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
import Press.Generate.Directory
import Press.Generate.Engine
import Press.Generate.Route
import Press.Model exposing (..)
import Set exposing (Set)



{- GENERATES -}


generate : Options -> List Elm.File
generate routes =
    Press.Generate.Engine.generate routes
        :: Press.Generate.Route.generate routes
        :: Press.Generate.Directory.generate routes



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
    Json.Decode.map3 SourceDirectory
        (Json.Decode.field "base" Json.Decode.string)
        (Json.Decode.field "baseOnServer" Json.Decode.string)
        (Json.Decode.field "files" (Json.Decode.list decodeSource))


decodeSource : Json.Decode.Decoder Source
decodeSource =
    Json.Decode.map2 Source
        (Json.Decode.field "path" Json.Decode.string)
        (Json.Decode.field "contents" Json.Decode.string)
