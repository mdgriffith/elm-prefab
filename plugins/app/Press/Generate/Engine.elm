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
        loadPage =
            Press.Model.loadPage options.pageUsages

        preloadPage =
            Press.Model.preloadPage options.pageUsages

        getPageInit =
            Press.Model.getPageInit options.pageUsages
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
        , toPageKey options
        , app options getPageInit loadPage
        , testAlias
        , test options getPageInit loadPage
        , Elm.alias "Model" types.modelRecord
        , viewRegionAlias options.viewRegions
        , runRegionOperation getPageInit preloadPage options.viewRegions

        -- Region management
        , setRegion options.viewRegions
        , setRegionItem options.viewRegions
        , clearRegion options.viewRegions
        , clearRegionAt options.viewRegions
        , toAllPageIds options.viewRegions
        , allRegionsDeclaration options.viewRegions
        , renderRegions options.viewRegions
        , Elm.customType "State"
            (let
                routeVariants =
                    options.pageUsages
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
        , viewPageModel options
        , msgType options.pages
        , update options.pageUsages getPageInit loadPage preloadPage
        , getPageInit.declaration
        , loadPage.declaration
        , preloadPage.declaration
        , view options.pageUsages
        , subscriptions options.pageUsages
        ]


toPageKey options =
    let
        routes =
            options.pages
    in
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
        [ Elm.variantWith "NotFound" [ Gen.Url.annotation_.url ]
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
                                idName =
                                    capitalize fieldName ++ "Id"

                                regionId =
                                    Elm.value
                                        { importFrom = [ "App", "View", "Id" ]
                                        , name = idName
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
                                        |> Gen.List.call_.indexedMap
                                            (Elm.fn2
                                                ( "index", Just Type.int )
                                                ( "pageId", Just Type.string )
                                                (\index pageId ->
                                                    Elm.apply
                                                        (Elm.val "viewPageModel")
                                                        [ shared
                                                        , state
                                                        , Elm.apply regionId
                                                            [ index
                                                            ]
                                                        , pageId
                                                        ]
                                                )
                                            )
                                        |> Gen.List.call_.filterMap
                                            (Elm.fn ( "x", Nothing ) identity)
                            )
                        )
                    |> Elm.record
                    |> Elm.withType types.renderedView
            )
        )


