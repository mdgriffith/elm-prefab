module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Declare
import Elm.Let
import Elm.Op
import Gen.App.Effect
import Gen.App.Page
import Gen.App.Page.Error
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
import Options.App
import Press.Generate.Regions
import Press.Model exposing (..)


pageRecordType : Type.Annotation
pageRecordType =
    Type.record
        [ ( "init"
          , Type.function
                [ Type.var "params"
                , Type.var "resources"
                ]
                (Type.tuple (Type.var "model") (Type.var "effect"))
          )
        , ( "update"
          , Type.function
                [ Type.var "resources"
                , Type.var "msg"
                , Type.var "model"
                ]
                (Type.tuple (Type.var "model") (Type.var "effect"))
          )
        , ( "subscriptions"
          , Type.function
                [ Type.var "resources"
                , Type.var "model"
                ]
                (Type.var "subscription")
          )
        , ( "view"
          , Type.function
                [ Type.var "resources"
                , Type.var "model"
                ]
                (Type.var "view")
          )
        ]


generate : List Options.App.Resource -> List Options.App.PageUsage -> Elm.File
generate resources pageUsages =
    let
        loadPage =
            Press.Model.loadPage pageUsages

        getPageInit =
            Press.Model.getPageInit pageUsages
    in
    Elm.file [ "App" ]
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

        -- You're going to be tempted to add aliases for `Page`, `Effect` and `Sub` here
        -- But they won't work because Page's can't import `App.elm`, be cause `App.elm` imports `Page.elm`
        , Elm.alias "CmdOptions" types.cmdOptions
            |> Elm.exposeWith
                { group = Just "App"
                , exposeConstructor = True
                }
        , Elm.alias "SubOptions" types.subOptions
            |> Elm.exposeWith
                { group = Just "App"
                , exposeConstructor = True
                }
        , toEmptyResources resources
        , toPageKey pageUsages
        , toPageGroupKey pageUsages
        , toPageLimit pageUsages
        , app pageUsages getPageInit loadPage
        , testAlias
        , test getPageInit loadPage
        , Elm.alias "Model" types.modelRecord
        , Elm.customType "State"
            (let
                routeVariants =
                    pageUsages
                        |> List.filterMap
                            (\pageInfo ->
                                if pageInfo.elmModuleIsPresent then
                                    Elm.variantWith pageInfo.id
                                        [ Type.named pageInfo.moduleName "Model"
                                        ]
                                        |> Just

                                else
                                    Nothing
                            )
             in
             Elm.variantWith "PageError_" [ Gen.App.Page.Error.annotation_.error ]
                :: Elm.variantWith "PageLoading_" [ types.pageId ]
                :: routeVariants
            )
        , viewType
        , viewPageModel pageUsages
        , msgType pageUsages
        , update pageUsages getPageInit loadPage
        , updateResources resources pageUsages
        , getPageInit.declaration
        , loadPage.declaration
        , view pageUsages
        , getSubscriptions pageUsages
        , subscriptions pageUsages
        ]


updateResources : List Options.App.Resource -> List Options.App.PageUsage -> Elm.Declaration
updateResources resources pages =
    Elm.declaration "updateResource"
        (Elm.fn3
            ( "config", Just types.frameSub )
            ( "outerResourceMsg", Just resourceMsgType )
            ( "model", Just types.model )
            (\config outerResourceMsg model ->
                if List.isEmpty resources then
                    Elm.tuple model
                        (Elm.value
                            { importFrom = [ "App", "Effect" ]
                            , name = "none"
                            , annotation = Just (Gen.App.Effect.annotation_.effect types.msg)
                            }
                        )

                else
                    Elm.Case.custom outerResourceMsg
                        resourceMsgType
                        (resources
                            |> List.map
                                (\resource ->
                                    Elm.Case.branch1 ("To" ++ resource.id)
                                        ( "resourceMsg", Type.named [ "Resource", resource.id ] "Msg" )
                                        (\resourceMsg ->
                                            let
                                                resourceUpdate =
                                                    Elm.apply
                                                        (Elm.value
                                                            { importFrom = [ "Resource", resource.id ]
                                                            , name = "resource"
                                                            , annotation = Nothing
                                                            }
                                                            |> Elm.get "update"
                                                        )
                                                        [ resourceMsg
                                                        , model
                                                            |> Elm.get "resources"
                                                            |> Elm.get resource.id
                                                        ]
                                            in
                                            Elm.Let.letIn
                                                (\newResourceModel allSubs ->
                                                    let
                                                        listeners =
                                                            Elm.apply
                                                                toResourceListeners
                                                                [ outerResourceMsg
                                                                , allSubs
                                                                ]
                                                                |> Gen.List.call_.map
                                                                    (Elm.value
                                                                        { importFrom = [ "App", "Effect" ]
                                                                        , name = "sendMsg"
                                                                        , annotation = Nothing
                                                                        }
                                                                    )
                                                                |> Gen.App.Effect.call_.batch
                                                    in
                                                    Elm.tuple
                                                        (model
                                                            |> Elm.updateRecord
                                                                [ ( "resources"
                                                                  , Elm.updateRecord
                                                                        [ ( resource.id
                                                                          , newResourceModel
                                                                          )
                                                                        ]
                                                                        (Elm.get "resources" model)
                                                                  )
                                                                ]
                                                        )
                                                        listeners
                                                )
                                                |> Elm.Let.value "newResourceModel" resourceUpdate
                                                |> Elm.Let.value "allSubs"
                                                    (Elm.apply
                                                        (Elm.val "getSubscriptions")
                                                        [ config
                                                        , model
                                                        ]
                                                    )
                                                |> Elm.Let.toExpression
                                        )
                                )
                        )
                        |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
            )
        )


