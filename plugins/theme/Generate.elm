module Generate exposing (..)

import Gen.CodeGen.Generate as Generate
import Json.Decode
import Theme
import Theme.Decoder
import Theme.Generate


main : Program Json.Decode.Value () ()
main =
    Generate.fromJson Theme.Decoder.decode
        Theme.Generate.generate
