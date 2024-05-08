module App.View exposing
    ( View, map
    , Regions
    )

{-|

@docs View, map

@docs Regions

-}

import Html


type alias View msg =
    { title : String
    , body : Html.Html msg
    }


map : (a -> b) -> View a -> View b
map fn myView =
    { title = myView.title
    , body = Html.map fn myView.body
    }



{- Regions -}


{-| -}
type alias Regions view =
    { primary : Maybe view
    , detail : List view
    }
