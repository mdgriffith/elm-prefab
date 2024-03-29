# Elm Prefab App

## Getting started

**Config example**

```json
{ "app": {} }
```

That's right, there's not a heckuva lot of config for this one!

## Overview of generated files

```bash
    # Files generated in the .elm-prefab folder are not meant to be modified
    # But take a look at them if you're interested!
    .elm-prefab/App.elm
    .elm-prefab/App/Page.elm
    .elm-prefab/App/State.elm


    # You now own these files.
    # Elm Prefab expects that they exist, but you can modify them as you need to.
    src/App/Effect/LocalStorage.elm
    src/App/Page/Error.elm
    src/App/Page/Id.elm
    src/App/Effect.elm
    src/App/Flags.elm
    src/App/Shared.elm
    src/App/Sub.elm
    src/App/View.elm
    src/Main.elm

    # You own these file as well
    # You can do whatever you want with them, elm-prefab doesn't
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
---
```
