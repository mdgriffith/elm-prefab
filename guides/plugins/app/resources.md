# Sharing Data and Globally Available Resources

Once you have the standard setup of a global `App` and as many `Pages` as you'd like, you'll probably run into situations where you have some global data that you'd like to share some data.

One of the most common cases of this is ✨**authentication**✨.

What we can do is create a global `Resource`, which allows us to

- keep track of a small slice of state
- have any part of our app send updates to this state
- have any part of our app subscribe to changes to this state

This is pretty cool, but the intention is for any individual `Resources` to remain small and uncomplicated. They're primarily a way to share state.

## Defining `Resource.Auth`

To get this party started, copy the below file into `src/Resource/Auth.elm` and rerun `elm-prefab`.

```elm
module Resource.Auth exposing (..)

import App.Resource


type Model
    = Unauthenticated
    | Authenticated User


type alias User =
    { username : String
    , token : String
    }


type Msg
    = LoggedIn User
    | LoggedOut


resource : App.Resource.Resource Msg Model
resource =
    App.Resource.resource
        { init =
            \flags -> Unauthenticated
        , update =
            \msg model ->
                case msg of
                    LoggedIn user ->
                        Authenticated user

                    LoggedOut ->
                        Unauthenticated
        }

```

This file describes a very small amount of logic for our `Auth`.

When we run `elm-prefab`, it reads all files in the `Resource` directory, and it'll generate a file called `App.Resources`.

`App.Resources` is how you can send/listen for messages on this resource!

Let's check it out

```elm
module App.Resources exposing (..)

import App.Effect
import App.Resource.Msg
import App.Sub
import Resource.Auth


type alias Resources =
    { auth : Resource.Auth.Model }


send : { auth : Resource.Auth.Msg -> App.Effect.Effect msg }
send =
    { auth = \msg -> App.Effect.sendToResource (App.Resource.Msg.ToAuth msg) }


listen : { auth : (Resource.Auth.Msg -> Maybe msg) -> App.Sub.Sub msg }
listen =
    { auth =
        \toMsg ->
            App.Sub.onResourceUpdated
                (\msg ->
                    case msg of
                        App.Resource.Msg.ToAuth inner ->
                            toMsg inner
                )
    }
```

Cool! So, if we are on any given page, we can run

```elm
    -- This is an App.Effect.
    App.Resources.send.auth Resources.Auth.LoggedOut
```

Or we can listen for changes by adding the following to our `subscriptions`

```elm
subscriptions =
    App.Resources.listen.auth (\authMsg -> Just AuthUpdated)
```

Now, whenever the auth resource is changed, we'll get the `AuthUpdated` message sent to our update function.
