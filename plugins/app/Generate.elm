module Generate exposing (main)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Press.Generate
import Press.Model


main : Program Json.Decode.Value () ()
main =
    Generate.withFeedback
        (\flags ->
            case Json.Decode.decodeValue (Json.Decode.field "pageUsages" Press.Model.decodePageUsages) flags of
                Ok pageUsages ->
                    case Press.Generate.generate pageUsages of
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
