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



{- Param definitions -}


type alias HomeParams =
    {}
