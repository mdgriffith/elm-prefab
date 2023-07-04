module Theme.Decoder exposing (decode)

{-| -}

import Json.Decode
import Parser exposing ((|.), (|=))
import Theme exposing (..)


nameToString : Name -> String
nameToString (Name str) =
    str


decode : Json.Decode.Decoder Theme
decode =
    Json.Decode.map5 Theme
        (Json.Decode.field "colors"
            decodeColorPalette
        )
        (Json.Decode.field "spacing"
            (decodeNamed Json.Decode.int)
        )
        (Json.Decode.field "typography"
            (decodeNamed decodeTypeface)
        )
        (Json.Decode.field "borders"
            (decodeNamed decodeBorderVariant)
        )
        (Json.Decode.field "shadows"
            (Json.Decode.succeed [])
        )


decodeColorPalette : Json.Decode.Decoder (List (Named Color))
decodeColorPalette =
    Json.Decode.keyValuePairs
        (decodePalette decodeColor)
        |> Json.Decode.map
            (List.concatMap flattenPalette)


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


decodeTypeface : Json.Decode.Decoder Typeface
decodeTypeface =
    Json.Decode.map6 Typeface
        (Json.Decode.field "face" Json.Decode.string)
        (Json.Decode.field "fallback" (Json.Decode.list Json.Decode.string))
        (Json.Decode.maybe (Json.Decode.field "weight" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 400)
        )
        (Json.Decode.field "size" Json.Decode.int)
        (Json.Decode.maybe (Json.Decode.field "lineSpacing" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 1)
        )
        (Json.Decode.field "color"
            (decodePalette decodeColor)
        )


decodePalette : Json.Decode.Decoder thing -> Json.Decode.Decoder (Palette thing)
decodePalette decodeThing =
    Json.Decode.oneOf
        [ Json.Decode.map Single decodeThing
        , Json.Decode.map Palette (decodeNamed decodeThing)
        ]


decodeBorderVariant : Json.Decode.Decoder BorderVariant
decodeBorderVariant =
    Json.Decode.map3 BorderVariant
        (Json.Decode.maybe (Json.Decode.field "rounded" Json.Decode.int)
            |> Json.Decode.map (Maybe.withDefault 0)
        )
        (Json.Decode.field "color" decodeColor)
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
