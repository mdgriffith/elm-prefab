module App.Page exposing
    ( Page, page
    , Init, init, initWith, notFound, loadFrom
    , InitPlan(..), toInternalDetails, mapInitPlan
    )

{-|

@docs Page, page

@docs Init, init, initWith, notFound, loadFrom


# Internal Details

These are

@docs InitPlan, toInternalDetails, mapInitPlan

-}

import App.Effect
import App.Shared
import App.Sub
import App.View


{-| -}
type Page params msg model
    = Page
        { init : params -> App.Shared.Shared -> Maybe model -> Init msg model
        , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
        , view : App.Shared.Shared -> model -> App.View.View msg
        }


{-| -}
page :
    { init : params -> App.Shared.Shared -> Maybe model -> Init msg model
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


{-| -}
type alias Init msg model =
    InitPlan msg model


{-| -}
type InitPlan msg model
    = NotFound
    | Loaded model (App.Effect.Effect msg)
    | LoadFrom (App.Effect.Effect (InitPlan msg model))


{-| -}
mapInitPlan :
    { onModel : model -> model2
    , onMsg : msg -> msg2
    }
    -> InitPlan msg model
    -> InitPlan msg2 model2
mapInitPlan ({ onModel, onMsg } as fns) initPlan =
    case initPlan of
        NotFound ->
            NotFound

        Loaded model effect ->
            Loaded (onModel model) (App.Effect.map onMsg effect)

        LoadFrom effect ->
            LoadFrom (App.Effect.map (mapInitPlan fns) effect)


{-| -}
init : model -> Init msg model
init model =
    Loaded model App.Effect.none


{-| -}
initWith : model -> App.Effect.Effect msg -> Init msg model
initWith model effect =
    Loaded model effect


{-| -}
notFound : Init msg model
notFound =
    NotFound


{-| -}
loadFrom : App.Effect.Effect (Init msg model) -> Init msg model
loadFrom effect =
    LoadFrom effect



{- Internal -}


{-| -}
toInternalDetails :
    Page params msg model
    ->
        { init : params -> App.Shared.Shared -> Maybe model -> ( model, App.Effect.Effect msg )
        , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
        , view : App.Shared.Shared -> model -> App.View.View msg
        }
toInternalDetails (Page details) =
    details
