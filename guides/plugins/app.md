# Elm Prefab App

## Getting started

```json
{
  "app": {
    "pages": {
      "Home": "/home",
      "Post": "/post/:id",
      "Posts": "/posts/*"
    }
  }
}
```

With the above config and running `elm-prefab`, an app with three pages will be generated.

Checkout the overview of generated files and then head over to one of these guides!

- [Managing routes and pages](https://github.com/mdgriffith/elm-prefab/blob/main/guides/plugins/app/routes_and_pages.md)
- [Using local storage](https://github.com/mdgriffith/elm-prefab/blob/main/guides/how-to/using-localstorage.md)

## Overview of generated files

```bash
    # Files generated in the .elm-prefab folder are not meant to be modified.
    # And generally you should just add .elm-prefab to your .gitignore
    # But take a look at them if you're interested!
    .elm-prefab/App.elm
    .elm-prefab/App/Page.elm
    .elm-prefab/App/Page/Id.elm
    .elm-prefab/App/Resource.elm
    .elm-prefab/App/Resource/Msg.elm
    .elm-prefab/App/Resources.elm
    .elm-prefab/App/Route.elm
    .elm-prefab/App/State.elm
    .

    # You now own these files.
    # Elm Prefab expects that they exist, but you can modify them as you need to.
    src/App/Effect/LocalStorage.elm
    src/App/Page/Error.elm
    src/App/Effect.elm
    src/App/Flags.elm
    src/App/Sub.elm
    src/App/View.elm
    src/App/Route.elm

    # In the same folder you'll see these files.
    # These are what you should check out first!
    src/Page/Home.elm
    src/Page/Post.elm
    src/Page/Posts.elm
    src/Main.elm

    # You own these files as well.
    # You can do whatever you want with them.
    src-js/webcomponents/clipboard.ts
    src-js/webcomponents/localStorage.ts
    src-js/index.html
    src-js/main.ts

    # These are common configs for Elm, Typescript and Vite.
    # Elm Prefab only really cares about elm.generate.json though.
    elm.generate.json
    elm.json
    package.json
    tsconfig.json
    vite.config.js

```
