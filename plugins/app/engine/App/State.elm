module App.State exposing
    ( Cache, init, current, get
    , insert, remove, drop
    , setCurrent, clearCurrent
    )

{-|

@docs Cache, init, current, get

@docs insert, remove, drop

@docs setCurrent, clearCurrent

-}

import Dict


type Cache state
    = Cache
        { current :
            Maybe
                { key : String
                , state : state
                }
        , cache : Dict.Dict String state
        }


{-| -}
init : Cache state
init =
    Cache
        { current = Nothing
        , cache = Dict.empty
        }


{-| -}
current : Cache state -> Maybe state
current (Cache details) =
    Maybe.map .state details.current


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


{-|

    Drop everything but the current item

-}
drop : Cache state -> Cache state
drop (Cache details) =
    Cache { details | cache = Dict.empty }


{-| -}
setCurrent : String -> Cache state -> Cache state
setCurrent key cache =
    let
        (Cache cleared) =
            clearCurrent cache
    in
    Cache
        { cleared
            | current =
                case Dict.get key cleared.cache of
                    Nothing ->
                        Nothing

                    Just currentState ->
                        Just
                            { key = key
                            , state = currentState
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
                Just cur.state

            else
                Dict.get key details.cache


{-| -}
insert : String -> state -> Cache state -> Cache state
insert key newState (Cache details) =
    case details.current of
        Nothing ->
            Cache { details | cache = Dict.insert key newState details.cache }

        Just curr ->
            if curr.key == key then
                Cache { details | current = Just { curr | state = newState } }

            else
                Cache { details | cache = Dict.insert key newState details.cache }


{-| -}
remove : String -> Cache state -> Cache state
remove key (Cache details) =
    case details.current of
        Nothing ->
            Cache { details | cache = Dict.remove key details.cache }

        Just curr ->
            if curr.key == key then
                Cache { details | current = Nothing }

            else
                Cache { details | cache = Dict.remove key details.cache }
