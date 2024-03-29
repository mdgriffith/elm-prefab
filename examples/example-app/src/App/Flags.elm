module App.Flags exposing (Flags, decode)

{-| [Flags are the initial data that is passed to your Elm app when you start it.](https://guide.elm-lang.org/interop/flags)

Some common ones are:

  - API keys
  - Endpoint URLS (Maybe you want a different url for prod vs dev)
  - Startup time
  - Initial data from local storage

-}

import App.Effect.LocalStorage as LocalStorage
import Json.Decode as Json
import Time


type alias Flags =
    { now : Time.Posix
    , localStorage : LocalStorage.LocalStorage
    }


decode : Json.Value -> Result Json.Error Flags
decode =
    Json.decodeValue decoder


decoder : Json.Decoder Flags
decoder =
    Json.map2
        (\now localStorage ->
            { now = now
            , localStorage = localStorage
            }
        )
        (Json.field "now" Json.int
            |> Json.map Time.millisToPosix
        )
        (Json.field "localStorage"
            LocalStorage.decode
        )
