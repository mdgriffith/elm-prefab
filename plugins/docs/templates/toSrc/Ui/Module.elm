module Ui.Module exposing (view)

import Elm.Docs
import Elm.Type
import Html exposing (..)
import Theme
import Ui.Markdown
import Ui.Type


view : Elm.Docs.Module -> Html msg
view mod =
    Theme.column.lg []
        [ Html.h2 [] [ Html.text mod.name ]
        , Theme.column.lg
            []
            (mod
                |> Elm.Docs.toBlocks
                |> List.map
                    viewBlock
            )
        ]


viewBlock : Elm.Docs.Block -> Html msg
viewBlock block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            viewMarkdown markdown

        Elm.Docs.UnionBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.AliasBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.ValueBlock details ->
            Html.div []
                [ viewTypeDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.BinopBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.UnknownBlock text ->
            Html.text text


viewName : String -> Html msg
viewName name =
    Html.h2 []
        [ Html.text name
        ]


viewTypeDefinition : { docs | name : String, tipe : Elm.Type.Type } -> Html msg
viewTypeDefinition details =
    Theme.row.zero []
        [ Html.span [] [ Html.text (details.name ++ " : ") ]
        , Ui.Type.view details.tipe
        ]


viewMarkdown : String -> Html msg
viewMarkdown markdown =
    Ui.Markdown.view markdown
