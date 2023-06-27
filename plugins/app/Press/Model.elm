module Press.Model exposing (..)

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Declare
import Elm.Let
import Gen.App.Effect
import Gen.App.Page
import Gen.App.State
import Gen.App.Sub
import Gen.App.View
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Json.Encode
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.Url
import Set exposing (Set)


type alias RouteInfo =
    { name : String
    , moduleName : List String
    , pattern : UrlPattern
    , type_ : RouteType
    }


type RouteType
    = Elm
    | Markdown
        { files : List Source
        }


type alias Source =
    { path : String
    , source : String
    }


type UrlPattern
    = UrlPattern
        { path : List UrlPiece
        , queryParams : QueryParams
        }


type alias QueryParams =
    { includeCatchAll : Bool
    , specificFields : Set String
    }


type UrlPiece
    = Token String
    | Variable String


appMsg =
    Type.namedWith [] "Msg" [ Type.var "msg" ]


sharedType =
    Type.named [ "App", "Shared" ] "Shared"


types =
    { msg = appMsg
    , pageMsg = Type.named [] "PageMsg"
    , model = Type.namedWith [] "Model" [ Type.var "model" ]
    , modelRecord =
        Type.record
            [ ( "key", Gen.Browser.Navigation.annotation_.key )
            , ( "url", Gen.Url.annotation_.url )
            , ( "states", Gen.App.State.annotation_.cache (Type.named [] "State") )
            , ( "frame", Type.var "frame" )
            ]
    , frame =
        Type.record
            [ ( "init"
              , Type.function
                    [ Gen.Browser.Navigation.annotation_.key
                    , Gen.Json.Encode.annotation_.value
                    ]
                    (Type.tuple
                        (Type.var "model")
                        (Gen.App.Effect.annotation_.effect (Type.var "msg"))
                    )
              )
            , ( "update"
              , Type.function
                    [ Type.var "msg"
                    , Type.var "model"
                    ]
                    (Type.tuple
                        (Type.var "model")
                        (Gen.App.Effect.annotation_.effect (Type.var "msg"))
                    )
              )
            , ( "subscriptions"
              , Type.function
                    [ Type.var "model"
                    ]
                    (Gen.App.Sub.annotation_.sub (Type.var "msg"))
              )
            , ( "view"
              , Type.function
                    [ Type.function [ Type.var "msg" ] appMsg
                    , Type.var "model"
                    , Type.namedWith [] "View" [ appMsg ]
                    ]
                    (Gen.Browser.annotation_.document appMsg)
              )
            , ( "toCmd"
              , Type.function
                    [ Type.var "model"
                    , Gen.App.Effect.annotation_.effect appMsg
                    ]
                    (Gen.Platform.Cmd.annotation_.cmd appMsg)
              )
            , ( "toSub"
              , Type.function
                    [ Type.var "model"
                    , Gen.App.Sub.annotation_.sub appMsg
                    ]
                    (Gen.Platform.Sub.annotation_.sub appMsg)
              )
            , ( "toShared"
              , Type.function
                    [ Type.var "model"
                    ]
                    sharedType
              )
            ]
    , pageModel = Type.named [] "PageModel"
    , effect = Type.namedWith [] "Effect" [ Type.var "msg" ]
    , subscription = Type.namedWith [] "Subscription" [ Type.var "msg" ]
    , route =
        Elm.value
            { importFrom = [ "Route" ]
            , name = "Route"
            , annotation = Nothing
            }
    , cache = Type.named [] "Cache"
    , toPageMsg =
        \string ->
            "To" ++ string
    }



{- 'Frame' helpers -}


toShared : Elm.Expression -> Elm.Expression -> Elm.Expression
toShared config frameModel =
    Elm.apply (Elm.get "toShared" config) [ frameModel ]


toCmd : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
toCmd config frameModel effect =
    Elm.apply (Elm.get "toCmd" config) [ frameModel, effect ]


toSub : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
toSub config frameModel sub =
    Elm.apply (Elm.get "toSub" config) [ frameModel, sub ]


getState key model =
    Gen.App.State.call_.get key (Elm.get "states" model)


setState key val model =
    Gen.App.State.call_.insert key val (Elm.get "states" model)


initPage :
    List RouteInfo
    ->
        { declaration : Elm.Declaration
        , call : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , callFrom :
            List String -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , value : List String -> Elm.Expression
        }
initPage routes =
    Elm.Declare.fn3 "initPage"
        ( "route", Just (Type.named [ "Route" ] "Route") )
        ( "shared", Just sharedType )
        ( "cache", Just (Gen.App.State.annotation_.cache (Type.named [] "State")) )
        (\route shared cache ->
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

                                pageConfig =
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
                                            Elm.apply
                                                (Elm.apply
                                                    Gen.App.Page.values_.toInit
                                                    [ pageConfig ]
                                                )
                                                [ params
                                                , shared
                                                , getPage stateKey
                                                    cache
                                                    { nothing = Elm.nothing
                                                    , just = Elm.just
                                                    }
                                                ]
                                    in
                                    Elm.Let.letIn
                                        (\( newPage, pageEffect ) ->
                                            Elm.tuple
                                                (Elm.record
                                                    [ ( "new"
                                                      , Elm.apply
                                                            (Elm.val stateKey)
                                                            [ newPage ]
                                                      )
                                                    , ( "effect"
                                                      , pageEffect
                                                            |> Gen.App.Effect.call_.map (Elm.val pageMsgTypeName)
                                                            |> Gen.App.Effect.call_.map (Elm.val "Page")
                                                      )
                                                    ]
                                                )
                                                (Elm.string stateKey)
                                        )
                                        |> Elm.Let.tuple "newPage" "pageEffect" initialized
                                        |> Elm.Let.toExpression
                                )
                        )
                )
                |> Elm.withType
                    (Type.tuple
                        (Type.record
                            [ ( "new", Type.named [] "State" )
                            , ( "effect", Gen.App.Effect.annotation_.effect types.msg )
                            ]
                        )
                        Type.string
                    )
        )


updatePage routes =
    Elm.Declare.fn4 "updatePage"
        ( "config", Just types.frame )
        ( "shared", Just sharedType )
        ( "msg", Just types.pageMsg )
        ( "model", Just types.model )
        (\config shared msg model ->
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
                                    getPage stateKey
                                        (Elm.get "states" model)
                                        { nothing = Elm.tuple model Gen.Platform.Cmd.none
                                        , just =
                                            \pageState ->
                                                let
                                                    updated =
                                                        Elm.apply
                                                            (Elm.apply
                                                                Gen.App.Page.values_.toUpdate
                                                                [ Elm.value
                                                                    { importFrom = pageModule
                                                                    , name = "page"
                                                                    , annotation = Nothing
                                                                    }
                                                                ]
                                                            )
                                                            [ shared
                                                            , pageMsg
                                                            , pageState
                                                            ]
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
                                                                |> Gen.App.Effect.call_.map (Elm.val "Page")
                                                                |> toCmd config (Elm.get "frame" model)
                                                            )
                                                    )
                                                    |> Elm.Let.tuple "updatedPage" "pageEffect" updated
                                                    |> Elm.Let.toExpression
                                        }
                                )
                        )
                )
                |> Elm.withType (Type.tuple types.model (Type.cmd types.msg))
        )


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
