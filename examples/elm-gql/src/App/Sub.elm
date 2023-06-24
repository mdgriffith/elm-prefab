port module App.Sub exposing
    ( none, batch
    , map, toSubscription
    , Sub
    )

{-|


# Subscriptions

@docs Subscription

@docs none, batch

@docs map, toSubscription

-}

import Json.Encode
import Platform.Sub


type Sub msg
    = Sub (Platform.Sub.Sub msg)
    | Batch (List (Sub msg))


{-| -}
none : Sub msg
none =
    Sub Platform.Sub.none


{-| -}
batch : List (Sub msg) -> Sub msg
batch =
    Batch


{-| -}
map : (a -> b) -> Sub a -> Sub b
map func sub =
    case sub of
        Sub subscription ->
            Sub (Platform.Sub.map func subscription)

        Batch subs ->
            Batch (List.map (map func) subs)


{-| -}
toSubscription : Sub msg -> Platform.Sub.Sub msg
toSubscription sub =
    case sub of
        Sub subscription ->
            subscription

        Batch subs ->
            Platform.Sub.batch (List.map toSubscription subs)


port incoming :
    ({ tag : String
     , details : Maybe Json.Encode.Value
     }
     -> msg
    )
    -> Platform.Sub.Sub msg
