module Main exposing (main)

{-| -}

import App
import App.Resources
import Browser
import Effect
import Effect.Nav
import Listen
import Url


type alias Model =
    {}


{-| -}
main : App.App Model Msg
main =
    App.app
        { init =
            \resources flags url ->
                ( {}, Effect.Nav.toUrl url )
        , onUrlChange = UrlChanged
        , onUrlRequest = UrlRequested
        , update = update
        , subscriptions =
            \resources model -> Listen.none
        , toCmd =
            \resources options model effect ->
                Effect.toCmd options
                    (\urlBase ->
                        case urlBase of
                            Effect.UrlApi ->
                                { headers = []
                                , urlBase = ""
                                }

                            Effect.UrlStaticFile ->
                                { headers = []
                                , urlBase = ""
                                }

                            Effect.UrlCustom base ->
                                { headers = []
                                , urlBase = base
                                }
                    )
                    effect
        , toSub =
            \resources options model sub ->
                Listen.toSubscription options sub
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


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect.Effect Msg )
update resources msg model =
    case msg of
        UrlRequested (Browser.Internal url) ->
            ( model, Effect.Nav.pushUrl (Url.toString url) )

        UrlRequested (Browser.External urlStr) ->
            ( model, Effect.Nav.load urlStr )

        UrlChanged url ->
            ( model, Effect.Nav.toUrl url )
