module Theme exposing (..)

{-| First, a basic language for our design system
-}

import Color
import Dict
import Elm
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Parser exposing ((|.), (|=))
import Theme.Color


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
    , colors : Dict.Dict String Theme.Color.Color
    , spacing : List (Named Int)
    , typography : List (Named Typeface)
    , borderRadii : List (Named Int)
    , borderWidths : List (Named Int)
    }


type alias Typeface =
    { face : String
    , fallback : List String
    , weight : ( WeightName, Int )
    , size : Int
    , lineSpacing : Int
    , variants : List String
    }


type WeightName
    = Default
    | Regular
    | Bold
    | Light


weightNameField : WeightName -> String
weightNameField weightName =
    case weightName of
        Default ->
            "default"

        Regular ->
            "regular"

        Bold ->
            "bold"

        Light ->
            "light"


weightNameToString : WeightName -> String
weightNameToString weightName =
    case weightName of
        Default ->
            ""

        Regular ->
            "-reg"

        Bold ->
            "-bold"

        Light ->
            "-light"


type Palette thing
    = Single thing
    | Palette (List (Named thing))


type alias Shadows =
    { shadows : List (Named Shadow)
    }


type alias Shadow =
    { x : Int
    , y : Int
    , color : Color.Color
    , opacity : Int
    }
