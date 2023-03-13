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
import Json.Decode
import Path



{- Decode source data -}


type alias SourceDirectory =
    { base : String
    , files : List Source
    }


type alias Source =
    { path : String
    , contents : String
    }


decode : Json.Decode.Decoder SourceDirectory
decode =
    Json.Decode.map2 SourceDirectory
        (Json.Decode.field "base" Json.Decode.string)
        (Json.Decode.field "files" (Json.Decode.list decodeSource))


decodeSource : Json.Decode.Decoder Source
decodeSource =
    Json.Decode.map2 Source
        (Json.Decode.field "path" Json.Decode.string)
        (Json.Decode.field "contents" Json.Decode.string)



{- GENERATES -}


generate : SourceDirectory -> List Elm.File
generate source =
    generateAppEngine source
        :: generateDirectory source
        :: generatePages source


generateDirectory : SourceDirectory -> Elm.File
generateDirectory ({ base, files } as source) =
    Elm.file [ "Directory" ]
        (List.concat
            [ routeType source
            , urlEncoder source
            , urlParser source
            ]
        )


toRoutePieces : String -> String -> Maybe (List String)
toRoutePieces base filepath =
    let
        ( relativePath, ext ) =
            Path.relative base filepath
                |> Path.extension
    in
    if ext == "md" || ext == "markdown" then
        let
            pieces =
                relativePath
                    |> String.split "/"
                    |> List.map toElmTypeName
                    |> List.filter (not << String.isEmpty)
        in
        Just pieces

    else
        Nothing


routeType : SourceDirectory -> List Elm.Declaration
routeType { base, files } =
    [ Elm.customType "Route"
        (List.filterMap
            (\file ->
                case toRoutePieces base file.path of
                    Nothing ->
                        Nothing

                    Just [] ->
                        Nothing

                    Just pieces ->
                        Just
                            (Elm.variantWith
                                (String.join "" pieces)
                                []
                            )
            )
            files
        )
        |> Elm.exposeWith
            { exposeConstructor = True
            , group = Nothing
            }
    ]


urlEncoder : SourceDirectory -> List Elm.Declaration
urlEncoder { base, files } =
    let
        variants =
            files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                Just ( file, pieces )
                    )
    in
    [ Elm.declaration "toUrl"
        (Elm.fn ( "route", Just (Type.named [] "Route") )
            (\route ->
                Elm.Case.custom route
                    (Type.named [] "Route")
                    (variants
                        |> List.map
                            (\( file, pieces ) ->
                                Elm.Case.branch0 (String.join "" pieces)
                                    (Elm.string (String.join "/" pieces))
                            )
                    )
            )
        )
        |> Elm.expose
    ]


urlParser : SourceDirectory -> List Elm.Declaration
urlParser { base, files } =
    [ Elm.declaration "parser"
        (Gen.Url.Parser.oneOf
            (files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                Just ( file, pieces )
                    )
                |> List.map
                    (\( file, pieces ) ->
                        let
                            typename =
                                String.join "" pieces
                                    |> Elm.val
                        in
                        Gen.Url.Parser.map typename
                            (toUrlParser pieces)
                    )
            )
            |> Elm.withType
                (Gen.Url.Parser.annotation_.parser
                    (Type.function
                        [ Type.named [] "Route"
                        ]
                        (Type.var "a")
                    )
                    (Type.var "a")
                )
        )
        |> Elm.expose
    ]


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


generatePages : SourceDirectory -> List Elm.File
generatePages { base, files } =
    List.filterMap
        (generatePage base)
        files


generatePage : String -> Source -> Maybe Elm.File
generatePage base file =
    case toRoutePieces base file.path of
        Nothing ->
            Nothing

        Just pieces ->
            Just
                (Elm.file ("Page" :: pieces)
                    [ Elm.declaration "route"
                        (Elm.value
                            { importFrom = [ "Directory" ]
                            , name = String.join "" pieces
                            , annotation = Just (Type.named [ "Directory" ] "Route")
                            }
                        )
                        |> Elm.expose
                    , Elm.declaration "page"
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
                        (Elm.string file.contents)
                    ]
                )