toEmptyResources : List Options.App.Resource -> Elm.Declaration
toEmptyResources resources =
    Elm.declaration "initResources"
        (Elm.fn
            ( "flags", Just Gen.Json.Encode.annotation_.value )
            (\flags ->
                Elm.record
                    (resources
                        |> List.map
                            (\resource ->
                                ( resource.id
                                , Elm.apply
                                    (Elm.value
                                        { importFrom = [ "Resource", resource.id ]
                                        , name = "resource"
                                        , annotation = Nothing
                                        }
                                        |> Elm.get "init"
                                    )
                                    [ flags ]
                                )
                            )
                    )
                    |> Elm.withType resourcesType
            )
        )


toPageGroupKey : List Options.App.PageUsage -> Elm.Declaration
toPageGroupKey pages =
    .declaration <|
        Elm.Declare.fn "toPageGroupKey"
            ( "pageId", Just types.pageId )
            (\pageId ->
                Elm.Case.custom pageId
                    types.pageId
                    (pages
                        |> List.map
                            (\pageInfo ->
                                let
                                    toBranch fn =
                                        case pageInfo.paramType of
                                            Nothing ->
                                                Elm.Case.branch0 pageInfo.id (fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch1 pageInfo.id
                                                    ( "params", Type.unit )
                                                    (\params ->
                                                        fn params
                                                    )
                                in
                                toBranch
                                    (\params ->
                                        Elm.string pageInfo.id
                                    )
                            )
                    )
                    |> Elm.withType Type.string
            )


toPageLimit : List Options.App.PageUsage -> Elm.Declaration
toPageLimit pages =
    .declaration <|
        Elm.Declare.fn "toPageLimit"
            ( "pageId", Just types.pageId )
            (\pageId ->
                Elm.Case.custom pageId
                    types.pageId
                    (pages
                        |> List.map
                            (\pageInfo ->
                                let
                                    toBranch fn =
                                        case pageInfo.paramType of
                                            Nothing ->
                                                Elm.Case.branch0 pageInfo.id (fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch1 pageInfo.id
                                                    ( "params", Type.unit )
                                                    (\params ->
                                                        fn params
                                                    )
                                in
                                if pageInfo.elmModuleIsPresent then
                                    let
                                        pageConfig =
                                            Elm.value
                                                { importFrom = pageInfo.moduleName
                                                , name = "page"
                                                , annotation = Nothing
                                                }
                                    in
                                    toBranch
                                        (\_ ->
                                            Elm.apply
                                                Gen.App.Page.values_.toInternalDetails
                                                [ pageConfig ]
                                                |> Elm.Op.pipe (Elm.val ".pageCacheLimit")
                                        )

                                else
                                    toBranch
                                        (\params ->
                                            Elm.int 1
                                        )
                            )
                    )
                    |> Elm.withType Type.int
            )


toPageKey : List Options.App.PageUsage -> Elm.Declaration
toPageKey pages =
    .declaration <|
        Elm.Declare.fn "toPageKey"
            ( "pageId", Just types.pageId )
            (\pageId ->
                Elm.Case.custom pageId
                    types.pageId
                    (pages
                        |> List.map
                            (\pageInfo ->
                                let
                                    toBranch fn =
                                        case pageInfo.paramType of
                                            Nothing ->
                                                Elm.Case.branch0 pageInfo.id (fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch1 pageInfo.id
                                                    ( "params", Type.unit )
                                                    (\params ->
                                                        fn params
                                                    )
                                in
                                if pageInfo.elmModuleIsPresent then
                                    let
                                        pageModule =
                                            pageInfo.moduleName

                                        pageMsgTypeName =
                                            types.toPageMsg pageInfo.id

                                        pageConfig =
                                            Elm.value
                                                { importFrom = pageModule
                                                , name = "page"
                                                , annotation = Nothing
                                                }
                                    in
                                    toBranch
                                        (\params ->
                                            Elm.Let.letIn
                                                (\pageDetails ->
                                                    Elm.Case.maybe (Elm.get "toKey" pageDetails)
                                                        { nothing = Elm.string pageInfo.id
                                                        , just =
                                                            ( "toKey"
                                                            , \toKey ->
                                                                Elm.Op.append
                                                                    (Elm.string pageInfo.id)
                                                                    (Elm.apply toKey [ params ])
                                                            )
                                                        }
                                                )
                                                |> Elm.Let.value "pageDetails"
                                                    (Elm.apply
                                                        Gen.App.Page.values_.toInternalDetails
                                                        [ pageConfig ]
                                                    )
                                                |> Elm.Let.toExpression
                                        )

                                else
                                    toBranch
                                        (\params ->
                                            Elm.string pageInfo.id
                                        )
                            )
                    )
                    |> Elm.withType Type.string
            )


msgType : List Options.App.PageUsage -> Elm.Declaration
msgType pageUsages =
    let
        pageVariants =
            pageUsages
                |> List.filterMap
                    (\pageInfo ->
                        if pageInfo.elmModuleIsPresent then
                            Just
                                (Elm.variantWith
                                    (types.toPageMsg pageInfo.id)
                                    [ types.pageId
                                    , Type.named pageInfo.moduleName "Msg"
                                    ]
                                )

                        else
                            Nothing
                    )
    in
    Elm.customType "Msg"
        ([ Elm.variant "PageCacheCleared"
         , Elm.variantWith "Preload" [ types.pageId ]
         , Elm.variantWith "ViewUpdated" [ types.regionOperation ]
         , Elm.variantWith "SubscriptionEventIgnored" [ Type.string ]
         , Elm.variantWith "Resource" [ resourceMsgType ]
         , Elm.variantWith "Global" [ Type.var "msg" ]
         , Elm.variantWith "Loaded"
            [ types.pageId
            , types.pageLoadResult
            ]
         ]
            ++ pageVariants
        )
        |> Elm.expose


viewType =
    Elm.customType "View"
        [ Elm.variantWith "NotFound" []
        , Elm.variantWith "Loading" [ types.pageId ]
        , Elm.variantWith "Error" [ Gen.App.Page.Error.annotation_.error ]
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
                                                    (Elm.get "resources" newModel)
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
                                                (Press.Model.toCmd
                                                    config
                                                    (Elm.get "resources" newModel)
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


initResources : Elm.Expression -> Elm.Expression
initResources flags =
    Elm.apply
        (Elm.value
            { importFrom = []
            , name = "initResources"
            , annotation = Just resourcesType
            }
        )
        [ flags ]


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
                        , ( "views"
                          , Press.Generate.Regions.values.empty
                          )
                        , ( "frame", frameModel )
                        , ( "resources", initResources flags )
                        , ( "limits", Gen.App.State.initLimit )
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
    List Options.App.PageUsage
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
            , value : List String -> Elm.Expression
        }
    -> Elm.Declaration
update routes getPageInit loadPage =
    Elm.declaration "update"
        (Elm.fn3
            ( "config", Just types.frameUpdate )
            ( "msg", Just types.msg )
            ( "model", Just types.model )
            (\config msg model ->
                Elm.Case.custom msg
                    types.msg
                    ([ Elm.Case.branch0 "PageCacheCleared"
                        (Elm.tuple
                            model
                            Gen.App.Effect.none
                        )
                     , Elm.Case.branch1 "Preload"
                        ( "pageId", types.pageId )
                        (\pageId ->
                            let
                                pageInit =
                                    getPageInit.call pageId
                                        (Elm.get "resources" model)
                                        (Elm.get "states" model)
                            in
                            pageInit
                                |> Elm.Op.pipe (Elm.apply (loadPage.value []) [ config, model, pageId ])
                        )
                     , Elm.Case.branch2 "Loaded"
                        ( "pageId", types.pageId )
                        ( "initialization", types.pageLoadResult )
                        (\pageId initialization ->
                            loadPage.call config model pageId initialization
                        )
                     , Elm.Case.branch1 "ViewUpdated"
                        ( "operation", types.regionOperation )
                        (\regionOperation ->
                            Elm.Let.letIn
                                (\( newRegions, regionDiff ) ->
                                    Elm.get "added" regionDiff
                                        |> Gen.List.call_.foldl
                                            (Elm.fn2
                                                ( "pageId", Nothing )
                                                ( "inner", Nothing )
                                                (\pageId existingTuple ->
                                                    Elm.Let.letIn
                                                        (\( innerModel, innerEffect ) ->
                                                            let
                                                                pageInit =
                                                                    getPageInit.call pageId
                                                                        (Elm.get "resources" innerModel)
                                                                        (Elm.get "states" innerModel)

                                                                preloadedTuple =
                                                                    -- loadPage.call config innerModel pageId pageInit
                                                                    pageInit
                                                                        |> Elm.Op.pipe (Elm.apply (loadPage.value []) [ config, innerModel, pageId ])
                                                            in
                                                            Elm.Let.letIn
                                                                (\( preloadedModel, preloadedEffect ) ->
                                                                    Elm.tuple preloadedModel
                                                                        (Gen.App.Effect.batch
                                                                            [ innerEffect
                                                                            , preloadedEffect
                                                                            ]
                                                                        )
                                                                )
                                                                |> Elm.Let.tuple "preloadedModel" "preloadedEffect" preloadedTuple
                                                                |> Elm.Let.toExpression
                                                        )
                                                        |> Elm.Let.tuple "innerModel" "innerEffect" existingTuple
                                                        |> Elm.Let.toExpression
                                                )
                                            )
                                            (Elm.tuple
                                                (Elm.updateRecord
                                                    [ ( "views", newRegions )
                                                    ]
                                                    model
                                                )
                                                Gen.App.Effect.none
                                            )
                                )
                                |> Elm.Let.tuple "newRegions"
                                    "regionDiff"
                                    (Press.Generate.Regions.values.update
                                        regionOperation
                                        (Elm.get "views" model)
                                    )
                                |> Elm.Let.toExpression
                        )
                     , Elm.Case.branch1 "SubscriptionEventIgnored"
                        ( "msg", types.pageId )
                        (\_ ->
                            Elm.tuple
                                model
                                Gen.App.Effect.none
                        )
                     , Elm.Case.branch1 "Global"
                        ( "appMsg", Type.var "appMsg" )
                        (\appMsg ->
                            let
                                updatedFrame =
                                    Elm.apply (Elm.get "update" config)
                                        [ Elm.get "resources" model
                                        , appMsg
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
                     , Elm.Case.branch1 "Resource"
                        ( "resourceMsg", Type.var "resourceMsg" )
                        (\resourceMsg ->
                            Elm.apply (Elm.val "updateResource") [ config, resourceMsg, model ]
                        )
                     ]
                        ++ Press.Model.updatePageBranches routes
                            config
                            (Elm.get "resources" model)
                            model
                    )
                    |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
            )
        )


view : List Options.App.PageUsage -> Elm.Declaration
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
                            [ Elm.get "resources" model
                            , Elm.val "Global"
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
                                [ Elm.get "resources" model
                                , Elm.get "states" model
                                ]
                            , Elm.get "views" model
                            ]
                        )
                    |> Elm.Let.toExpression
            )
        )


viewPageModel : List Options.App.PageUsage -> Elm.Declaration
viewPageModel pages =
    Elm.declaration "viewPageModel"
        (Elm.fn4
            ( "resources", Just resourcesType )
            ( "states", Just types.stateCache )
            ( "regionId", Just types.regionIdType )
            ( "pageId", Just types.pageId )
            (\resources states regionId pageId ->
                let
                    pageKey =
                        Elm.apply (Elm.val "toPageKey") [ pageId ]
                in
                Elm.Case.maybe (Gen.App.State.call_.get pageKey states)
                    { nothing =
                        Elm.val "NotFound"
                    , just =
                        ( "currentState"
                        , \current ->
                            Elm.Case.custom current
                                types.pageModel
                                (Elm.Case.branch1 "PageError_"
                                    ( "pageError", Gen.App.Page.Error.annotation_.error )
                                    (\err ->
                                        Elm.apply
                                            (Elm.val "Error")
                                            [ err ]
                                    )
                                    :: Elm.Case.branch1 "PageLoading_"
                                        ( "loadingPageId", types.pageId )
                                        (\loadingPageId ->
                                            Elm.apply
                                                (Elm.val "Loading")
                                                [ loadingPageId ]
                                        )
                                    :: List.filterMap (routeToView resources regionId pageId) pages
                                )
                        )
                    }
                    |> Elm.withType (Type.namedWith [] "View" [ appMsg ])
            )
        )


routeToView resources regionId pageId pageInfo =
    if pageInfo.elmModuleIsPresent then
        let
            stateKey =
                pageInfo.id

            pageModule =
                pageInfo.moduleName

            pageMsgTypeName =
                types.toPageMsg pageInfo.id
        in
        Just <|
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
                                        , resources
                                        , pageState
                                        ]
                                    )
                                |> Elm.Let.toExpression
                        )
                )

    else
        Nothing


