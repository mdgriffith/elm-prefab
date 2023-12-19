module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Declare
import Elm.Let
import Elm.Op
import Gen.App.Effect
import Gen.App.Engine.Page
import Gen.App.PageError
import Gen.App.State
import Gen.App.Sub
import Gen.App.View
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Json.Encode
import Gen.List
import Gen.Maybe
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.Url
import Press.Generate.Regions
import Press.Model exposing (..)


pageRecordType : Type.Annotation
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


generate : List PageUsage -> Elm.File
generate pageUsages =
    let
        loadPage =
            Press.Model.loadPage pageUsages

        preloadPage =
            Press.Model.preloadPage pageUsages

        getPageInit =
            Press.Model.getPageInit pageUsages
    in
    Elm.file [ "App", "Engine" ]
        [ Elm.alias "App"
            (Type.namedWith []
                "Program"
                [ Gen.Json.Encode.annotation_.value
                , Type.namedWith [] "Model" [ Gen.Browser.Navigation.annotation_.key, Type.var "model" ]
                , Type.namedWith [] "Msg" [ Type.var "msg" ]
                ]
            )
            |> Elm.exposeWith
                { group = Just "App"
                , exposeConstructor = True
                }
        , Elm.alias "CmdOptions" types.cmdOptions
            |> Elm.exposeWith
                { group = Just "App"
                , exposeConstructor = True
                }
        , toPageKey pageUsages
        , app pageUsages getPageInit loadPage
        , testAlias
        , test getPageInit loadPage
        , Elm.alias "Model" types.modelRecord
        , Elm.customType "State"
            (let
                routeVariants =
                    pageUsages
                        |> List.map
                            (\route ->
                                Elm.variantWith
                                    route.id
                                    [ Type.named route.moduleName "Model"
                                    ]
                            )
             in
             Elm.variantWith "PageError_" [ Gen.App.PageError.annotation_.error ]
                :: Elm.variantWith "PageLoading_" [ types.pageId ]
                :: routeVariants
            )
        , viewType
        , viewPageModel pageUsages
        , msgType pageUsages
        , update pageUsages getPageInit loadPage preloadPage
        , getPageInit.declaration
        , loadPage.declaration
        , preloadPage.declaration
        , view pageUsages
        , subscriptions pageUsages
        ]


toPageKey routes =
    .declaration <|
        Elm.Declare.fn "toPageKey"
            ( "pageId", Just types.pageId )
            (\pageId ->
                Elm.Case.custom pageId
                    types.pageId
                    (routes
                        |> List.map
                            (\routeInfo ->
                                let
                                    stateKey =
                                        routeInfo.id

                                    pageModule =
                                        routeInfo.moduleName

                                    pageMsgTypeName =
                                        types.toPageMsg routeInfo.id

                                    pageConfig =
                                        Elm.value
                                            { importFrom = pageModule
                                            , name = "page"
                                            , annotation = Nothing
                                            }
                                in
                                Elm.Case.branch1 routeInfo.id
                                    ( "params", Type.unit )
                                    (\params ->
                                        Elm.Let.letIn
                                            (\pageDetails ->
                                                Elm.Case.maybe (Elm.get "toKey" pageDetails)
                                                    { nothing = Elm.string stateKey
                                                    , just =
                                                        ( "toKey"
                                                        , \toKey ->
                                                            Elm.Op.append
                                                                (Elm.string stateKey)
                                                                (Elm.apply toKey [ params ])
                                                        )
                                                    }
                                            )
                                            |> Elm.Let.value "pageDetails"
                                                (Elm.apply
                                                    Gen.App.Engine.Page.values_.toInternalDetails
                                                    [ pageConfig ]
                                                )
                                            |> Elm.Let.toExpression
                                    )
                            )
                    )
                    |> Elm.withType Type.string
            )


msgType : List PageUsage -> Elm.Declaration
msgType routes =
    let
        pageVariants =
            routes
                |> List.map
                    (\route ->
                        Elm.variantWith
                            (types.toPageMsg route.id)
                            [ Type.string
                            , Type.named route.moduleName "Msg"
                            ]
                    )
    in
    Elm.customType "Msg"
        ([ Elm.variant "PageCacheCleared"
         , Elm.variantWith "Preload" [ types.pageId ]

         --  , Elm.variantWith "LoadAt" [ types.routeType, types.regionType ]
         , Elm.variantWith "ViewUpdated" [ types.regionOperation ]
         , Elm.variantWith "Global" [ Type.var "msg" ]
         , Elm.variantWith "Loaded"
            [ types.pageId
            , types.pageLoadResult
            ]
         ]
            ++ pageVariants
        )


