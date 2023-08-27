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


generate : List Page -> Elm.File
generate routes =
    let
        loadPage =
            Press.Model.loadPage routes

        getPageInit =
            Press.Model.getPageInit routes
    in
    Elm.file [ "App", "Engine" ]
        [ Elm.alias "App"
            (Type.namedWith []
                "Program"
                [ Gen.Json.Encode.annotation_.value
                , Type.namedWith [] "Model" [ Type.var "model" ]
                , Type.namedWith [] "Msg" [ Type.var "msg" ]
                ]
            )
            |> Elm.expose
        , app routes getPageInit loadPage
        , Elm.alias "Model" types.modelRecord
        , Elm.customType "State"
            (routes
                |> List.map
                    (\route ->
                        Elm.variantWith
                            route.id
                            [ Type.named route.moduleName "Model"
                            ]
                    )
            )
        , Elm.customType "View"
            [ Elm.variantWith "NotFound" [ Gen.Url.annotation_.url ]
            , Elm.variantWith "Loading" [ Type.maybe types.routeType ]
            , Elm.variantWith "View"
                [ Gen.App.View.annotation_.view (Type.var "appMsg")
                ]
            ]
            |> Elm.exposeWith
                { group = Nothing
                , exposeConstructor = True
                }
        , let
            pageVariants =
                routes
                    |> List.map
                        (\route ->
                            Elm.variantWith
                                (types.toPageMsg route.id)
                                [ Type.named route.moduleName "Msg"
                                ]
                        )
          in
          Elm.customType "Msg"
            ([ Elm.variantWith "UrlRequested" [ Gen.Browser.annotation_.urlRequest ]
             , Elm.variantWith "UrlChanged" [ Gen.Url.annotation_.url ]
             , Elm.variantWith "Global" [ Type.var "msg" ]
             , Elm.variantWith "Loaded"
                [ types.routeType
                , types.pageLoadResult
                ]
             ]
                ++ pageVariants
            )
        , update routes getPageInit loadPage
        , getPageInit.declaration
        , loadPage.declaration
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


app routes getPageInit loadPage =
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
                                                model =
                                                    Elm.record
                                                        [ ( "key", key )
                                                        , ( "url", url )
                                                        , ( "currentRoute", Elm.nothing )
                                                        , ( "frame", frameModel )
                                                        , ( "states"
                                                          , Gen.App.State.init
                                                          )
                                                        ]
                                                        |> Elm.withType types.model
                                            in
                                            Elm.Case.maybe (parseUrl url)
                                                { nothing = Elm.tuple model Gen.Platform.Cmd.none
                                                , just =
                                                    ( "route"
                                                    , \route ->
                                                        getPageInit.call route (Press.Model.toShared config frameModel) Gen.App.State.init
                                                            |> loadPage.call config model route
                                                    )
                                                }
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


update routes getPageInit loadPage =
    Elm.declaration "update"
        (Elm.fn3
            ( "config", Just types.frame )
            ( "msg", Just types.msg )
            ( "model", Just types.model )
            (\config msg model ->
                Elm.Case.custom msg
                    types.msg
                    ([ Elm.Case.branch1 "UrlRequested"
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
                                { nothing =
                                    let
                                        updatedModel =
                                            Elm.updateRecord
                                                [ ( "states"
                                                  , Elm.get "states" model
                                                        |> Gen.App.State.clearCurrent
                                                  )
                                                , ( "url", url )
                                                , ( "currentRoute", Elm.nothing )
                                                ]
                                                model
                                    in
                                    Elm.tuple updatedModel
                                        Gen.Platform.Cmd.none
                                , just =
                                    Tuple.pair "newRoute" <|
                                        \newRoute ->
                                            let
                                                id =
                                                    Elm.apply
                                                        (Elm.value
                                                            { importFrom = [ "Route" ]
                                                            , name = "toId"
                                                            , annotation = Nothing
                                                            }
                                                        )
                                                        [ newRoute ]

                                                updatedModel =
                                                    Elm.updateRecord
                                                        [ ( "url", url )
                                                        , ( "currentRoute", Elm.just newRoute )
                                                        , ( "states"
                                                          , Elm.get "states" model
                                                                |> Gen.App.State.call_.setCurrent id
                                                          )
                                                        ]
                                                        model
                                            in
                                            getPageInit.call newRoute
                                                (Press.Model.toShared config (Elm.get "frame" model))
                                                (Elm.get "states" model)
                                                |> loadPage.call config updatedModel newRoute
                                }
                        )
                     , Elm.Case.branch2 "Loaded"
                        ( "route", types.routeType )
                        ( "loaded", types.pageLoadResult )
                        (\route initialization ->
                            loadPage.call config model route initialization
                        )
                     , Elm.Case.branch1 "Global"
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
                                            |> Gen.App.Effect.call_.map (Elm.val "Global")
                                            |> toCmd config (Elm.get "frame" model)
                                        )
                                )
                                |> Elm.Let.tuple "newFrame" "frameEffect" updatedFrame
                                |> Elm.Let.toExpression
                        )
                     ]
                        ++ Press.Model.updatePageBranches routes
                            config
                            (Press.Model.toShared config (Elm.get "frame" model))
                            model
                    )
                    |> Elm.withType (Type.tuple types.model (Type.cmd types.msg))
            )
        )


