module Generate.Assets exposing (generate)

{-| -}

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
import Markdown.Block
import Markdown.Parser
import Model
import Parser exposing ((|.), (|=))
import Path
import Set exposing (Set)


generate : List Model.AssetGroup -> List Elm.File
generate assetGroups =
    List.concatMap generateAssetGroup assetGroups


generateAssetGroup : Model.AssetGroup -> List Elm.File
generateAssetGroup group =
    List.filterMap identity
        [ generateAssetGroupDirectory group
        , generateAssetGroupSource group
        ]


generateAssetGroupSource : Model.AssetGroup -> Maybe Elm.File
generateAssetGroupSource group =
    let
        assetSources =
            List.filterMap toSourceDeclaration group.files
    in
    if List.isEmpty assetSources then
        Nothing

    else
        Just <|
            Elm.file [ "Assets", group.name, "Source" ]
                assetSources


toSourceDeclaration : Model.File -> Maybe Elm.Declaration
toSourceDeclaration file =
    case file.content of
        Model.Binary ->
            Nothing

        Model.Text source ->
            Elm.declaration (declarationName file)
                (Elm.string source)
                |> Elm.exposeWith
                    { exposeConstructor = True
                    , group = Just (String.join "/" file.crumbs)
                    }
                |> Just


declarationName : Model.File -> String
declarationName file =
    case file.crumbs of
        [] ->
            file.name

        _ ->
            String.join "_" file.crumbs ++ "_" ++ file.name


{-| The directory file contains

  - A top level entry for each file in the asset group.
  - A top level list called `all` that contains all the files in the asset group.

-}
generateAssetGroupDirectory : Model.AssetGroup -> Maybe Elm.File
generateAssetGroupDirectory group =
    let
        entries =
            List.map toDirectoryEntry group.files

        all =
            Elm.declaration "all"
                (Elm.list
                    (List.map
                        (\file ->
                            Elm.record
                                [ ( "name", Elm.string (declarationName file) )
                                , ( "path", Elm.string file.pathOnServer )
                                , ( "crumbs", Elm.list (List.map Elm.string file.crumbs) )
                                ]
                        )
                        group.files
                    )
                )

        search =
            let
                searchItems =
                    List.filterMap toMarkdownInfo group.files
            in
            case searchItems of
                [] ->
                    []

                _ ->
                    [ Elm.declaration "search"
                        (Elm.list
                            (List.map
                                encodeMarkdownInfo
                                searchItems
                            )
                        )
                    ]
    in
    if List.isEmpty entries then
        Nothing

    else
        Just <|
            Elm.file [ "Assets", group.name ]
                (List.concat
                    [ entries
                    , [ all ]
                    , search
                    ]
                )


encodeMarkdownInfo : MarkdownInfo -> Elm.Expression
encodeMarkdownInfo info =
    Elm.record
        [ ( "name", Elm.string info.name )
        , ( "title", Elm.string info.title )
        , ( "headers", Elm.list (List.map encodeHeader info.headers) )
        , ( "crumbs", Elm.list (List.map Elm.string info.crumbs) )
        , ( "pathOnServer", Elm.string info.pathOnServer )
        ]


encodeHeader : ( Int, String ) -> Elm.Expression
encodeHeader ( level, text ) =
    Elm.record
        [ ( "level", Elm.int level )
        , ( "text", Elm.string text )
        ]


type alias MarkdownInfo =
    { name : String
    , title : String
    , headers : List ( Int, String )
    , crumbs : List String
    , pathOnServer : String
    }


toMarkdownInfo : Model.File -> Maybe MarkdownInfo
toMarkdownInfo file =
    case file.content of
        Model.Binary ->
            Nothing

        Model.Text source ->
            let
                ( _, ext ) =
                    Path.extension file.pathOnServer
            in
            if List.member ext [ "markdown", "md" ] then
                let
                    headers =
                        getHeaders source
                in
                Just
                    { name = file.name
                    , title =
                        List.head headers
                            |> Maybe.map Tuple.second
                            |> Maybe.withDefault file.name
                    , headers = headers
                    , crumbs = file.crumbs
                    , pathOnServer = file.pathOnServer
                    }

            else
                Nothing


{-| -}
toDirectoryEntry : Model.File -> Elm.Declaration
toDirectoryEntry file =
    Elm.declaration (declarationName file)
        (Elm.string file.pathOnServer)
        |> Elm.expose


getHeaders : String -> List ( Int, String )
getHeaders src =
    case Markdown.Parser.parse src of
        Ok blocks ->
            List.filterMap
                (\block ->
                    case block of
                        Markdown.Block.Heading level contents ->
                            Just
                                ( Markdown.Block.headingLevelToInt level
                                , Markdown.Block.extractInlineText contents
                                )

                        _ ->
                            Nothing
                )
                blocks

        Err _ ->
            []