{- GENERATE APP -}


types =
    { msg = Type.namedWith [] "Msg" [ Type.var "frameMsg" ]
    , pageMsg = Type.named [] "PageMsg"
    , model = Type.namedWith [] "Model" [ Type.var "frame" ]
    , frame =
        Gen.App.annotation_.frame
            (Type.var "frame")
            (Type.var "frameMsg")
            (Type.namedWith [] "Msg" [ Type.var "frameMsg" ])
            (Gen.Browser.annotation_.document
                (Type.namedWith [] "Msg" [ Type.var "frameMsg" ])
            )
    , pageModel = Type.named [] "PageModel"
    , effect = Type.namedWith [] "Effect" [ Type.var "msg" ]
    , subscription = Type.namedWith [] "Subscription" [ Type.var "msg" ]
    , pageConfig =
        Type.namedWith []
            "Page"
            [ Type.var "frame"
            , Type.var "model"
            , Type.var "msg"
            ]
    , cache = Type.named [] "Cache"
    , toPageMsg =
        \pieces ->
            "To" ++ String.join "" pieces
    }


getState key model =
    Gen.App.State.call_.get key (Elm.get "states" model)


setState key val model =
    Gen.App.State.call_.insert key val (Elm.get "states" model)


generateAppEngine : SourceDirectory -> Elm.File
generateAppEngine dir =
    Elm.file [ "App", "Engine" ]
        [ Elm.declaration "app"
            (Elm.apply
                (Elm.val "advanced")
                [ Gen.App.noFrame
                ]
                |> Elm.withType (Type.named [] "App")
            )
            |> Elm.expose
        , Elm.alias "App"
            (Type.namedWith []
                "Program"
                [ Gen.Json.Encode.annotation_.value
                , Type.namedWith [] "Model" [ Type.record [] ]
                , Type.namedWith [] "Msg" [ Type.record [] ]
                ]
            )
            |> Elm.expose
        , Elm.declaration "advanced"
            (Elm.fn
                ( "frame"
                , Just types.frame
                )
                (\frame ->
                    Gen.Browser.call_.application
                        (Elm.record
                            [ ( "init"
                              , Elm.fn3
                                    ( "flags", Just Gen.Json.Encode.annotation_.value )
                                    ( "url", Just Gen.Url.annotation_.url )
                                    ( "key", Just Gen.Browser.Navigation.annotation_.key )
                                    (\flags url key ->
                                        let
                                            frameInitialized =
                                                Gen.App.frameInit key frame flags

                                            parsedUrl =
                                                Gen.Url.Parser.parse parser url
                                        in
                                        Elm.Let.letIn
                                            (\( frameModel, frameCmd ) ->
                                                let
                                                    newStates =
                                                        Elm.Case.maybe parsedUrl
                                                            { just =
                                                                ( "route"
                                                                , \route ->
                                                                    let
                                                                        initializedPage =
                                                                            Elm.apply
                                                                                (Elm.val "initPage")
                                                                                [ route
                                                                                , key
                                                                                , frameModel
                                                                                ]
                                                                    in
                                                                    Elm.Let.letIn
                                                                        (\( newPage, pageTag ) ->
                                                                            Elm.tuple
                                                                                (Gen.App.State.init
                                                                                    |> Gen.App.State.call_.insert pageTag (Elm.get "new" newPage)
                                                                                    |> Gen.App.State.call_.setCurrent pageTag
                                                                                )
                                                                                (Elm.get "cmd" newPage)
                                                                        )
                                                                        |> Elm.Let.tuple "pageModel" "tag" initializedPage
                                                                        |> Elm.Let.toExpression
                                                                )
                                                            , nothing = Elm.tuple Gen.App.State.init Gen.Platform.Cmd.none
                                                            }
                                                in
                                                Elm.Let.letIn
                                                    (\( pageInitialzied, pageCmd ) ->
                                                        Elm.tuple
                                                            (Elm.record
                                                                [ ( "key", key )
                                                                , ( "url", url )
                                                                , ( "frame", frameModel )
                                                                , ( "states"
                                                                  , pageInitialzied
                                                                  )
                                                                ]
                                                                |> Elm.withType types.model
                                                            )
                                                            (Gen.Platform.Cmd.batch
                                                                [ frameCmd
                                                                    |> Gen.Platform.Cmd.call_.map (Elm.val "ToFrame")
                                                                    |> Elm.withType (Type.cmd (Type.named [] "Msg"))
                                                                , pageCmd
                                                                ]
                                                            )
                                                    )
                                                    |> Elm.Let.tuple "pageInitialized" "pageCmd" newStates
                                                    |> Elm.Let.toExpression
                                            )
                                            |> Elm.Let.tuple "frameModel" "frameCmd" frameInitialized
                                            |> Elm.Let.toExpression
                                    )
                              )
                            , ( "update", Elm.apply (Elm.val "update") [ frame ] )
                            , ( "view", Elm.apply (Elm.val "view") [ frame ] )
                            , ( "subscriptions", Elm.apply (Elm.val "subscriptions") [ frame ] )
                            , ( "onUrlChange", Elm.val "UrlChanged" )
                            , ( "onUrlRequest", Elm.val "UrlRequested" )
                            ]
                        )
                        |> Elm.withType (Type.namedWith [] "Advanced" [ Type.var "frame", Type.var "frameMsg" ])
                )
            )
            |> Elm.expose
        , Elm.alias "Advanced"
            (Type.namedWith []
                "Program"
                [ Gen.Json.Encode.annotation_.value
                , Type.namedWith [] "Model" [ Type.var "frame" ]
                , Type.namedWith [] "Msg" [ Type.var "frameMsg" ]
                ]
            )
            |> Elm.expose
        , Elm.alias "Model"
            (Type.record
                [ ( "key", Gen.Browser.Navigation.annotation_.key )
                , ( "url", Gen.Url.annotation_.url )
                , ( "states", Gen.App.State.annotation_.cache (Type.named [] "State") )
                , ( "frame", Type.var "frame" )
                ]
            )
        , Elm.customType "State"
            (dir.files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces dir.base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                let
                                    pageNameType =
                                        String.join "" pieces
                                in
                                Just
                                    (Elm.variantWith
                                        pageNameType
                                        [ Type.named ("Page" :: pieces) "Model"
                                        ]
                                    )
                    )
            )
        , Elm.customType "Msg"
            [ Elm.variantWith "UrlRequested" [ Gen.Browser.annotation_.urlRequest ]
            , Elm.variantWith "UrlChanged" [ Gen.Url.annotation_.url ]
            , Elm.variantWith "Page" [ Type.named [] "PageMsg" ]
            , Elm.variantWith "ToFrame" [ Type.var "frameMsg" ]
            ]
        , Elm.customType "PageMsg"
            (dir.files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces dir.base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                Just
                                    (Elm.variantWith
                                        (types.toPageMsg pieces)
                                        [ Type.named ("Page" :: pieces) "Msg"
                                        ]
                                    )
                    )
            )
        , Elm.declaration "update"
            (Elm.fn3
                ( "frame", Just types.frame )
                ( "msg", Just types.msg )
                ( "model", Just types.model )
                (\frame msg model ->
                    Elm.Case.custom msg
                        types.msg
                        [ Elm.Case.branch1 "UrlRequested"
                            ( "request", Gen.Browser.annotation_.urlRequest )
                            (\request ->
                                Elm.Case.custom request
                                    (Type.namedWith [ "Browser" ] "UrlRequest" [])
                                    [ Elm.Case.branch1
                                        "Internal"
                                        ( "url", Type.namedWith [ "Url" ] "Url" [] )
                                        (\url ->
                                            Elm.tuple model
                                                (Gen.Browser.Navigation.call_.pushUrl
                                                    (Elm.get "key" model)
                                                    (Gen.Url.toString url)
                                                )
                                        )
                                    , Elm.Case.branch1
                                        "External"
                                        ( "url", Type.string )
                                        (\url ->
                                            Elm.tuple model
                                                (Gen.Browser.Navigation.call_.load
                                                    url
                                                )
                                        )
                                    ]
                            )
                        , Elm.Case.branch1 "UrlChanged"
                            ( "url", Gen.Url.annotation_.url )
                            (\url ->
                                let
                                    parsed =
                                        Gen.Url.Parser.parse parser url
                                in
                                Elm.Case.maybe parsed
                                    { just =
                                        Tuple.pair "route" <|
                                            \route ->
                                                let
                                                    initializedPage =
                                                        Elm.apply
                                                            (Elm.val "initPage")
                                                            [ route
                                                            , Elm.get "key" model
                                                            , Elm.get "frame" model
                                                            ]
                                                in
                                                Elm.Let.letIn
                                                    (\( newPage, pageTag ) ->
                                                        Elm.tuple
                                                            (Elm.updateRecord
                                                                [ ( "states"
                                                                  , Elm.get "states" model
                                                                        |> Gen.App.State.call_.insert pageTag (Elm.get "new" newPage)
                                                                        |> Gen.App.State.call_.setCurrent pageTag
                                                                  )
                                                                ]
                                                                model
                                                            )
                                                            (Elm.get "cmd" newPage)
                                                    )
                                                    |> Elm.Let.tuple "pageModel" "tag" initializedPage
                                                    |> Elm.Let.toExpression
                                    , nothing =
                                        Elm.tuple model Gen.Platform.Cmd.none
                                    }
                            )
                        , Elm.Case.branch1 "ToFrame"
                            ( "frameMsg", Type.var "frameMsg" )
                            (\frameMsg ->
                                let
                                    updatedFrame =
                                        Gen.App.frameUpdate (Elm.get "key" model) frame frameMsg (Elm.get "frame" model)
                                in
                                Elm.Let.letIn
                                    (\( newFrame, frameCmd ) ->
                                        Elm.tuple
                                            (model
                                                |> Elm.updateRecord
                                                    [ ( "frame", newFrame )
                                                    ]
                                            )
                                            (frameCmd
                                                |> Gen.Platform.Cmd.call_.map (Elm.val "ToFrame")
                                            )
                                    )
                                    |> Elm.Let.tuple "newFrame" "frameCmd" updatedFrame
                                    |> Elm.Let.toExpression
                            )
                        , Elm.Case.branch1 "Page"
                            ( "pageMsg", types.pageMsg )
                            (\pageMsg ->
                                Elm.apply (Elm.val "updatePage") [ pageMsg, model ]
                            )
                        ]
                        |> Elm.withType (Type.tuple types.model (Type.cmd types.msg))
                )
            )
        , Elm.declaration "initPage"
            (Elm.fn3
                ( "route", Nothing )
                ( "key", Just Gen.Browser.Navigation.annotation_.key )
                ( "frame", Just (Type.var "frame") )
                (\route key frame ->
                    Elm.Case.custom route
                        (Type.named [ "Directory" ] "Route")
                        (dir.files
                            |> List.filterMap
                                (\file ->
                                    case toRoutePieces dir.base file.path of
                                        Nothing ->
                                            Nothing

                                        Just pieces ->
                                            let
                                                stateKey =
                                                    String.join "" pieces

                                                pageModule =
                                                    "Page" :: pieces

                                                pageMsgTypeName =
                                                    types.toPageMsg pieces

                                                page =
                                                    Elm.value
                                                        { importFrom = pageModule
                                                        , name = "page"
                                                        , annotation = Nothing
                                                        }
                                            in
                                            Just <|
                                                Elm.Case.branch0 (String.join "" pieces)
                                                    (let
                                                        initialized =
                                                            Gen.App.init key
                                                                page
                                                                frame
                                                     in
                                                     Elm.Let.letIn
                                                        (\( newPage, pageCmd ) ->
                                                            Elm.tuple
                                                                (Elm.record
                                                                    [ ( "new"
                                                                      , Elm.apply
                                                                            (Elm.val stateKey)
                                                                            [ newPage ]
                                                                      )
                                                                    , ( "cmd"
                                                                      , pageCmd
                                                                            |> Gen.Platform.Cmd.call_.map (Elm.val pageMsgTypeName)
                                                                            |> Gen.Platform.Cmd.call_.map (Elm.val "Page")
                                                                      )
                                                                    ]
                                                                )
                                                                (Elm.string (String.join "" pieces))
                                                        )
                                                        |> Elm.Let.tuple "newPage" "pageCmd" initialized
                                                        |> Elm.Let.toExpression
                                                    )
                                )
                        )
                        |> Elm.withType
                            (Type.tuple
                                (Type.record
                                    [ ( "new", Type.named [] "State" )
                                    , ( "cmd", Gen.Platform.Cmd.annotation_.cmd types.msg )
                                    ]
                                )
                                Type.string
                            )
                )
            )
        , Elm.declaration "updatePage"
            (Elm.fn2
                ( "msg", Just types.pageMsg )
                ( "model", Just types.model )
                (\msg model ->
                    Elm.Case.custom msg
                        types.msg
                        (dir.files
                            |> List.filterMap
                                (\file ->
                                    case toRoutePieces dir.base file.path of
                                        Nothing ->
                                            Nothing

                                        Just pieces ->
                                            let
                                                stateKey =
                                                    String.join "" pieces

                                                pageModule =
                                                    "Page" :: pieces

                                                pageMsgTypeName =
                                                    types.toPageMsg pieces
                                            in
                                            Just
                                                (Elm.Case.branch1 pageMsgTypeName
                                                    ( "pageMsg", Type.named pageModule "Msg" )
                                                    (\pageMsg ->
                                                        Elm.Case.maybe (getState (Elm.string stateKey) model)
                                                            { nothing = Elm.tuple model Gen.Platform.Cmd.none
                                                            , just =
                                                                Tuple.pair "foundPage" <|
                                                                    \foundPage ->
                                                                        Elm.Case.custom foundPage
                                                                            types.pageModel
                                                                            [ Elm.Case.branch1 stateKey
                                                                                ( "page", types.pageModel )
                                                                                (\pageState ->
                                                                                    let
                                                                                        updated =
                                                                                            Gen.App.update
                                                                                                (Elm.get "key" model)
                                                                                                (Elm.value
                                                                                                    { importFrom = pageModule
                                                                                                    , name = "page"
                                                                                                    , annotation = Nothing
                                                                                                    }
                                                                                                )
                                                                                                (Elm.get "frame" model)
                                                                                                pageMsg
                                                                                                pageState
                                                                                    in
                                                                                    Elm.Let.letIn
                                                                                        (\( innerPageModel, pageCommand ) ->
                                                                                            let
                                                                                                pageModel =
                                                                                                    Elm.apply
                                                                                                        (Elm.val stateKey)
                                                                                                        [ innerPageModel ]
                                                                                            in
                                                                                            Elm.tuple
                                                                                                (model
                                                                                                    |> Elm.updateRecord
                                                                                                        [ ( "states", setState (Elm.string stateKey) pageModel model )
                                                                                                        ]
                                                                                                )
                                                                                                (pageCommand
                                                                                                    |> Gen.Platform.Cmd.call_.map (Elm.val pageMsgTypeName)
                                                                                                    |> Gen.Platform.Cmd.call_.map (Elm.val "Page")
                                                                                                )
                                                                                        )
                                                                                        |> Elm.Let.tuple "updatedPage" "cmd" updated
                                                                                        |> Elm.Let.toExpression
                                                                                )
                                                                            , Elm.Case.otherwise
                                                                                (\_ ->
                                                                                    Elm.tuple model Gen.Platform.Cmd.none
                                                                                )
                                                                            ]
                                                            }
                                                    )
                                                )
                                )
                        )
                        |> Elm.withType (Type.tuple types.model (Type.cmd types.msg))
                )
            )
        , Elm.declaration "view"
            (Elm.fn2
                ( "frame", Just types.frame )
                ( "model", Just types.model )
                (\frame model ->
                    Elm.Case.maybe (Gen.App.State.current (Elm.get "states" model))
                        { nothing =
                            Elm.record
                                [ ( "title", Elm.string "whoops" )
                                , ( "body"
                                  , Elm.list [ Gen.Html.text "WHoops" ]
                                  )
                                ]
                        , just =
                            ( "current"
                            , \current ->
                                Gen.App.call_.frameView frame
                                    (Elm.val "ToFrame")
                                    (Elm.get "frame" model)
                                    (Elm.Case.custom current
                                        types.pageModel
                                        (dir.files
                                            |> List.filterMap
                                                (\file ->
                                                    case toRoutePieces dir.base file.path of
                                                        Nothing ->
                                                            Nothing

                                                        Just pieces ->
                                                            let
                                                                stateKey =
                                                                    String.join "" pieces

                                                                pageModule =
                                                                    "Page" :: pieces

                                                                pageMsgTypeName =
                                                                    types.toPageMsg pieces
                                                            in
                                                            Just <|
                                                                Elm.Case.branch1 stateKey
                                                                    ( "pageModel", Type.named pageModule "Model" )
                                                                    (\pageState ->
                                                                        let
                                                                            renderedPage =
                                                                                Elm.apply
                                                                                    (Elm.val "mapDocumentToPage")
                                                                                    [ Elm.val pageMsgTypeName
                                                                                    , Gen.App.view
                                                                                        (Elm.value
                                                                                            { importFrom = pageModule
                                                                                            , name = "page"
                                                                                            , annotation = Nothing
                                                                                            }
                                                                                        )
                                                                                        (Elm.get "frame" model)
                                                                                        pageState
                                                                                    ]
                                                                        in
                                                                        renderedPage
                                                                    )
                                                )
                                        )
                                    )
                            )
                        }
                        |> Elm.withType (Gen.Browser.annotation_.document types.msg)
                )
            )
        , Elm.unsafe """
mapDocumentToPage toPageMsg doc =
    { title = doc.title
    , body =
        List.map 
            (Html.map (Page << toPageMsg))
            doc.body
    }

"""
        , Elm.declaration "subscriptions"
            (Elm.fn2
                ( "frame", Just types.frame )
                ( "model", Just types.model )
                (\frame model ->
                    Gen.Platform.Sub.batch
                        [ Gen.App.frameSubscriptions frame (Elm.get "frame" model)
                            |> Gen.Platform.Sub.call_.map (Elm.val "ToFrame")
                        , Elm.Case.maybe (Gen.App.State.current (Elm.get "states" model))
                            { nothing =
                                Gen.Platform.Sub.none
                            , just =
                                ( "current"
                                , \current ->
                                    Gen.Platform.Sub.call_.map (Elm.val "Page")
                                        (Elm.Case.custom current
                                            types.pageModel
                                            (dir.files
                                                |> List.filterMap
                                                    (\file ->
                                                        case toRoutePieces dir.base file.path of
                                                            Nothing ->
                                                                Nothing

                                                            Just pieces ->
                                                                let
                                                                    stateKey =
                                                                        String.join "" pieces

                                                                    pageModule =
                                                                        "Page" :: pieces

                                                                    pageMsgTypeName =
                                                                        types.toPageMsg pieces
                                                                in
                                                                Just <|
                                                                    Elm.Case.branch1 stateKey
                                                                        ( "pageModel", Type.named pageModule "Model" )
                                                                        (\pageState ->
                                                                            Gen.App.subscriptions
                                                                                (Elm.value
                                                                                    { importFrom = pageModule
                                                                                    , name = "page"
                                                                                    , annotation = Nothing
                                                                                    }
                                                                                )
                                                                                (Elm.get "frame" model)
                                                                                pageState
                                                                                |> Gen.Platform.Sub.call_.map (Elm.val pageMsgTypeName)
                                                                        )
                                                    )
                                            )
                                        )
                                )
                            }
                        ]
                )
            )
        ]


parser =
    Elm.value
        { importFrom = [ "Directory" ]
        , name = "parser"
        , annotation = Nothing
        }
