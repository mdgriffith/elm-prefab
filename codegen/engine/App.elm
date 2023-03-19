port module App exposing
    ( none, pushUrl, replaceUrl, load, reload, forward, back
    , get
    , Effect, toCmd
    , Page, page, init, update, view, subscriptions
    , Frame, frame, frameInit, frameUpdate, frameView, frameSubscriptions
    , Subscription(..), noFrame
    )

{-|

@docs none, pushUrl, replaceUrl, load, reload, forward, back

@docs get

@docs Effect, toCmd

@docs Page, page, init, update, view, subscriptions

@docs Frame, frame, frameInit, frameUpdate, frameView, frameSubscriptions

-}

import Browser
import Browser.Navigation
import Html
import Http
import Json.Encode


none : Effect msg
none =
    None


pushUrl : String -> Effect msg
pushUrl =
    PushUrl


replaceUrl : String -> Effect msg
replaceUrl =
    ReplaceUrl


load : String -> Effect msg
load =
    Load


reload : Effect msg
reload =
    Reload


forward : Int -> Effect msg
forward =
    Forward


back : Int -> Effect msg
back =
    Back


get :
    { url : String
    , expect : Http.Expect msg
    }
    -> Effect msg
get =
    Get


type Effect msg
    = None
    | PushUrl String
    | ReplaceUrl String
    | Load String
    | Reload
    | Forward Int
    | Back Int
    | Get
        { url : String
        , expect : Http.Expect msg
        }
    | Send { tag : String, details : Maybe Json.Encode.Value }


port outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg


port incoming : ({ tag : String, details : Maybe Json.Encode.Value } -> msg) -> Sub msg


toCmd : Browser.Navigation.Key -> Effect msg -> Cmd msg
toCmd key effect =
    case effect of
        None ->
            Cmd.none

        PushUrl url ->
            Browser.Navigation.pushUrl key url

        ReplaceUrl url ->
            Browser.Navigation.replaceUrl key url

        Load url ->
            Browser.Navigation.load url

        Reload ->
            Browser.Navigation.reload

        Forward steps ->
            Browser.Navigation.forward key steps

        Back steps ->
            Browser.Navigation.back key steps

        Get options ->
            Http.get options

        Send outgoingMsg ->
            outgoing outgoingMsg


type Subscription msg
    = Subscription (Sub msg)


toSub : Subscription msg -> Sub msg
toSub subscription =
    case subscription of
        Subscription sub0 ->
            sub0



{- Page machinery -}


type Page params shared model msg view
    = Page
        { init : params -> shared -> ( model, Effect msg )
        , update : shared -> msg -> model -> ( model, Effect msg )
        , subscriptions : shared -> model -> Subscription msg
        , view : shared -> model -> view
        }


page :
    { init : params -> shared -> ( model, Effect msg )
    , update : shared -> msg -> model -> ( model, Effect msg )
    , subscriptions : shared -> model -> Subscription msg
    , view : shared -> model -> view
    }
    -> Page params shared model msg view
page =
    Page


init :
    Browser.Navigation.Key
    -> Page params shared model msg view
    -> params
    -> shared
    -> ( model, Cmd msg )
init navKey pageConfig params shared =
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
    -> Page params shared model msg view
    -> shared
    -> msg
    -> model
    -> ( model, Cmd msg )
update navKey pageConfig shared msg model =
    case pageConfig of
        Page inner ->
            let
                ( updatedPage, cmd ) =
                    inner.update shared msg model
            in
            ( updatedPage, toCmd navKey cmd )


view : Page params shared model msg view -> shared -> model -> view
view pageConfig shared model =
    case pageConfig of
        Page inner ->
            inner.view shared model


subscriptions : Page params shared model msg view -> shared -> model -> Sub msg
subscriptions pageConfig shared model =
    case pageConfig of
        Page inner ->
            toSub (inner.subscriptions shared model)



{- Frame Stuff -}


type Frame model msg appMsg view
    = Frame
        { init : Json.Encode.Value -> ( model, Effect msg )
        , update : msg -> model -> ( model, Effect msg )
        , subscriptions : model -> Subscription msg
        , view : (msg -> appMsg) -> model -> view -> Browser.Document appMsg
        }


noFrame : Frame {} {} msg (Browser.Document msg)
noFrame =
    Frame
        { init = \_ -> ( {}, None )
        , update = \_ model -> ( model, None )
        , subscriptions = \_ -> Subscription Sub.none
        , view = \toMsg model innerView -> innerView
        }


frame :
    { init : Json.Encode.Value -> ( model, Effect msg )
    , update : msg -> model -> ( model, Effect msg )
    , subscriptions : model -> Subscription msg
    , view : (msg -> appMsg) -> model -> view -> Browser.Document appMsg
    }
    -> Frame model msg appMsg view
frame =
    Frame


frameInit :
    Browser.Navigation.Key
    -> Frame model msg appMsg view
    -> Json.Encode.Value
    -> ( model, Cmd msg )
frameInit navKey (Frame inner) flags =
    let
        ( initializedPage, cmd ) =
            inner.init flags
    in
    ( initializedPage
    , toCmd navKey cmd
    )


frameUpdate :
    Browser.Navigation.Key
    -> Frame model msg appMsg view
    -> msg
    -> model
    -> ( model, Cmd msg )
frameUpdate navKey (Frame inner) msg model =
    let
        ( updatedPage, cmd ) =
            inner.update msg model
    in
    ( updatedPage
    , toCmd navKey cmd
    )


frameView : Frame model msg appMsg view -> (msg -> appMsg) -> model -> view -> Browser.Document appMsg
frameView (Frame inner) toAppMsg model innerView =
    inner.view toAppMsg model innerView


frameSubscriptions : Frame model msg appMsg view -> model -> Sub msg
frameSubscriptions (Frame inner) model =
    toSub (inner.subscriptions model)
