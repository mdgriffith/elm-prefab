module Options.App exposing
    ( PageUsage
    , decodePageUsages
    )

{-| -}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Declare
import Elm.Let
import Elm.Op
import Gen.App.Effect
import Gen.App.Page
import Gen.App.Page.Error
import Gen.App.State
import Gen.App.Sub
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Json.Encode
import Gen.List
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.Set
import Gen.Url
import Json.Decode
import Options.Route
import Set exposing (Set)


type alias PageUsage =
    { id : String
    , moduleName : List String
    , value : String
    , paramType : Maybe String
    , elmModuleIsPresent : Bool
    , urlOnly : Bool

    --
    , route : Maybe Options.Route.ParsedPage
    }


decodePageUsages : Json.Decode.Decoder (List PageUsage)
decodePageUsages =
    Json.Decode.list
        (Json.Decode.map7 PageUsage
            (Json.Decode.field "id" Json.Decode.string)
            (Json.Decode.field "moduleName" (Json.Decode.list Json.Decode.string))
            (Json.Decode.field "value" Json.Decode.string)
            (Json.Decode.field "paramType"
                (Json.Decode.oneOf
                    [ Json.Decode.map Just Json.Decode.string
                    , Json.Decode.null Nothing
                    ]
                )
            )
            (Json.Decode.field "elmModuleIsPresent" Json.Decode.bool)
            (Json.Decode.field "urlOnly" Json.Decode.bool)
            (Json.Decode.maybe (Json.Decode.field "route" Options.Route.decodePage))
        )
