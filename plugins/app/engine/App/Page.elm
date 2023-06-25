module App.Page exposing
    ( Page, page
    , withUrlSync, ParamChange(..)
    , toInit, toUpdate, toSubscriptions, toView, toUrlSync
    )

{-|

@docs Page, page

@docs withUrlSync, ParamChange, sendParamsToCurrentPage, loadNewPage


# Internal Details

@docs toInit, toUpdate, toSubscriptions, toView, toUrlSync

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
        , urlSync :
            Maybe
                { toParams : model -> params
                , onParamChange : params -> ParamChange msg
                }
        }


{-| -}
page :
    { init : params -> shared -> Maybe model -> ( model, App.Effect.Effect msg )
    , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : shared -> model -> App.Sub.Sub msg
    , view : shared -> model -> App.View.View msg
    }
    -> Page params shared msg model
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
    , onParamChange : params -> ParamChange msg
    }
    -> Page params shared msg model
    -> Page params shared msg model
withUrlSync urlSync page =
    { page | urlSync = Just urlSync }


type ParamChange msg
    = SendParamsToCurrentPage msg
    | LoadNewPage


{-| -}
sendParamsToCurrentPage : msg -> ParamChange msg
sendParamsToCurrentPage msg =
    SendParamsToCurrentPage msg


{-| -}
loadNewPage : ParamChange msg
loadNewPage =
    LoadNewPage


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


{-| -}
toUrlSync :
    Page params shared msg model
    ->
        Maybe
            { toParams : model -> params
            , onParamChange : params -> ParamChange msg
            }
toUrlSync (Page details) =
    details.urlSync
