# Add a Page

Open up `src/App/Page/Id.elm`

It should look something like this:

```Elm
module App.Page.Id exposing (Id(..))


{-| This is a special file that `elm-prefab` reads when generating the Elm code for wiring up a page.

`elm-prefab` tracks page states in a key/value dictionary that is handled in `./elm-prefab/App.elm`

The `Id` type belows represents the key for that dictionary.

`elm-prefab` needs every value of `Id` to correspond to an Elm module in `src/Page/*`. It does this by matching up the names.

So,

    type Id
        = Home HomeParams

Means that `elm-prefab` expects to find a module at `src/Page/Home.elm`.

If you add a new value to `Id` and run `elm-prefab`, then it will create a placeholder page for you!

-}

type Id
    = Home HomeParams

```

And you'll probably notice the huge comment! Let's give it a read 🧐.

So, now we can add a new variant to `Id`, let's say an about page.

```elm

type Id
    = Home HomeParams
    | About AboutParams

type alias AboutParams = {}
```

And run `elm-prefab` by running `npm run build`. You should now see a new page at `src/Page/About.elm` to get you started.

# Adding a route for our new page

You may also need to add a route to you `routes` and update `Main.elm` by extending `routeToPageId`.

So, if we add `about` to `elm.generate.json` so it looks something like this:

```json
{
  "app": {},
  "routes": {
    "Home": "/",
    "Login": "/login",
    "Logout": "/logout",
    "About": "/about"
  }
}
```

Finally, update `routeToPageId` in `Main.elm`

```elm
routeToPageId : App.Route.Route -> App.Page.Id.Id
routeToPageId route =
    case route of
        App.Route.Home _ ->
            App.Page.Id.Home {}

        App.Route.Logout _ ->
            App.Page.Id.Home {}

        App.Route.Login _ ->
            App.Page.Id.Home {}

        -- Our new page
        App.Route.About _ ->
            App.Page.Id.About {}

```

And running `npm run dev`, and going to `/about` and see our new page!
