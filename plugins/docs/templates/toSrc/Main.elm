module Main exposing (main)

{-| -}

import App
import App.Resources
import App.View
import Browser
import Effect exposing (Effect)
import Effect.Nav
import Html
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
            \resources model ->
                Listen.none
        , toCmd = toCmd
        , toSub = toSub
        , view =
            \resources toAppMsg model regions ->
                case regions.primary of
                    Nothing ->
                        { title = "Nothing"
                        , body = [ Html.text "Nothing" ]
                        }

                    Just (App.Loading _) ->
                        { title = "Loading"
                        , body = [ Html.text "Loading" ]
                        }

                    Just App.NotFound ->
                        --
                        { title = "Not found"
                        , body = [ Html.text "Not found" ]
                        }

                    Just (App.Error error) ->
                        -- error is a type you control that lives at App.Page.Error
                        { title = "Not found"
                        , body = [ Html.text "Not found" ]
                        }

                    Just (App.View page) ->
                        view resources toAppMsg model page
        }


toSub : App.Resources.Resources -> App.SubOptions Msg -> Model -> Listen.Listen (App.Msg Msg) -> Sub (App.Msg Msg)
toSub resources options model sub =
    Listen.toSubscription options sub


toCmd : App.Resources.Resources -> App.CmdOptions Msg -> Model -> Effect.Effect (App.Msg Msg) -> Cmd (App.Msg Msg)
toCmd resources options model effect =
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


view :
    App.Resources.Resources
    -> (Msg -> App.Msg Msg)
    -> Model
    -> App.View.View (App.Msg Msg)
    -> Browser.Document (App.Msg Msg)
view resources toAppMsg model innerView =
    { title = innerView.title
    , body =
        [ innerView.body
        ]
    }


type Msg
    = UrlChanged Url.Url
    | UrlRequested Browser.UrlRequest


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect Msg )
update resources msg model =
    case msg of
        UrlRequested (Browser.Internal url) ->
            ( model, Effect.Nav.pushUrl (Url.toString url) )

        UrlRequested (Browser.External urlStr) ->
            ( model, Effect.Nav.load urlStr )

        UrlChanged url ->
            ( model, Effect.Nav.toUrl url )
