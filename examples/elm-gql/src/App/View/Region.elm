module App.View.Region exposing (Regions)

{-| -}


type alias Regions view =
    { primary : view
    , nav : Maybe view
    , detail : List view
    }
