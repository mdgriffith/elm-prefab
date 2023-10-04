module Press.Model exposing (..)

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
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Json.Encode
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.Url
import Set exposing (Set)


type alias Page =
    { id : String
    , moduleName : List String
    , url : UrlPattern
    , deprecatedUrls : List UrlPattern
    , source : String
    , assets : Maybe SourceDirectory
    }


type alias SourceDirectory =
    { base : String
    , baseOnApp : String
    , baseOnServer : String
    , files : List Source
    }


type alias Source =
    { path : String
    , source : String
    }


type UrlPattern
    = UrlPattern
        { path : List UrlPiece
        , includePathTail : Bool
        , queryParams : QueryParams
        }


type alias QueryParams =
    { includeCatchAll : Bool
    , specificFields : Set String
    }


type UrlPiece
    = Token String
    | Variable String


appMsg : Type.Annotation
appMsg =
    Type.namedWith [] "Msg" [ Type.var "msg" ]


sharedType : Type.Annotation
sharedType =
    Type.named [ "App", "Shared" ] "Shared"


routeType : Type.Annotation
routeType =
    Type.named [ "Route" ] "Route"


type ConfigType
    = ViewConfig
    | SubscriptionConfig
    | UpdateConfig
    | FullConfig
    | TestConfig


toConfig configType =
    (if configType == FullConfig then
        Type.record

     else
        Type.extensible "config"
    )
        (List.filterMap
            (\( allowed, name, val ) ->
                if List.member configType allowed || configType == FullConfig then
                    Just ( name, val )

                else
                    Nothing
            )
            [ ( [ TestConfig ]
              , "init"
              , Type.function
                    [ Gen.Json.Encode.annotation_.value
                    ]
                    (Type.tuple
                        (Type.var "model")
                        (Gen.App.Effect.annotation_.effect (Type.var "msg"))
                    )
              )
            , ( [ UpdateConfig, TestConfig ]
              , "update"
              , Type.function
                    [ Type.var "msg"
                    , Type.var "model"
                    ]
                    (Type.tuple
                        (Type.var "model")
                        (Gen.App.Effect.annotation_.effect (Type.var "msg"))
                    )
              )
            , ( [ SubscriptionConfig ]
              , "subscriptions"
              , Type.function
                    [ Type.var "model"
                    ]
                    (Gen.App.Sub.annotation_.sub (Type.var "msg"))
              )
            , ( [ ViewConfig, TestConfig ]
              , "view"
              , Type.function
                    [ Type.function [ Type.var "msg" ] appMsg
                    , Type.var "model"
                    , Type.namedWith [] "View" [ appMsg ]
                    ]
                    (Gen.Browser.annotation_.document appMsg)
              )
            , ( []
              , "toCmd"
              , Type.function
                    [ Type.record
                        [ ( "navKey", Gen.Browser.Navigation.annotation_.key )
                        ]
                    , Type.var "model"
                    , Gen.App.Effect.annotation_.effect appMsg
                    ]
                    (Gen.Platform.Cmd.annotation_.cmd appMsg)
              )
            , ( [ SubscriptionConfig ]
              , "toSub"
              , Type.function
                    [ Type.var "model"
                    , Gen.App.Sub.annotation_.sub appMsg
                    ]
                    (Gen.Platform.Sub.annotation_.sub appMsg)
              )
            , ( [ ViewConfig, UpdateConfig, SubscriptionConfig, TestConfig ]
              , "toShared"
              , Type.function
                    [ Type.var "model"
                    ]
                    sharedType
              )
            ]
        )


types =
    { msg = appMsg
    , pageMsg = Type.named [] "PageMsg"
    , routeType = routeType
    , model = Type.namedWith [] "Model" [ Type.var "key", Type.var "model" ]
    , testModel = Type.namedWith [] "Model" [ Type.unit, Type.var "model" ]
    , pageLoadResult =
        Gen.App.Engine.Page.annotation_.init
            appMsg
            (Type.named [] "State")
    , modelRecord =
        Type.record
            [ ( "key", Type.var "key" )
            , ( "url", Gen.Url.annotation_.url )
            , ( "currentRoute", Type.maybe routeType )
            , ( "states"
              , Gen.App.State.annotation_.cache (Type.named [] "State")
              )
            , ( "frame", Type.var "frame" )
            ]
    , frame =
        toConfig FullConfig
    , frameView =
        toConfig ViewConfig
    , frameUpdate =
        toConfig UpdateConfig
    , frameSub =
        toConfig SubscriptionConfig
    , frameTest =
        toConfig TestConfig
    , pageModel = Type.named [] "PageModel"
    , effect = Type.namedWith [] "Effect" [ Type.var "msg" ]
    , subscription = Type.namedWith [] "Subscription" [ Type.var "msg" ]
    , cache = Type.named [] "Cache"
    , toPageMsg =
        \string ->
            "To" ++ string
    }



