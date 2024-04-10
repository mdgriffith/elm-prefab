port module App.Sub exposing
    ( Sub
    , none, batch
    , onKeyPress
    , every
    , onResize, onLocalStorageUpdated
    , map, toSubscription
    , onResourceUpdated, toResourceListeners
    )

{-|


# Subscriptions

@docs Sub

@docs none, batch

@docs onKeyPress

@docs every

@docs onResize, onLocalStorageUpdated

@docs map, toSubscription

@docs onResourceUpdated, toResourceListeners

-}

import App.Resource.Msg
import Browser.Events
import Json.Decode
import Json.Encode
import Platform.Sub
import Time


type Sub msg
    = None
    | Batch (List (Sub msg))
      -- Common subscriptions
    | Every Float (Time.Posix -> msg)
    | OnWindowResize (Int -> Int -> msg)
    | OnKeyPress
        { ctrl : Bool
        , shift : Bool
        , key : String
        }
        msg
    | OnResourceUpdated (App.Resource.Msg.Msg -> Maybe msg)
      --
    | OnLocalStorageUpdated
        { key : String
        , decoder : Json.Decode.Decoder msg
        }


{-| -}
none : Sub msg
none =
    None


{-| -}
batch : List (Sub msg) -> Sub msg
batch =
    Batch


{-| -}
onKeyPress : { ctrl : Bool, shift : Bool, key : String } -> msg -> Sub msg
onKeyPress options msg =
    OnKeyPress options msg


{-| -}
every : Float -> (Time.Posix -> msg) -> Sub msg
every ms toMsg =
    Every ms toMsg


{-| -}
onResize : (Int -> Int -> msg) -> Sub msg
onResize msg =
    OnWindowResize msg


{-| Use `App.Resources.listen` to listen to resource updates.

It's just slightly more convenient than using `onResourceUpdated` directly.

-}
onResourceUpdated : (App.Resource.Msg.Msg -> Maybe msg) -> Sub msg
onResourceUpdated =
    OnResourceUpdated


onLocalStorageUpdated :
    { key : String
    , decoder : Json.Decode.Decoder msg
    }
    -> Sub msg
onLocalStorageUpdated options =
    OnLocalStorageUpdated options


{-| -}
map : (a -> b) -> Sub a -> Sub b
map func sub =
    case sub of
        None ->
            None

        Batch subs ->
            Batch (List.map (map func) subs)

        Every ms toMsg ->
            Every ms (func << toMsg)

        OnKeyPress options msg ->
            OnKeyPress options (func msg)

        OnWindowResize msg ->
            OnWindowResize (\w h -> func <| msg w h)

        OnResourceUpdated toMaybeMsg ->
            OnResourceUpdated (Maybe.map func << toMaybeMsg)

        OnLocalStorageUpdated { key, decoder } ->
            OnLocalStorageUpdated
                { key = key
                , decoder = Json.Decode.map func decoder
                }


{-| -}
toSubscription : { ignore : String -> msg } -> Sub msg -> Platform.Sub.Sub msg
toSubscription options sub =
    case sub of
        None ->
            Platform.Sub.none

        Batch subs ->
            Platform.Sub.batch (List.map (toSubscription options) subs)

        Every ms toMsg ->
            Time.every ms toMsg

        OnWindowResize toMsg ->
            Browser.Events.onResize toMsg

        OnResourceUpdated toMaybeMsg ->
            Platform.Sub.none

        OnKeyPress keyOptions msg ->
            Browser.Events.onKeyDown
                (Json.Decode.map4
                    (\_ ctrl shift meta ->
                        { ctrl = ctrl
                        , shift = shift
                        , meta = meta
                        }
                    )
                    (Json.Decode.field "key" Json.Decode.string
                        |> Json.Decode.andThen
                            (\key ->
                                if String.toLower key == String.toLower keyOptions.key then
                                    Json.Decode.succeed True

                                else
                                    Json.Decode.fail "Not a match"
                            )
                    )
                    (Json.Decode.field "ctrlKey" Json.Decode.bool)
                    (Json.Decode.field "shiftKey" Json.Decode.bool)
                    (Json.Decode.field "metaKey" Json.Decode.bool)
                    |> Json.Decode.andThen
                        (\event ->
                            -- accept both "meta" (Cmd on macs)
                            --  and "ctrl"
                            if (keyOptions.ctrl == event.ctrl || keyOptions.ctrl == event.meta) && keyOptions.shift == event.shift then
                                Json.Decode.succeed msg

                            else
                                Json.Decode.fail "Not a match"
                        )
                )

        OnLocalStorageUpdated { key, decoder } ->
            localStorageUpdated
                (\payload ->
                    if payload.key == key then
                        case Json.Decode.decodeValue decoder payload.details of
                            Ok value ->
                                value

                            Err _ ->
                                options.ignore key

                    else
                        options.ignore key
                )


port localStorageUpdated :
    ({ key : String
     , details : Json.Encode.Value
     }
     -> msg
    )
    -> Platform.Sub.Sub msg


toResourceListeners : App.Resource.Msg.Msg -> Sub msg -> List msg
toResourceListeners resource sub =
    case sub of
        OnResourceUpdated toMaybeMsg ->
            case toMaybeMsg resource of
                Just msg ->
                    [ msg ]

                Nothing ->
                    []

        Batch subs ->
            List.concatMap (toResourceListeners resource) subs

        _ ->
            []
