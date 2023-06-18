module App.State exposing (..)

{-| -}

import Dict


type Cache state
    = Cache
        { current : Maybe String
        , cache : Dict.Dict String state
        }


init : Cache state
init =
    Cache { current = Nothing, cache = Dict.empty }


current : Cache state -> Maybe state
current cache =
    case cache of
        Cache details ->
            case details.current of
                Nothing ->
                    Nothing

                Just key ->
                    Dict.get key details.cache


setCurrent : String -> Cache state -> Cache state
setCurrent key state =
    case state of
        Cache details ->
            Cache { details | current = Just key }


get : String -> Cache state -> Maybe state
get key state =
    case state of
        Cache details ->
            Dict.get key details.cache


insert : String -> state -> Cache state -> Cache state
insert key value state =
    case state of
        Cache details ->
            Cache { details | cache = Dict.insert key value details.cache }
