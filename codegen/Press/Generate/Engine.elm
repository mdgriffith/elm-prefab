module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Elm.Op
import Gen.App
import Gen.App.Engine.Page
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
import Press.Model exposing (..)
import Set exposing (Set)


getState key model =
    Gen.App.State.call_.get key (Elm.get "states" model)


setState key val model =
    Gen.App.State.call_.insert key val (Elm.get "states" model)


pageRecordType =
    Type.record
        [ ( "init"
          , Type.function
                [ Type.var "params"
                , Type.var "shared"
                ]
                (Type.tuple (Type.var "model") (Type.var "effect"))
          )
        , ( "update"
          , Type.function
                [ Type.var "shared"
                , Type.var "msg"
                , Type.var "model"
                ]
                (Type.tuple (Type.var "model") (Type.var "effect"))
          )
        , ( "subscriptions"
          , Type.function
                [ Type.var "shared"
                , Type.var "model"
                ]
                (Type.var "subscription")
          )
        , ( "view"
          , Type.function
                [ Type.var "shared"
                , Type.var "model"
                ]
                (Type.var "view")
          )
        ]


generate : List RouteInfo -> Elm.File
generate routes =
    Elm.file [ "App", "Engine" ]
        [ Elm.declaration "app"
            (Elm.apply
                (Elm.val "advanced")
                [ Gen.App.defaultFrame
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
                                                Gen.App.Engine.Page.frameInit key frame (Gen.App.toCmd key) flags

                                            parsedUrl =
                                                parseUrl url
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
            (routes
                |> List.map
                    (\route ->
                        Elm.variantWith
                            route.name
                            [ Type.named route.moduleName "Model"
                            ]
                    )
            )
        , Elm.customType "Msg"
            [ Elm.variantWith "UrlRequested" [ Gen.Browser.annotation_.urlRequest ]
            , Elm.variantWith "UrlChanged" [ Gen.Url.annotation_.url ]
            , Elm.variantWith "Page" [ Type.named [] "PageMsg" ]
            , Elm.variantWith "ToFrame" [ Type.var "frameMsg" ]
            ]
        , Elm.customType "PageMsg"
            (routes
                |> List.map
                    (\route ->
                        Elm.variantWith
                            (types.toPageMsg route.name)
                            [ Type.named route.moduleName "Msg"
                            ]
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
                                        parseUrl url
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
                                        Gen.App.Engine.Page.frameUpdate (Elm.get "key" model)
                                            frame
                                            (Gen.App.toCmd (Elm.get "key" model))
                                            frameMsg
                                            (Elm.get "frame" model)
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
                        (Type.named [ "Route" ] "Route")
                        (routes
                            |> List.map
                                (\routeInfo ->
                                    let
                                        stateKey =
                                            routeInfo.name

                                        pageModule =
                                            routeInfo.moduleName

                                        pageMsgTypeName =
                                            types.toPageMsg routeInfo.name

                                        page =
                                            Elm.value
                                                { importFrom = pageModule
                                                , name = "page"
                                                , annotation = Nothing
                                                }
                                    in
                                    Elm.Case.branch1 routeInfo.name
                                        ( "params", Type.unit )
                                        (\params ->
                                            let
                                                initialized =
                                                    Gen.App.Engine.Page.init key
                                                        page
                                                        (Gen.App.toCmd key)
                                                        params
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
                                                        (Elm.string stateKey)
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
                        (routes
                            |> List.map
                                (\route ->
                                    let
                                        stateKey =
                                            route.name

                                        pageModule =
                                            route.moduleName

                                        pageMsgTypeName =
                                            types.toPageMsg route.name
                                    in
                                    Elm.Case.branch1 pageMsgTypeName
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
                                                                                Gen.App.Engine.Page.update
                                                                                    (Elm.get "key" model)
                                                                                    (Elm.value
                                                                                        { importFrom = pageModule
                                                                                        , name = "page"
                                                                                        , annotation = Nothing
                                                                                        }
                                                                                    )
                                                                                    (Gen.App.toCmd (Elm.get "key" model))
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
                                Gen.App.Engine.Page.call_.frameView frame
                                    (Elm.val "ToFrame")
                                    (Elm.get "frame" model)
                                    (Elm.Case.custom current
                                        types.pageModel
                                        (routes
                                            |> List.map
                                                (\route ->
                                                    let
                                                        stateKey =
                                                            route.name

                                                        pageModule =
                                                            route.moduleName

                                                        pageMsgTypeName =
                                                            types.toPageMsg route.name
                                                    in
                                                    Elm.Case.branch1 stateKey
                                                        ( "pageModel", Type.named pageModule "Model" )
                                                        (\pageState ->
                                                            let
                                                                renderedPage =
                                                                    Elm.apply
                                                                        (Elm.val "mapDocumentToPage")
                                                                        [ Elm.val pageMsgTypeName
                                                                        , Gen.App.Engine.Page.view
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
                        [ Gen.App.Engine.Page.frameSubscriptions frame Gen.App.toSub (Elm.get "frame" model)
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
                                            (routes
                                                |> List.map
                                                    (\route ->
                                                        let
                                                            stateKey =
                                                                route.name

                                                            pageModule =
                                                                route.moduleName

                                                            pageMsgTypeName =
                                                                types.toPageMsg route.name
                                                        in
                                                        Elm.Case.branch1 stateKey
                                                            ( "pageModel", Type.named pageModule "Model" )
                                                            (\pageState ->
                                                                Gen.App.Engine.Page.subscriptions
                                                                    (Elm.value
                                                                        { importFrom = pageModule
                                                                        , name = "page"
                                                                        , annotation = Nothing
                                                                        }
                                                                    )
                                                                    Gen.App.toSub
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


parseUrl url =
    Elm.apply
        (Elm.value
            { importFrom = [ "Route" ]
            , name = "parse"
            , annotation = Nothing
            }
        )
        [ url ]
