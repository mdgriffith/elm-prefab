module App exposing (App, CmdOptions, Msg, SubOptions, Test, View(..), app, test)

{-| 
## App

@docs App, CmdOptions, SubOptions, app, View

## Testing

@docs Test, test

@docs Msg
-}


import App.Effect
import App.Page
import App.Page.Error
import App.Page.Id
import App.Resource.Msg
import App.Resources
import App.State
import App.Sub
import App.View
import App.View.Id
import Browser
import Browser.Navigation
import Json.Encode
import Page.Home
import Set
import Url


type alias App model msg =
    Program Json.Encode.Value (Model Browser.Navigation.Key model) (Msg msg)


type alias CmdOptions msg =
    { navKey : Browser.Navigation.Key
    , toApp : msg -> Msg msg
    , dropPageCache : Msg msg
    , preload : App.Page.Id.Id -> Msg msg
    , viewRequested : App.View.Id.Operation App.Page.Id.Id -> Msg msg
    , sendToResource : App.Resource.Msg.Msg -> Msg msg
    }


type alias SubOptions msg =
    { ignore : String -> Msg msg }


initResources : Json.Encode.Value -> Url.Url -> App.Resources.Resources
initResources flags url =
    {}


toPageKey : App.Page.Id.Id -> String
toPageKey pageId =
    case pageId of
        App.Page.Id.Home params ->
            let
                pageDetails =
                    App.Page.toInternalDetails Page.Home.page
            in
            case pageDetails.toKey of
                Nothing ->
                    "Home"

                Just toKey ->
                    "Home" ++ toKey params


toPageGroupKey : App.Page.Id.Id -> String
toPageGroupKey pageId =
    case pageId of
        App.Page.Id.Home params ->
            "Home"


toPageLimit : App.Page.Id.Id -> Int
toPageLimit pageId =
    case pageId of
        App.Page.Id.Home params ->
            App.Page.toInternalDetails Page.Home.page |> .pageCacheLimit


app :
    { init :
        App.Resources.Resources
        -> Json.Encode.Value
        -> Url.Url
        -> ( model, App.Effect.Effect msg )
    , update :
        App.Resources.Resources
        -> msg
        -> model
        -> ( model, App.Effect.Effect msg )
    , subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
    , view :
        App.Resources.Resources
        -> (msg -> Msg msg)
        -> model
        -> App.View.Regions (View (Msg msg))
        -> Browser.Document (Msg msg)
    , toCmd :
        App.Resources.Resources
        -> CmdOptions msg
        -> model
        -> App.Effect.Effect (Msg msg)
        -> Cmd.Cmd (Msg msg)
    , toSub :
        App.Resources.Resources
        -> SubOptions msg
        -> model
        -> App.Sub.Sub (Msg msg)
        -> Sub.Sub (Msg msg)
    , onUrlChange : Url.Url -> msg
    , onUrlRequest : Browser.UrlRequest -> msg
    }
    -> App model msg
app config =
    Browser.application
        { init =
            \flags url key ->
                let
                    ( newModel, effect ) =
                        let
                            resources =
                                initResources flags url

                            ( appModel, appEffect ) =
                                config.init resources flags url
                        in
                        ( { key = key
                          , views = App.View.Id.empty
                          , app = appModel
                          , resources = resources
                          , limits = App.State.initLimit
                          , states = App.State.init
                          }
                        , App.Effect.batch
                            [ App.Effect.map Global appEffect
                            , syncResourcesToLocalStorage resources
                            ]
                        )
                in
                ( newModel
                , config.toCmd
                    newModel.resources
                    { navKey = newModel.key
                    , toApp = Global
                    , dropPageCache = PageCacheCleared
                    , viewRequested = ViewUpdated
                    , sendToResource = Resource
                    , preload = Preload
                    }
                    newModel.app
                    effect
                )
        , update =
            \msg model ->
                let
                    ( newModel, effect ) =
                        update config msg model
                in
                ( newModel
                , config.toCmd
                    newModel.resources
                    { navKey = newModel.key
                    , toApp = Global
                    , dropPageCache = PageCacheCleared
                    , viewRequested = ViewUpdated
                    , sendToResource = Resource
                    , preload = Preload
                    }
                    newModel.app
                    effect
                )
        , view = view config
        , subscriptions = subscriptions config
        , onUrlChange = \url -> Global (config.onUrlChange url)
        , onUrlRequest = \urlRequest -> Global (config.onUrlRequest urlRequest)
        }


type alias Test model msg =
    { init :
        Json.Encode.Value
        -> Url.Url
        -> ()
        -> ( Model () model, App.Effect.Effect (Msg msg) )
    , view : Model () model -> Browser.Document (Msg msg)
    , update :
        Msg msg
        -> Model () model
        -> ( Model () model, App.Effect.Effect (Msg msg) )
    , onUrlRequest : Browser.UrlRequest -> Msg msg
    , onUrlChange : Url.Url -> Msg msg
    }


