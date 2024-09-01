module Page.{{name}} exposing
    ( Model, Msg
    , page
    )

{-|

@docs page, Model, Msg

-}

import Effect
import App.Page
import App.Page.Id
import App.Resources
import Sub
import App.View
import App.View.Id
import Html


{-|

-}
type alias Params =
    App.Page.Id.{{name}}_Params


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


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect.Effect Msg )
update resources msg model =
    ( model, Effect.none )


subscriptions : App.Resources.Resources -> Model -> Sub.Sub Msg
subscriptions resources model =
    Sub.none


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId resources model =
   { title = "{{name}}"
   , body = Html.text "{{name}}"
   }
