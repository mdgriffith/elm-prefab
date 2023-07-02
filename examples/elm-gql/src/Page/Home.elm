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
            \params shared maybeCached ->
                App.Page.init "HEllo!"
        , update = \shared msg model -> ( model, Effect.none )
        , subscriptions = \shared model -> App.Sub.none
        , view =
            \shared model ->
                { title = "test"
                , body =
                    Html.text model
                }
        }
