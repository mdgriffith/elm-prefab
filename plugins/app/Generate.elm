module Generate exposing (main)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Press.Generate


main : Program Json.Decode.Value () ()
main =
    Generate.withFeedback
        (\flags ->
            case Json.Decode.decodeValue Press.Generate.decode flags of
                Ok input ->
                    case Press.Generate.generate input of
                        Ok output ->
                            Ok
                                { info = []
                                , files = output
                                }

                        Err errorList ->
                            Err (List.map Press.Generate.errorToDetails errorList)

                Err e ->
                    Err
                        [ { title = "Error decoding flags"
                          , description = Json.Decode.errorToString e
                          }
                        ]
        )
