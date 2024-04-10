module Page.Home exposing
    ( Model, Msg
    , page
    )

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
import Html


{-|

-}
type alias Params =
    App.Page.Id.Home_Params


{-| -}
type alias Model =
    {}


{-| -}
type Msg
    = ReplaceMe


page : App.Page.Page App.Resources.Resources Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model
init params resources maybeCached =
    App.Page.init {}


update : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update resources msg model =
    ( model, App.Effect.none )


subscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg
subscriptions resources model =
    App.Sub.none


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId resources model =
   { title = "Home"
   , body = Html.text "Home"
   }
