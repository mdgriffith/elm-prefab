port module Effect exposing
    ( Effect(..), none, batch, map
    , now, nowAfter
    , sendMsg, sendMsgAfter
    , Expect(..), HttpTarget(..)
    , toCmd
    )

{-|

@docs Effect, none, batch, map


# Time

@docs now, nowAfter


# Callbacks

@docs sendMsg, sendMsgAfter


# Internal Http Details

@docs Expect, HttpTarget


# Effects

@docs toCmd

-}

import App.Page.Id
import App.View.Id
import Browser.Dom
import Browser.Navigation
import Bytes.Decode
import File
import File.Select
import Http
import Json.Decode
import Json.Encode
import Process
import Random
import Task
import Time


none : Effect msg
none =
    None


batch : List (Effect msg) -> Effect msg
batch =
    Batch


sendMsg : msg -> Effect msg
sendMsg =
    SendMsg


sendMsgAfter : Int -> msg -> Effect msg
sendMsgAfter delay msg =
    SendMsgAfter delay msg


{-| Get the current time
-}
now : (Time.Posix -> msg) -> Effect msg
now =
    Now Nothing


{-| Delay for some number of milliseconds, then get the current time
-}
nowAfter : Float -> (Time.Posix -> msg) -> Effect msg
nowAfter wait =
    Now (Just wait)


type Effect msg
    = None
    | Batch (List (Effect msg))
      --
    | SendMsg msg
    | SendMsgAfter Int msg
      -- Random generation
    | Generate (Random.Generator msg)
      -- Time
    | Now (Maybe Float) (Time.Posix -> msg)
      -- Focus/Blur
    | Focus String (Result Browser.Dom.Error () -> msg)
    | Blur String (Result Browser.Dom.Error () -> msg)
      -- Urls
    | PushUrl String
    | ReplaceUrl String
      -- Files
    | File (List String) (File.File -> msg)
    | Files (List String) (File.File -> List File.File -> msg)
    | FileToUrl File.File (String -> msg)
      -- Loading
    | ViewUpdated (App.View.Id.Operation App.Page.Id.Id)
      -- Browser Navigation
    | Preload App.Page.Id.Id
    | Load String
    | Reload
    | ReloadAndSkipCache
      -- History navigation
    | Forward Int
    | Back Int
      -- Http
    | HttpRequest (RequestDetails msg)
      -- JS interop
    | SendToWorld
        { toPort : Json.Encode.Value -> Cmd msg
        , portName : String
        , payload : Json.Encode.Value
        }


type alias RequestDetails msg =
    { method : String
    , headers : List Http.Header
    , url : String
    , body : Http.Body
    , expect : Expect msg
    , target : Maybe HttpTarget
    , timeout : Maybe Float
    , tracker : Maybe String
    }


{-| This type is here if you want to do something like include special headers for your API

Or switch out urls depending on how the app is configured.

-}
type HttpTarget
    = TargetApi
    | TargetStaticFile
    | TargetExternal String


type Expect msg
    = ExpectString (Result Http.Error String -> msg)
    | ExpectJson (Json.Decode.Decoder msg) (Http.Error -> msg)
    | ExpectBytes (Bytes.Decode.Decoder msg) (Http.Error -> msg)
    | ExpectWhatever (Result Http.Error () -> msg)


port outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg


toCmd :
    { options
        | navKey : Browser.Navigation.Key
        , preload : App.Page.Id.Id -> msg
        , dropPageCache : msg
        , viewRequested : App.View.Id.Operation App.Page.Id.Id -> msg
    }
    -> Effect msg
    -> Cmd msg
