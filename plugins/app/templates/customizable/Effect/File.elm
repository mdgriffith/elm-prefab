module Effect.File exposing (file, files, toUrl)

{-|

@docs file, files, toUrl

-}

import Effect
import File


{-| -}
selectFile : List String -> (File.File -> msg) -> Effect.Effect msg
selectFile =
    Effect.File


selectMultipleFiles : List String -> (File.File -> List File.File -> msg) -> Effect.Effect msg
selectMultipleFiles =
    Effect.Files


toUrl : File.File -> (String -> msg) -> Effect.Effect msg
toUrl fileData toMsg =
    Effect.FileToUrl fileData toMsg
