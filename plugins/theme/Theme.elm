module Theme exposing (..)

{-| First, a basic language for our design system
-}

import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Parser exposing ((|.), (|=))


type Name
    = Name String


nameToString : Name -> String
nameToString (Name name) =
    name


type alias Named thing =
    { name : Name
    , item : thing
    }


type Color
    = Color Int Int Int


type alias Theme =
    { colors : List (Named Color)
    , spacing : List (Named Int)
    , typography : List (Named Typeface)
    , borders : List (Named BorderVariant)
    , shadows : List (Named Shadow)
    }


type alias Typeface =
    { face : String
    , fallback : List String
    , weight : Int
    , size : Int
    , lineSpacing : Int
    , colors : Palette Color
    }


type Palette thing
    = Single thing
    | Palette (List (Named thing))


type alias BorderVariant =
    { rounded : Int
    , color : Color
    , width : Int
    }


type alias Shadows =
    { shadows : List (Named Shadow)
    }


type alias Shadow =
    { x : Int
    , y : Int
    , color : Color
    , opacity : Int
    }
