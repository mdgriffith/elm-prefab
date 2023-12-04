module Generate exposing (main)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Generate.Route
import Json.Decode
import Model


main : Program Json.Decode.Value () ()
main =
    Generate.withFeedback
        (\flags ->
            case Json.Decode.decodeValue Model.decode flags of
                Ok input ->
                    Ok
                        { info = []
                        , files = [ Generate.Route.generate input ]
                        }

                Err e ->
                    Err
                        [ { title = "Routes: I don't understand this config"
                          , description = Json.Decode.errorToString e
                          }
                        ]
        )