{- 'Frame' helpers -}


toShared : Elm.Expression -> Elm.Expression -> Elm.Expression
toShared config frameModel =
    Elm.apply (Elm.get "toShared" config) [ frameModel ]


toCmd : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
toCmd config navKey frameModel effect =
    Elm.apply (Elm.get "toCmd" config) [ Elm.record [ ( "navKey", navKey ) ], frameModel, effect ]


toSub : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
toSub config frameModel sub =
    Elm.apply (Elm.get "toSub" config) [ frameModel, sub ]


getState : Elm.Expression -> Elm.Expression -> Elm.Expression
getState key model =
    Gen.App.State.call_.get key (Elm.get "states" model)


setState : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
setState key val model =
    Gen.App.State.call_.insert key val (Elm.get "states" model)


loadPage :
    List Page
    ->
        { declaration : Elm.Declaration
        , call : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , callFrom :
            List String -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , value : List String -> Elm.Expression
        }
loadPage routes =
    Elm.Declare.fn4 "loadPage"
        ( "config", Just types.frameUpdate )
        ( "model", Just types.model )
        ( "route", Just types.routeType )
        ( "initialization", Just types.pageLoadResult )
        (\config model route initialization ->
            Elm.Let.letIn
                (\pageId ->
                    Elm.Case.custom initialization
                        (Type.namedWith
                            [ "App", "Engine", "Page" ]
                            "InitPlan"
                            [ Type.var "msg", Type.var "model" ]
                        )
                        [ Elm.Case.branch0 "NotFound"
                            (let
                                updatedModel =
                                    Elm.updateRecord
                                        [ ( "states"
                                          , Elm.get "states" model
                                                |> Gen.App.State.call_.remove pageId
                                          )
                                        ]
                                        model
                             in
                             Elm.tuple updatedModel
                                Gen.App.Effect.none
                            )
                        , Elm.Case.branch1 "Error"
                            ( "err", Gen.App.PageError.annotation_.error )
                            (\err ->
                                let
                                    updatedModel =
                                        Elm.updateRecord
                                            [ ( "states"
                                              , Elm.get "states" model
                                                    |> Gen.App.State.call_.insert pageId
                                                        (Elm.apply
                                                            (Elm.value
                                                                { importFrom = []
                                                                , name = "PageError_"
                                                                , annotation = Nothing
                                                                }
                                                            )
                                                            [ err ]
                                                        )
                                              )
                                            ]
                                            model
                                in
                                Elm.tuple updatedModel
                                    Gen.App.Effect.none
                            )
                        , Elm.Case.branch2 "Loaded"
                            ( "newPage", Type.named [] "State" )
                            ( "pageEffect", Gen.App.Effect.annotation_.effect types.msg )
                            (\newPage pageEffect ->
                                Elm.tuple
                                    (Elm.updateRecord
                                        [ ( "states"
                                          , Elm.get "states" model
                                                |> Gen.App.State.call_.insert pageId newPage
                                                |> Gen.App.State.call_.setCurrent pageId
                                          )
                                        ]
                                        model
                                    )
                                    pageEffect
                            )
                        , Elm.Case.branch1 "LoadFrom"
                            ( "pageEffect", types.pageLoadResult )
                            (\pageEffect ->
                                let
                                    updatedModel =
                                        Elm.updateRecord
                                            [ ( "states"
                                              , Elm.get "states" model
                                                    |> Gen.App.State.call_.insert pageId
                                                        (Elm.apply
                                                            (Elm.value
                                                                { importFrom = []
                                                                , name = "PageLoading_"
                                                                , annotation = Nothing
                                                                }
                                                            )
                                                            [ route ]
                                                        )
                                              )
                                            ]
                                            model
                                in
                                Elm.tuple updatedModel
                                    (pageEffect
                                        |> Gen.App.Effect.call_.map
                                            (Elm.apply
                                                (Elm.val "Loaded")
                                                [ route
                                                ]
                                            )
                                    )
                            )
                        ]
                )
                |> Elm.Let.value "pageId"
                    (Elm.apply
                        (Elm.value
                            { importFrom = [ "Route" ]
                            , name = "toId"
                            , annotation = Nothing
                            }
                        )
                        [ route ]
                    )
                |> Elm.Let.toExpression
                |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
        )


