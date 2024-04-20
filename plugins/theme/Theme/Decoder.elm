module Theme.Decoder exposing (decode)

{-| -}

import Color
import Dict
import Json.Decode
import Parser exposing ((|.), (|=))
import Theme exposing (..)
import Theme.Color


nameToString : Name -> String
nameToString (Name str) =
    str


decode : Json.Decode.Decoder Theme
decode =
    Json.Decode.field "colors" decodeColorSwatch
        |> Json.Decode.andThen
            (\colorSwatches ->
                Json.Decode.map4 (Theme "ui" colorSwatches)
                    (Json.Decode.field "spacing"
                        (decodeNamed Json.Decode.int)
                    )
                    (Json.Decode.field "typography"
                        (Json.Decode.map List.concat (Json.Decode.list decodeTypeface))
                    )
                    (Json.Decode.maybe
                        (Json.Decode.field "borders"
                            (Json.Decode.field "radius" (decodeNamed Json.Decode.int))
                        )
                        |> Json.Decode.map (Maybe.withDefault [])
                    )
                    (Json.Decode.maybe
                        (Json.Decode.field "borders"
                            (Json.Decode.field "width" (decodeNamed Json.Decode.int))
                        )
                        |> Json.Decode.map (Maybe.withDefault [])
                    )
            )


decodeColorReference : Dict.Dict String Theme.Color.Color -> Json.Decode.Decoder Theme.Color.Color
decodeColorReference colors =
    Json.Decode.string
        |> Json.Decode.andThen
            (\string ->
                case Dict.get string colors of
                    Just color ->
                        Json.Decode.succeed color

                    Nothing ->
                        Json.Decode.fail ("I don't recognize this color: " ++ string)
            )


decodeColorSwatch : Json.Decode.Decoder (Dict.Dict String Theme.Color.Color)
decodeColorSwatch =
    Json.Decode.keyValuePairs
        (Json.Decode.oneOf
            [ Json.Decode.map (List.singleton << Tuple.pair "") decodeColor
            , Json.Decode.keyValuePairs decodeColor
            ]
        )
        |> Json.Decode.map
            (List.concatMap
                (\( key, innerList ) ->
                    List.map
                        (\( innerKey, value ) ->
                            ( key ++ innerKey, value )
                        )
                        innerList
                )
                >> Dict.fromList
            )


flattenPalette ( key, palette ) =
    case palette of
        Single color ->
            [ { name = Name key
              , item = color
              }
            ]

        Palette colors ->
            List.map
                (\{ name, item } ->
                    { name = Name (key ++ Theme.nameToString name)
                    , item = item
                    }
                )
                colors


decodeColor : Json.Decode.Decoder Theme.Color.Color
decodeColor =
    Json.Decode.string
        |> Json.Decode.andThen
            (\string ->
                case Parser.run Theme.Color.cssParser string of
                    Ok color ->
                        Json.Decode.succeed color

                    Err err ->
                        Json.Decode.fail ("I don't recognize this color: " ++ string)
            )


decodeNamed : Json.Decode.Decoder a -> Json.Decode.Decoder (List (Named a))
decodeNamed inner =
    Json.Decode.keyValuePairs inner
        |> Json.Decode.map
            (List.map
                (\( key, value ) ->
                    { name = Name key
                    , item = value
                    }
                )
            )


{-|

    "typography": {
        "interface": {
            "font": ["EB Garamond", "serif"]
            "sizes":
                { "huge":
                    { "size": 120
                    , "weight": 700
                    }
                }
            }
        }
    }

-}
decodeTypeface : Json.Decode.Decoder (List (Named Typeface))
decodeTypeface =
    Json.Decode.map2
        (\( font, fallback ) namedSizes ->
            List.concatMap
                (\( name, sizes ) ->
                    List.map
                        (\size ->
                            Named (Name name)
                                { face = font
                                , fallback = fallback
                                , weight = size.weight
                                , size = size.size
                                , lineSpacing = size.lineSpacing
                                , variants = size.variants
                                }
                        )
                        sizes
                )
                namedSizes
        )
        (Json.Decode.field "font" (nonEmptyList Json.Decode.string))
        (Json.Decode.field "sizes"
            (Json.Decode.keyValuePairs decodeTypefaceSize)
        )


decodeTypefaceSize :
    Json.Decode.Decoder
        (List
            { size : Int
            , weight : ( WeightName, Int )
            , lineSpacing : Int
            , variants : List String
            }
        )
decodeTypefaceSize =
    Json.Decode.map4
        (\size weights variants lineSpacing ->
            List.map
                (\weight ->
                    { size = size
                    , weight = weight
                    , lineSpacing = lineSpacing
                    , variants = variants
                    }
                )
                weights
        )
        (Json.Decode.field "size" Json.Decode.int)
        decodeWeights
        decodeVariants
        (Json.Decode.maybe (Json.Decode.field "lineSpacing" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 1)
        )


decodeWeights : Json.Decode.Decoder (List ( WeightName, Int ))
decodeWeights =
    Json.Decode.oneOf
        [ Json.Decode.field "weight" (Json.Decode.map (\weight -> [ ( Default, weight ) ]) Json.Decode.int)
        , Json.Decode.field "weights"
            (Json.Decode.andThen
                (\weights ->
                    case List.sort weights of
                        [] ->
                            Json.Decode.succeed [ ( Default, 400 ) ]

                        [ weightOne ] ->
                            Json.Decode.succeed [ ( Default, weightOne ) ]

                        [ weightOne, weightTwo ] ->
                            if weightOne < 400 then
                                Json.Decode.succeed [ ( Light, weightOne ), ( Regular, weightTwo ) ]

                            else
                                Json.Decode.succeed [ ( Regular, weightOne ), ( Bold, weightTwo ) ]

                        [ weightOne, weightTwo, weightThree ] ->
                            Json.Decode.succeed
                                [ ( Light, weightOne )
                                , ( Regular, weightTwo )
                                , ( Bold, weightThree )
                                ]

                        tooMany ->
                            Json.Decode.fail
                                ("I can only support a max of 3 distinct weights for a given typography size!  But I found " ++ String.join ", " (List.map String.fromInt weights))
                )
                (Json.Decode.list Json.Decode.int)
            )
        , Json.Decode.succeed [ ( Default, 400 ) ]
        ]


decodeVariants =
    Json.Decode.oneOf
        [ Json.Decode.field "variant" (Json.Decode.map List.singleton Json.Decode.string)
        , Json.Decode.field "variants" (Json.Decode.list Json.Decode.string)
        , Json.Decode.succeed []
        ]


nonEmptyList : Json.Decode.Decoder a -> Json.Decode.Decoder ( a, List a )
nonEmptyList decoder =
    Json.Decode.list decoder
        |> Json.Decode.andThen
            (\list ->
                case list of
                    [] ->
                        Json.Decode.fail "Expected a non-empty list"

                    first :: rest ->
                        Json.Decode.succeed ( first, rest )
            )


decodePalette : Json.Decode.Decoder thing -> Json.Decode.Decoder (Palette thing)
decodePalette decodeThing =
    Json.Decode.oneOf
        [ Json.Decode.map Single decodeThing
        , Json.Decode.map Palette (decodeNamed decodeThing)
        ]
