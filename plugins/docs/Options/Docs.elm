module Options.Docs exposing (Docs, decoder)

{-| -}

import Dict
import Elm.Docs
import Elm.Project
import Json.Decode


type alias Docs =
    { readme : Maybe String
    , guides : List Guide
    , project : Elm.Project.Project
    , modules : List Elm.Docs.Module
    , deps : Dict.Dict String (List Elm.Docs.Module)
    }


type alias Guide =
    { name : String
    , content : String
    }



{- Decoders -}


decoder : Json.Decode.Decoder Docs
decoder =
    Json.Decode.map5 Docs
        (Json.Decode.field "readme" (Json.Decode.maybe Json.Decode.string))
        (Json.Decode.field "guides" (Json.Decode.list decodeGuide))
        (Json.Decode.field "project" Elm.Project.decoder)
        (Json.Decode.field "modules" (Json.Decode.list Elm.Docs.decoder))
        (Json.Decode.field "deps" (Json.Decode.dict (Json.Decode.list Elm.Docs.decoder)))


decodeGuide : Json.Decode.Decoder Guide
decodeGuide =
    Json.Decode.map2 Guide
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "content" Json.Decode.string)
