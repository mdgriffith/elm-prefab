module Theme exposing (..)

{-| First, a basic language for our design system
-}

import Color
import Dict
import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Parser exposing ((|.), (|=))


type alias Color =
    Color.Color


type Name
    = Name String


nameToString : Name -> String
nameToString (Name name) =
    name


type alias Named thing =
    { name : Name
    , item : thing
    }


type alias Theme =
    { namespace : String
    , colors : Dict.Dict String Color
    , palettes : List (Named ColorPalette)
    , spacing : List (Named Int)
    , typography : List (Named Typeface)
    , borders : List (Named BorderVariant)
    }


type alias ColorPalette =
    { text : Color
    , background : Maybe Color
    , border : Maybe Color
    , hover : Maybe InnerColorPalette
    , focus : Maybe InnerColorPalette
    , active : Maybe InnerColorPalette
    }


type alias InnerColorPalette =
    { text : Maybe Color
    , background : Maybe Color
    , border : Maybe Color
    }


type alias Typeface =
    { face : String
    , fallback : List String
    , weight : Int
    , size : Int
    , lineSpacing : Int
    , colors : Maybe (Palette Color)
    }


type Palette thing
    = Single thing
    | Palette (List (Named thing))


type alias BorderVariant =
    { rounded : Int
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