viewType =
    Elm.customType "View"
        [ Elm.variantWith "NotFound" []
        , Elm.variantWith "Loading" [ types.pageId ]
        , Elm.variantWith "Error" [ Gen.App.PageError.annotation_.error ]
        , Elm.variantWith "View"
            [ Gen.App.View.annotation_.view (Type.var "appMsg")
            ]
        ]
        |> Elm.exposeWith
            { group = Just "App"
            , exposeConstructor = True
            }


testAlias =
    Elm.alias "Test"
        (Type.record
            [ ( "init"
              , Type.function
                    [ Gen.Json.Encode.annotation_.value
                    , Gen.Url.annotation_.url
                    , Type.unit
                    ]
                    (Type.tuple types.testModel (Gen.App.Effect.annotation_.effect types.msg))
              )
            , ( "view", Type.function [ types.testModel ] (Gen.Browser.annotation_.document types.msg) )
            , ( "update", Type.function [ types.msg, types.testModel ] (Type.tuple types.testModel (Gen.App.Effect.annotation_.effect types.msg)) )
            , ( "onUrlRequest", Type.function [ Gen.Browser.annotation_.urlRequest ] types.msg )
            , ( "onUrlChange", Type.function [ Gen.Url.annotation_.url ] types.msg )
            ]
        )
        |> Elm.exposeWith
            { group = Just "Testing"
            , exposeConstructor = True
            }


{-|

    { init : flags -> Url -> () -> ( model, effect )
    , view : model -> Document msg
    , update : msg -> model -> ( model, effect )
    , onUrlRequest : UrlRequest -> msg
    , onUrlChange : Url -> msg
    }

-}
test getPageInit loadPage =
    Elm.declaration "test"
        (Elm.fn
            ( "config", Just types.frameTest )
            (\config ->
                Elm.record
                    [ ( "init"
                      , Elm.fn3
                            ( "flags", Just Gen.Json.Encode.annotation_.value )
                            ( "url", Just Gen.Url.annotation_.url )
                            ( "key", Just Type.unit )
                            (\flags url key ->
                                init getPageInit loadPage config flags url key
                            )
                      )
                    , ( "view", Elm.apply (Elm.val "view") [ config ] )
                    , ( "update", Elm.apply (Elm.val "update") [ config ] )
                    , ( "onUrlChange"
                      , Elm.fn ( "url", Just Gen.Url.annotation_.url )
                            (\url ->
                                Elm.apply (Elm.val "Global")
                                    [ Elm.apply
                                        (Elm.get "onUrlChange" config)
                                        [ url ]
                                    ]
                            )
                      )
                    , ( "onUrlRequest"
                      , Elm.fn ( "urlRequest", Just Gen.Browser.annotation_.urlRequest )
                            (\urlRequest ->
                                Elm.apply (Elm.val "Global")
                                    [ Elm.apply
                                        (Elm.get "onUrlRequest" config)
                                        [ urlRequest ]
                                    ]
                            )
                      )
                    ]
                    |> Elm.withType (Type.namedWith [] "Test" [ Type.var "model", Type.var "msg" ])
            )
        )
        |> Elm.exposeWith
            { group = Just "Testing"
            , exposeConstructor = True
            }


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
                                    Elm.Let.letIn
                                        (\( newModel, effect ) ->
                                            Elm.tuple newModel
                                                (Press.Model.toCmd config
                                                    (Elm.get "key" newModel)
                                                    (Elm.get "frame" newModel)
                                                    effect
                                                )
                                        )
                                        |> Elm.Let.tuple "newModel"
                                            "effect"
                                            (init getPageInit loadPage config flags url key)
                                        |> Elm.Let.toExpression
                                )
                          )
                        , ( "update"
                          , Elm.fn2
                                ( "msg", Just types.msg )
                                ( "model", Just types.model )
                                (\msg model ->
                                    Elm.Let.letIn
                                        (\( newModel, effect ) ->
                                            Elm.tuple newModel
                                                (Press.Model.toCmd config
                                                    (Elm.get "key" newModel)
                                                    (Elm.get "frame" newModel)
                                                    effect
                                                )
                                        )
                                        |> Elm.Let.tuple "newModel"
                                            "effect"
                                            (Elm.apply (Elm.val "update") [ config, msg, model ])
                                        |> Elm.Let.toExpression
                                )
                          )
                        , ( "view", Elm.apply (Elm.val "view") [ config ] )
                        , ( "subscriptions", Elm.apply (Elm.val "subscriptions") [ config ] )
                        , ( "onUrlChange"
                          , Elm.fn ( "url", Just Gen.Url.annotation_.url )
                                (\url ->
                                    Elm.apply (Elm.val "Global")
                                        [ Elm.apply
                                            (Elm.get "onUrlChange" config)
                                            [ url ]
                                        ]
                                )
                          )
                        , ( "onUrlRequest"
                          , Elm.fn ( "urlRequest", Just Gen.Browser.annotation_.urlRequest )
                                (\urlRequest ->
                                    Elm.apply (Elm.val "Global")
                                        [ Elm.apply
                                            (Elm.get "onUrlRequest" config)
                                            [ urlRequest ]
                                        ]
                                )
                          )
                        ]
                    )
                    |> Elm.withType (Type.namedWith [] "App" [ Type.var "model", Type.var "msg" ])
            )
        )
        |> Elm.exposeWith
            { group = Just "App"
            , exposeConstructor = True
            }


