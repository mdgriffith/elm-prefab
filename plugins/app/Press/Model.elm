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
import Json.Decode
import Set exposing (Set)


type alias Model =
    { viewRegions : ViewRegions
    , pageUsages : List PageUsage
    }


type alias PageUsage =
    { id : String
    , moduleName : List String
    , value : String
    , paramType : String
    }


decodePageUsages : Json.Decode.Decoder (List PageUsage)
decodePageUsages =
    Json.Decode.field "usages"
        (Json.Decode.list
            (Json.Decode.field "module"
                (Json.Decode.map
                    (String.split ".")
                    Json.Decode.string
                )
                |> Json.Decode.andThen
                    (\modName ->
                        Json.Decode.field "usedBy"
                            (Json.Decode.list (decodeUsage modName)
                                |> Json.Decode.map (List.filterMap identity)
                            )
                    )
            )
        )
        |> Json.Decode.map List.concat


decodeUsage : List String -> Json.Decode.Decoder (Maybe PageUsage)
decodeUsage modName =
    Json.Decode.field "isConcrete" Json.Decode.bool
        |> Json.Decode.andThen
            (\isConcrete ->
                if isConcrete then
                    Json.Decode.map2
                        (\name paramType ->
                            Just
                                { id =
                                    List.reverse modName
                                        |> List.head
                                        |> Maybe.withDefault name
                                , moduleName = modName
                                , value = name
                                , paramType = paramType
                                }
                        )
                        (Json.Decode.field "name" Json.Decode.string)
                        (Json.Decode.at [ "type", "components" ]
                            (Json.Decode.index 2
                                (Json.Decode.oneOf
                                    [ Json.Decode.field "definition" Json.Decode.string
                                        |> Json.Decode.map (\_ -> "{}")
                                    , Json.Decode.field "definition" (Json.Decode.keyValuePairs Json.Decode.string)
                                        |> Json.Decode.map
                                            (\fields ->
                                                let
                                                    body =
                                                        List.map
                                                            (\( fieldName, value ) ->
                                                                fieldName ++ " : " ++ value
                                                            )
                                                            fields
                                                            |> String.join ", "
                                                in
                                                "{ "
                                                    ++ body
                                                    ++ " }"
                                            )
                                    , Json.Decode.at [ "definition", "type" ] Json.Decode.string
                                        |> Json.Decode.andThen
                                            (\typeString ->
                                                if typeString == "alias" then
                                                    Json.Decode.at [ "definition", "fields" ] (Json.Decode.keyValuePairs Json.Decode.string)
                                                        |> Json.Decode.map
                                                            (\fields ->
                                                                let
                                                                    body =
                                                                        List.map
                                                                            (\( fieldName, value ) ->
                                                                                fieldName ++ " : " ++ value
                                                                            )
                                                                            fields
                                                                            |> String.join ", "
                                                                in
                                                                "{ "
                                                                    ++ body
                                                                    ++ " }"
                                                            )

                                                else
                                                    Json.Decode.fail "Unknown type"
                                            )
                                    ]
                                )
                            )
                        )

                else
                    Json.Decode.succeed Nothing
            )


type alias ViewRegions =
    { regions : List ( String, RegionType )
    }


type RegionType
    = One
    | Many


decodeViewRegions : Json.Decode.Decoder ViewRegions
decodeViewRegions =
    Json.Decode.map
        (\regions ->
            { regions = List.reverse regions
            }
        )
        (Json.Decode.at [ "definition", "type", "components" ]
            (Json.Decode.index 0
                (Json.Decode.at [ "definition", "fields" ]
                    (Json.Decode.keyValuePairs Json.Decode.string
                        |> Json.Decode.andThen
                            decodeRegionType
                    )
                )
            )
        )


