module App.Route exposing (Home_Params, Route(..), parse, sameRouteBase, toId, toString)

{-| 
## Route

@docs Route, sameRouteBase

## Params

@docs Home_Params

## Encodings

@docs toString, parse, toId
-}


import AppUrl
import Dict
import Url


type Route
    = Home {}


type alias Home_Params =
    {}


toString : Route -> String
toString route =
    case route of
        Home params ->
            AppUrl.toString
                { path = [], queryParameters = Dict.empty, fragment = Nothing }


parse : Url.Url -> Maybe { route : Route, isRedirect : Bool }
parse url =
    parseAppUrl (AppUrl.fromUrl url)


sameRouteBase : Route -> Route -> Bool
sameRouteBase one two =
    True


parseAppUrl : AppUrl.AppUrl -> Maybe { route : Route, isRedirect : Bool }
parseAppUrl appUrl =
    case appUrl.path of
        [] ->
            Just { route = Home {}, isRedirect = False }

        _ ->
            Nothing


getSingle : String -> AppUrl.QueryParameters -> Maybe String
getSingle field appUrlParams =
    case Dict.get field appUrlParams of
        Nothing ->
            Nothing

        Just [] ->
            Nothing

        Just (single :: _) ->
            Just single


getList : String -> AppUrl.QueryParameters -> List String
getList field appUrlParams =
    Dict.get field appUrlParams
        |> Maybe.withDefault []


toId : Route -> String
toId route =
    case route of
        Home params ->
            "Home"