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
