module App.Page exposing
    ( Page, page
    , withUrlSync
    , toInit, toUpdate, toSubscriptions, toView, toUrlSync
    )

{-|

@docs Page, page

@docs withUrlSync


# Internal Details

@docs toInit, toUpdate, toSubscriptions, toView, toUrlSync

-}

import App.Effect
import App.Shared
import App.Sub
import App.View


{-| -}
type Page params msg model
    = Page
        { init : params -> App.Shared.Shared -> Maybe model -> ( model, App.Effect.Effect msg )
        , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
        , view : App.Shared.Shared -> model -> App.View.View msg
        , urlSync :
            Maybe
                { toParams : model -> params
                }
        }


{-| -}
page :
    { init : params -> App.Shared.Shared -> Maybe model -> ( model, App.Effect.Effect msg )
    , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
    , view : App.Shared.Shared -> model -> App.View.View msg
    }
    -> Page params msg model
page options =
    Page
        { init = options.init
        , update = options.update
        , subscriptions = options.subscriptions
        , view = options.view
        , urlSync = Nothing
        }



{- URL SYNCING -}


{-| -}
withUrlSync :
    { toParams : model -> params
    }
    -> Page params msg model
    -> Page params msg model
withUrlSync urlSync (Page details) =
    Page { details | urlSync = Just urlSync }


{-| -}
toInit :
    Page params msg model
    -> (params -> App.Shared.Shared -> Maybe model -> ( model, App.Effect.Effect msg ))
toInit (Page details) =
    details.init


{-| -}
toUpdate :
    Page params msg model
    -> (App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ))
toUpdate (Page details) =
    details.update


{-| -}
toSubscriptions :
    Page params msg model
    -> (App.Shared.Shared -> model -> App.Sub.Sub msg)
toSubscriptions (Page details) =
    details.subscriptions


{-| -}
toView :
    Page params msg model
    -> (App.Shared.Shared -> model -> App.View.View msg)
toView (Page details) =
    details.view


{-| -}
toUrlSync :
    Page params msg model
    ->
        Maybe
            { toParams : model -> params
            }
toUrlSync (Page details) =
    details.urlSync