getSubscriptions : List Options.App.PageUsage -> Elm.Declaration
getSubscriptions pages =
    Elm.declaration "getSubscriptions"
        (Elm.fn2
            ( "config", Just types.frameSub )
            ( "model", Just types.model )
            (\config model ->
                Gen.App.Sub.batch
                    [ Elm.apply
                        (Elm.get "subscriptions" config)
                        [ Elm.get "resources" model
                        , Elm.get "frame" model
                        ]
                        |> Gen.App.Sub.call_.map (Elm.val "Global")
                    , Elm.apply Press.Generate.Regions.values.toList
                        [ Elm.get "views" model ]
                        |> Gen.List.call_.filterMap
                            (Elm.fn
                                ( "pageId", Just Type.string )
                                (\pageId ->
                                    let
                                        pageKey =
                                            Elm.apply (Elm.val "toPageKey") [ pageId ]
                                    in
                                    Elm.Case.maybe (Gen.App.State.call_.get pageKey (Elm.get "states" model))
                                        { nothing = Elm.nothing
                                        , just =
                                            ( "pageState"
                                            , \pageState ->
                                                Elm.just (pageModelToSubscription config model pages pageState pageId)
                                            )
                                        }
                                )
                            )
                        |> Gen.App.Sub.call_.batch
                    ]
            )
            |> Elm.withType
                (Type.function
                    [ types.frameSub
                    , types.model
                    ]
                    (Gen.App.Sub.annotation_.sub types.msg)
                )
        )


