module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Arg
import Elm.Case
import Elm.Declare
import Elm.Let
import Elm.Op
import Gen.App.Page
import Gen.App.Page.Error
import Gen.App.State
import Gen.App.Sub
import Gen.App.View
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Json.Decode
import Gen.Json.Encode
import Gen.List
import Gen.Platform.Sub
import Gen.Result
import Gen.Tuple
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
generate resources allPageDefinitions =
    let
        pageUsages =
            List.filter (\pageInfo -> not pageInfo.urlOnly) allPageDefinitions

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
            |> Elm.exposeConstructor

        -- You're going to be tempted to add aliases for `Page`, `Effect` and `Sub` here
        -- But they won't work because Page's can't import `App.elm`, be cause `App.elm` imports `Page.elm`
        , Elm.alias "CmdOptions" types.cmdOptions
            |> Elm.exposeConstructor
        , Elm.alias "SubOptions" types.subOptions
            |> Elm.exposeConstructor
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
        , msgType resources pageUsages
        , update resources pageUsages getPageInit loadPage
        , syncResourcesToLocalStorage resources
        , getPageInit.declaration
        , loadPage.declaration
        , view pageUsages
        , getSubscriptions pageUsages
        , subscriptions pageUsages
        ]


syncResourcesToLocalStorage : List Options.App.Resource -> Elm.Declaration
syncResourcesToLocalStorage resources =
    Elm.declaration "syncResourcesToLocalStorage"
        (Elm.fn
            (Elm.Arg.varWith "resources" resourcesType)
            (\resourcesState ->
                if List.isEmpty resources then
                    noneEffect

                else
                    resources
                        |> List.map
                            (\resource ->
                                Elm.Case.maybe (resourceValue resource.id "codec")
                                    { nothing = noneEffect
                                    , just =
                                        ( "codec"
                                        , \codec ->
                                            Elm.apply
                                                (Elm.value
                                                    { importFrom = [ "Effect", "LocalStorage" ]
                                                    , name = "save"
                                                    , annotation = Just (types.effectWith types.msg)
                                                    }
                                                )
                                                [ Elm.string resource.id
                                                , Elm.apply
                                                    (Elm.get "encode" codec)
                                                    [ Elm.get resource.id resourcesState
                                                    ]
                                                ]
                                        )
                                    }
                            )
                        |> effectBatch
                        |> Elm.withType (types.effectWith types.msg)
            )
        )


resourceValue resourceId name =
    Elm.value
        { importFrom = [ "Resource", resourceId ]
        , name = "resource"
        , annotation = Nothing
        }
        |> Elm.get name


toEmptyResources : List Options.App.Resource -> Elm.Declaration
toEmptyResources resources =
    Elm.declaration "initResources"
        (Elm.fn2
            (Elm.Arg.varWith "flags" Gen.Json.Encode.annotation_.value)
            (Elm.Arg.varWith "url" Gen.Url.annotation_.url)
            (\flags url ->
                Elm.Let.letIn
                    (\stateAndEffectRecord ->
                        let
                            stateRecord =
                                resources
                                    |> List.map
                                        (\resource ->
                                            ( resource.id
                                            , Gen.Tuple.first (Elm.get resource.id stateAndEffectRecord)
                                            )
                                        )
                                    |> Elm.record

                            finalEffects =
                                resources
                                    |> List.map
                                        (\resource ->
                                            Gen.Tuple.second (Elm.get resource.id stateAndEffectRecord)
                                                |> effectMap (Elm.val ("Resource" ++ resource.id))
                                        )
                                    |> effectBatch
                        in
                        Elm.tuple stateRecord finalEffects
                            |> Elm.withType
                                (Type.tuple
                                    resourcesType
                                    (effectWith types.msg)
                                )
                    )
                    |> Elm.Let.value "updatedResources"
                        (resources
                            |> List.map
                                (\resource ->
                                    let
                                        cachedModel =
                                            Elm.Case.maybe (resourceValue resource.id "codec")
                                                { nothing = Elm.nothing
                                                , just =
                                                    ( "codec"
                                                    , \codec ->
                                                        let
                                                            decoder =
                                                                Gen.Json.Decode.field "localStorage"
                                                                    (Gen.Json.Decode.field resource.id (Elm.get "decoder" codec))
                                                        in
                                                        Gen.Result.toMaybe (Gen.Json.Decode.decodeValue decoder flags)
                                                    )
                                                }

                                        updatedResourcePair =
                                            Elm.apply
                                                (Elm.value
                                                    { importFrom = [ "Resource", resource.id ]
                                                    , name = "resource"
                                                    , annotation = Nothing
                                                    }
                                                    |> Elm.get "init"
                                                )
                                                [ flags
                                                , url
                                                , cachedModel
                                                ]
                                    in
                                    ( resource.id
                                    , updatedResourcePair
                                    )
                                )
                            |> Elm.record
                        )
                    |> Elm.Let.toExpression
            )
        )


