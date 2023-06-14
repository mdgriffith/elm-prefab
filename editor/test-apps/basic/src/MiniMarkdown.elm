module MiniMarkdown exposing
    ( header, line
    , parser
    )

{-|

@docs header, line

@docs parser

-}

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Parser exposing ((|.), (|=), Parser)


type Markdown
    = Header { level : Int, header : String }
    | Line String


{-| -}
parser : Parser (List Markdown)
parser =
    Parser.loop [] markdownLoop


markdownLoop : List Markdown -> Parser (Parser.Step (List Markdown) (List Markdown))
markdownLoop items =
    Parser.oneOf
        [ Parser.succeed (Parser.Done (List.reverse items))
            |. Parser.end
        , Parser.succeed (Parser.Loop items)
            |. Parser.symbol "\n"
        , Parser.map
            (\md ->
                Parser.Loop (md :: items)
            )
            markdown
        , Parser.succeed (Parser.Done (List.reverse items))
        ]


{-| -}
markdown : Parser Markdown
markdown =
    Parser.oneOf
        [ header
        , line
        ]


{-| -}
header : Parser Markdown
header =
    Parser.succeed
        (\level str ->
            Header
                { level = level, header = str }
        )
        |. Parser.chompIf
            (\char -> char == '#')
        |= (Parser.chompWhile
                (\char -> char == '#')
                |> Parser.getChompedString
                |> Parser.map (\str -> 1 + String.length str)
           )
        |= (Parser.chompUntilEndOr "\n"
                |> Parser.getChompedString
           )


{-| -}
line : Parser Markdown
line =
    Parser.succeed Line
        |= (Parser.chompUntilEndOr "\n"
                |> Parser.getChompedString
           )
