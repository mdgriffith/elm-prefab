module App.Page exposing
    ( Page, page
    , init, update, subscriptions, view
    )

{-|

@docs Page, page


# Internal Details

@docs init, update, subscriptions, view

-}

import App.Effect
import App.Sub
import App.View


{-| -}
type Page params shared msg model
    = Page
        { init : params -> shared -> ( model, App.Effect.Effect msg )
        , update : msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : model -> App.Sub.Sub msg
        , view : model -> App.View.View msg
        }


{-| -}
page :
    { init : params -> shared -> ( model, App.Effect.Effect msg )
    , update : msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : model -> App.Sub.Sub msg
    , view : model -> App.View.View msg
    }
    -> Page params shared msg model
page =
    Page


{-| -}
init :
    Page params shared msg model
    -> (params -> shared -> ( model, App.Effect.Effect msg ))
init (Page details) =
    details.init


{-| -}
update :
    Page params shared msg model
    -> (msg -> model -> ( model, App.Effect.Effect msg ))
update (Page details) =
    details.update


{-| -}
subscriptions :
    Page params shared msg model
    -> (model -> App.Sub.Sub msg)
subscriptions (Page details) =
    details.subscriptions


{-| -}
view :
    Page params shared msg model
    -> (model -> App.View.View msg)
view (Page details) =
    details.view
