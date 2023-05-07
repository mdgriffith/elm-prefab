port module App.Effect exposing
    ( none, pushUrl, replaceUrl, load, reload, forward, back
    , Effect, toCmd, map
    )

{-|

@docs none, pushUrl, replaceUrl, load, reload, forward, back


# Effects

@docs Effect, toCmd, map

-}

import Browser
import Browser.Dom
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


type Effect msg
    = None
    | PushUrl String
    | ReplaceUrl String
    | Load String
    | Reload
    | Forward Int
    | Back Int
    | Send { tag : String, details : Maybe Json.Encode.Value }


map : (a -> b) -> Effect a -> Effect b
map f effect =
    case effect of
        None ->
            None

        PushUrl url ->
            PushUrl url

        ReplaceUrl url ->
            ReplaceUrl url

        Load url ->
            Load url

        Reload ->
            Reload

        Forward n ->
            Forward n

        Back n ->
            Back n

        Send { tag, details } ->
            Send { tag = tag, details = details }


port outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg


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

        Send outgoingMsg ->
            outgoing outgoingMsg
