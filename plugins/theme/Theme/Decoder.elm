module Theme.Decoder exposing (decode)

{-| -}

import Dict
import Json.Decode
import Parser exposing ((|.), (|=))
import Theme exposing (..)


nameToString : Name -> String
nameToString (Name str) =
    str


decode : Json.Decode.Decoder Theme
decode =
    Json.Decode.field "colors" decodeColorSwatch
        |> Json.Decode.andThen
            (\colorSwatches ->
                Json.Decode.map4 (Theme colorSwatches)
                    (Json.Decode.field "palettes"
                        (decodeNamed (decodeColorPalette colorSwatches))
                    )
                    (Json.Decode.field "spacing"
                        (decodeNamed Json.Decode.int)
                    )
                    (Json.Decode.field "typography"
                        (Json.Decode.map List.concat (Json.Decode.list decodeTypeface))
                    )
                    (Json.Decode.field "borders"
                        (decodeNamed decodeBorderVariant)
                    )
            )


decodeColorReference : Dict.Dict String Color -> Json.Decode.Decoder Color
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


decodeColorPalette : Dict.Dict String Color -> Json.Decode.Decoder ColorPalette
decodeColorPalette colors =
    Json.Decode.map6 ColorPalette
        (Json.Decode.maybe (Json.Decode.field "text" (decodeColorReference colors)))
        (Json.Decode.maybe (Json.Decode.field "background" (decodeColorReference colors)))
        (Json.Decode.maybe (Json.Decode.field "border" (decodeColorReference colors)))
        (Json.Decode.maybe (Json.Decode.field "hover" (decodeInnerColorPalette colors)))
        (Json.Decode.maybe (Json.Decode.field "active" (decodeInnerColorPalette colors)))
        (Json.Decode.maybe (Json.Decode.field "focus" (decodeInnerColorPalette colors)))


decodeInnerColorPalette : Dict.Dict String Color -> Json.Decode.Decoder InnerColorPalette
decodeInnerColorPalette colors =
    Json.Decode.map3 InnerColorPalette
        (Json.Decode.maybe (Json.Decode.field "text" (decodeColorReference colors)))
        (Json.Decode.maybe (Json.Decode.field "background" (decodeColorReference colors)))
        (Json.Decode.maybe (Json.Decode.field "border" (decodeColorReference colors)))


decodeColorSwatch : Json.Decode.Decoder (Dict.Dict String Color)
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


decodeColor : Json.Decode.Decoder Color
decodeColor =
    Json.Decode.string
        |> Json.Decode.andThen
            (\string ->
                case Parser.run parseColor string of
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
        (\( font, fallback ) sizes ->
            List.map
                (\( name, size ) ->
                    Named (Name name)
                        { face = font
                        , fallback = fallback
                        , weight = size.weight
                        , size = size.size
                        , lineSpacing = size.lineSpacing
                        , colors = size.color
                        }
                )
                sizes
        )
        (Json.Decode.field "font" (nonEmptyList Json.Decode.string))
        (Json.Decode.field "sizes"
            (Json.Decode.keyValuePairs decodeTypefaceSize)
        )


decodeTypefaceSize :
    Json.Decode.Decoder
        { size : Int
        , weight : Int
        , lineSpacing : Int
        , color : Maybe (Palette Color)
        }
decodeTypefaceSize =
    Json.Decode.map4
        (\size weight lineSpacing color ->
            { size = size
            , weight = weight
            , lineSpacing = lineSpacing
            , color = color
            }
        )
        (Json.Decode.field "size" Json.Decode.int)
        (Json.Decode.maybe (Json.Decode.field "weight" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 400)
        )
        (Json.Decode.maybe (Json.Decode.field "lineSpacing" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 1)
        )
        (Json.Decode.maybe (Json.Decode.field "color" (decodePalette decodeColor)))



-- )


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


decodeBorderVariant : Json.Decode.Decoder BorderVariant
decodeBorderVariant =
    Json.Decode.map2 BorderVariant
        (Json.Decode.maybe (Json.Decode.field "rounded" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 0)
        )
        (Json.Decode.maybe (Json.Decode.field "width" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 1)
        )


parseColor : Parser.Parser Color
parseColor =
    Parser.oneOf
        [ parseRgb
        , parseHex
        ]


parseRgb : Parser.Parser Color
parseRgb =
    Parser.succeed Color
        |. Parser.symbol "rgb("
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces
        |. Parser.symbol ","
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces
        |. Parser.symbol ","
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces
        |. Parser.symbol ")"


parseHex : Parser.Parser Color
parseHex =
    Parser.succeed Color
        |. Parser.symbol "#"
        |= parseHex16
        |= parseHex16
        |= parseHex16


parseHex16 : Parser.Parser Int
parseHex16 =
    Parser.succeed
        (\one two ->
            (one * 16) + two
        )
        |= hex8
        |= hex8


hex8 : Parser.Parser Int
hex8 =
    Parser.oneOf
        [ Parser.succeed 0
            |. Parser.symbol "0"
        , Parser.succeed 1
            |. Parser.symbol "1"
        , Parser.succeed 2
            |. Parser.symbol "2"
        , Parser.succeed 3
            |. Parser.symbol "3"
        , Parser.succeed 4
            |. Parser.symbol "4"
        , Parser.succeed 5
            |. Parser.symbol "5"
        , Parser.succeed 6
            |. Parser.symbol "6"
        , Parser.succeed 7
            |. Parser.symbol "7"
        , Parser.succeed 8
            |. Parser.symbol "8"
        , Parser.succeed 9
            |. Parser.symbol "9"
        , Parser.succeed 10
            |. Parser.oneOf
                [ Parser.symbol "a"
                , Parser.symbol "A"
                ]
        , Parser.succeed 11
            |. Parser.oneOf
                [ Parser.symbol "b"
                , Parser.symbol "B"
                ]
        , Parser.succeed 12
            |. Parser.oneOf
                [ Parser.symbol "c"
                , Parser.symbol "C"
                ]
        , Parser.succeed 13
            |. Parser.oneOf
                [ Parser.symbol "d"
                , Parser.symbol "D"
                ]
        , Parser.succeed 14
            |. Parser.oneOf
                [ Parser.symbol "e"
                , Parser.symbol "E"
                ]
        , Parser.succeed 15
            |. Parser.oneOf
                [ Parser.symbol "f"
                , Parser.symbol "F"
                ]
        ]
