module Generate exposing (..)

-- import Interactive

import Elm
import Exemplar
import Gen.CodeGen.Generate as Generate
import Interactive
import Json.Decode
import Options


main : Program Json.Decode.Value () ()
main =
    Generate.fromJson Options.decoder
        (\options ->
            List.filterMap renderExampleModule options.project
        )



-- List.filterMap renderExampleModule


renderExampleModule mod =
    case Exemplar.interactiveAll mod of
        Err err ->
            Elm.file [ "Live" ]
                [ Elm.declaration "error"
                    (Elm.string err)
                ]
                |> Just

        Ok interactives ->
            Interactive.generate [ "Live" ]
                [ interactives ]
