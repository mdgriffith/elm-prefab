module Generate exposing (main)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Press.Generate


main : Program Json.Decode.Value () ()
main =
    Generate.fromJson
        Press.Generate.decode
        Press.Generate.generate
