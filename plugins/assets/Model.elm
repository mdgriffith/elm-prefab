module Model exposing
    ( AssetGroup
    , Content(..)
    , File
    , decode
    )

{-| -}

import Json.Decode
import Set exposing (Set)


type alias AssetGroup =
    { name : String
    , files : List File
    }


type alias File =
    { name : String

    -- All the directories leading to this file
    , crumbs : List String
    , pathOnServer : String
    , content : Content
    }


type Content
    = Text String
    | Binary



{- Decoders -}


decode : Json.Decode.Decoder (List AssetGroup)
decode =
    Json.Decode.field "assets" (Json.Decode.list decodeAssetGroup)


decodeAssetGroup : Json.Decode.Decoder AssetGroup
decodeAssetGroup =
    Json.Decode.map2 AssetGroup
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "files" (Json.Decode.list decodeFile))


decodeFile : Json.Decode.Decoder File
decodeFile =
    Json.Decode.map4 File
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "crumbs" (Json.Decode.list Json.Decode.string))
        (Json.Decode.field "pathOnServer" Json.Decode.string)
        (Json.Decode.field "content" decodeContent)


decodeContent : Json.Decode.Decoder Content
decodeContent =
    Json.Decode.oneOf
        [ Json.Decode.map Text Json.Decode.string
        , Json.Decode.succeed Binary
        ]
