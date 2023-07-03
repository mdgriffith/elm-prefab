module Press.Generate.Directory exposing (generate)

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


generate : List Press.Model.Page -> List Elm.File
generate routes =
    List.filterMap identity
        [ generateDirectory routes
        , generateSourceReference routes
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



{- DIRECTORY -}


generateDirectory : List Press.Model.Page -> Maybe Elm.File
generateDirectory routes =
    Just <|
        Elm.fileWith [ "Directory" ]
            { docs = List.map Elm.docs
            , aliases = []
            }
            [ Elm.declaration "assets"
                (Elm.list
                    (List.concatMap
                        (\route ->
                            case route.assets of
                                Nothing ->
                                    []

                                Just assets ->
                                    List.map (toSourceDirectoryReference route assets) assets.files
                        )
                        routes
                    )
                )
            ]


toSourceDirectoryReference route assets src =
    let
        srcPath =
            src.path
                |> Path.relative assets.base
                |> Path.removeExtension
                |> String.split "/"
                |> List.filter (not << String.isEmpty)
                |> String.join "_"

        headers =
            getHeaders src.source
                |> List.map Elm.string
    in
    Elm.record
        [ ( "title"
          , List.head headers
                |> Maybe.withDefault (Elm.string srcPath)
          )
        , ( "route"
          , Elm.apply
                (Elm.value
                    { importFrom = [ "Route" ]
                    , name = route.id
                    , annotation = Just (Type.named [ "Route" ] "Route")
                    }
                )
                [ Elm.record
                    [ ( "path", Elm.string srcPath )
                    ]
                ]
          )
        , ( "crumbs"
          , String.split "/" srcPath
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
        , ( "sourceUrl", Elm.string srcPath )
        , ( "headers", Elm.list headers )
        ]



{- SOURCE REFERENCE -}


generateSourceReference : List Press.Model.Page -> Maybe Elm.File
generateSourceReference routes =
    let
        sources =
            routes
                |> List.concatMap
                    (\route ->
                        case route.assets of
                            Nothing ->
                                []

                            Just { base, files } ->
                                files
                                    |> List.map
                                        (\source ->
                                            Elm.declaration
                                                (source.path
                                                    |> Path.relative base
                                                    |> Path.removeExtension
                                                    |> String.split "/"
                                                    |> List.filter (not << String.isEmpty)
                                                    |> String.join "_"
                                                )
                                                (Elm.string source.source)
                                                |> Elm.expose
                                        )
                    )
    in
    case sources of
        [] ->
            Nothing

        _ ->
            Just <|
                Elm.fileWith [ "Assets", "Source" ]
                    { docs =
                        List.map Elm.docs
                    , aliases = []
                    }
                    sources