subscriptions : List Options.App.PageUsage -> Elm.Declaration
subscriptions pages =
    Elm.declaration "subscriptions"
        (Elm.fn2
            ( "config", Just types.frameSub )
            ( "model", Just types.model )
            (\config model ->
                toSub config (Elm.get "resources" model) (Elm.get "frame" model) <|
                    Elm.apply
                        (Elm.val "getSubscriptions")
                        [ config
                        , model
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


pageModelToSubscription :
    Elm.Expression
    -> Elm.Expression
    -> List Options.App.PageUsage
    -> Elm.Expression
    -> Elm.Expression
    -> Elm.Expression
pageModelToSubscription config model pages current pageId =
    Elm.Case.custom current
        types.pageModel
        (Elm.Case.branch1 "PageError_"
            ( "pageError", Gen.App.Page.Error.annotation_.error )
            (\err -> Gen.App.Sub.none)
            :: Elm.Case.branch1 "PageLoading_"
                ( "pageId", types.pageId )
                (\_ -> Gen.App.Sub.none)
            :: List.filterMap
                (pageInfoToSubscriptioon config model pageId)
                pages
        )


pageInfoToSubscriptioon :
    Elm.Expression
    -> Elm.Expression
    -> Elm.Expression
    -> Options.App.PageUsage
    -> Maybe Elm.Case.Branch
pageInfoToSubscriptioon config model pageId pageInfo =
    if pageInfo.elmModuleIsPresent then
        let
            stateKey =
                pageInfo.id

            pageModule =
                pageInfo.moduleName

            pageMsgTypeName =
                types.toPageMsg pageInfo.id
        in
        Just <|
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
                        (\pageSubs ->
                            Elm.apply pageSubs
                                [ Elm.get "resources" model
                                , pageState
                                ]
                                |> Gen.App.Sub.call_.map
                                    (Elm.apply (Elm.val pageMsgTypeName)
                                        [ pageId ]
                                    )
                        )
                )

    else
        Nothing
