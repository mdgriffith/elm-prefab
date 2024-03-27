module App.Shared exposing
    ( Authenticated(..)
    , Shared
    , isLoggedIn
    )

{-| Data that is shared between the global app and the individual pages.
-}


type alias Shared =
    { authenticated : Authenticated }


type Authenticated
    = Authenticated
    | Unauthenticated


isLoggedIn : App.Shared.Shared -> Bool
isLoggedIn shared =
    case shared.authenticated of
        App.Shared.Unauthenticated ->
            False

        App.Shared.Authenticated _ ->
            True
