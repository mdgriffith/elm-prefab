module Page.Markdown exposing (Model, Msg, page)

{-|

@docs Model, Msg, page

-}

import App.Effect
import App.Page
import App.Sub
import Browser
import Html


{-| -}
type alias Model =
    { sourceUrl : String }


{-| -}
type alias Msg =
    {}


{-| -}
page : App.Page.Page { sourceUrl : String } shared Msg Model
page =
    App.Page.page
        { init =
            \params shared maybeCached ->
                App.Page.init params
        , update = \shared msg model -> ( model, App.Effect.none )
        , subscriptions = \shared model -> App.Sub.none
        , view =
            \shared model ->
                { title = "Markdown"
                , body =
                    Html.text model.sourceUrl
                }
        }