test :
    { config
        | init :
            App.Resources.Resources
            -> Json.Encode.Value
            -> Url.Url
            -> ( model, App.Effect.Effect msg )
        , update :
            App.Resources.Resources
            -> msg
            -> model
            -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , view :
            App.Resources.Resources
            -> (msg -> Msg msg)
            -> model
            -> App.View.Regions (View (Msg msg))
            -> Browser.Document (Msg msg)
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
        , onUrlChange : Url.Url -> msg
        , onUrlRequest : Browser.UrlRequest -> msg
    }
    -> Test model msg
test config =
    { init =
        \flags url key ->
            let
                resources =
                    initResources flags url

                ( appModel, appEffect ) =
                    config.init resources flags url
            in
            ( { key = key
              , views = App.View.Id.empty
              , app = appModel
              , resources = resources
              , limits = App.State.initLimit
              , states = App.State.init
              }
            , App.Effect.batch
                [ App.Effect.map Global appEffect
                , syncResourcesToLocalStorage resources
                ]
            )
    , view = view config
    , update = update config
    , onUrlChange = \url -> Global (config.onUrlChange url)
    , onUrlRequest = \urlRequest -> Global (config.onUrlRequest urlRequest)
    }


type alias Model key app =
    { key : key
    , limits : App.State.Limit
    , states : App.State.Cache State
    , views : App.View.Regions App.Page.Id.Id
    , resources : App.Resources.Resources
    , app : app
    }


type State
    = PageError_ App.Page.Error.Error
    | PageLoading_ App.Page.Id.Id
    | Home Page.Home.Model


type View appMsg
    = NotFound
    | Loading App.Page.Id.Id
    | Error App.Page.Error.Error
    | View (App.View.View appMsg)


viewPageModel :
    App.Resources.Resources
    -> App.State.Cache State
    -> App.View.Id.Id
    -> App.Page.Id.Id
    -> View (Msg msg)
viewPageModel resources states regionId pageId =
    case App.State.get (toPageKey pageId) states of
        Nothing ->
            NotFound

        Just currentState ->
            case currentState of
                PageError_ pageError ->
                    Error pageError

                PageLoading_ loadingPageId ->
                    Loading loadingPageId

                Home pageModel ->
                    let
                        pageDetails =
                            App.Page.toInternalDetails Page.Home.page

                        pageViewResult =
                            pageDetails.view regionId resources pageModel
                    in
                    case pageViewResult of
                        Ok pageViewSuccess ->
                            View
                                (App.View.map
                                    (\innerMsg -> ToHome pageId innerMsg)
                                    pageViewSuccess
                                )

                        Err pageError ->
                            Error pageError


type Msg msg
    = PageCacheCleared
    | Preload App.Page.Id.Id
    | ViewUpdated (App.View.Id.Operation App.Page.Id.Id)
    | SubscriptionEventIgnored String
    | Resource App.Resource.Msg.Msg
    | Global msg
    | Loaded App.Page.Id.Id (App.Page.Init (Msg msg) State)
    | ToHome App.Page.Id.Id Page.Home.Msg


update :
    { config
        | update :
            App.Resources.Resources
            -> msg
            -> model
            -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
    }
    -> Msg msg
    -> Model key model
    -> ( Model key model, App.Effect.Effect (Msg msg) )
update config msg model =
    case msg of
        PageCacheCleared ->
            ( model, App.Effect.none )

        Preload pageId ->
            getPageInit pageId model.resources model.states
                |> loadPage config model pageId

        Loaded pageId initialization ->
            loadPage config model pageId initialization

        ViewUpdated operation ->
            let
                ( newRegions, regionDiff ) =
                    App.View.Id.update operation model.views
            in
            List.foldl
                (\pageId inner ->
                    let
                        ( innerModel, innerEffect ) =
                            inner

                        ( preloadedModel, preloadedEffect ) =
                            getPageInit
                                pageId
                                innerModel.resources
                                innerModel.states
                                |> loadPage config innerModel pageId
                    in
                    ( preloadedModel
                    , App.Effect.batch [ innerEffect, preloadedEffect ]
                    )
                )
                ( { model | views = newRegions }, App.Effect.none )
                regionDiff.added

        SubscriptionEventIgnored msg0 ->
            ( model, App.Effect.none )

        Global appMsg ->
            let
                ( newFrame, frameEffect ) =
                    config.update model.resources appMsg model.app
            in
            ( { model | app = newFrame }, App.Effect.map Global frameEffect )

        Resource resourceMsg ->
            updateResource config resourceMsg model

        ToHome pageId pageMsg ->
            case App.State.get (toPageKey pageId) model.states of
                Nothing ->
                    ( model, App.Effect.none )

                Just foundPage ->
                    case foundPage of
                        Home page ->
                            let
                                ( updatedPage, pageEffect ) =
                                    let
                                        pageDetails =
                                            App.Page.toInternalDetails
                                                Page.Home.page
                                    in
                                    pageDetails.update
                                        model.resources
                                        pageMsg
                                        page
                            in
                            ( { model
                                | states =
                                    App.State.insert
                                        (toPageKey pageId)
                                        (Home updatedPage)
                                        model.states
                              }
                            , App.Effect.map (ToHome pageId) pageEffect
                            )

                        otherwise ->
                            ( model, App.Effect.none )


