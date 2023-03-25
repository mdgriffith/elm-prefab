module GenerateTheme exposing (main)

{-| -}

import Gen.CodeGen.Generate as Generate
import Json.Decode
import Path
import Theme
import Theme.Generate


main : Program Json.Decode.Value () ()
main =
    Generate.fromJson
        Theme.decode
        Theme.Generate.generate
