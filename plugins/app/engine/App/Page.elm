module App.Page exposing
    ( Page, page
    , Init, init, initWith, notFound, loadFrom
    , InitPlan(..), toInternalDetails, mapInitPlan
    )

{-|

@docs Page, page

@docs Init, init, initWith, notFound, loadFrom



# Internal Details

These are used internally and you shouldn't need to worry about them!

@docs InitPlan, toInternalDetails, mapInitPlan

-}

import App.Effect
import App.Shared
import App.Sub
import App.View
import App.PageError


{-| -}
type alias Page params msg model
    = PageDetails App.Shared.Shared params msg model
    
    
type PageDetails shared params msg model =
    Page
        { init : params -> shared -> Maybe model -> Init msg model
        , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : shared -> model -> App.Sub.Sub msg
        , view : shared -> model -> Result App.PageError.Error (App.View.View msg)
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
        , view = 
            \shared model ->
                Ok (options.view shared model)
        }

{-|--}
withGuard : (shared -> Result App.PageError.Error newShared) -> PageDetails newShared params msg model -> PageDetails shared params msg model
withGuard toShared (Page options) =
    Page
        { init = 
            \params shared maybeModel ->
                case toShared shared of
                    Err err ->
                        Error err
                    
                    Ok newShared ->
                        options.init params newShared maybeModel 
        , update =
            \shared msg model ->
                 case toShared shared of
                    Err err ->
                        (model, App.Effect.none)
                    
                    Ok newShared ->
                        options.update newShared msg model
        , subscriptions = 
             \shared model ->
                 case toShared shared of
                    Err err ->
                        App.Sub.none
                    
                    Ok newShared ->
                        options.subscriptions newShared model
        , view = 
             \shared model ->
                 case toShared shared of
                    Err err ->
                        Err err
                    
                    Ok newShared ->
                        options.view newShared model
        }

{-| -}
type alias Init msg model =
    InitPlan msg model


{-| -}
type InitPlan msg model
    = NotFound
    | Error App.PageError.Error
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

        Error err ->
            Error err

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


{-|-}
error : App.PageError.Error -> Init msg model
error pageError =
    Error pageError



{- Internal -}


{-| -}
toInternalDetails :
    Page params msg model
    ->
        { init : params -> App.Shared.Shared -> Maybe model -> Init msg model
        , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
        , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
        , view : App.Shared.Shared -> model -> Result App.PageError.Error (App.View.View msg)
        }
toInternalDetails (Page details) =
    details
