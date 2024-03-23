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
import Options.Assets
import Parser exposing ((|.), (|=))
import Path
import Set exposing (Set)


generate : List Options.Assets.AssetGroup -> List Elm.File
generate assetGroups =
    List.concatMap generateAssetGroup assetGroups


generateAssetGroup : Options.Assets.AssetGroup -> List Elm.File
generateAssetGroup group =
    assetRootFile
        :: List.filterMap identity
            [ generateAssetGroupDirectory group

            -- , generateAssetGroupSource group
            ]


assetRootFile : Elm.File
assetRootFile =
    Elm.file [ "Asset" ]
        [ Elm.customType "Src"
            [ Elm.variantWith
                "Src"
                [ Type.string
                ]
            ]
        , Elm.declaration "toString"
            (Elm.fn ( "src", Just (Type.named [] "Src") )
                (\src ->
                    Elm.Case.custom src
                        (Type.named [] "Src")
                        [ Elm.Case.branch1 "Src"
                            ( "innerSrc", Type.string )
                            (\innerSrc ->
                                innerSrc
                            )
                        ]
                )
            )
        , Elm.customType "Content"
            [ Elm.variantWith
                "Binary"
                []
            , Elm.variantWith
                "Text"
                []
            , Elm.variantWith
                "Markdown"
                [ Type.record
                    [ ( "title", Type.string )
                    , ( "headers"
                      , Type.list
                            (Type.record
                                [ ( "level"
                                  , Type.int
                                  )
                                , ( "text", Type.string )
                                ]
                            )
                      )
                    ]
                ]
            ]
        ]


generateAssetGroupSource : Options.Assets.AssetGroup -> Maybe Elm.File
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


toSourceDeclaration : Options.Assets.File -> Maybe Elm.Declaration
toSourceDeclaration file =
    case file.content of
        Options.Assets.Binary ->
            Nothing

        Options.Assets.Text source ->
            Elm.declaration (declarationName file)
                (Elm.string source)
                |> Elm.exposeWith
                    { exposeConstructor = True
                    , group = Just (String.join "/" file.crumbs)
                    }
                |> Just


declarationName : Options.Assets.File -> String
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
generateAssetGroupDirectory : Options.Assets.AssetGroup -> Maybe Elm.File
generateAssetGroupDirectory group =
    let
        entries =
            List.map toDirectoryEntry group.files

        directory =
            let
                directoryItems =
                    List.map toFileInfo group.files
            in
            case directoryItems of
                [] ->
                    []

                _ ->
                    [ Elm.declaration "directory_"
                        (Elm.list
                            (List.map
                                encodeFileInfo
                                directoryItems
                            )
                            |> Elm.withType
                                (Type.list
                                    (Type.record
                                        [ ( "name", Type.string )
                                        , ( "crumbs", Type.list Type.string )
                                        , ( "pathOnServer", Type.string )
                                        , ( "content", Type.named [ "Asset" ] "Content" )
                                        ]
                                    )
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
                    , directory
                    ]
                )


encodeFileInfo : FileInfo -> Elm.Expression
encodeFileInfo info =
    Elm.record
        [ ( "name", Elm.string info.name )
        , ( "crumbs", Elm.list (List.map Elm.string info.crumbs) )
        , ( "pathOnServer"
          , Elm.apply
                (Elm.value
                    { importFrom = [ "Asset" ]
                    , name = "Src"
                    , annotation = Just (Type.named [ "Asset" ] "Src")
                    }
                )
                [ Elm.string info.pathOnServer ]
          )
        , ( "content", encodeContent info.content )
        ]


encodeContent : Content -> Elm.Expression
encodeContent content =
    case content of
        Binary ->
            Elm.value
                { importFrom = [ "Asset" ]
                , name = "Binary"
                , annotation = Just (Type.named [ "Asset" ] "Content")
                }

        Text ->
            Elm.value
                { importFrom = [ "Asset" ]
                , name = "Text"
                , annotation = Just (Type.named [ "Asset" ] "Content")
                }

        Markdown { title, headers } ->
            Elm.apply
                (Elm.value
                    { importFrom = [ "Asset" ]
                    , name = "Markdown"
                    , annotation = Just (Type.named [ "Asset" ] "Content")
                    }
                )
                [ Elm.record
                    [ ( "title", Elm.string title )
                    , ( "headers", Elm.list (List.map encodeHeader headers) )
                    ]
                ]


encodeHeader : ( Int, String ) -> Elm.Expression
encodeHeader ( level, text ) =
    Elm.record
        [ ( "level", Elm.int level )
        , ( "text", Elm.string text )
        ]


type alias FileInfo =
    { name : String
    , crumbs : List String
    , pathOnServer : String
    , content : Content
    }


type Content
    = Binary
    | Text
    | Markdown
        { title : String
        , headers : List ( Int, String )
        }


toFileInfo : Options.Assets.File -> FileInfo
toFileInfo file =
    { name = file.name
    , crumbs = file.crumbs
    , pathOnServer = file.pathOnServer
    , content =
        case file.content of
            Options.Assets.Binary ->
                Binary

            Options.Assets.Text source ->
                let
                    ( _, ext ) =
                        Path.extension file.pathOnServer
                in
                if List.member ext [ "markdown", "md" ] then
                    let
                        headers =
                            getHeaders source
                    in
                    Markdown
                        { title =
                            List.head headers
                                |> Maybe.map Tuple.second
                                |> Maybe.withDefault file.name
                        , headers = headers
                        }

                else
                    Text
    }


{-| -}
toDirectoryEntry : Options.Assets.File -> Elm.Declaration
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
