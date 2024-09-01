module Sub exposing
    ( Sub(..)
    , none, batch
    , onKeyPress
    , onEvery
    , onResize
    , map, toSubscription
    )

{-|


# Subscriptions

@docs Sub

@docs none, batch

@docs onKeyPress

@docs onEvery

@docs onResize

@docs map, toSubscription

-}

import Browser.Events
import Json.Decode
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
      --
    | OnFromJs
        { portName : String
        , subscription : Platform.Sub.Sub (Result msg Json.Decode.Error)
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
onEvery : Float -> (Time.Posix -> msg) -> Sub msg
onEvery ms toMsg =
    Every ms toMsg


{-| -}
onResize : (Int -> Int -> msg) -> Sub msg
onResize msg =
    OnWindowResize msg


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

        OnFromJs fromJs ->
            OnFromJs
                { portName = fromJs.portName
                , subscription =
                    Sub.map (Result.map toMsg) fromJs.subscription
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

        OnFromJs fromJs ->
            fromJs.subscription
                |> Sub.map
                    (\result ->
                        case result of
                            Ok success ->
                                success

                            Err err ->
                                options.ignore (Json.Decode.errorToString err)
                    )
