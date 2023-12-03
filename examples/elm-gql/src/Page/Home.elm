module Page.Home exposing
    ( Model, Msg, MyType(..)
    , page
    )

{-|

@docs Model, Msg, MyType

-}

import App.Effect as Effect
import App.Engine.Page
import App.Page
import App.Shared
import App.Sub
import Browser
import Html


type alias Params =
    {}


{-| -}
type alias Model =
    String


{-| -}
type Msg
    = NoOp
    | Show App.Shared.Shared


{-| -}
type MyType
    = First
    | Second String


page : App.Page.Page Params Msg Model
page =
    App.Page.page
        { init =
            \params shared maybeCached ->
                App.Page.init "HEllo!"
        , update =
            \shared msg model ->
                case msg of
                    NoOp ->
                        ( model, Effect.none )

                    Show html ->
                        ( model, Effect.none )
        , subscriptions = \shared model -> App.Sub.none
        , view =
            \region shared model ->
                { title = "test"
                , body =
                    Html.text model
                }
        }