getPageInit :
    List Page
    ->
        { declaration : Elm.Declaration
        , call : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , callFrom :
            List String -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , value : List String -> Elm.Expression
        }
getPageInit routes =
    Elm.Declare.fn3 "getPageInit"
        ( "route", Just types.routeType )
        ( "shared", Just sharedType )
        ( "cache", Just (Gen.App.State.annotation_.cache (Type.named [] "State")) )
        (\route shared cache ->
            Elm.Case.custom route
                types.routeType
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
                                    withPageHelper pageConfig
                                        "init"
                                        (\pageInit ->
                                            Elm.apply
                                                pageInit
                                                [ params
                                                , shared
                                                , getPage stateKey
                                                    cache
                                                    { nothing = Elm.nothing
                                                    , just = Elm.just
                                                    }
                                                ]
                                                |> Elm.Op.pipe
                                                    (Elm.apply
                                                        Gen.App.Engine.Page.values_.mapInitPlan
                                                        [ Elm.record
                                                            [ ( "onModel", Elm.val stateKey )
                                                            , ( "onMsg", Elm.val pageMsgTypeName )
                                                            ]
                                                        ]
                                                    )
                                        )
                                )
                        )
                )
                |> Elm.withType
                    types.pageLoadResult
        )


withPageHelper : Elm.Expression -> String -> (Elm.Expression -> Elm.Expression) -> Elm.Expression
withPageHelper pageConfig fieldName fn =
    Elm.Let.letIn
        (\pageDetails ->
            fn (Elm.get fieldName pageDetails)
        )
        |> Elm.Let.value "pageDetails"
            (Elm.apply
                Gen.App.Engine.Page.values_.toInternalDetails
                [ pageConfig ]
            )
        |> Elm.Let.toExpression


updatePageBranches :
    List Page
    -> Elm.Expression
    -> Elm.Expression
    -> Elm.Expression
    -> List Elm.Case.Branch
updatePageBranches routes config shared model =
    routes
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
                Elm.Case.branch1 pageMsgTypeName
                    ( "pageMsg", Type.named pageModule "Msg" )
                    (\pageMsg ->
                        getPage stateKey
                            (Elm.get "states" model)
                            { nothing = Elm.tuple model Gen.App.Effect.none
                            , just =
                                \pageState ->
                                    let
                                        updated =
                                            withPageHelper
                                                (Elm.value
                                                    { importFrom = pageModule
                                                    , name = "page"
                                                    , annotation = Nothing
                                                    }
                                                )
                                                "update"
                                                (\pageUpdate ->
                                                    Elm.apply pageUpdate
                                                        [ shared
                                                        , pageMsg
                                                        , pageState
                                                        ]
                                                )
                                    in
                                    Elm.Let.letIn
                                        (\( innerPageModel, pageEffect ) ->
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
                                                (pageEffect
                                                    |> Gen.App.Effect.call_.map (Elm.val pageMsgTypeName)
                                                )
                                        )
                                        |> Elm.Let.tuple "updatedPage" "pageEffect" updated
                                        |> Elm.Let.toExpression
                            }
                    )
            )


getPage :
    String
    -> Elm.Expression
    ->
        { just : Elm.Expression -> Elm.Expression
        , nothing : Elm.Expression
        }
    -> Elm.Expression
getPage key states onFound =
    Elm.Case.maybe (Gen.App.State.get key states)
        { nothing = onFound.nothing
        , just =
            Tuple.pair "foundPage" <|
                \foundPage ->
                    Elm.Case.custom foundPage
                        types.pageModel
                        [ Elm.Case.branch1 key
                            ( "page", types.pageModel )
                            onFound.just
                        , Elm.Case.otherwise
                            (\_ ->
                                onFound.nothing
                            )
                        ]
        }
