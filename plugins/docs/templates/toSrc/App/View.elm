module App.View exposing
    ( View, map
    , Regions
    )

{-|

@docs View, map

@docs Regions

-}

import Ui


type alias View msg =
    { title : String
    , body : Ui.Element msg
    }


map : (a -> b) -> View a -> View b
map fn myView =
    { title = myView.title
    , body = Ui.map fn myView.body
    }



{- Regions -}


{-| -}
type alias Regions view =
    { primary : Maybe view
    , nav : Maybe view
    , detail : List view
    }
