module Page.Module exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Effect
import App.Page
import App.Page.Id
import App.Resources
import App.Sub
import App.View
import App.View.Id
import Ui


{-| -}
type alias Model =
    {}


{-| -}
type Msg
    = ReplaceMe


page : App.Page.Page App.Resources.Resources App.Page.Id.Module_Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : App.Page.Id.Module_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model
init params shared maybeCached =
    App.Page.init {}


update : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update shared msg model =
    ( model, App.Effect.none )


subscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg
subscriptions shared model =
    App.Sub.none


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId shared model =
    { title = "Module"
    , body = Ui.text "Module"
    }
