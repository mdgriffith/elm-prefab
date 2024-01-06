module Page.{{name}} exposing
    ( Model, Msg
    , page
    )

{-|

@docs Model, Msg

-}

import App.Effect
import App.Page
import App.Shared
import App.Sub
import Html


type alias Params =
    {}


{-| -}
type alias Model =
    {}


{-| -}
type Msg
    = ReplaceMe


page : App.Page.Page Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : {} -> App.Shared.Shared -> Maybe Model -> App.Page.Init Msg Model
init params shared maybeCached =
    App.Page.init {}


update : App.Shared.Shared -> Msg -> Model -> ( Model, Effect.Effect Msg )
update shared msg model =
    ( model, Effect.none )


subscriptions : App.Shared.Shared -> Model -> App.Sub.Sub Msg
subscriptions shared model =
    Sub.none


view : App.View.Id -> App.Shared.Shared -> Model -> App.View.View Msg
view viewId shared model =
    Debug.todo "Add a view to Page.{{name}}"