view : List Page -> Elm.Declaration
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
                            [ Elm.val "Global"
                            , Elm.get "frame" model
                            , pageView
                            ]
                            |> Elm.withType (Gen.Browser.annotation_.document types.msg)
                in
                frameView <|
                    Gen.App.State.caseOf_.loaded (Gen.App.State.current (Elm.get "states" model))
                        { notFound =
                            Elm.apply
                                (Elm.val "NotFound")
                                [ Elm.get "url" model ]
                        , loading =
                            Elm.apply
                                (Elm.val "Loading")
                                [ Elm.get "currentRoute" model ]
                        , loaded =
                            \current ->
                                Elm.apply (Elm.val "View")
                                    [ Elm.Case.custom current
                                        types.pageModel
                                        (routes
                                            |> List.map
                                                (\route ->
                                                    let
                                                        stateKey =
                                                            route.id

                                                        pageModule =
                                                            route.moduleName

                                                        pageMsgTypeName =
                                                            types.toPageMsg route.id
                                                    in
                                                    Elm.Case.branch1 stateKey
                                                        ( "pageModel", Type.named pageModule "Model" )
                                                        (\pageState ->
                                                            Press.Model.withPageHelper
                                                                (Elm.value
                                                                    { importFrom = pageModule
                                                                    , name = "page"
                                                                    , annotation = Nothing
                                                                    }
                                                                )
                                                                "view"
                                                                (\pageView ->
                                                                    Gen.App.View.call_.map
                                                                        (Elm.fn
                                                                            ( "innerMsg", Nothing )
                                                                            (\innerMsg ->
                                                                                Elm.apply
                                                                                    (Elm.val pageMsgTypeName)
                                                                                    [ innerMsg
                                                                                    ]
                                                                            )
                                                                        )
                                                                        (Elm.apply pageView
                                                                            [ Press.Model.toShared config (Elm.get "frame" model)
                                                                            , pageState
                                                                            ]
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                    ]
                        }
            )
        )


subscriptions : List Page -> Elm.Declaration
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
                        |> Gen.App.Sub.call_.map (Elm.val "Global")
                        |> toSub config (Elm.get "frame" model)
                    , Gen.App.State.caseOf_.loaded (Gen.App.State.current (Elm.get "states" model))
                        { loading = Gen.Platform.Sub.none
                        , notFound = Gen.Platform.Sub.none
                        , loaded =
                            \current ->
                                toSub config (Elm.get "frame" model) <|
                                    Elm.Case.custom current
                                        types.pageModel
                                        (routes
                                            |> List.map
                                                (\route ->
                                                    let
                                                        stateKey =
                                                            route.id

                                                        pageModule =
                                                            route.moduleName

                                                        pageMsgTypeName =
                                                            types.toPageMsg route.id
                                                    in
                                                    Elm.Case.branch1 stateKey
                                                        ( "pageModel", Type.named pageModule "Model" )
                                                        (\pageState ->
                                                            Press.Model.withPageHelper
                                                                (Elm.value
                                                                    { importFrom = pageModule
                                                                    , name = "page"
                                                                    , annotation = Nothing
                                                                    }
                                                                )
                                                                "subscriptions"
                                                                (\pageSubscriptions ->
                                                                    Elm.apply pageSubscriptions
                                                                        [ Press.Model.toShared config (Elm.get "frame" model)
                                                                        , pageState
                                                                        ]
                                                                        |> Gen.App.Sub.call_.map (Elm.val pageMsgTypeName)
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
