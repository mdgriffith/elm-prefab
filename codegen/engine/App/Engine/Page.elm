module App.Engine.Page exposing
    ( Page, page, init, subscriptions, update, view
    , Frame, frame, frameInit, frameSubscriptions, frameUpdate, frameView
    )

{-|

@docs Page, page, init, subscriptions, update, view

@docs Frame, frame, frameInit, frameSubscriptions, frameUpdate, frameView

-}

import Browser
import Json.Encode


type Page params shared model effect msg subscription view
    = Page
        { init : params -> shared -> ( model, effect )
        , update : msg -> model -> ( model, effect )
        , subscriptions : shared -> model -> subscription
        , view : model -> view
        }


page :
    { init : params -> shared -> ( model, effect )
    , update : msg -> model -> ( model, effect )
    , subscriptions : shared -> model -> subscription
    , view : model -> view
    }
    -> Page params shared model effect msg subscription view
page =
    Page


init :
    Page params shared model effect msg subscription view
    -> (effect -> Cmd msg)
    -> params
    -> shared
    -> ( model, Cmd msg )
init pageConfig toCmd params shared =
    case pageConfig of
        Page inner ->
            let
                ( initializedPage, cmd ) =
                    inner.init params shared
            in
            ( initializedPage
            , toCmd cmd
            )


update :
    Page params shared model effect msg subscription view
    -> (effect -> Cmd msg)
    -> msg
    -> model
    -> ( model, Cmd msg )
update pageConfig toCmd msg model =
    case pageConfig of
        Page inner ->
            let
                ( updatedPage, cmd ) =
                    inner.update msg model
            in
            ( updatedPage
            , toCmd cmd
            )


view :
    Page params shared model effect msg subscription view
    -> model
    -> view
view pageConfig model =
    case pageConfig of
        Page inner ->
            inner.view model


subscriptions :
    Page params shared model effect msg sub view
    -> (sub -> Sub msg)
    -> shared
    -> model
    -> Sub msg
subscriptions pageConfig toSub shared model =
    case pageConfig of
        Page inner ->
            toSub (inner.subscriptions shared model)



{- FRAME -}


type Frame model frameMsg appMsg effect sub view
    = Frame
        { init : Json.Encode.Value -> ( model, effect )
        , update : frameMsg -> model -> ( model, effect )
        , subscriptions : model -> sub
        , view : (frameMsg -> appMsg) -> model -> view -> Browser.Document appMsg
        }


frame :
    { init : Json.Encode.Value -> ( model, effect )
    , update : frameMsg -> model -> ( model, effect )
    , subscriptions : model -> sub
    , view : (frameMsg -> appMsg) -> model -> view -> Browser.Document appMsg
    }
    -> Frame model frameMsg appMsg effect sub view
frame =
    Frame


frameInit :
    Frame model frameMsg appMsg effect sub view
    -> (effect -> Cmd frameMsg)
    -> Json.Encode.Value
    -> ( model, Cmd frameMsg )
frameInit (Frame inner) toCmd flags =
    let
        ( initializedPage, cmd ) =
            inner.init flags
    in
    ( initializedPage
    , toCmd cmd
    )


frameUpdate :
    Frame model frameMsg appMsg effect sub view
    -> (effect -> Cmd frameMsg)
    -> frameMsg
    -> model
    -> ( model, Cmd frameMsg )
frameUpdate (Frame inner) toCmd msg model =
    let
        ( updatedPage, cmd ) =
            inner.update msg model
    in
    ( updatedPage
    , toCmd cmd
    )


frameView :
    Frame model frameMsg appMsg effect sub view
    -> (frameMsg -> appMsg)
    -> model
    -> view
    -> Browser.Document appMsg
frameView (Frame inner) fromFrameMsg model innerView =
    inner.view fromFrameMsg model innerView


frameSubscriptions :
    Frame model frameMsg appMsg effect sub view
    -> (sub -> Sub frameMsg)
    -> model
    -> Sub frameMsg
frameSubscriptions (Frame inner) toSub model =
    toSub (inner.subscriptions model)