updateResource :
    { config
        | subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
    }
    -> App.Resource.Msg.Msg
    -> Model key model
    -> ( Model key model, App.Effect.Effect (Msg msg) )
updateResource config outerResourceMsg model =
    ( model, App.Effect.none )


syncResourcesToLocalStorage :
    App.Resources.Resources -> App.Effect.Effect (Msg msg)
syncResourcesToLocalStorage resources =
    App.Effect.none


getPageInit :
    App.Page.Id.Id
    -> App.Resources.Resources
    -> App.State.Cache State
    -> App.Page.Init (Msg msg) State
getPageInit pageId resources cache =
    case pageId of
        App.Page.Id.Home params ->
            let
                pageDetails =
                    App.Page.toInternalDetails Page.Home.page

                pageKey =
                    toPageKey pageId
            in
            pageDetails.init
                params
                resources
                (case App.State.get pageKey cache of
                    Nothing ->
                        Nothing

                    Just foundPage ->
                        case foundPage of
                            Home page ->
                                Just page

                            otherwise ->
                                Nothing
                )
                |> App.Page.mapInitPlan
                    { onModel = Home, onMsg = ToHome pageId }


loadPage :
    { config
        | update :
            App.Resources.Resources
            -> msg
            -> model
            -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
    }
    -> Model key model
    -> App.Page.Id.Id
    -> App.Page.Init (Msg msg) State
    -> ( Model key model, App.Effect.Effect (Msg msg) )
loadPage config model pageId initialization =
    let
        pageKey =
            toPageKey pageId

        pageGroupKey =
            toPageGroupKey pageId

        keep =
            App.View.Id.toList model.views |> List.map toPageKey |> Set.fromList
    in
    case initialization of
        App.Page.NotFound ->
            ( { model | states = App.State.remove pageKey model.states }
            , App.Effect.none
            )

        App.Page.Error err ->
            ( { model
                | states =
                    App.State.insert pageKey (PageError_ err) model.states
              }
            , App.Effect.none
            )

        App.Page.Loaded newPage pageEffect ->
            let
                limitUpdated =
                    App.State.addToLimit
                        { groupId = pageGroupKey
                        , instanceId = pageKey
                        , max = toPageLimit pageId
                        , keep = keep
                        }
                        model.limits
            in
            ( { model
                | states =
                    App.State.purge
                        limitUpdated.removedIds
                        (App.State.insert pageKey newPage model.states)
                , limits = limitUpdated.limit
              }
            , pageEffect
            )

        App.Page.LoadFrom pageEffect ->
            ( { model
                | states =
                    App.State.insert pageKey (PageLoading_ pageId) model.states
              }
            , App.Effect.map (Loaded pageId) pageEffect
            )


view :
    { config
        | view :
            App.Resources.Resources
            -> (msg -> Msg msg)
            -> model
            -> App.View.Regions (View (Msg msg))
            -> Browser.Document (Msg msg)
    }
    -> Model key model
    -> Browser.Document (Msg msg)
view config model =
    let
        viewRegions =
            App.View.Id.mapRegion
                (viewPageModel model.resources model.states)
                model.views
    in
    config.view model.resources Global model.app viewRegions


getSubscriptions :
    { config
        | subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
    }
    -> Model key model
    -> App.Sub.Sub (Msg msg)
getSubscriptions config model =
    App.Sub.batch
        [ App.Sub.map Global (config.subscriptions model.resources model.app)
        , App.Sub.batch
            (List.filterMap
                (\pageId ->
                    case App.State.get (toPageKey pageId) model.states of
                        Nothing ->
                            Nothing

                        Just pageState ->
                            Just
                                (case pageState of
                                    PageError_ pageError ->
                                        App.Sub.none

                                    PageLoading_ pageId0 ->
                                        App.Sub.none

                                    Home pageModel ->
                                        let
                                            pageDetails =
                                                App.Page.toInternalDetails
                                                    Page.Home.page
                                        in
                                        App.Sub.map
                                            (ToHome pageId)
                                            (pageDetails.subscriptions
                                                model.resources
                                                pageModel
                                            )
                                )
                )
                (App.View.Id.toList model.views)
            )
        ]


subscriptions :
    { config
        | subscriptions : App.Resources.Resources -> model -> App.Sub.Sub msg
        , toSub :
            App.Resources.Resources
            -> SubOptions msg
            -> model
            -> App.Sub.Sub (Msg msg)
            -> Sub.Sub (Msg msg)
    }
    -> Model key model
    -> Sub.Sub (Msg msg)
subscriptions config model =
    config.toSub
        model.resources
        { ignore = SubscriptionEventIgnored }
        model.app
        (getSubscriptions config model)