decodeRegionType : List ( String, String ) -> Json.Decode.Decoder (List ( String, RegionType ))
decodeRegionType strs =
    let
        viewTypes =
            List.foldr
                (\( field, val ) result ->
                    case result of
                        Err err ->
                            Err err

                        Ok foundTypes ->
                            case val of
                                "Maybe view" ->
                                    Ok (( field, One ) :: foundTypes)

                                "List view" ->
                                    Ok (( field, Many ) :: foundTypes)

                                _ ->
                                    Err "Disallowed view region type"
                )
                (Ok [])
                strs
    in
    case viewTypes of
        Err err ->
            Json.Decode.fail err

        Ok found ->
            Json.Decode.succeed found


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
    = UrlPattern UrlPatternDetails


type alias UrlPatternDetails =
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


hasVars : List UrlPiece -> Bool
hasVars pieces =
    List.any
        (\piece ->
            case piece of
                Token _ ->
                    False

                Variable _ ->
                    True
        )
        pieces


{-| Two URL patterns have collisions if they can both match the same URL.
-}
hasCollisions : UrlPattern -> UrlPattern -> Bool
hasCollisions (UrlPattern one) (UrlPattern two) =
    hasCollisionsHelp one one.path two two.path


hasCollisionsHelp : UrlPatternDetails -> List UrlPiece -> UrlPatternDetails -> List UrlPiece -> Bool
hasCollisionsHelp one onePath two twoPath =
    case ( onePath, twoPath ) of
        ( [], [] ) ->
            --
            True

        ( [], _ ) ->
            False

        ( _, [] ) ->
            False

        ( (Token oneToken) :: oneTail, (Token twoToken) :: twoTail ) ->
            if oneToken == twoToken then
                hasCollisionsHelp one oneTail two twoTail

            else
                False

        ( (Variable oneVar) :: oneTail, (Token twoToken) :: twoTail ) ->
            -- A variable can potentially collide unless there is a descriminator later
            -- /item/:item/details
            -- /item/:item/preview
            hasCollisionsHelp one oneTail two twoTail

        ( (Token oneToken) :: oneTail, (Variable _) :: twoTail ) ->
            -- Same as above
            hasCollisionsHelp one oneTail two twoTail

        ( (Variable _) :: oneTail, (Variable _) :: twoTail ) ->
            hasCollisionsHelp one oneTail two twoTail


getRoutes : Page -> List UrlPattern
getRoutes page =
    page.url :: page.deprecatedUrls


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
                    , Gen.Url.annotation_.url
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
                    , Type.namedWith [ "App", "View" ]
                        "Regions"
                        [ Type.namedWith []
                            "View"
                            [ appMsg ]
                        ]
                    ]
                    (Gen.Browser.annotation_.document appMsg)
              )
            , ( []
              , "toCmd"
              , Type.function
                    [ Type.namedWith [] "CmdOptions" [ Type.var "msg" ]
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
            , ( [ TestConfig ]
              , "onUrlChange"
              , Type.function
                    [ Gen.Url.annotation_.url
                    ]
                    (Type.var "msg")
              )
            , ( [ TestConfig
                ]
              , "onUrlRequest"
              , Type.function
                    [ Gen.Browser.annotation_.urlRequest
                    ]
                    (Type.var "msg")
              )
            ]
        )


appMsg : Type.Annotation
appMsg =
    Type.namedWith [] "Msg" [ Type.var "msg" ]


sharedType : Type.Annotation
sharedType =
    Type.named [ "App", "Shared" ] "Shared"


routePath =
    [ "App", "Route" ]


routeType : Type.Annotation
routeType =
    Type.named routePath "Route"


regionsRecord =
    Type.namedWith [ "App", "View" ] "Regions" [ Type.string ]


stateCache =
    Gen.App.State.annotation_.cache (Type.named [] "State")


regionOperation =
    Type.namedWith [ "App", "View", "Id" ] "Operation" [ pageIdType ]


regionViewType =
    Type.namedWith [ "App", "View" ] "Regions"


regionIdType =
    Type.named [ "App", "View", "Id" ] "Id"


regionType =
    Type.named [ "App", "View", "Id" ] "Region"


pageIdType =
    Type.named [ "App", "Page", "Id" ] "Id"


