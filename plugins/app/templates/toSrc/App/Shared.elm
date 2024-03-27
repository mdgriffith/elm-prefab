module App.Shared exposing
    ( Shared
    , Authenticated(..), isLoggedIn
    )

{-| Data that is shared between the global app and the individual pages.

@docs Shared

@docs Authenticated, isLoggedIn

-}


type alias Shared =
    { authenticated : Authenticated }


type Authenticated
    = Authenticated
    | Unauthenticated


isLoggedIn : Shared -> Bool
isLoggedIn shared =
    case shared.authenticated of
        Authenticated ->
            True

        Unauthenticated ->
            False
