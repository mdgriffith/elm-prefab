module App.State exposing
    ( Cache, init, current, get
    , insert, setCurrent, toNotFound
    )

{-|

@docs Cache, init, current, get

#docs setCurrent, insert, toNotFound

-}

import Dict


type Cache state
    = Cache
        { currentKey : Maybe String
        , current : Maybe state
        , cache : Dict.Dict String state
        }


init : Cache state
init =
    Cache
        { currentKey = Nothing
        , current = Nothing
        , cache = Dict.empty
        }


current : Cache state -> Maybe state
current (Cache details) =
    details.current


toNotFound : Cache state -> Cache state
toNotFound (Cache details) =
    Cache
        { details
            | currentKey = Nothing
            , current = Nothing
            , cache =
                case details.currentKey of
                    Nothing ->
                        details.cache

                    Just currentKey ->
                        case details.current of
                            Nothing ->
                                details.cache

                            Just currentState ->
                                details.cache
                                    |> Dict.insert currentKey currentState
        }


setCurrent : String -> Cache state -> Cache state
setCurrent key (Cache details) =
    Cache
        { details
            | currentKey = Just key
            , current = Dict.get key details.cache
            , cache =
                case details.currentKey of
                    Nothing ->
                        details.cache

                    Just previousCurrentKey ->
                        if previousCurrentKey == key then
                            details.cache

                        else
                            case details.current of
                                Nothing ->
                                    details.cache

                                Just previousCurrent ->
                                    details.cache
                                        |> Dict.remove key
                                        |> Dict.insert previousCurrentKey previousCurrent
        }


get : String -> Cache state -> Maybe state
get key (Cache details) =
    case details.currentKey of
        Nothing ->
            Dict.get key details.cache

        Just currentKey ->
            if currentKey == key then
                details.current

            else
                Dict.get key details.cache


insert : String -> state -> Cache state -> Cache state
insert key value (Cache details) =
    case details.currentKey of
        Nothing ->
            Cache { details | cache = Dict.insert key value details.cache }

        Just currentKey ->
            if currentKey == key then
                Cache { details | current = Just value }

            else
                Cache { details | cache = Dict.insert key value details.cache }
