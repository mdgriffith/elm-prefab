module App.Shared exposing
    ( Shared
    , Authenticated(..)
    )

{-| Data that is shared between the global app and the individual pages.

@docs Shared

@docs Authenticated

-}


type alias Shared =
    { authenticated : Authenticated }


type Authenticated
    = Authenticated
    | Unauthenticated
