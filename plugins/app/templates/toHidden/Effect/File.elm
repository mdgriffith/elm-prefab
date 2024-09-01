module Effect.File exposing (file, files, toUrl)

{-|

@docs file, files, toUrl

-}

import Effect
import File


{-| -}
file : List String -> (File.File -> msg) -> Effect.Effect msg
file =
    Effect.File


files : List String -> (File.File -> List File.File -> msg) -> Effect.Effect msg
files =
    Effect.Files


toUrl : File.File -> (String -> msg) -> Effect.Effect msg
toUrl fileData toMsg =
    Effect.FileToUrl fileData toMsg