toCmd options effect =
    case effect of
        None ->
            Cmd.none

        Batch effects ->
            Cmd.batch (List.map (toCmd options) effects)

        Generate generator ->
            Random.generate identity generator

        Now Nothing toMsg ->
            Time.now
                |> Task.perform toMsg

        Now (Just wait) toMsg ->
            Process.sleep wait
                |> Task.andThen
                    (\_ -> Time.now)
                |> Task.perform toMsg

        Focus id toMsg ->
            Process.sleep 1
                |> Task.andThen
                    (\_ -> Browser.Dom.focus id)
                |> Task.attempt toMsg

        Blur id toMsg ->
            Browser.Dom.blur id
                |> Task.attempt toMsg

        PushUrl url ->
            Browser.Navigation.pushUrl options.navKey url

        ReplaceUrl url ->
            Browser.Navigation.replaceUrl options.navKey url

        ViewUpdated op ->
            Task.succeed ()
                |> Task.perform
                    (\_ ->
                        options.viewRequested op
                    )

        Load url ->
            Browser.Navigation.load url

        Reload ->
            Browser.Navigation.reload

        ReloadAndSkipCache ->
            Browser.Navigation.reloadAndSkipCache

        Forward steps ->
            Browser.Navigation.forward options.navKey steps

        Back steps ->
            Browser.Navigation.back options.navKey steps

        SendToWorld { toPort, payload } ->
            toPort payload

        SendMsg msg ->
            Task.succeed ()
                |> Task.perform (\_ -> msg)

        SendMsgAfter delay msg ->
            Process.sleep (toFloat delay)
                |> Task.map (\_ -> msg)
                |> Task.perform identity

        Preload pageId ->
            Task.succeed ()
                |> Task.perform (\_ -> options.preload pageId)

        File extensions toMsg ->
            File.Select.file extensions toMsg

        Files extensions toMsg ->
            File.Select.files extensions toMsg

        FileToUrl fileData toMsg ->
            File.toUrl fileData
                |> Task.perform toMsg

        HttpRequest req ->
            Http.request
                { method = req.method
                , body = req.body
                , url = req.url
                , headers = req.headers
                , expect = toHttpExpect req.expect
                , timeout = req.timeout
                , tracker = req.tracker
                }


map : (a -> b) -> Effect a -> Effect b
map f effect =
    case effect of
        None ->
            None

        Batch effects ->
            Batch (List.map (map f) effects)

        PushUrl url ->
            PushUrl url

        ReplaceUrl url ->
            ReplaceUrl url

        ViewUpdated op ->
            ViewUpdated op

        Load url ->
            Load url

        Reload ->
            Reload

        ReloadAndSkipCache ->
            ReloadAndSkipCache

        Forward n ->
            Forward n

        Back n ->
            Back n

        SendToWorld { toPort, portName, payload } ->
            SendToWorld
                { toPort = \val -> Cmd.map (toPort val)
                , portname = portName
                , payload = payload
                }

        SendMsg msg ->
            SendMsg (f msg)

        SendMsgAfter delay msg ->
            SendMsgAfter delay (f msg)

        Focus id msg ->
            Focus id (msg >> f)

        Blur id msg ->
            Blur id (msg >> f)

        Preload route ->
            Preload route

        HttpRequest req ->
            HttpRequest
                { method = req.method
                , headers = req.headers
                , url = req.url
                , body = req.body
                , expect = mapExpect f req.expect
                , timeout = req.timeout
                , tracker = req.tracker
                }

        File extensions toMsg ->
            File extensions (toMsg >> f)

        Files extensions toMsg ->
            Files extensions (\top remaining -> toMsg top remaining |> f)

        FileToUrl fileData toMsg ->
            FileToUrl fileData (toMsg >> f)

        Now maybeWait toMsg ->
            Now maybeWait (toMsg >> f)

        Generate generator ->
            Generate (Random.map f generator)


toHttpExpect : Expect msg -> Http.Expect msg
toHttpExpect expect =
    case expect of
        ExpectString toMsg ->
            Http.expectString toMsg

        ExpectJson decoder onError ->
            Http.expectJson
                (\result ->
                    case result of
                        Err err ->
                            onError err

                        Ok value ->
                            value
                )
                decoder

        ExpectBytes decoder onError ->
            Http.expectBytes
                (\result ->
                    case result of
                        Err err ->
                            onError err

                        Ok value ->
                            value
                )
                decoder

        ExpectWhatever toMsg ->
            Http.expectWhatever toMsg


mapExpect : (a -> b) -> Expect a -> Expect b
mapExpect fn expect =
    case expect of
        ExpectString toMsg ->
            ExpectString (toMsg >> fn)

        ExpectJson decoder onError ->
            ExpectJson (Json.Decode.map fn decoder) (onError >> fn)

        ExpectBytes decoder onError ->
            ExpectBytes (Bytes.Decode.map fn decoder) (onError >> fn)

        ExpectWhatever toMsg ->
            ExpectWhatever (toMsg >> fn)
