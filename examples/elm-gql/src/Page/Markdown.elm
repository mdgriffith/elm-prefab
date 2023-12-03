module Page.Markdown exposing (Model, Msg, page)

{-|

@docs Model, Msg, page

-}

import App.Effect
import App.Engine.Page
import App.Page
import App.Shared
import App.Sub
import Browser
import Html


type alias Params =
    { src : String, path : List String }


{-| -}
type alias Model =
    { src : String, path : List String }


{-| -}
type alias Msg =
    {}


page : App.Engine.Page.Page App.Shared.Shared Params Msg Model
page =
    App.Page.page
        { init =
            \params shared maybeCached ->
                App.Page.init params
        , update = \shared msg model -> ( model, App.Effect.none )
        , subscriptions = \shared model -> App.Sub.none
        , view =
            \region shared model ->
                { title = "Markdown"
                , body =
                    Html.text model.src
                }
        }
