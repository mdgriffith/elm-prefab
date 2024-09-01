module App.Resource exposing
    ( Resource, resource
    , withLocalStorage
    )

{-|

@docs Resource, resource

@docs withLocalStorage

-}

import Effect
import Json.Decode as Decode
import Json.Encode as Json
import Listen
import Url


{-| -}
type alias Resource msg model =
    { init : Json.Value -> Url.Url -> Maybe model -> ( model, Effect.Effect msg )
    , update : msg -> model -> ( model, Effect.Effect msg )
    , subscriptions : model -> Listen.Listen msg
    , codec :
        Maybe
            { decoder : Decode.Decoder model
            , encode : model -> Json.Value
            }
    }


{-| -}
resource :
    { init : Json.Value -> Url.Url -> Maybe model -> ( model, Effect.Effect msg )
    , update : msg -> model -> ( model, Effect.Effect msg )
    , subscriptions : model -> Listen.Listen msg
    }
    -> Resource msg model
resource options =
    { init = options.init
    , update = options.update
    , subscriptions = options.subscriptions
    , codec = Nothing
    }


{-| -}
withLocalStorage :
    { decoder : Decode.Decoder model
    , encode : model -> Json.Value
    }
    -> Resource msg model
    -> Resource msg model
withLocalStorage codec res =
    { res | codec = Just codec }