toPageGroupKey : List Options.App.PageUsage -> Elm.Declaration
toPageGroupKey pages =
    .declaration <|
        Elm.Declare.fn "toPageGroupKey"
            (Elm.Arg.varWith "pageId" types.pageId)
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
                                                Elm.Case.branch (Elm.Arg.customType pageInfo.id ()) (\_ -> fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch
                                                    (Elm.Arg.customType pageInfo.id identity
                                                        |> Elm.Arg.item (Elm.Arg.varWith "params" Type.unit)
                                                    )
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
            (Elm.Arg.varWith "pageId" types.pageId)
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
                                                Elm.Case.branch (Elm.Arg.customType pageInfo.id ())
                                                    (\_ -> fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch
                                                    (Elm.Arg.customType pageInfo.id identity
                                                        |> Elm.Arg.item (Elm.Arg.varWith "params" Type.unit)
                                                    )
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
            (Elm.Arg.varWith "pageId" types.pageId)
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
                                                Elm.Case.branch (Elm.Arg.customType pageInfo.id ())
                                                    (\_ -> fn (Elm.record []))

                                            Just paramType ->
                                                Elm.Case.branch
                                                    (Elm.Arg.customType pageInfo.id identity
                                                        |> Elm.Arg.item (Elm.Arg.varWith "params" Type.unit)
                                                    )
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


msgType : List Options.App.Resource -> List Options.App.PageUsage -> Elm.Declaration
msgType resources pageUsages =
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

        resourceVariants =
            resources
                |> List.map
                    (\resource ->
                        Elm.variantWith ("Resource" ++ resource.id)
                            [ Type.named [ "Resource", resource.id ] "Msg" ]
                    )
    in
    Elm.customType "Msg"
        ([ Elm.variant "PageCacheCleared"
         , Elm.variantWith "Preload" [ types.pageId ]
         , Elm.variantWith "ViewUpdated" [ types.regionOperation ]
         , Elm.variantWith "SubscriptionEventIgnored" [ Type.string ]
         , Elm.variantWith "Global" [ Type.var "msg" ]
         , Elm.variantWith "Loaded"
            [ types.pageId
            , types.pageLoadResult
            ]
         ]
            ++ resourceVariants
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
        |> Elm.exposeConstructor


testAlias =
    Elm.alias "Test"
        (Type.record
            [ ( "init"
              , Type.function
                    [ Gen.Json.Encode.annotation_.value
                    , Gen.Url.annotation_.url
                    , Type.unit
                    ]
                    (Type.tuple types.testModel (types.effectWith types.msg))
              )
            , ( "view", Type.function [ types.testModel ] (Gen.Browser.annotation_.document types.msg) )
            , ( "update", Type.function [ types.msg, types.testModel ] (Type.tuple types.testModel (types.effectWith types.msg)) )
            , ( "onUrlRequest", Type.function [ Gen.Browser.annotation_.urlRequest ] types.msg )
            , ( "onUrlChange", Type.function [ Gen.Url.annotation_.url ] types.msg )
            ]
        )
        |> Elm.exposeConstructor


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
            (Elm.Arg.varWith "config" types.frameTest)
            (\config ->
                Elm.record
                    [ ( "init"
                      , Elm.fn3
                            (Elm.Arg.varWith "flags" Gen.Json.Encode.annotation_.value)
                            (Elm.Arg.varWith "url" Gen.Url.annotation_.url)
                            (Elm.Arg.varWith "key" Type.unit)
                            (\flags url key ->
                                init getPageInit loadPage config flags url key
                            )
                      )
                    , ( "view", Elm.apply (Elm.val "view") [ config ] )
                    , ( "update", Elm.apply (Elm.val "update") [ config ] )
                    , ( "onUrlChange"
                      , Elm.fn (Elm.Arg.varWith "url" Gen.Url.annotation_.url)
                            (\url ->
                                Elm.apply (Elm.val "Global")
                                    [ Elm.apply
                                        (Elm.get "onUrlChange" config)
                                        [ url ]
                                    ]
                            )
                      )
                    , ( "onUrlRequest"
                      , Elm.fn (Elm.Arg.varWith "urlRequest" Gen.Browser.annotation_.urlRequest)
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
        |> Elm.exposeConstructor


app routes getPageInit loadPage =
    Elm.declaration "app"
        (Elm.fn
            (Elm.Arg.varWith
                "config"
                types.frame
            )
            (\config ->
                Gen.Browser.call_.application
                    (Elm.record
                        [ ( "init"
                          , Elm.fn3
                                (Elm.Arg.varWith "flags" Gen.Json.Encode.annotation_.value)
                                (Elm.Arg.varWith "url" Gen.Url.annotation_.url)
                                (Elm.Arg.varWith "key" Gen.Browser.Navigation.annotation_.key)
                                (\flags url key ->
                                    Elm.Let.letIn
                                        (\( newModel, effect ) ->
                                            Elm.tuple newModel
                                                (Press.Model.toCmd config
                                                    (Elm.get "resources" newModel)
                                                    (Elm.get "key" newModel)
                                                    (Elm.get "app" newModel)
                                                    effect
                                                )
                                        )
                                        |> Elm.Let.unpack
                                            (Elm.Arg.tuple
                                                (Elm.Arg.var "newModel")
                                                (Elm.Arg.var "effect")
                                            )
                                            (init getPageInit loadPage config flags url key)
                                        |> Elm.Let.toExpression
                                )
                          )
                        , ( "update"
                          , Elm.fn2
                                (Elm.Arg.varWith "msg" types.msg)
                                (Elm.Arg.varWith "model" types.model)
                                (\msg model ->
                                    Elm.Let.letIn
                                        (\( newModel, effect ) ->
                                            Elm.tuple newModel
                                                (Press.Model.toCmd
                                                    config
                                                    (Elm.get "resources" newModel)
                                                    (Elm.get "key" newModel)
                                                    (Elm.get "app" newModel)
                                                    effect
                                                )
                                        )
                                        |> Elm.Let.unpack
                                            (Elm.Arg.tuple
                                                (Elm.Arg.var "newModel")
                                                (Elm.Arg.var "effect")
                                            )
                                            (Elm.apply (Elm.val "update") [ config, msg, model ])
                                        |> Elm.Let.toExpression
                                )
                          )
                        , ( "view", Elm.apply (Elm.val "view") [ config ] )
                        , ( "subscriptions", Elm.apply (Elm.val "subscriptions") [ config ] )
                        , ( "onUrlChange"
                          , Elm.fn (Elm.Arg.varWith "url" Gen.Url.annotation_.url)
                                (\url ->
                                    Elm.apply (Elm.val "Global")
                                        [ Elm.apply
                                            (Elm.get "onUrlChange" config)
                                            [ url ]
                                        ]
                                )
                          )
                        , ( "onUrlRequest"
                          , Elm.fn (Elm.Arg.varWith "urlRequest" Gen.Browser.annotation_.urlRequest)
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
        |> Elm.exposeConstructor


initResources : Elm.Expression -> Elm.Expression -> Elm.Expression
initResources flags url =
    Elm.apply
        (Elm.value
            { importFrom = []
            , name = "initResources"
            , annotation =
                Just
                    (Type.tuple
                        resourcesType
                        (Type.namedWith [ "App", "Effect" ] "Effect" [ types.msg ])
                    )
            }
        )
        [ flags, url ]


init getPageInit loadPage config flags url key =
    Elm.Let.letIn
        (\( resources, resourceEffects ) ->
            let
                frameInitialized =
                    Elm.apply
                        (Elm.get "init" config)
                        [ resources
                        , flags
                        , url
                        ]
            in
            Elm.Let.letIn
                (\( frameModel, frameEffect ) ->
                    let
                        globalFrameEffect =
                            frameEffect
                                |> effectMap (Elm.val "Global")

                        model =
                            Elm.record
                                [ ( "key", key )
                                , ( "views"
                                  , Press.Generate.Regions.values.empty
                                  )
                                , ( "app", frameModel )
                                , ( "resources", resources )
                                , ( "limits", Gen.App.State.initLimit )
                                , ( "states"
                                  , Gen.App.State.init
                                  )
                                ]
                                |> Elm.withType types.model
                    in
                    Elm.tuple model
                        (effectBatch
                            [ globalFrameEffect
                            , resourceEffects
                            , Elm.apply (Elm.val "syncResourcesToLocalStorage")
                                [ resources
                                ]
                            ]
                        )
                )
                |> Elm.Let.unpack
                    (Elm.Arg.tuple
                        (Elm.Arg.var "appModel")
                        (Elm.Arg.var "appEffect")
                    )
                    frameInitialized
                |> Elm.Let.toExpression
        )
        |> Elm.Let.unpack
            (Elm.Arg.tuple
                (Elm.Arg.var "resources")
                (Elm.Arg.var "resourceEffects")
            )
            (initResources flags url)
        |> Elm.Let.toExpression


update :
    List Options.App.Resource
    -> List Options.App.PageUsage
    ->
        { a
            | call :
                Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
                -> Elm.Expression
        }
    ->
        Elm.Declare.Function
            (Elm.Expression
             -> Elm.Expression
             -> Elm.Expression
             -> Elm.Expression
             -> Elm.Expression
            )
    -> Elm.Declaration
update resources routes getPageInit loadPage =
    Elm.declaration "update"
        (Elm.fn3
            (Elm.Arg.varWith "config" types.frameUpdate)
            (Elm.Arg.varWith "msg" types.msg)
            (Elm.Arg.varWith "model" types.model)
            (\config msg model ->
                Elm.Case.custom msg
                    types.msg
                    ([ Elm.Case.branch (Elm.Arg.customType "PageCacheCleared" ())
                        (\_ ->
                            Elm.tuple
                                model
                                effectNone
                        )
                     , Elm.Case.branch
                        (Elm.Arg.customType "Preload" identity
                            |> Elm.Arg.item (Elm.Arg.varWith "pageId" types.pageId)
                        )
                        (\pageId ->
                            let
                                pageInit =
                                    getPageInit.call pageId
                                        (Elm.get "resources" model)
                                        (Elm.get "states" model)
                            in
                            pageInit
                                |> Elm.Op.pipe (Elm.apply loadPage.value [ config, model, pageId ])
                        )
                     , Elm.Case.branch
                        (Elm.Arg.customType "Loaded" Tuple.pair
                            |> Elm.Arg.item (Elm.Arg.varWith "pageId" types.pageId)
                            |> Elm.Arg.item (Elm.Arg.varWith "initialization" types.pageLoadResult)
                        )
                        (\( pageId, initialization ) ->
                            loadPage.call config model pageId initialization
                        )
                     , Elm.Case.branch
                        (Elm.Arg.customType "ViewUpdated" identity
                            |> Elm.Arg.item (Elm.Arg.varWith "operation" types.regionOperation)
                        )
                        (\regionOperation ->
                            Elm.Let.letIn
                                (\( newRegions, regionDiff ) ->
                                    Elm.get "added" regionDiff
                                        |> Gen.List.call_.foldl
                                            (Elm.fn2
                                                (Elm.Arg.var "pageId")
                                                (Elm.Arg.var "inner")
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
                                                                        |> Elm.Op.pipe (Elm.apply loadPage.value [ config, innerModel, pageId ])
                                                            in
                                                            Elm.Let.letIn
                                                                (\( preloadedModel, preloadedEffect ) ->
                                                                    Elm.tuple preloadedModel
                                                                        (effectBatch
                                                                            [ innerEffect
                                                                            , preloadedEffect
                                                                            ]
                                                                        )
                                                                )
                                                                |> Elm.Let.unpack
                                                                    (Elm.Arg.tuple
                                                                        (Elm.Arg.var "preloadedModel")
                                                                        (Elm.Arg.var "preloadedEffect")
                                                                    )
                                                                    preloadedTuple
                                                                |> Elm.Let.toExpression
                                                        )
                                                        |> Elm.Let.unpack
                                                            (Elm.Arg.tuple
                                                                (Elm.Arg.var "innerModel")
                                                                (Elm.Arg.var "innerEffect")
                                                            )
                                                            existingTuple
                                                        |> Elm.Let.toExpression
                                                )
                                            )
                                            (Elm.tuple
                                                (Elm.updateRecord
                                                    [ ( "views", newRegions )
                                                    ]
                                                    model
                                                )
                                                effectNone
                                            )
                                )
                                |> Elm.Let.unpack
                                    (Elm.Arg.tuple
                                        (Elm.Arg.var "newRegions")
                                        (Elm.Arg.var "regionDiff")
                                    )
                                    (Press.Generate.Regions.values.update
                                        regionOperation
                                        (Elm.get "views" model)
                                    )
                                |> Elm.Let.toExpression
                        )
                     , Elm.Case.branch
                        (Elm.Arg.customType "SubscriptionEventIgnored" identity
                            |> Elm.Arg.item (Elm.Arg.varWith "msg" types.pageId)
                        )
                        (\_ ->
                            Elm.tuple
                                model
                                effectNone
                        )
                     , Elm.Case.branch
                        (Elm.Arg.customType "Global" identity
                            |> Elm.Arg.item (Elm.Arg.varWith "appMsg" (Type.var "appMsg"))
                        )
                        (\appMsg ->
                            let
                                updatedFrame =
                                    Elm.apply (Elm.get "update" config)
                                        [ Elm.get "resources" model
                                        , appMsg
                                        , Elm.get "app" model
                                        ]
                            in
                            Elm.Let.letIn
                                (\( newFrame, frameEffect ) ->
                                    Elm.tuple
                                        (model
                                            |> Elm.updateRecord
                                                [ ( "app", newFrame )
                                                ]
                                        )
                                        (frameEffect
                                            |> effectMap (Elm.val "Global")
                                        )
                                )
                                |> Elm.Let.unpack
                                    (Elm.Arg.tuple
                                        (Elm.Arg.var "newFrame")
                                        (Elm.Arg.var "frameEffect")
                                    )
                                    updatedFrame
                                |> Elm.Let.toExpression
                        )
                     ]
                        ++ Press.Model.updateResourceBranches resources
                            config
                            (Elm.get "resources" model)
                            model
                        ++ Press.Model.updatePageBranches routes
                            config
                            (Elm.get "resources" model)
                            model
                    )
                    |> Elm.withType (Type.tuple types.model (types.effectWith types.msg))
            )
        )


view : List Options.App.PageUsage -> Elm.Declaration
view routes =
    Elm.declaration "view"
        (Elm.fn2
            (Elm.Arg.varWith "config" types.frameView)
            (Elm.Arg.varWith "model" types.model)
            (\config model ->
                let
                    frameView pageView =
                        Elm.apply
                            (Elm.get "view" config)
                            [ Elm.get "resources" model
                            , Elm.val "Global"
                            , Elm.get "app" model
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
        (Elm.fnBuilder
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
                                (Elm.Case.branch
                                    (Elm.Arg.customType "PageError_" identity
                                        |> Elm.Arg.item (Elm.Arg.varWith "pageError" Gen.App.Page.Error.annotation_.error)
                                    )
                                    (\err ->
                                        Elm.apply
                                            (Elm.val "Error")
                                            [ err ]
                                    )
                                    :: Elm.Case.branch
                                        (Elm.Arg.customType "PageLoading_" identity
                                            |> Elm.Arg.item (Elm.Arg.varWith "loadingPageId" types.pageId)
                                        )
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
            |> Elm.fnArg (Elm.Arg.varWith "resources" resourcesType)
            |> Elm.fnArg (Elm.Arg.varWith "states" types.stateCache)
            |> Elm.fnArg (Elm.Arg.varWith "regionId" types.regionIdType)
            |> Elm.fnArg (Elm.Arg.varWith "pageId" types.pageId)
            |> Elm.fnDone
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
            Elm.Case.branch
                (Elm.Arg.customType stateKey identity
                    |> Elm.Arg.item (Elm.Arg.varWith "pageModel" (Type.named pageModule "Model"))
                )
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
                                                            (Elm.Arg.var "innerMsg")
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
            (Elm.Arg.varWith "config" types.frameSub)
            (Elm.Arg.varWith "model" types.model)
            (\config model ->
                Gen.App.Sub.batch
                    [ Elm.apply
                        (Elm.get "subscriptions" config)
                        [ Elm.get "resources" model
                        , Elm.get "app" model
                        ]
                        |> Gen.App.Sub.call_.map (Elm.val "Global")
                    , Elm.apply Press.Generate.Regions.values.toList
                        [ Elm.get "views" model ]
                        |> Gen.List.call_.filterMap
                            (Elm.fn
                                (Elm.Arg.varWith "pageId" Type.string)
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
            (Elm.Arg.varWith "config" types.frameSub)
            (Elm.Arg.varWith "model" types.model)
            (\config model ->
                toSub config (Elm.get "resources" model) (Elm.get "app" model) <|
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
        (Elm.Case.branch
            (Elm.Arg.customType "PageError_" identity
                |> Elm.Arg.item (Elm.Arg.varWith "pageError" Gen.App.Page.Error.annotation_.error)
            )
            (\err -> Gen.App.Sub.none)
            :: Elm.Case.branch
                (Elm.Arg.customType "PageLoading_" identity
                    |> Elm.Arg.item (Elm.Arg.varWith "pageId" types.pageId)
                )
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
            Elm.Case.branch
                (Elm.Arg.customType stateKey identity
                    |> Elm.Arg.item (Elm.Arg.varWith "pageModel" (Type.named pageModule "Model"))
                )
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
