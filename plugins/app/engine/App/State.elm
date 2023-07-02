module App.State exposing
    ( Cache, init, current, get
    , Loaded(..)
    , setCurrent, insert, toNotFound, toLoading
    , clearCurrent
    )

{-|

@docs Cache, init, current, get

@docs Loaded

@docs setCurrent, insert, toNotFound, toLoading

-}

import Dict


type Cache state
    = Cache
        { current :
            Maybe
                { key : String
                , state : Loaded state
                }
        , cache : Dict.Dict String (Loaded state)
        }


type Loaded state
    = Loading
    | NotFound
    | Loaded state


{-| -}
init : Cache state
init =
    Cache
        { current = Nothing
        , cache = Dict.empty
        }


{-| -}
current : Cache state -> Loaded state
current (Cache details) =
    case details.current of
        Nothing ->
            NotFound

        Just currentState ->
            currentState.state


{-| -}
toNotFound : String -> Cache state -> Cache state
toNotFound key cache =
    insertLoaded key NotFound cache


{-| -}
toLoading : String -> Cache state -> Cache state
toLoading key (Cache details) =
    insertLoaded key Loading cache


{-| This is called when there is no clear new current state.

Such as when the URL has changed to a new page that does not exist.

-}
clearCurrent : Cache state -> Cache state
clearCurrent (Cache details) =
    Cache
        { details
            | current = Nothing
            , cache =
                -- move the current state to the cache if it needs to be
                case details.current of
                    Nothing ->
                        details.cache

                    Just previousCurrent ->
                        details.cache
                            |> Dict.insert previousCurrent.key previousCurrent.state
        }


{-| -}
setCurrent : String -> Cache state -> Cache state
setCurrent key cache =
    let
        (Cache cleared) =
            cache
                |> clearCurrent
    in
    Cache
        { cleared
            | current =
                Just
                    { key = key
                    , state =
                        case Dict.get key cleared.cache of
                            Nothing ->
                                NotFound

                            Just current ->
                                current.state
                    }
            , cache =
                Dict.remove key cleared.cache
        }


{-| -}
get : String -> Cache state -> Maybe state
get key (Cache details) =
    case details.current of
        Nothing ->
            Dict.get key details.cache

        Just cur ->
            if cur.key == key then
                case cur.state of
                    Loaded state ->
                        Just state

                    _ ->
                        Nothing

            else
                Dict.get key details.cache


{-| -}
insert : String -> state -> Cache state -> Cache state
insert key newState (Cache details) =
    let
        state =
            Loaded newState
    in
    case details.currentKey of
        Nothing ->
            Cache { details | cache = Dict.insert key state details.cache }

        Just currentKey ->
            if currentKey == key then
                Cache { details | current = Just { currentValue | state = state } }

            else
                Cache { details | cache = Dict.insert key state details.cache }


{-| -}
insertLoaded : String -> Loaded state -> Cache state -> Cache state
insertLoaded key state (Cache details) =
    case details.currentKey of
        Nothing ->
            Cache { details | cache = Dict.insert key state details.cache }

        Just currentValue ->
            if currentValue.key == key then
                Cache { details | current = Just { currentValue | state = state } }

            else
                Cache { details | cache = Dict.insert key state details.cache }
