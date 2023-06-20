module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Elm.Op
import Gen.App.Effect
import Gen.App.Markdown
import Gen.App.Page
import Gen.App.State
import Gen.App.Sub
import Gen.App.View
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
    let
        initPage =
            Press.Model.initPage routes

        updatePage =
            Press.Model.updatePage routes
    in
    Elm.file [ "App", "Engine" ]
        [ app routes initPage
        , Elm.alias "App"
            (Type.namedWith []
                "Program"
                [ Gen.Json.Encode.annotation_.value
                , Type.namedWith [] "Model" [ Type.var "frame" ]
                , Type.namedWith [] "Msg" [ Type.var "frameMsg" ]
                ]
            )
            |> Elm.expose
        , Elm.alias "Model" types.modelRecord
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
        , Elm.customType "View"
            [ Elm.variant "NotFound"
            , Elm.variantWith "View"
                [ Gen.App.View.annotation_.view (Type.var "appMsg")
                ]
            ]
            |> Elm.exposeWith
                { group = Nothing
                , exposeConstructor = True
                }
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
        , update routes initPage updatePage
        , initPage.declaration
        , updatePage.declaration
        , view routes
        , subscriptions routes
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


app routes initPage =
    Elm.declaration "app"
        (Elm.fn
            ( "config"
            , Just types.frame
            )
            (\config ->
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
                                            Elm.apply
                                                (Elm.get "init" config)
                                                [ key
                                                , flags
                                                ]
                                    in
                                    Elm.Let.letIn
                                        (\( frameModel, frameEffect ) ->
                                            let
                                                newStates =
                                                    Elm.Case.maybe (parseUrl url)
                                                        { just =
                                                            ( "route"
                                                            , \route ->
                                                                let
                                                                    initializedPage =
                                                                        initPage.call route (Press.Model.toShared config frameModel) Gen.App.State.init
                                                                in
                                                                Elm.Let.letIn
                                                                    (\( newPage, pageTag ) ->
                                                                        Elm.tuple
                                                                            (Gen.App.State.init
                                                                                |> Gen.App.State.call_.insert pageTag (Elm.get "new" newPage)
                                                                                |> Gen.App.State.call_.setCurrent pageTag
                                                                            )
                                                                            (Elm.get "effect" newPage
                                                                                |> Press.Model.toCmd config frameModel
                                                                            )
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
                                                            [ frameEffect
                                                                |> Gen.App.Effect.call_.map (Elm.val "ToFrame")
                                                                |> Press.Model.toCmd config frameModel
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
                        , ( "update", Elm.apply (Elm.val "update") [ config ] )
                        , ( "view", Elm.apply (Elm.val "view") [ config ] )
                        , ( "subscriptions", Elm.apply (Elm.val "subscriptions") [ config ] )
                        , ( "onUrlChange", Elm.val "UrlChanged" )
                        , ( "onUrlRequest", Elm.val "UrlRequested" )
                        ]
                    )
                    |> Elm.withType (Type.namedWith [] "App" [ Type.var "model", Type.var "msg" ])
            )
        )
        |> Elm.expose


update routes initPage updatePage =
    Elm.declaration "update"
        (Elm.fn3
            ( "config", Just types.frame )
            ( "msg", Just types.msg )
            ( "model", Just types.model )
            (\config msg model ->
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
                                                    initPage.call route (Press.Model.toShared config (Elm.get "frame" model)) (Elm.get "states" model)
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
                                                        (Elm.get "effect" newPage
                                                            |> toCmd config (Elm.get "frame" model)
                                                        )
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
                                    Elm.apply (Elm.get "update" config)
                                        [ frameMsg
                                        , Elm.get "frame" model
                                        ]
                            in
                            Elm.Let.letIn
                                (\( newFrame, frameEffect ) ->
                                    Elm.tuple
                                        (model
                                            |> Elm.updateRecord
                                                [ ( "frame", newFrame )
                                                ]
                                        )
                                        (frameEffect
                                            |> Gen.App.Effect.call_.map (Elm.val "ToFrame")
                                            |> toCmd config (Elm.get "frame" model)
                                        )
                                )
                                |> Elm.Let.tuple "newFrame" "frameEffect" updatedFrame
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch1 "Page"
                        ( "pageMsg", types.pageMsg )
                        (\pageMsg ->
                            updatePage.call config
                                (Press.Model.toShared config (Elm.get "frame" model))
                                pageMsg
                                model
                        )
                    ]
                    |> Elm.withType (Type.tuple types.model (Type.cmd types.msg))
            )
        )


view : List RouteInfo -> Elm.Declaration
view routes =
    Elm.declaration "view"
        (Elm.fn2
            ( "config", Just types.frame )
            ( "model", Just types.model )
            (\config model ->
                let
                    frameView pageView =
                        Elm.apply
                            (Elm.get "view" config)
                            [ Elm.val "ToFrame"
                            , Elm.get "frame" model
                            , pageView
                            ]
                            |> Elm.withType (Gen.Browser.annotation_.document types.msg)
                in
                frameView <|
                    Elm.Case.maybe (Gen.App.State.current (Elm.get "states" model))
                        { nothing =
                            Elm.val "NotFound"
                        , just =
                            ( "current"
                            , \current ->
                                Elm.apply (Elm.val "View")
                                    [ Elm.Case.custom current
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
                                                            Gen.App.View.call_.map
                                                                (Elm.fn
                                                                    ( "innerMsg", Nothing )
                                                                    (\innerMsg ->
                                                                        Elm.apply (Elm.val "Page")
                                                                            [ Elm.apply
                                                                                (Elm.val pageMsgTypeName)
                                                                                [ innerMsg
                                                                                ]
                                                                            ]
                                                                    )
                                                                )
                                                                (Elm.apply
                                                                    (Elm.apply
                                                                        Gen.App.Page.values_.toView
                                                                        [ Elm.value
                                                                            { importFrom = pageModule
                                                                            , name = "page"
                                                                            , annotation = Nothing
                                                                            }
                                                                        ]
                                                                    )
                                                                    [ Press.Model.toShared config (Elm.get "frame" model)
                                                                    , pageState
                                                                    ]
                                                                )
                                                        )
                                                )
                                        )
                                    ]
                            )
                        }
            )
        )