types =
    { msg = appMsg
    , pageMsg = Type.named [] "PageMsg"
    , sharedType = sharedType
    , routePath = routePath
    , routeType = routeType
    , pageId = pageIdType
    , model = Type.namedWith [] "Model" [ Type.var "key", Type.var "model" ]
    , testModel = Type.namedWith [] "Model" [ Type.unit, Type.var "model" ]
    , pageLoadResult =
        Gen.App.Engine.Page.annotation_.init
            appMsg
            (Type.named [] "State")
    , regionsRecord = regionsRecord
    , regionIdType = regionIdType
    , regionViewType = regionViewType
    , regionOperation = regionOperation
    , regionType = regionType
    , stateCache = stateCache
    , renderedView = regionViewType [ Type.namedWith [] "View" [ appMsg ] ]
    , cmdOptions =
        Type.record
            [ ( "navKey", Gen.Browser.Navigation.annotation_.key )
            , ( "toApp"
              , Type.function [ Type.var "msg" ] appMsg
              )
            , ( "dropPageCache"
              , appMsg
              )
            , ( "preload"
              , Type.function [ pageIdType ] appMsg
              )
            , ( "regionUpdate"
              , Type.function [ regionOperation ] appMsg
              )
            ]
    , modelRecord =
        Type.record
            [ ( "key", Type.var "key" )
            , ( "url", Gen.Url.annotation_.url )
            , ( "states"
              , stateCache
              )
            , ( "regions", regionsRecord )
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
    Elm.apply (Elm.get "toCmd" config)
        [ Elm.record
            [ ( "navKey", navKey )
            , ( "toApp", Elm.val "Global" )
            , ( "dropPageCache", Elm.val "PageCacheCleared" )
            , ( "regionUpdate", Elm.val "ViewUpdated" )
            , ( "preload", Elm.val "Preload" )
            ]
        , frameModel
        , effect
        ]


toSub : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
toSub config frameModel sub =
    Elm.apply (Elm.get "toSub" config) [ frameModel, sub ]


getState : Elm.Expression -> Elm.Expression -> Elm.Expression
getState key model =
    Gen.App.State.call_.get key (Elm.get "states" model)


setState : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
setState key val model =
    Gen.App.State.call_.insert key val (Elm.get "states" model)


setRegion region value regions =
    Elm.apply
        (Elm.value
            { importFrom = [ "App", "View", "Id" ]
            , name = "setRegion"
            , annotation = Nothing
            }
        )
        [ region, value, regions ]


loadPage :
    List PageUsage
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
        ( "pageid", Just types.pageId )
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
                                                    |> Gen.App.State.call_.setCurrent pageId
                                              )
                                            , ( "regions"
                                              , setRegion
                                                    (Elm.value
                                                        { importFrom = [ "App", "View", "Id" ]
                                                        , name = "Primary"
                                                        , annotation = Nothing
                                                        }
                                                    )
                                                    pageId
                                                    (Elm.get "regions" model)
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
                                        , ( "regions"
                                          , setRegion
                                                (Elm.value
                                                    { importFrom = [ "App", "View", "Id" ]
                                                    , name = "Primary"
                                                    , annotation = Nothing
                                                    }
                                                )
                                                pageId
                                                (Elm.get "regions" model)
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
                                                    |> Gen.App.State.call_.setCurrent pageId
                                              )
                                            , ( "regions"
                                              , setRegion
                                                    (Elm.value
                                                        { importFrom = [ "App", "View", "Id" ]
                                                        , name = "Primary"
                                                        , annotation = Nothing
                                                        }
                                                    )
                                                    pageId
                                                    (Elm.get "regions" model)
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
                        (Elm.val "toPageKey")
                        [ route ]
                    )
                |> Elm.Let.toExpression
                |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
        )


preloadPage :
    List PageUsage
    ->
        { declaration : Elm.Declaration
        , call : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , callFrom :
            List String -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , value : List String -> Elm.Expression
        }
preloadPage routes =
    Elm.Declare.fn4 "preloadPage"
        ( "config", Just types.frameUpdate )
        ( "model", Just types.model )
        ( "pageId", Just types.pageId )
        ( "initialization", Just types.pageLoadResult )
        (\config model pageIdToPreload initialization ->
            Elm.Let.letIn
                (\pageId ->
                    Elm.Case.custom initialization
                        (Type.namedWith
                            [ "App", "Engine", "Page" ]
                            "InitPlan"
                            [ Type.var "msg", Type.var "model" ]
                        )
                        [ Elm.Case.branch0 "NotFound"
                            (Elm.tuple model
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
                                                            [ pageIdToPreload ]
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
                                                [ pageIdToPreload
                                                ]
                                            )
                                    )
                            )
                        ]
                )
                |> Elm.Let.value "pageKey"
                    (Elm.apply
                        (Elm.val "toPageKey")
                        [ pageIdToPreload ]
                    )
                |> Elm.Let.toExpression
                |> Elm.withType (Type.tuple types.model (Gen.App.Effect.annotation_.effect types.msg))
        )