init getPageInit loadPage config flags url key =
    let
        frameInitialized =
            Elm.apply
                (Elm.get "init" config)
                [ flags
                , url
                ]
    in
    Elm.Let.letIn
        (\( frameModel, frameEffect ) ->
            let
                globalFrameEffect =
                    frameEffect
                        |> Gen.App.Effect.call_.map (Elm.val "Global")
            in
            let
                model =
                    Elm.record
                        [ ( "key", key )
                        , ( "url", url )
                        , ( "regions"
                          , Press.Generate.Regions.values.empty
                          )
                        , ( "frame", frameModel )
                        , ( "states"
                          , Gen.App.State.init
                          )
                        ]
                        |> Elm.withType types.model
            in
            Elm.tuple model
                globalFrameEffect
        )
        |> Elm.Let.tuple "frameModel" "frameEffect" frameInitialized
        |> Elm.Let.toExpression


update :
    List PageUsage
    ->
        { a
            | call :
                Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
        }
    ->
        { b
            | call :
                Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
        }
    ->
        { b
            | call :
                Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
        }
    -> Elm.Declaration
update routes getPageInit loadPage preloadPage =
    Elm.declaration "update"
        (Elm.fn3
            ( "config", Just types.frameUpdate )
            ( "msg", Just types.msg )
            ( "model", Just types.model )
            (\config msg model ->
                Elm.Case.custom msg
                    types.msg
                    ([ Elm.Case.branch2 "Loaded"
                        ( "pageId", types.pageId )
                        ( "loaded", types.pageLoadResult )
                        (\pageId initialization ->
                            loadPage.call config model pageId initialization
                        )

                     --
                     , Elm.Case.branch0 "PageCacheCleared"
                        (Elm.tuple
                            (Elm.updateRecord
                                [ ( "states"
                                  , Elm.get "states" model
                                        |> Gen.App.State.drop
                                  )
                                ]
                                model
                            )
                            Gen.App.Effect.none
                        )
                     , Elm.Case.branch1 "Preload"
                        ( "route", types.pageId )
                        (\routeToPreload ->
                            getPageInit.call routeToPreload
                                (Press.Model.toShared config (Elm.get "frame" model))
                                (Elm.get "states" model)
                                |> preloadPage.call config model routeToPreload
                        )
                     , Elm.Case.branch1 "ViewUpdated"
                        ( "operation", types.regionOperation )
                        (\regionOperation ->
                            Elm.Let.letIn
                                (\( newRegions, regionDiff ) ->
                                    Elm.tuple
                                        (Elm.updateRecord
                                            [ ( "regions", newRegions )
                                            ]
                                            model
                                        )
                                        Gen.App.Effect.none
                                )
                                |> Elm.Let.tuple "newRegions"
                                    "regionDiff"
                                    (Press.Generate.Regions.values.update
                                        (Press.Generate.Regions.values.mapOperation
                                            (Elm.val "toPageKey")
                                            regionOperation
                                        )
                                        (Elm.get "regions" model)
                                    )
                                |> Elm.Let.toExpression
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
                    |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
            )
        )


view : List PageUsage -> Elm.Declaration
view routes =
    Elm.declaration "view"
        (Elm.fn2
            ( "config", Just types.frameView )
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
                Elm.Let.letIn frameView
                    |> Elm.Let.value "viewRegions"
                        (Elm.apply
                            -- (Elm.val "renderRegions")
                            (Elm.value
                                { importFrom = [ "App", "View", "Id" ]
                                , name = "mapRegion"
                                , annotation = Nothing
                                }
                            )
                            [ Elm.apply
                                (Elm.val "viewPageModel")
                                [ Press.Model.toShared config (Elm.get "frame" model)
                                , Elm.get "states" model
                                ]
                            , Elm.get "regions" model
                            ]
                        )
                    |> Elm.Let.toExpression
            )
        )


viewPageModel : List PageUsage -> Elm.Declaration
viewPageModel routes =
    Elm.declaration "viewPageModel"
        (Elm.fn4
            ( "shared", Just types.sharedType )
            ( "states", Just types.stateCache )
            ( "regionId", Just types.regionIdType )
            ( "pageId", Just Type.string )
            (\shared states regionId pageId ->
                Elm.Case.maybe (Gen.App.State.call_.get pageId states)
                    { nothing =
                        Elm.val "NotFound"
                    , just =
                        ( "currentState"
                        , \current ->
                            Elm.Case.custom current
                                types.pageModel
                                (Elm.Case.branch1 "PageError_"
                                    ( "pageError", Gen.App.PageError.annotation_.error )
                                    (\err ->
                                        Elm.apply
                                            (Elm.val "Error")
                                            [ err ]
                                    )
                                    :: Elm.Case.branch1 "PageLoading_"
                                        ( "pageid", types.pageId )
                                        (\pageid ->
                                            Elm.apply
                                                (Elm.val "Loading")
                                                [ pageid ]
                                        )
                                    :: List.map (routeToView shared regionId pageId) routes
                                )
                        )
                    }
                    |> Elm.withType (Type.namedWith [] "View" [ appMsg ])
            )
        )


routeToView shared regionId pageId route =
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
                    Elm.Let.letIn
                        (\pageViewResult ->
                            Elm.Case.result pageViewResult
                                { err =
                                    ( "pageError"
                                    , \pageError ->
                                        Elm.apply
                                            (Elm.val "Error")
                                            [ pageError ]
                                    )
                                , ok =
                                    ( "pageViewSuccess"
                                    , \pageViewSuccess ->
                                        Elm.apply (Elm.val "View")
                                            [ Gen.App.View.call_.map
                                                (Elm.fn
                                                    ( "innerMsg", Nothing )
                                                    (\innerMsg ->
                                                        Elm.apply
                                                            (Elm.val pageMsgTypeName)
                                                            [ pageId
                                                            , innerMsg
                                                            ]
                                                    )
                                                )
                                                pageViewSuccess
                                            ]
                                    )
                                }
                        )
                        |> Elm.Let.value "pageViewResult"
                            (Elm.apply pageView
                                [ regionId
                                , shared
                                , pageState
                                ]
                            )
                        |> Elm.Let.toExpression
                )
        )


