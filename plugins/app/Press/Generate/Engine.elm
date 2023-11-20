module Press.Generate.Engine exposing (generate)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Gen.App.Effect
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


generate : Press.Model.Model -> Elm.File
generate options =
    let
        routes =
            options.pages

        loadPage =
            Press.Model.loadPage routes

        preloadPage =
            Press.Model.preloadPage routes

        getPageInit =
            Press.Model.getPageInit routes
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
        , app options getPageInit loadPage
        , testAlias
        , test options getPageInit loadPage
        , Elm.alias "Model" types.modelRecord
        , viewRegionAlias options.viewRegions
        , setRegion options.viewRegions
        , renderRegions options.viewRegions

        -- , dropRegion options.viewRegions
        , Elm.customType "State"
            (let
                routeVariants =
                    routes
                        |> List.map
                            (\route ->
                                Elm.variantWith
                                    route.id
                                    [ Type.named route.moduleName "Model"
                                    ]
                            )
             in
             Elm.variantWith "PageError_" [ Gen.App.PageError.annotation_.error ]
                :: Elm.variantWith "PageLoading_" [ types.routeType ]
                :: routeVariants
            )
        , viewType
        , viewPageModel options
        , msgType options.pages
        , update routes getPageInit loadPage preloadPage
        , getPageInit.declaration
        , loadPage.declaration
        , preloadPage.declaration
        , view routes
        , subscriptions routes
        ]


msgType routes =
    let
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
         , Elm.variant "PageCacheCleared"
         , Elm.variantWith "Preload" [ types.routeType ]
         , Elm.variant "PageReinitializeRequested"
         , Elm.variantWith "Global" [ Type.var "msg" ]
         , Elm.variantWith "Loaded"
            [ types.routeType
            , types.pageLoadResult
            ]
         ]
            ++ pageVariants
        )


viewType =
    Elm.customType "View"
        [ Elm.variantWith "NotFound" [ Gen.Url.annotation_.url ]
        , Elm.variantWith "Loading" [ types.routeType ]
        , Elm.variantWith "Error" [ Gen.App.PageError.annotation_.error ]
        , Elm.variantWith "View"
            [ Gen.App.View.annotation_.view (Type.var "appMsg")
            ]
        ]
        |> Elm.exposeWith
            { group = Just "App"
            , exposeConstructor = True
            }


capitalize : String -> String
capitalize str =
    let
        top =
            String.left 1 str

        remain =
            String.dropLeft 1 str
    in
    String.toUpper top ++ remain


renderRegions : Press.Model.ViewRegions -> Elm.Declaration
renderRegions regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "renderRegions"
        (Elm.fn4
            ( "model", Just types.model )
            ( "state", Just types.stateCache )
            ( "shared", Just types.sharedType )
            ( "regions", Just types.regionsRecord )
            (\model state shared viewRegions ->
                allRegions
                    |> List.map
                        (\( fieldName, regionType ) ->
                            let
                                regionId =
                                    Elm.value
                                        { importFrom = [ "App", "View", "Regions", "Id" ]
                                        , name = capitalize fieldName
                                        , annotation = Just types.regionIdType
                                        }
                            in
                            ( fieldName
                            , case regionType of
                                Press.Model.One ->
                                    if fieldName == "Primary" then
                                        Elm.get fieldName viewRegions
                                            |> Gen.Maybe.call_.andThen
                                                (Elm.apply
                                                    (Elm.val "viewPageModel")
                                                    [ shared
                                                    , state
                                                    , regionId
                                                    ]
                                                )
                                            |> Gen.Maybe.withDefault
                                                (Elm.apply
                                                    (Elm.val "NotFound")
                                                    [ Elm.get "url" model
                                                    ]
                                                )

                                    else
                                        Elm.get fieldName viewRegions
                                            |> Gen.Maybe.call_.andThen
                                                (Elm.apply
                                                    (Elm.val "viewPageModel")
                                                    [ shared
                                                    , state
                                                    , regionId
                                                    ]
                                                )

                                Press.Model.Many ->
                                    Elm.get fieldName viewRegions
                                        |> Gen.List.call_.filterMap
                                            (Elm.apply
                                                (Elm.val "viewPageModel")
                                                [ shared
                                                , state
                                                , regionId
                                                ]
                                            )
                            )
                        )
                    |> Elm.record
                    |> Elm.withType types.renderedView
            )
        )


setRegion : Press.Model.ViewRegions -> Elm.Declaration
setRegion regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "setRegion"
        (Elm.fn3
            ( "regionId", Just types.regionIdType )
            ( "contentId", Just Type.string )
            ( "viewRegions", Just types.regionsRecord )
            (\id contentId viewRegions ->
                Elm.Case.custom id
                    types.regionIdType
                    (List.map
                        (\( field, regionType ) ->
                            Elm.Case.branch0 field
                                (Elm.updateRecord
                                    [ ( field
                                      , case regionType of
                                            Press.Model.One ->
                                                Elm.just contentId

                                            Press.Model.Many ->
                                                Elm.list [ contentId ]
                                      )
                                    ]
                                    viewRegions
                                )
                        )
                        allRegions
                    )
            )
        )



