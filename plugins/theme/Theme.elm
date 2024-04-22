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


type alias ColorThemeDefinitions =
    { default : ColorTheme
    , alternates : List (Named ColorTheme)
    }


type alias FullColorName =
    { base : String -- primary
    , alias : Maybe String -- primary
    , variant : Maybe String -- 700
    , state : Maybe State -- hover
    , nuance : Maybe String -- subtle
    }


toFullColorDescription : FullColorName -> String
toFullColorDescription fullColorName =
    let
        variant =
            case fullColorName.variant of
                Just v ->
                    v

                Nothing ->
                    ""

        state =
            case fullColorName.state of
                Just s ->
                    stateToString s

                Nothing ->
                    ""

        nuance =
            case fullColorName.nuance of
                Just n ->
                    n

                Nothing ->
                    ""
    in
    fullColorName.base ++ variant


toFullColorName : String -> FullColorName -> String
toFullColorName functionName fullColorName =
    let
        base =
            case fullColorName.alias of
                Just alias ->
                    alias

                Nothing ->
                    fullColorName.base

        variant =
            case fullColorName.variant of
                Just v ->
                    capitalize v

                Nothing ->
                    ""

        state =
            case fullColorName.state of
                Just s ->
                    stateToString s

                Nothing ->
                    ""

        nuance =
            case fullColorName.nuance of
                Just n ->
                    capitalize n

                Nothing ->
                    ""
    in
    base ++ capitalize functionName ++ state ++ nuance


stateToString : State -> String
stateToString state =
    case state of
        Hover ->
            "Hover"

        Active ->
            "Active"

        Focus ->
            "Focus"


type State
    = Hover
    | Active
    | Focus


type alias ColorTheme =
    { text : List ( FullColorName, Theme.Color.Color )
    , background : List ( FullColorName, Theme.Color.Color )
    , border : List ( FullColorName, Theme.Color.Color )
    }


type alias Theme =
    { namespace : String
    , colors : List ColorInstance
    , themes : Maybe ColorThemeDefinitions
    , spacing : List (Named Int)
    , typography : List (Named Typeface)
    , borderRadii : List (Named Int)
    , borderWidths : List (Named Int)
    }


type alias ColorInstance =
    { color : Theme.Color.Color
    , name : String
    , alias : Maybe String
    , variant : Maybe String
    }


toColorName : ColorInstance -> String
toColorName colorInstance =
    case colorInstance.variant of
        Just variant ->
            colorInstance.name ++ capitalize variant

        Nothing ->
            colorInstance.name


toColorAlias : ColorInstance -> String
toColorAlias colorInstance =
    let
        alias =
            colorInstance.alias
                |> Maybe.withDefault colorInstance.name
    in
    case colorInstance.variant of
        Just variant ->
            alias ++ capitalize variant

        Nothing ->
            alias


capitalize : String -> String
capitalize str =
    let
        top =
            String.left 1 str

        remain =
            String.dropLeft 1 str
    in
    String.toUpper top ++ remain


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
