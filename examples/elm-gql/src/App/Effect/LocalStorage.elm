module App.Effect.LocalStorage exposing
    ( LocalStorage
    , saveSession, clearSession
    , decode
    )

{-| A very simple module for interacting with local storage.

This pairs with some js code in localStorage.ts, take a look to get familiar with it.

@docs LocalStorage

@docs saveSession, clearSession

@docs decode

-}

import App.Effect
import App.Shared
import App.Sub
import Json.Decode
import Json.Encode
import Time


type alias LocalStorage =
    { session : Maybe Session
    }


type alias Session =
    { token : String
    }


keys =
    { session = "session"
    }


decode : Json.Decode.Decoder LocalStorage
decode =
    -- All tables must fail nicely
    Json.Decode.map LocalStorage
        (Json.Decode.maybe (Json.Decode.field keys.session decodeSession))



-- Session helpers


saveSession : Session -> App.Effect.Effect msg
saveSession session =
    saveToLocalStorage
        keys.session
        (encodeSession session)


clearSession : App.Effect.Effect msg
clearSession =
    clearAtKey keys.session


decodeSession : Json.Decode.Decoder Session
decodeSession =
    Json.Decode.map
        (\token -> { token = token })
        (Json.Decode.field "token" Json.Decode.string)


encodeSession : Session -> Json.Encode.Value
encodeSession session =
    Json.Encode.object
        [ ( "token", Json.Encode.string session.token )
        ]



-- Lower level helpers


{-| Sends a message out the `outgoing` port that is defined in `App.Effect`.

You can see where this ends up on the JS side of things in `js/ports.js`.

-}
saveToLocalStorage : String -> Json.Encode.Value -> App.Effect.Effect msg
saveToLocalStorage key value =
    App.Effect.sendToJs
        { tag = "local-storage"
        , details =
            Just
                (Json.Encode.object
                    [ ( "key", Json.Encode.string key )
                    , ( "value", value )
                    ]
                )
        }


clearAtKey : String -> App.Effect.Effect msg
clearAtKey key =
    App.Effect.sendToJs
        { tag = "local-storage-clear"
        , details =
            Just
                (Json.Encode.object
                    [ ( "key", Json.Encode.string key )
                    ]
                )
        }
