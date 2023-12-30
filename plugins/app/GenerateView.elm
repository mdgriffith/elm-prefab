module GenerateView exposing (main)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Press.Generate
import Press.Generate.Regions
import Press.Model


decoder =
    Json.Decode.field "regions" Press.Model.decodeViewRegions


main : Program Json.Decode.Value () ()
main =
    Generate.withFeedback
        (\flags ->
            case Json.Decode.decodeValue decoder flags of
                Ok viewRegions ->
                    Ok
                        { info = []
                        , files = [ Press.Generate.Regions.generate viewRegions ]
                        }

                Err e ->
                    Err
                        [ { title = "Error decoding flags"
                          , description = Json.Decode.errorToString e
                          }
                        ]
        )
