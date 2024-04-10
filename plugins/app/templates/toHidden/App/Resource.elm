module App.Resource exposing (Resource, resource)

{-|

@docs Resource, resource

-}

import Json.Encode as Json


{-| -}
type alias Resource msg model =
    { init : Json.Value -> model
    , update : msg -> model -> model
    }


{-| -}
resource :
    { init : Json.Value -> model
    , update : msg -> model -> model
    }
    -> Resource msg model
resource options =
    options
