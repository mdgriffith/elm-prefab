module App.Shared exposing (Authenticated(..), Shared)

{-| Data that is shared between the global app and the individual pages.
-}


type alias Shared =
    { authenticated : Authenticated }


type Authenticated
    = Authenticated
    | Unauthenticated