-- dropRegion : Press.Model.ViewRegions -> Elm.Declaration
-- dropRegion regions =
--     let
--         mainField =
--             ( "primary", Type.maybe Type.string )
--         regionFields =
--             regions.regions
--                 |> List.map
--                     (\( field, regionType ) ->
--                         ( field
--                         , case regionType of
--                             Press.Model.One ->
--                                 Type.maybe Type.string
--                             Press.Model.Many ->
--                                 Type.list Type.string
--                         )
--                     )
--     in
--     Elm.alias "dropRegion"
--         (Type.record (mainField :: regionFields))


viewRegionAlias : Press.Model.ViewRegions -> Elm.Declaration
viewRegionAlias regions =
    let
        mainField =
            ( "primary", Type.maybe Type.string )

        regionFields =
            regions.regions
                |> List.map
                    (\( field, regionType ) ->
                        ( field
                        , case regionType of
                            Press.Model.One ->
                                Type.maybe Type.string

                            Press.Model.Many ->
                                Type.list Type.string
                        )
                    )
    in
    Elm.alias "ViewRegions"
        (Type.record (mainField :: regionFields))


initViewRegions : Press.Model.ViewRegions -> Elm.Expression
initViewRegions regions =
    let
        mainField =
            ( "primary", Elm.nothing )

        regionFields =
            regions.regions
                |> List.map
                    (\( field, regionType ) ->
                        ( field
                        , case regionType of
                            Press.Model.One ->
                                Elm.nothing

                            Press.Model.Many ->
                                Elm.list []
                        )
                    )
    in
    Elm.record (mainField :: regionFields)


testAlias =
    Elm.alias "Test"
        (Type.record
            [ ( "init"
              , Type.function [ Gen.Json.Encode.annotation_.value, Gen.Url.annotation_.url, Type.unit ]
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
test options getPageInit loadPage =
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
                                init options getPageInit loadPage config flags url key
                            )
                      )
                    , ( "view", Elm.apply (Elm.val "view") [ config ] )
                    , ( "update", Elm.apply (Elm.val "update") [ config ] )
                    , ( "onUrlRequest", Elm.val "UrlRequested" )
                    , ( "onUrlChange", Elm.val "UrlChanged" )
                    ]
                    |> Elm.withType (Type.namedWith [] "Test" [ Type.var "model", Type.var "msg" ])
            )
        )
        |> Elm.exposeWith
            { group = Just "Testing"
            , exposeConstructor = True
            }


parseUrl : Elm.Expression -> Elm.Expression
parseUrl url =
    Elm.apply
        (Elm.value
            { importFrom = types.routePath
            , name = "parse"
            , annotation = Nothing
            }
        )
        [ url ]


app options getPageInit loadPage =
    let
        routes =
            options.pages
    in
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
                                            (init options getPageInit loadPage config flags url key)
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
                        , ( "onUrlChange", Elm.val "UrlChanged" )
                        , ( "onUrlRequest", Elm.val "UrlRequested" )
                        ]
                    )
                    |> Elm.withType (Type.namedWith [] "App" [ Type.var "model", Type.var "msg" ])
            )
        )
        |> Elm.exposeWith
            { group = Just "App"
            , exposeConstructor = True
            }


