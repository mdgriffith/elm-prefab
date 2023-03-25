port module App exposing
    ( none, pushUrl, replaceUrl, load, reload, forward, back
    , get
    , Effect, toCmd
    , Subscription, toSub
    , Page, page
    , Frame, defaultFrame
    )

{-|

@docs none, pushUrl, replaceUrl, load, reload, forward, back


# Http stuff

@docs get


# Effects and Subscriptions

@docs Effect, toCmd

@docs Subscription, toSub

@docs Page, page

@docs Frame, defaultFrame

-}

import App.Engine.Page
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


type alias Page params shared model msg view =
    App.Engine.Page.Page params shared model (Effect msg) msg (Subscription msg) view


page :
    { init : params -> shared -> ( model, Effect msg )
    , update : shared -> msg -> model -> ( model, Effect msg )
    , subscriptions : shared -> model -> Subscription msg
    , view : shared -> model -> view
    }
    -> Page params shared model msg view
page =
    App.Engine.Page.page


type alias Frame model msg appMsg view =
    App.Engine.Page.Frame model msg appMsg (Effect msg) (Subscription msg) view


defaultFrame : Frame {} {} msg (Browser.Document msg)
defaultFrame =
    Frame
        { init = \_ -> ( {}, None )
        , update = \_ model -> ( model, None )
        , subscriptions = \_ -> Subscription Sub.none
        , view = \toMsg model innerView -> innerView
        }
