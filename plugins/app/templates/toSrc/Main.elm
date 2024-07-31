module Main exposing (main)

{-| -}

import App
import App.Effect
import App.Page.Id
import App.Resources
import App.Route
import App.Sub
import App.View.Id
import Browser
import Url


type alias Model =
    {}


{-| -}
main : App.App Model Msg
main =
    App.app
        { init =
            \resources flags url ->
                gotoUrl url {} App.Effect.none
        , onUrlChange = UrlChanged
        , onUrlRequest = UrlRequested
        , update = update
        , subscriptions =
            \resources model -> Sub.none
        , toCmd =
            \resources options model effect ->
                App.Effect.toCmd options effect
        , toSub =
            \resources options model sub ->
                App.Sub.toSubscription options sub
        , view =
            \resources toAppMsg model regions ->
                case regions.primary of
                    Nothing ->
                        { title = "Loading"
                        , body = []
                        }

                    Just (App.Loading _) ->
                        { title = "Loading"
                        , body = []
                        }

                    Just App.NotFound ->
                        { title = "Not found"
                        , body = []
                        }

                    Just (App.Error error) ->
                        { title = "Error"
                        , body = []
                        }

                    Just (App.View pageContent) ->
                        { title = pageContent.title
                        , body = [ pageContent.body ]
                        }
        }


type Msg
    = UrlRequested Browser.UrlRequest
    | UrlChanged Url.Url


update : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update resources msg model =
    case msg of
        UrlRequested (Browser.Internal url) ->
            ( model, App.Effect.pushUrl (Url.toString url) )

        UrlRequested (Browser.External urlStr) ->
            ( model, App.Effect.load urlStr )

        UrlChanged url ->
            gotoUrl url model App.Effect.none


gotoUrl : Url.Url -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )
gotoUrl url model eff =
    case App.Route.parse url of
        Nothing ->
            ( model
            , eff
            )

        Just { isRedirect, route } ->
            if isRedirect then
                ( model
                , App.Effect.replaceUrl (App.Route.toString route)
                )

            else
                case App.Page.Id.fromRoute route of
                    Nothing ->
                        ( model, App.Effect.none )

                    Just pageId ->
                        ( model
                        , App.Effect.batch
                            [ App.Effect.loadAt App.View.Id.Primary pageId
                            , eff
                            ]
                        )