init options getPageInit loadPage config flags url key =
    let
        frameInitialized =
            Elm.apply
                (Elm.get "init" config)
                [ flags
                ]
    in
    Elm.Let.letIn
        (\( frameModel, frameEffect ) ->
            let
                globalFrameEffect =
                    frameEffect
                        |> Gen.App.Effect.call_.map (Elm.val "Global")
            in
            Elm.Case.maybe (parseUrl url)
                { nothing =
                    let
                        model =
                            Elm.record
                                [ ( "key", key )
                                , ( "url", url )
                                , ( "currentRoute", Elm.nothing )
                                , ( "regions"
                                  , initViewRegions options.viewRegions
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
                , just =
                    ( "route"
                    , \route ->
                        let
                            model =
                                Elm.record
                                    [ ( "key", key )
                                    , ( "url", url )
                                    , ( "currentRoute", Elm.just route )
                                    , ( "regions"
                                      , initViewRegions options.viewRegions
                                      )
                                    , ( "frame", frameModel )
                                    , ( "states"
                                      , Gen.App.State.init
                                      )
                                    ]
                                    |> Elm.withType types.model

                            initialized =
                                getPageInit.call route (Press.Model.toShared config frameModel) Gen.App.State.init
                                    |> loadPage.call config model route
                        in
                        Elm.Let.letIn
                            (\( newModel, effect ) ->
                                Elm.tuple newModel
                                    (Gen.App.Effect.batch
                                        [ globalFrameEffect
                                        , effect
                                        ]
                                    )
                            )
                            |> Elm.Let.tuple "newModel"
                                "effect"
                                initialized
                            |> Elm.Let.toExpression
                    )
                }
        )
        |> Elm.Let.tuple "frameModel" "frameEffect" frameInitialized
        |> Elm.Let.toExpression


update :
    List Page
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
                                            (Gen.App.Effect.call_.pushUrl
                                                (Gen.Url.toString url)
                                            )
                                    )
                                , Elm.Case.branch1
                                    "External"
                                    ( "url", Type.string )
                                    (\url ->
                                        Elm.tuple model
                                            (Gen.App.Effect.call_.load
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
                                        Gen.App.Effect.none
                                , just =
                                    Tuple.pair "newRoute" <|
                                        \newRoute ->
                                            let
                                                id =
                                                    Elm.apply
                                                        (Elm.value
                                                            { importFrom = types.routePath
                                                            , name = "toId"
                                                            , annotation = Nothing
                                                            }
                                                        )
                                                        [ newRoute ]

                                                updatedModel =
                                                    Elm.updateRecord
                                                        [ ( "url", url )
                                                        , ( "currentRoute", Elm.just newRoute )
                                                        , ( "regions"
                                                          , Elm.apply (Elm.val "setRegion")
                                                                [ Elm.value
                                                                    { importFrom = [ "App", "View", "Regions", "Id" ]
                                                                    , name = "Primary"
                                                                    , annotation = Nothing
                                                                    }
                                                                , id
                                                                , Elm.get "regions" model
                                                                ]
                                                          )
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
                     , Elm.Case.branch0 "PageReinitializeRequested"
                        (Elm.Case.maybe (Elm.get "currentRoute" model)
                            { just =
                                ( "current"
                                , \currentRoute ->
                                    getPageInit.call currentRoute
                                        (Press.Model.toShared config (Elm.get "frame" model))
                                        (Elm.get "states" model)
                                        |> loadPage.call config model currentRoute
                                )
                            , nothing =
                                Elm.tuple model
                                    Gen.App.Effect.none
                            }
                        )
                     , Elm.Case.branch1 "Preload"
                        ( "route", types.routeType )
                        (\routeToPreload ->
                            getPageInit.call routeToPreload
                                (Press.Model.toShared config (Elm.get "frame" model))
                                (Elm.get "states" model)
                                |> preloadPage.call config model routeToPreload
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


view : List Page -> Elm.Declaration
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
                            (Elm.val "renderRegions")
                            [ model
                            , Elm.get "states" model
                            , Press.Model.toShared config (Elm.get "frame" model)
                            , Elm.get "regions" model
                            ]
                        )
                    |> Elm.Let.toExpression
            )
        )


viewPageModel options =
    let
        routes =
            options.pages
    in
    Elm.declaration "viewPageModel"
        (Elm.fn4
            ( "shared", Just types.sharedType )
            ( "states", Just types.stateCache )
            ( "regionId", Just types.regionIdType )
            ( "pageId", Just Type.string )
            (\shared states regionId pageId ->
                Elm.Case.maybe (Gen.App.State.call_.get pageId states)
                    { nothing =
                        Elm.nothing
                    , just =
                        ( "currentState"
                        , \current ->
                            Elm.just <|
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
                                            ( "pageRoute", types.routeType )
                                            (\pageRoute ->
                                                Elm.apply
                                                    (Elm.val "Loading")
                                                    [ pageRoute ]
                                            )
                                        :: List.map (routeToView shared regionId) routes
                                    )
                        )
                    }
                    |> Elm.withType (Type.maybe (Type.namedWith [] "View" [ appMsg ]))
            )
        )


routeToView shared regionId route =
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
                                                            [ innerMsg
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


subscriptions : List Page -> Elm.Declaration
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
                    , Elm.Case.maybe (Gen.App.State.current (Elm.get "states" model))
                        { nothing = Gen.Platform.Sub.none
                        , just =
                            ( "currentState"
                            , \current ->
                                Elm.Case.custom current
                                    types.pageModel
                                    (Elm.Case.branch1 "PageError_"
                                        ( "pageError", Gen.App.PageError.annotation_.error )
                                        (\err -> Gen.Platform.Sub.none)
                                        :: Elm.Case.branch1 "PageLoading_"
                                            ( "pageRoute", types.routeType )
                                            (\pageRoute -> Gen.Platform.Sub.none)
                                        :: List.map
                                            (routeToSubscription config model)
                                            routes
                                    )
                            )
                        }
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


routeToSubscription config model route =
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
                            |> Gen.App.Sub.call_.map (Elm.val pageMsgTypeName)
                    )
        )