subscriptions : List PageUsage -> Elm.Declaration
subscriptions routes =
    Elm.declaration "subscriptions"
        (Elm.fn2
            ( "config", Just types.frameSub )
            ( "model", Just types.model )
            (\config model ->
                Gen.Platform.Sub.batch
                    [ Elm.apply
                        (Elm.get "subscriptions" config)
                        [ Elm.get "frame" model ]
                        |> Gen.App.Sub.call_.map (Elm.val "Global")
                        |> toSub config (Elm.get "frame" model)
                    , Elm.apply Press.Generate.Regions.values.toList
                        [ Elm.get "regions" model ]
                        |> Gen.List.call_.filterMap
                            (Elm.fn
                                ( "pageId", Just Type.string )
                                (\pageId ->
                                    Elm.Case.maybe (Gen.App.State.call_.get pageId (Elm.get "states" model))
                                        { nothing = Elm.nothing
                                        , just =
                                            ( "pageState"
                                            , \pageState ->
                                                Elm.just (pageModelToSubscription config model routes pageState pageId)
                                            )
                                        }
                                )
                            )
                        |> Gen.Platform.Sub.call_.batch
                    ]
            )
            |> Elm.withType
                (Type.function
                    [ types.frameSub
                    , types.model
                    ]
                    (Gen.Platform.Sub.annotation_.sub types.msg)
                )
        )


pageModelToSubscription config model routes current pageId =
    Elm.Case.custom current
        types.pageModel
        (Elm.Case.branch1 "PageError_"
            ( "pageError", Gen.App.PageError.annotation_.error )
            (\err -> Gen.Platform.Sub.none)
            :: Elm.Case.branch1 "PageLoading_"
                ( "pageId", types.pageId )
                (\_ -> Gen.Platform.Sub.none)
            :: List.map
                (routeToSubscription config model pageId)
                routes
        )


routeToSubscription config model pageId route =
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
            toSub config (Elm.get "frame" model) <|
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
                            |> Gen.App.Sub.call_.map
                                (Elm.apply (Elm.val pageMsgTypeName)
                                    [ pageId ]
                                )
                    )
        )
