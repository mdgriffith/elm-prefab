module Listen.LocalStorage exposing (..)

import Json.Decode
import Json.Encode
import Platform.Sub
import Sub


port localStorageUpdated : (Json.Encode.Value -> msg) -> Platform.Sub.Sub msg


onUpdated :
    { key : String
    , decoder : Json.Decode.Decoder msg
    }
    -> Sub.Sub msg
onUpdated options =
    Sub.OnFromJs
        { portName = "localStorageUpdated"
        , subscription =
            localStorageUpdated
                (Json.Decode.decodeValue options.decoder)
        }