getPageInit :
    List PageUsage
    ->
        { declaration : Elm.Declaration
        , call : Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , callFrom :
            List String -> Elm.Expression -> Elm.Expression -> Elm.Expression -> Elm.Expression
        , value : List String -> Elm.Expression
        }
getPageInit routes =
    Elm.Declare.fn3 "getPageInit"
        ( "pageId", Just types.pageId )
        ( "shared", Just sharedType )
        ( "cache", Just (Gen.App.State.annotation_.cache (Type.named [] "State")) )
        (\pageId shared cache ->
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
                                        (\pageDetails keyString ->
                                            Elm.apply
                                                (Elm.get "init" pageDetails)
                                                [ params
                                                , shared
                                                , getPage keyString
                                                    stateKey
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
                                                            , ( "onMsg"
                                                              , Elm.apply
                                                                    (Elm.val pageMsgTypeName)
                                                                    [ keyString ]
                                                              )
                                                            ]
                                                        ]
                                                    )
                                        )
                                        |> Elm.Let.value "pageDetails"
                                            (Elm.apply
                                                Gen.App.Engine.Page.values_.toInternalDetails
                                                [ pageConfig ]
                                            )
                                        |> Elm.Let.value "keyString"
                                            (Elm.apply (Elm.val "toPageKey")
                                                [ pageId ]
                                            )
                                        |> Elm.Let.toExpression
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
    List PageUsage
    -> Elm.Expression
    -> Elm.Expression
    -> Elm.Expression
    -> List Elm.Case.Branch
updatePageBranches pages config shared model =
    pages
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
                Elm.Case.branch2 pageMsgTypeName
                    ( "pageId", Type.string )
                    ( "pageMsg", Type.named pageModule "Msg" )
                    (\pageId pageMsg ->
                        getPage pageId
                            stateKey
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
                                                    Elm.apply (Elm.val stateKey)
                                                        [ innerPageModel ]
                                            in
                                            Elm.tuple
                                                (model
                                                    |> Elm.updateRecord
                                                        [ ( "states", setState pageId pageModel model )
                                                        ]
                                                )
                                                (pageEffect
                                                    |> Gen.App.Effect.call_.map
                                                        (Elm.apply
                                                            (Elm.val pageMsgTypeName)
                                                            [ pageId
                                                            ]
                                                        )
                                                )
                                        )
                                        |> Elm.Let.tuple "updatedPage" "pageEffect" updated
                                        |> Elm.Let.toExpression
                            }
                    )
            )


getPage :
    Elm.Expression
    -> String
    -> Elm.Expression
    ->
        { just : Elm.Expression -> Elm.Expression
        , nothing : Elm.Expression
        }
    -> Elm.Expression
getPage pageId pageConstructor states onFound =
    Elm.Case.maybe (Gen.App.State.call_.get pageId states)
        { nothing = onFound.nothing
        , just =
            Tuple.pair "foundPage" <|
                \foundPage ->
                    Elm.Case.custom foundPage
                        types.pageModel
                        [ Elm.Case.branch1 pageConstructor
                            ( "page", types.pageModel )
                            onFound.just
                        , Elm.Case.otherwise
                            (\_ ->
                                onFound.nothing
                            )
                        ]
        }
