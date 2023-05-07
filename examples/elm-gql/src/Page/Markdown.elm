module Page.Markdown exposing (Model, Msg, page)

{-| -}

import App.Effect
import App.Sub
import Browser
import Html


type alias Model =
    { sourceUrl : String }


type alias Msg =
    {}


page =
    { init =
        \params shared ->
            ( params
            , App.Effect.none
            )
    , update = \msg model -> ( model, App.Effect.none )
    , subscriptions = \model -> App.Sub.none
    , view =
        \model ->
            { title = "Markdown"
            , body =
                Html.text model.sourceUrl
            }
    }
