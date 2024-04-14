module App.Resource exposing
    ( Resource, resource
    , withLocalStorage
    )

{-|

@docs Resource, resource

@docs withLocalStorage

-}

import Json.Decode as Decode
import Json.Encode as Json


{-| -}
type alias Resource msg model =
    { init : Json.Value -> Url.Url -> Maybe model -> model
    , update : msg -> model -> model
    , codec :
        Maybe
            { decoder : Decode.Decoder model
            , encode : model -> Json.Value
            }
    }


{-| -}
resource :
    { init : Json.Value -> Url.Url -> Maybe model -> model
    , update : msg -> model -> model
    }
    -> Resource msg model
resource options =
    { init = options.init
    , update = options.update
    , codec = Nothing
    }


{-| -}
withLocalStorage :
    { decoder : Decode.Decoder model
    , encode : model -> Json.Value
    }
    -> Resource msg model
    -> Resource msg model
withLocalStorage codec resource =
    { resource | codec = Just codec }
