# Using Local Storage

Let's cache some information in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)!

For example, let's say we want to store Supabase auth info in local storage so that people can stay logged in if they close their browser. There'll likely be a more in depth guide for Supabase Auth in the future, but this will just cover storing stuff in local storage.

First, create a new file called `src/Supa/Auth.elm` and copy the following into it:

```elm
module Supa.Auth exposing (Info, key, encode, decoder)

import Json.Encode
import Json.Decode
import Time


key : String
key =
    "supa-auth"

{-| The info we want to track.

-}
type alias Info =
    { accessToken : String
    , expiresAt : Time.Posix
    , refreshToken : String
    , tokenType : String
    }

{-|

-}
decoder : Json.Decode.Decoder Info
decoder =
    Json.Decode.map4
        (\accessToken expiresAt refreshToken tokenType ->
            { accessToken = accessToken
            , expiresAt = expiresAt
            , refreshToken = refreshToken
            , tokenType = tokenType
            }
        )
        (Json.Decode.field "access_token" Json.Decode.string)
        (Json.Decode.field "expires_at"
            (Json.Decode.map (\seconds -> Time.millisToPosix (seconds * 1000))
                Json.Decode.int
            )
        )
        (Json.Decode.field "refresh_token" Json.Decode.string)
        (Json.Decode.field "token_type" Json.Decode.string)

{-| This is a JSON encoder, which takes the record with a type `Info` and encodes it into JSON.
-}
encode : Info -> Json.Encode.Value
encode info =
    Json.Encode.object
        [ ( "access_token", Json.Encode.string info.accessToken )
        , ( "expires_at", Json.Encode.int (Time.posixToMillis info.expiresAt // 1000) )
        , ( "refresh_token", Json.Encode.string info.refreshToken )
        , ( "token_type", Json.Encode.string info.tokenType )
        ]
```

So, we've defined the data we want to save `Info`, and defined a JSON encoder and a decoder for it.

If you're new to JSON encoders/decoder, you can [read more about them here](https://guide.elm-lang.org/effects/json#json).

## Now let's store some stuff

Open up `src/App/Effect/LocalStorage.elm`

Let's add `supaAuth` to the main local storage type:

```elm
-- before
type alias LocalStorage =
    { session : Maybe Session
    }

-- after
import Supa.Auth


type alias LocalStorage =
    { session : Maybe Session
    , supaAuth : Maybe Supa.Auth.Info
    }
```

We add everything as a `Maybe` just in case in case it's not present.

Now we can add it to our decoder:

```elm

--before
decode : Json.Decode.Decoder LocalStorage
decode =
    -- All tables must fail nicely
    Json.Decode.map (\maybeSession -> { session = maybeSession })
        (Json.Decode.maybe (Json.Decode.field keys.session decodeSession))


-- after
decode : Json.Decode.Decoder LocalStorage
decode =
    -- All tables must fail nicely
    Json.Decode.map2 (\maybeSession maybeSupa -> { session = maybeSession, supaAuth = maybeSupa })
                -- ^  Notice we added a `2` here
                -- This is because we're combining 2 decoders
        (Json.Decode.maybe (Json.Decode.field keys.session decodeSession))
        --                                Our new key       Our decoder we just wrote.
        --                                         v        v
        (Json.Decode.maybe (Json.Decode.field Supa.Auth.key Supa.Auth.decoder))

```

Great, now when our app's `init` is run, we'll get supabase local storage data in the `flags`!

We still need a way to save the data in the first place.

## Saving data to local storage

First, let's put together some helpers.

```elm
saveSupaAuth : Supa.Auth.Info -> App.Effect.Effect msg
saveSupaAuth session =
    saveToLocalStorage
        Supa.Auth.key
        (encodeSession session)


clearSupaAuth : App.Effect.Effect msg
clearSupaAuth =
    clearAtKey Supa.Auth.key


onSupaAuthChange : (Supa.Auth.Info -> msg) -> App.Sub.Sub msg
onSupaAuthChange toMsg =
    App.Sub.onLocalStorageUpdated
        { key = Supa.Auth.key
        , decoder = Json.Decode.map toMsg Supa.Auth.decoder
        }


```

Now, when handling a `Msg` in an `update` function, you can save the Supabase auth data to local storage!

Or you can listen for changes using `onSupaAuthChange`.
