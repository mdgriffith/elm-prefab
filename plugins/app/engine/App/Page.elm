module App.Page exposing
    ( Page, page
    , toInit, toUpdate, toSubscriptions, toView
    )

{-|

@docs Page, page


# Internal Details

@docs toInit, toUpdate, toSubscriptions, toView

-}

import App.Effect
import App.Sub
import App.View


{-| -}
type Page params shared msg model
    = Page
        { init : params -> shared -> Maybe model -> ( model, App.Effect.Effect msg )
        , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : shared -> model -> App.Sub.Sub msg
        , view : shared -> model -> App.View.View msg
        }


{-| -}
page :
    { init : params -> shared -> Maybe model -> ( model, App.Effect.Effect msg )
    , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : shared -> model -> App.Sub.Sub msg
    , view : shared -> model -> App.View.View msg
    }
    -> Page params shared msg model
page =
    Page


{-| -}
toInit :
    Page params shared msg model
    -> (params -> shared -> Maybe model -> ( model, App.Effect.Effect msg ))
toInit (Page details) =
    details.init


{-| -}
toUpdate :
    Page params shared msg model
    -> (shared -> msg -> model -> ( model, App.Effect.Effect msg ))
toUpdate (Page details) =
    details.update


{-| -}
toSubscriptions :
    Page params shared msg model
    -> (shared -> model -> App.Sub.Sub msg)
toSubscriptions (Page details) =
    details.subscriptions


{-| -}
toView :
    Page params shared msg model
    -> (shared -> model -> App.View.View msg)
toView (Page details) =
    details.view
