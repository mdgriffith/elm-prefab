module Theme exposing (..)

{-| First, a basic language for our design system
-}

import Elm
import Json.Decode


type Name
    = Name String


nameToString : Name -> String
nameToString (Name str) =
    str


decode : Json.Decode.Decoder Theme
decode =
    Json.Decode.map5 Theme
        (Json.Decode.field "colors"
            (Json.Decode.succeed
                { palette = []
                , backgrounds = always True
                , text = always True
                , borders = always True
                }
            )
        )
        (Json.Decode.field "spacing"
            (Json.Decode.succeed
                (tshirtSizesInt 15
                    [ 0
                    , 3
                    , 5
                    , 7
                    , 10
                    , 15
                    , 20
                    , 25
                    , 35
                    , 50
                    , 80
                    ]
                )
            )
        )
        (Json.Decode.field "typography"
            (Json.Decode.succeed [])
        )
        (Json.Decode.field "borders"
            (Json.Decode.succeed
                { sizes =
                    tshirtSizesInt 2
                        [ 0, 1, 2, 3 ]
                , rounded =
                    tshirtSizesInt 4
                        [ 2, 4, 10 ]
                }
            )
        )
        (Json.Decode.field "shadows"
            (Json.Decode.succeed [])
        )


type alias Named thing =
    { name : Name
    , item : thing
    }


type Color
    = Color


type alias Theme =
    { colors : Colors
    , spacing : List (Named Int)
    , typography : List (Named Typography)
    , borders : Borders
    , shadows : List (Named Shadow)
    }


type alias Colors =
    { palette : List (Named Color)
    , backgrounds : Named Color -> Bool
    , text : Named Color -> Bool
    , borders : Named Color -> Bool
    }


type alias Typography =
    { face : String
    , weight : Int
    , size : Int
    , lineSpacing : Int
    }



-- type alias Typography =
--     { sizes : List (Named Int)
--     , fonts : List (Named Font)
--     }
-- type alias Font =
--     { face : String
--     , weights : List Int
--     }


type alias Borders =
    { sizes : List (Named Int)
    , rounded : List (Named Int)
    }


type alias Shadows =
    { shadows : List Shadow
    }


type alias Shadow =
    { x : Int
    , y : Int
    , color : Color
    , opacity : Int
    }



{- Helpers -}


tshirtSizesInt : Int -> List Int -> List (Named Int)
tshirtSizesInt middle vals =
    tshirtSizes
        { sort = List.sort
        , middle = middle
        , overrideName =
            \i ->
                case i of
                    0 ->
                        Just (Name "zero")

                    _ ->
                        Nothing
        }
        vals


tshirtSizes :
    { middle : value
    , sort : List value -> List value
    , overrideName : value -> Maybe Name
    }
    -> List value
    -> List (Named value)
tshirtSizes opts values =
    let
        sorted =
            (opts.middle :: values)
                |> opts.sort

        middleIndex =
            List.foldl
                (\item (( index, maybeMiddleIndex ) as gathered) ->
                    case maybeMiddleIndex of
                        Nothing ->
                            if item == opts.middle then
                                ( index, Just index )

                            else
                                ( index + 1, maybeMiddleIndex )

                        Just _ ->
                            gathered
                )
                ( 0, Nothing )
                sorted
                |> Tuple.second
                |> Maybe.withDefault 0
    in
    List.indexedMap (tagTShirtSizes opts.overrideName middleIndex) values


tagTShirtSizes :
    (item -> Maybe Name)
    -> Int
    -> Int
    -> item
    ->
        { item : item
        , name : Name
        }
tagTShirtSizes overrideName middleIndex index item =
    { name =
        case overrideName item of
            Just name ->
                name

            Nothing ->
                Name <|
                    if index == middleIndex then
                        "md"

                    else if index > middleIndex then
                        let
                            xCount =
                                abs (index - (middleIndex + 1))
                        in
                        case xCount of
                            0 ->
                                "lg"

                            1 ->
                                "xl"

                            _ ->
                                "xl" ++ String.fromInt xCount

                    else
                        -- is below
                        let
                            xCount =
                                abs (index - (middleIndex - 1))
                        in
                        case xCount of
                            0 ->
                                "sm"

                            1 ->
                                "xs"

                            _ ->
                                "xs" ++ String.fromInt xCount
    , item = item
    }



{- Generate an example view -}
-- viewHeader : String -> Theme -> Ui.Element msg
-- viewHeader name theme =
--     Debug.todo ""
-- viewCard : Theme -> Ui.Element msg
-- viewCard =
--     Debug.todo ""
