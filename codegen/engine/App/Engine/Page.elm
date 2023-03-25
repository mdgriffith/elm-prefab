module App.Engine.Page exposing
    ( Page, init, subscriptions, update, view
    , Frame, frameInit, frameSubscriptions, frameUpdate, frameView
    )

{-|

@docs Page, init, subscriptions, update, view

@docs Frame, frameInit, frameSubscriptions, frameUpdate, frameView

-}

import Browser
import Browser.Navigation
import Json.Encode


type Page params shared model effect msg subscription view
    = Page
        { init : params -> shared -> ( model, effect )
        , update : shared -> msg -> model -> ( model, effect )
        , subscriptions : shared -> model -> subscription
        , view : shared -> model -> view
        }


page :
    { init : params -> shared -> ( model, effect )
    , update : shared -> msg -> model -> ( model, effect )
    , subscriptions : shared -> model -> subscription
    , view : shared -> model -> view
    }
    -> Page params shared model effect msg subscription view
page =
    Page


init :
    Browser.Navigation.Key
    -> Page params shared model effect msg subscription view
    -> (effect -> Cmd msg)
    -> params
    -> shared
    -> ( model, Cmd msg )
init navKey pageConfig toCmd params shared =
    case pageConfig of
        Page inner ->
            let
                ( initializedPage, cmd ) =
                    inner.init params shared
            in
            ( initializedPage
            , toCmd navKey cmd
            )


update :
    Browser.Navigation.Key
    -> Page params shared model effect msg subscription view
    -> (effect -> Cmd msg)
    -> shared
    -> msg
    -> model
    -> ( model, Cmd msg )
update navKey pageConfig toCmd shared msg model =
    case pageConfig of
        Page inner ->
            let
                ( updatedPage, cmd ) =
                    inner.update shared msg model
            in
            ( updatedPage
            , toCmd navKey cmd
            )


view :
    Page params shared model effect msg subscription view
    -> shared
    -> model
    -> view
view pageConfig shared model =
    case pageConfig of
        Page inner ->
            inner.view shared model


subscriptions :
    Page params shared model effect msg subscription view
    -> (subscriptions -> Sub msg)
    -> shared
    -> model
    -> Sub msg
subscriptions pageConfig toSub shared model =
    case pageConfig of
        Page inner ->
            toSub (inner.subscriptions shared model)



{- FRAME -}


type Frame model msg appMsg effect sub view
    = Frame
        { init : Json.Encode.Value -> ( model, effect )
        , update : msg -> model -> ( model, effect )
        , subscriptions : model -> sub
        , view : (msg -> appMsg) -> model -> view -> Browser.Document appMsg
        }


frame :
    { init : Json.Encode.Value -> ( model, effect )
    , update : msg -> model -> ( model, effect )
    , subscriptions : model -> subscription
    , view : (msg -> appMsg) -> model -> view -> Browser.Document appMsg
    }
    -> Frame model msg appMsg effect sub view
frame =
    Frame


frameInit :
    Browser.Navigation.Key
    -> Frame model msg appMsg effect sub view
    -> (effect -> Cmd msg)
    -> Json.Encode.Value
    -> ( model, Cmd msg )
frameInit navKey (Frame inner) toCmd flags =
    let
        ( initializedPage, cmd ) =
            inner.init flags
    in
    ( initializedPage
    , toCmd navKey cmd
    )


frameUpdate :
    Browser.Navigation.Key
    -> Frame model msg appMsg effect sub view
    -> (effect -> Cmd msg)
    -> msg
    -> model
    -> ( model, Cmd msg )
frameUpdate navKey (Frame inner) toCmd msg model =
    let
        ( updatedPage, cmd ) =
            inner.update msg model
    in
    ( updatedPage
    , toCmd navKey cmd
    )


frameView :
    Frame model msg appMsg effect sub view
    -> (msg -> appMsg)
    -> model
    -> view
    -> Browser.Document appMsg
frameView (Frame inner) toAppMsg model innerView =
    inner.view toAppMsg model innerView


frameSubscriptions :
    Frame model msg appMsg effect sub view
    -> (subscription -> Sub msg)
    -> model
    -> Sub msg
frameSubscriptions (Frame inner) model =
    toSub (inner.subscriptions model)
