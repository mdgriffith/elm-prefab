# Using Local Storage

Let's cache some information in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)!

The main way to do this is to check out [`Resources`](https://github.com/mdgriffith/elm-prefab/blob/main/guides/plugins/app/resources.md).

They have a mechanism to sync things to local storage built in!

If you want to do things more manually, you should check out the following helpers that are generated for you:

- `App.Effect.saveToLocalStorage`
- `App.Effect.clearLocalStorageKey`
- `App.Sub.onLocalStorageUpdated`
