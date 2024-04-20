module App.Page.Id exposing (..)

import App.Route


type Id
    = Home Home_Params


fromRoute : App.Route.Route -> Maybe Id
fromRoute route =
    case route of
        App.Route.Home params ->
            Just (Home params)


type alias Home_Params =
    App.Route.Home_Params