module Page.Home exposing
    ( Model, Msg, MyType(..)
    , page
    )

{-|

@docs Model, Msg, MyType

-}

import App.Effect as Effect
import App.Page
import App.Sub
import Browser
import Html


{-| -}
type alias Model =
    String


{-| -}
type alias Msg =
    {}


{-| -}
type MyType
    = First
    | Second String


{-| -}
page =
    App.Page.page
        { init =
            \params shared ->
                ( "HEllo!"
                , Effect.none
                )
        , update = \msg model -> ( model, Effect.none )
        , subscriptions = \model -> App.Sub.none
        , view =
            \model ->
                { title = "test"
                , body =
                    Html.text model
                }
        }
