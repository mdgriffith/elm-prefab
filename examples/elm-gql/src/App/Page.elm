module App.Page exposing
    ( Page, page, authenticated
    , Init, init, initWith, notFound, loadFrom, error
    )

{-|

@docs Page, page, authenticated, Page

@docs Init, init, initWith, notFound, loadFrom, error

-}

import App.Effect
import App.Engine.Page
import App.PageError
import App.Shared
import App.Sub
import App.View
import App.View.Id


type alias Page params msg model =
    App.Engine.Page.Page App.Shared.Shared params msg model


{-| -}
page :
    { init : params -> App.Shared.Shared -> Maybe model -> Init msg model
    , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
    , view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg
    }
    -> App.Engine.Page.Page App.Shared.Shared params msg model
page =
    App.Engine.Page.page


{-| -}
authenticated :
    { init : params -> App.Shared.Shared -> Maybe model -> Init msg model
    , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )
    , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg
    , view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg
    }
    -> Page params msg model
authenticated options =
    App.Engine.Page.page options
        |> App.Engine.Page.withGuard
            (\shared ->
                case shared.authenticated of
                    App.Shared.Authenticated ->
                        Ok shared

                    App.Shared.Unauthenticated ->
                        Err App.PageError.Unauthenticated
            )


type alias Init msg model =
    App.Engine.Page.Init msg model


{-| -}
init : model -> Init msg model
init =
    App.Engine.Page.init


{-| -}
initWith : model -> App.Effect.Effect msg -> Init msg model
initWith =
    App.Engine.Page.initWith


{-| -}
notFound : Init msg model
notFound =
    App.Engine.Page.notFound


{-| -}
loadFrom : App.Effect.Effect (Init msg model) -> Init msg model
loadFrom =
    App.Engine.Page.loadFrom


{-| -}
error : App.PageError.Error -> Init msg model
error =
    App.Engine.Page.error
