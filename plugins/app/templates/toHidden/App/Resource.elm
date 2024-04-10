module App.Resource exposing (Resource, resource)

{-|

@docs Resource, resource

-}


{-| -}
type alias Resource msg model =
    { init : model
    , update : msg -> model -> model
    }


{-| -}
resource :
    { init : model
    , update : msg -> model -> model
    }
    -> Resource msg model
resource options =
    options