subscriptions : List RouteInfo -> Elm.Declaration
subscriptions routes =
    Elm.declaration "subscriptions"
        (Elm.fn2
            ( "config", Just types.frame )
            ( "model", Just types.model )
            (\config model ->
                Gen.Platform.Sub.batch
                    [ Elm.apply
                        (Elm.get "subscriptions" config)
                        [ Elm.get "frame" model ]
                        |> Gen.App.Sub.call_.map (Elm.val "ToFrame")
                        |> toSub config (Elm.get "frame" model)
                    , Elm.Case.maybe (Gen.App.State.current (Elm.get "states" model))
                        { nothing =
                            Gen.Platform.Sub.none
                        , just =
                            ( "current"
                            , \current ->
                                toSub config (Elm.get "frame" model) <|
                                    Gen.App.Sub.call_.map (Elm.val "Page")
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
                                                                Elm.apply
                                                                    (Elm.apply
                                                                        Gen.App.Page.values_.toSubscriptions
                                                                        [ Elm.value
                                                                            { importFrom = pageModule
                                                                            , name = "page"
                                                                            , annotation = Nothing
                                                                            }
                                                                        ]
                                                                    )
                                                                    [ Press.Model.toShared config (Elm.get "frame" model)
                                                                    , pageState
                                                                    ]
                                                                    |> Gen.App.Sub.call_.map (Elm.val pageMsgTypeName)
                                                            )
                                                    )
                                            )
                                        )
                            )
                        }
                    ]
            )
            |> Elm.withType
                (Type.function
                    [ types.frame
                    , types.model
                    ]
                    (Gen.Platform.Sub.annotation_.sub types.msg)
                )
        )
