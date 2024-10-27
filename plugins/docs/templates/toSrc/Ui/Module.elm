module Ui.Module exposing (view)

import Elm.Docs
import Elm.Type
import Html exposing (..)
import Html.Attributes as Attr
import Theme
import Ui.Markdown
import Ui.Syntax
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
                [ viewUnionDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.AliasBlock details ->
            Html.div []
                [ viewAliasDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.ValueBlock details ->
            Html.div []
                [ viewValueDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.BinopBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.UnknownBlock text ->
            Html.text text


viewMarkdown : String -> Html msg
viewMarkdown comment =
    if String.startsWith "#" (String.trim comment) then
        Ui.Markdown.view comment

    else
        Html.div [ Attr.style "padding-left" "3rem" ]
            [ Ui.Markdown.view comment ]


viewAliasDefinition : Elm.Docs.Alias -> Html msg
viewAliasDefinition details =
    Html.pre []
        [ Html.code []
            [ Html.span [ Ui.Syntax.keyword ] [ Html.text "type alias " ]
            , Html.span [] [ Html.text (details.name ++ " ") ]
            , Html.span [] (List.map (\v -> Html.text (v ++ " ")) details.args)
            , Html.span [] [ Html.text "= " ]
            , Ui.Type.viewWithIndent 5 details.tipe
            ]
        ]


viewUnionDefinition : Elm.Docs.Union -> Html msg
viewUnionDefinition details =
    Html.pre []
        [ Html.code []
            [ Html.span [ Ui.Syntax.keyword ] [ Html.text "type " ]
            , Html.span [] [ Html.text (details.name ++ " ") ]
            , Html.span [] (List.map (\v -> Html.text (v ++ " ")) details.args)
            , Html.span []
                (List.foldl
                    (\( tagName, pieces ) ( isFirst, gathered ) ->
                        let
                            divider =
                                if isFirst then
                                    "="

                                else
                                    "|"

                            isMultiline =
                                List.any Ui.Type.shouldBeMultiline pieces
                        in
                        ( False
                        , Html.span []
                            [ Html.span [ Ui.Syntax.keyword ] [ Html.text ("\n    " ++ divider) ]
                            , Html.text (" " ++ tagName ++ " ")
                            , Html.span []
                                (List.map
                                    (\tipe ->
                                        let
                                            lineIsMulti =
                                                Ui.Type.shouldBeMultiline tipe

                                            end =
                                                if lineIsMulti then
                                                    "         )"

                                                else
                                                    ")"

                                            needsParens =
                                                Ui.Type.needsParens tipe
                                        in
                                        if needsParens then
                                            if isMultiline then
                                                Html.div [] [ Html.text "         (", Ui.Type.viewWithIndent 12 tipe, Html.text end ]

                                            else
                                                Html.span [] [ Html.text "(", Ui.Type.view tipe, Html.text ") " ]

                                        else if isMultiline then
                                            Html.div [] [ Html.text "       ", Ui.Type.view tipe ]

                                        else
                                            Html.span [] [ Ui.Type.viewWithIndent 11 tipe, Html.text " " ]
                                    )
                                    pieces
                                )
                            ]
                            :: gathered
                        )
                    )
                    ( True, [] )
                    details.tags
                    |> Tuple.second
                    |> List.reverse
                )
            ]
        ]


viewName : String -> Html msg
viewName name =
    Html.h2 []
        [ Html.text name
        ]


viewValueDefinition : { docs | name : String, tipe : Elm.Type.Type } -> Html msg
viewValueDefinition details =
    if Ui.Type.shouldBeMultiline details.tipe then
        Html.pre []
            [ Html.code []
                [ Html.span [] [ Html.text (details.name ++ " : ") ]
                , Ui.Type.viewWithIndent 4 details.tipe
                ]
            ]

    else
        Html.pre []
            [ Html.code []
                [ Html.span [] [ Html.text (details.name ++ " : ") ]
                , Ui.Type.view details.tipe
                ]
            ]