runRegionOperation getPageInit preloadPage regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "runRegionOperation"
        (Elm.fn3
            ( "config", Just types.frameUpdate )
            ( "operation", Just types.regionOperation )
            ( "model", Just types.model )
            (\config operation model ->
                Elm.Case.custom operation
                    types.regionOperation
                    [ Elm.Case.branch2 "Push"
                        ( "region", types.regionType )
                        ( "pageId", types.pageId )
                        (\region pageIdToLoad ->
                            let
                                shared =
                                    Press.Model.toShared config (Elm.get "frame" model)

                                pageId =
                                    Elm.apply
                                        (Elm.val "toPageKey")
                                        [ pageIdToLoad ]
                            in
                            Elm.Let.letIn
                                (\newModel ->
                                    getPageInit.call pageIdToLoad
                                        shared
                                        (Elm.get "states" newModel)
                                        |> preloadPage.call config newModel pageIdToLoad
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.updateRecord
                                        [ ( "regions"
                                          , Elm.apply (Elm.val "setRegion")
                                                [ region
                                                , pageId
                                                , Elm.get "regions" model
                                                ]
                                          )
                                        ]
                                        model
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch2 "PushTo"
                        ( "regionId", types.regionIdType )
                        ( "route", types.pageId )
                        (\regionId pageIdToLoad ->
                            let
                                shared =
                                    Press.Model.toShared config (Elm.get "frame" model)

                                pageId =
                                    Elm.apply
                                        (Elm.val "toPageKey")
                                        [ pageIdToLoad ]
                            in
                            Elm.Let.letIn
                                (\newModel ->
                                    getPageInit.call pageIdToLoad
                                        shared
                                        (Elm.get "states" newModel)
                                        |> preloadPage.call config newModel pageIdToLoad
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.updateRecord
                                        [ ( "regions"
                                          , Elm.apply (Elm.val "setRegionItem")
                                                [ regionId
                                                , pageId
                                                , Elm.get "regions" model
                                                , Elm.bool False
                                                ]
                                          )
                                        ]
                                        model
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch2 "ReplaceAt"
                        ( "regionId", types.regionIdType )
                        ( "pageId", types.pageId )
                        (\regionId pageIdToLoad ->
                            let
                                shared =
                                    Press.Model.toShared config (Elm.get "frame" model)

                                pageId =
                                    Elm.apply
                                        (Elm.val "toPageKey")
                                        [ pageIdToLoad ]
                            in
                            Elm.Let.letIn
                                (\newModel ->
                                    getPageInit.call pageIdToLoad
                                        shared
                                        (Elm.get "states" newModel)
                                        |> preloadPage.call config newModel pageIdToLoad
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.updateRecord
                                        [ ( "regions"
                                          , Elm.apply (Elm.val "setRegionItem")
                                                [ regionId
                                                , pageId
                                                , Elm.get "regions" model
                                                , Elm.bool True
                                                ]
                                          )
                                        ]
                                        model
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch0 "Clear"
                        (Elm.tuple
                            (Elm.updateRecord
                                [ ( "regions"
                                  , Gen.List.call_.foldl
                                        (Elm.val "clearRegion")
                                        (Elm.get "regions" model)
                                        (Elm.val "allRegions")
                                  )
                                ]
                                model
                            )
                            Gen.App.Effect.none
                        )
                    , Elm.Case.branch1 "ClearRegion"
                        ( "region", types.regionType )
                        (\region ->
                            Elm.tuple
                                (Elm.updateRecord
                                    [ ( "regions"
                                      , Elm.apply (Elm.val "clearRegion")
                                            [ region
                                            , Elm.get "regions" model
                                            ]
                                      )
                                    ]
                                    model
                                )
                                Gen.App.Effect.none
                        )
                    , Elm.Case.branch1 "ClearView"
                        ( "regionId", types.regionIdType )
                        (\regionId ->
                            Elm.tuple
                                (Elm.updateRecord
                                    [ ( "regions"
                                      , Elm.apply (Elm.val "clearRegionAt")
                                            [ regionId
                                            , Elm.get "regions" model
                                            ]
                                      )
                                    ]
                                    model
                                )
                                Gen.App.Effect.none
                        )
                    ]
                    |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
            )
        )


{-| Clear a region and set the new content
-}
setRegion : Press.Model.ViewRegions -> Elm.Declaration
setRegion regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "setRegion"
        (Elm.fn3
            ( "region", Just types.regionType )
            ( "contentId", Just Type.string )
            ( "viewRegions", Just types.regionsRecord )
            (\region contentId viewRegions ->
                Elm.Case.custom region
                    types.regionType
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


{-| Given a specific region ID, insert a new page id at that
-}
setRegionItem : Press.Model.ViewRegions -> Elm.Declaration
setRegionItem regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "setRegionItem"
        (Elm.fn4
            ( "regionId", Just types.regionIdType )
            ( "contentId", Just Type.string )
            ( "viewRegions", Just types.regionsRecord )
            ( "replaceExisting", Just Type.bool )
            (\regionId newPageId viewRegions replaceExisting ->
                Elm.Case.custom regionId
                    types.regionIdType
                    (List.map
                        (\( field, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.Case.branch0 (toRegionIdType field)
                                        (Elm.updateRecord
                                            [ ( field
                                              , Elm.just newPageId
                                              )
                                            ]
                                            viewRegions
                                        )

                                Press.Model.Many ->
                                    Elm.Case.branch1 (toRegionIdType field)
                                        ( "index", Type.int )
                                        (\index ->
                                            Elm.ifThen (Elm.Op.lte index (Elm.int 0))
                                                -- Add to the beginning
                                                (Elm.updateRecord
                                                    [ ( field
                                                      , Elm.Op.cons newPageId (Elm.get field viewRegions)
                                                      )
                                                    ]
                                                    viewRegions
                                                )
                                                (Elm.ifThen (Elm.Op.gt index (Gen.List.call_.length (Elm.get field viewRegions)))
                                                    -- Add to the end
                                                    (Elm.updateRecord
                                                        [ ( field
                                                          , Elm.Op.append
                                                                (Elm.get field viewRegions)
                                                                (Elm.list [ newPageId ])
                                                          )
                                                        ]
                                                        viewRegions
                                                    )
                                                    -- Add at the index, pushing whatever back
                                                    (Elm.updateRecord
                                                        [ ( field
                                                          , Elm.get field viewRegions
                                                                |> Gen.List.call_.indexedMap
                                                                    (Elm.fn2
                                                                        ( "itemIndex", Just Type.int )
                                                                        ( "pageId", Just Type.string )
                                                                        (\itemIndex pageId ->
                                                                            Elm.ifThen (Elm.Op.equal itemIndex index)
                                                                                (Elm.list [ newPageId, pageId ])
                                                                                (Elm.list [ pageId ])
                                                                        )
                                                                    )
                                                                |> Gen.List.call_.concat
                                                          )
                                                        ]
                                                        viewRegions
                                                    )
                                                )
                                        )
                        )
                        allRegions
                    )
                    |> Elm.withType types.regionsRecord
            )
        )


clearRegion : Press.Model.ViewRegions -> Elm.Declaration
clearRegion regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "clearRegion"
        (Elm.fn2
            ( "region", Just types.regionType )
            ( "viewRegions", Just types.regionsRecord )
            (\region viewRegions ->
                Elm.Case.custom region
                    types.regionType
                    (List.map
                        (\( field, regionType ) ->
                            Elm.Case.branch0 field
                                (Elm.updateRecord
                                    [ ( field
                                      , case regionType of
                                            Press.Model.One ->
                                                Elm.nothing

                                            Press.Model.Many ->
                                                Elm.list []
                                      )
                                    ]
                                    viewRegions
                                )
                        )
                        allRegions
                    )
            )
        )


toRegionIdType base =
    capitalize base ++ "Id"


clearRegionAt : Press.Model.ViewRegions -> Elm.Declaration
clearRegionAt regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "clearRegionAt"
        (Elm.fn2
            ( "regionId", Just types.regionIdType )
            ( "viewRegions", Just types.regionsRecord )
            (\regionId viewRegions ->
                Elm.Case.custom regionId
                    types.regionIdType
                    (List.map
                        (\( field, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.Case.branch0 (toRegionIdType field)
                                        (Elm.updateRecord
                                            [ ( field
                                              , Elm.nothing
                                              )
                                            ]
                                            viewRegions
                                        )

                                Press.Model.Many ->
                                    Elm.Case.branch1 (toRegionIdType field)
                                        ( "index", Type.int )
                                        (\index ->
                                            -- Add at the index, pushing whatever back
                                            Elm.updateRecord
                                                [ ( field
                                                  , Elm.get field viewRegions
                                                        |> Gen.List.call_.indexedMap
                                                            (Elm.fn2
                                                                ( "itemIndex", Just Type.int )
                                                                ( "pageId", Just Type.string )
                                                                (\itemIndex pageId ->
                                                                    Elm.ifThen (Elm.Op.equal itemIndex index)
                                                                        (Elm.list [])
                                                                        (Elm.list [ pageId ])
                                                                )
                                                            )
                                                        |> Gen.List.call_.concat
                                                  )
                                                ]
                                                viewRegions
                                        )
                        )
                        allRegions
                    )
                    |> Elm.withType types.regionsRecord
            )
        )


allRegionsDeclaration : Press.Model.ViewRegions -> Elm.Declaration
allRegionsDeclaration regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "allRegions"
        (Elm.list
            (regions.regions
                |> List.map
                    (\( regionName, _ ) ->
                        Elm.value
                            { importFrom = [ "App", "View", "Id" ]
                            , name = capitalize regionName
                            , annotation = Just types.regionType
                            }
                    )
            )
        )


toAllPageIds : Press.Model.ViewRegions -> Elm.Declaration
toAllPageIds regions =
    let
        allRegions =
            ( "Primary", Press.Model.One ) :: regions.regions
    in
    Elm.declaration "toAllPageIds"
        (Elm.fn
            ( "viewRegions", Just types.regionsRecord )
            (\viewRegions ->
                allRegions
                    |> List.map
                        (\( typename, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.get typename viewRegions
                                        |> Gen.Maybe.map (\x -> Elm.list [ x ])
                                        |> Gen.Maybe.withDefault (Elm.list [])

                                Press.Model.Many ->
                                    Elm.get typename viewRegions
                        )
                    |> Elm.list
                    |> Gen.List.call_.concat
                    |> Elm.withType (Type.list Type.string)
            )
        )


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


app options getPageInit loadPage =
    let
        routes =
            options.pageUsages
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


init options getPageInit loadPage config flags url key =
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
                            Elm.apply (Elm.val "runRegionOperation")
                                [ config
                                , regionOperation
                                , model
                                ]
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
                    |> Elm.withType (Type.maybe (Type.namedWith [] "View" [ appMsg ]))
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
                    , Elm.apply (Elm.val "toAllPageIds")
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
