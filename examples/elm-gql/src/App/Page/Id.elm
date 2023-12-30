module App.Page.Id exposing (Id(..))

{-| -}


type Id
    = Home HomeParams
    | WhoDis
    | WhoDisWithParams WhoDisParams



{- Param definitions -}


type alias HomeParams =
    {}


type alias WhoDisParams =
    { name : String
    , age : Int
    }
