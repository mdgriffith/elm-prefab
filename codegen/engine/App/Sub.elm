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

import App.Engine.Page
import Browser
import Browser.Navigation
import Html
import Http
import Json.Encode
import Platform.Sub


type Sub msg
    = Sub (Platform.Sub.Sub msg)


{-| -}
none : Sub msg
none =
    Sub Platform.Sub.none


{-| -}
map : (a -> b) -> Sub a -> Sub b
map func (Sub sub) =
    Sub (Platform.Sub.map func sub)


{-| -}
toSubscription : Sub msg -> Sub msg
toSubscription (Sub sub) =
    sub


port incoming :
    ({ tag : String
     , details : Maybe Json.Encode.Value
     }
     -> msg
    )
    -> Sub msg
