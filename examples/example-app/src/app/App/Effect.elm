port module App.Effect exposing
    ( Effect, none, batch, map
    , now, nowAfter
    , navigateTo, pushUrl, replaceUrl
    , forward, back
    , preload, load, loadAt, reload
    , sendMsg, sendMsgAfter
    , saveToLocalStorage, clearLocalStorageKey
    , generate
    , focus, blur
    , file, files, fileToUrl
    , copyToClipboard
    , get, request, Expect, expectString, expectJson, expectBytes, expectWhatever
    , toCmd, sendToJs, sendToResource
    )

{-|

@docs Effect, none, batch, map


# Time

@docs now, nowAfter


# Navigation

@docs navigateTo, pushUrl, replaceUrl

@docs forward, back


# Loading

@docs preload, load, loadAt, reload


# Callbacks

@docs sendMsg, sendMsgAfter


# Local Storage

@docs saveToLocalStorage, clearLocalStorageKey


# Random generation

@docs generate


# Browser focus

@docs focus, blur


# File selection

@docs file, files, fileToUrl


# Clipboard

@docs copyToClipboard


# Http

@docs get, request, Expect, expectString, expectJson, expectBytes, expectWhatever


# Effects

@docs toCmd, sendToJs, sendToResource

-}

import App.Page.Id
import App.Resource.Msg
import App.Route
import App.View.Id
import Browser
import Browser.Dom
import Browser.Navigation
import Bytes
import Bytes.Decode
import File
import File.Select
import Html
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


{-| -}
navigateTo : App.Route.Route -> Effect msg
navigateTo route =
    PushUrl (App.Route.toString route)


{-| -}
pushUrl : String -> Effect msg
pushUrl =
    PushUrl


{-| -}
replaceUrl : String -> Effect msg
replaceUrl =
    ReplaceUrl


{-| -}
load : String -> Effect msg
load =
    Load


{-| -}
loadAt : App.View.Id.Region -> App.Page.Id.Id -> Effect msg
loadAt region pageId =
    ViewUpdated (App.View.Id.Push region pageId)


clear : App.View.Id.Region -> Effect msg
clear region =
    ViewUpdated (App.View.Id.ClearRegion region)


preload : App.Page.Id.Id -> Effect msg
preload =
    Preload


reload : Effect msg
reload =
    Reload


forward : Int -> Effect msg
forward =
    Forward


back : Int -> Effect msg
back =
    Back


sendToResource : App.Resource.Msg.Msg -> Effect msg
sendToResource =
    SendToResource


sendMsg : msg -> Effect msg
sendMsg =
    SendMsg


sendMsgAfter : Int -> msg -> Effect msg
sendMsgAfter delay msg =
    SendMsgAfter delay msg


{-| -}
sendToJs : { tag : String, details : Maybe Json.Encode.Value } -> Effect msg
sendToJs =
    SendToWorld


{-| -}
saveToLocalStorage : String -> Json.Encode.Value -> Effect msg
saveToLocalStorage key value =
    SendToWorld
        { tag = "local-storage"
        , details =
            Just
                (Json.Encode.object
                    [ ( "key", Json.Encode.string key )
                    , ( "value", value )
                    ]
                )
        }


{-| -}
clearLocalStorageKey : String -> Effect msg
clearLocalStorageKey key =
    SendToWorld
        { tag = "local-storage-clear"
        , details =
            Just
                (Json.Encode.object
                    [ ( "key", Json.Encode.string key )
                    ]
                )
        }


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


{-| Attempt to change the browser focus to the element with a given id.
-}
focus : String -> (Result Browser.Dom.Error () -> msg) -> Effect msg
focus =
    Focus


{-| Make a specific element lose focus.
-}
blur : String -> (Result Browser.Dom.Error () -> msg) -> Effect msg
blur =
    Blur


{-| Run a random generator to produce a value.
-}
generate : (item -> msg) -> Random.Generator item -> Effect msg
generate fn generator =
    Generate (Random.map fn generator)


{-| -}
file : List String -> (File.File -> msg) -> Effect msg
file =
    File


files : List String -> (File.File -> List File.File -> msg) -> Effect msg
files =
    Files


fileToUrl : File.File -> (String -> msg) -> Effect msg
fileToUrl fileData toMsg =
    FileToUrl fileData toMsg


copyToClipboard : String -> Effect msg
copyToClipboard text =
    SendToWorld
        { tag = "copy-to-clipboard"
        , details = Just (Json.Encode.string text)
        }


get : String -> Expect msg -> Effect msg
get url expect =
    request
        { method = "GET"
        , headers = []
        , url = url
        , body = Http.emptyBody
        , expect = expect
        , timeout = Nothing
        , tracker = Nothing
        }


request :
    { method : String
    , headers : List Http.Header
    , url : String
    , body : Http.Body
    , expect : Expect msg
    , timeout : Maybe Float
    , tracker : Maybe String
    }
    -> Effect msg
request options =
    HttpRequest options


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
    | Preload App.Page.Id.Id
    | Load String
    | Reload
      -- History navigation
    | Forward Int
    | Back Int
      -- Http
    | HttpRequest (RequestDetails msg)
      -- JS interop
    | SendToWorld
        { tag : String
        , details : Maybe Json.Encode.Value
        }
    | SendToResource App.Resource.Msg.Msg


type alias RequestDetails msg =
    { method : String
    , headers : List Http.Header
    , url : String
    , body : Http.Body
    , expect : Expect msg
    , timeout : Maybe Float
    , tracker : Maybe String
    }


type Expect msg
    = ExpectString (Result Http.Error String -> msg)
    | ExpectJson (Json.Decode.Decoder msg) (Http.Error -> msg)
    | ExpectBytes (Bytes.Decode.Decoder msg) (Http.Error -> msg)
    | ExpectWhatever (Result Http.Error () -> msg)


expectString : (Result Http.Error String -> msg) -> Expect msg
expectString =
    ExpectString


expectJson : Json.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg
expectJson =
    ExpectJson


expectBytes : Bytes.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg
expectBytes =
    ExpectBytes


expectWhatever : (Result Http.Error () -> msg) -> Expect msg
expectWhatever =
    ExpectWhatever


port outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg


toCmd :
    { options
        | navKey : Browser.Navigation.Key
        , preload : App.Page.Id.Id -> msg
        , sendToResource : App.Resource.Msg.Msg -> msg
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

        Forward steps ->
            Browser.Navigation.forward options.navKey steps

        Back steps ->
            Browser.Navigation.back options.navKey steps

        SendToWorld outgoingMsg ->
            outgoing outgoingMsg

        SendToResource resourceMsg ->
            Task.succeed ()
                |> Task.perform
                    (\_ ->
                        options.sendToResource resourceMsg
                    )

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

        Forward n ->
            Forward n

        Back n ->
            Back n

        SendToResource msg ->
            SendToResource msg

        SendToWorld { tag, details } ->
            SendToWorld { tag = tag, details = details }

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
