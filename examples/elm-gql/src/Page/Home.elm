module Page.Home exposing (Model, Msg, page)

{-| -}

import App
import Browser
import Html


type alias Model =
    String


type alias Msg =
    {}


page : App.Page {} shared Model Msg (Browser.Document Msg)
page =
    App.page
        { init =
            \params shared ->
                ( "HEllo!"
                , App.none
                )
        , update = \shared msg model -> ( model, App.none )
        , subscriptions = \pageUnpack -> \unpack -> App.Subscription Sub.none
        , view =
            \shared model ->
                { title = "test"
                , body =
                    [ Html.text model ]
                }
        }
