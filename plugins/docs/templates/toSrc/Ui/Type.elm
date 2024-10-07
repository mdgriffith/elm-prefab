module Ui.Attr.Type exposing (view)

import Elm.Type
import Html exposing (Html)
import Theme
import Ui.Attr.Attr
import Ui.Attr.Syntax as Syntax


shouldBeMultiline : Elm.Type.Type -> Bool
shouldBeMultiline tipe =
    linearWidth tipe > 50


{-| View a type definition
-}
view : Elm.Type.Type -> Html msg
view tipe =
    viewNew (shouldBeMultiline tipe) 0 tipe
        |> .content


linearWidth : Elm.Type.Type -> Int
linearWidth tipe =
    case tipe of
        Elm.Type.Var var ->
            String.length var

        Elm.Type.Lambda one two ->
            linearWidth one + linearWidth two + 4

        Elm.Type.Tuple vals ->
            4
                + sumWith linearWidth vals
                + spacingWidth 2 vals

        Elm.Type.Type typename varTypes ->
            String.length typename
                + sumWith linearWidth varTypes
                + spacingWidth 1 varTypes

        Elm.Type.Record fields Nothing ->
            recordWidth
                + sumWith
                    (\( name, fieldType ) ->
                        4 + String.length name + linearWidth fieldType
                    )
                    fields
                + spacingWidth 2 fields

        Elm.Type.Record fields (Just extensibleName) ->
            String.length extensibleName
                + recordWidth
                + sumWith
                    (\( name, fieldType ) ->
                        3 + String.length name + linearWidth fieldType
                    )
                    fields
                + spacingWidth 2 fields


sumWith : (a -> Int) -> List a -> Int
sumWith toSize items =
    List.foldl (\v sum -> sum + toSize v) 0 items


spacingWidth : Int -> List a -> Int
spacingWidth spacing items =
    case items of
        [] ->
            0

        [ _ ] ->
            0

        [ _, _ ] ->
            spacing

        [ _, _, _ ] ->
            spacing + spacing

        _ ->
            (List.length items - 1) * spacing


{-| curly braces and a space on each side
-}
recordWidth : Int
recordWidth =
    4


indentPadding : Int -> Html.Attribute msg
indentPadding indent =
    Ui.Attr.padXY
        (indent * 8)
        0


parens : Html msg -> Html msg
parens content =
    Theme.row.zero []
        [ punctuation "("
        , content
        , punctuation ")"
        ]


verticalParens : Html msg -> Html msg
verticalParens content =
    Theme.column.zero []
        [ Theme.row.zero []
            [ Theme.el
                [ Ui.Attr.alignTop
                , Syntax.punctuation
                ]
                (Html.text "(")
            , content
            ]
        , punctuation ")"
        ]


addParens : Elm.Type.Type -> Html msg -> Html msg
addParens tipe elem =
    case tipe of
        Elm.Type.Lambda _ _ ->
            parens elem

        Elm.Type.Type _ [] ->
            elem

        Elm.Type.Type _ _ ->
            parens elem

        _ ->
            elem


addParensInFunction :
    Elm.Type.Type
    ->
        { content : Html msg
        , multiline : Bool
        }
    -> Html msg
addParensInFunction tipe elem =
    case tipe of
        Elm.Type.Lambda _ _ ->
            if elem.multiline then
                verticalParens elem.content

            else
                parens elem.content

        _ ->
            elem.content


viewNew :
    Bool
    -> Int
    -> Elm.Type.Type
    ->
        { content : Html msg
        , multiline : Bool
        }
viewNew forceMultiline indent tipe =
    case tipe of
        Elm.Type.Var var ->
            { multiline = forceMultiline
            , content = Theme.el [ Syntax.typevar, Ui.Attr.alignTop ] (Html.text var)
            }

        Elm.Type.Lambda one two ->
            let
                oneRendered =
                    viewNew forceMultiline indent one

                twoRendered =
                    viewFnArgs forceMultiline indent two

                multiline =
                    forceMultiline || oneRendered.multiline || twoRendered.multiline

                realMultiline =
                    if multiline then
                        multiline

                    else
                        linearWidth tipe > 50
            in
            { multiline = realMultiline
            , content =
                columnIf realMultiline
                    []
                    (addParensInFunction one oneRendered
                        :: twoRendered.items
                    )
            }

        Elm.Type.Tuple vals ->
            let
                renderedItems =
                    viewList forceMultiline
                        indent
                        (viewNew forceMultiline (indent + 4))
                        vals
                        { rowSpacer = Theme.el [ Syntax.punctuation ] (Html.text ", ")
                        , columnSpacer = Theme.el [ Syntax.punctuation ] (Html.text ", ")
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                renderedItems.content
                    |> parens
            }

        Elm.Type.Type typename [] ->
            { multiline = forceMultiline
            , content = Theme.el [ Syntax.type_, Ui.Attr.alignTop ] (Html.text typename)
            }

        Elm.Type.Type typename varTypes ->
            let
                renderedItems =
                    viewList forceMultiline
                        indent
                        (\var ->
                            let
                                rendered =
                                    viewNew forceMultiline (indent + 4) var
                            in
                            { content =
                                addParens
                                    var
                                    rendered.content
                            , multiline = rendered.multiline
                            }
                        )
                        varTypes
                        { rowSpacer = Html.text " "
                        , columnSpacer = Ui.Attr.none
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                columnIf (forceMultiline || renderedItems.multiline)
                    []
                    [ Theme.row.zero [ Ui.Attr.alignTop ]
                        [ Theme.el [ Ui.Attr.alignTop, Syntax.type_ ] (Html.text typename)
                        , Html.text " "
                        ]
                    , if forceMultiline || renderedItems.multiline then
                        Theme.row.zero []
                            [ Html.text "    "
                            , renderedItems.content
                            ]

                      else
                        renderedItems.content
                    ]
            }

        Elm.Type.Record fields maybeExtensibleName ->
            List.foldl
                (\( name, type_ ) cursor ->
                    let
                        fieldContent =
                            viewNew False (indent + 4) type_
                    in
                    { isFirst = False
                    , content =
                        columnIf fieldContent.multiline
                            []
                            [ Theme.row.zero [ Ui.Attr.alignTop, Syntax.field ]
                                [ if cursor.isFirst then
                                    Theme.row.zero []
                                        [ punctuation "{ "
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Ui.Attr.none

                                            Just recordName ->
                                                fieldName recordName
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Ui.Attr.none

                                            Just recordName ->
                                                punctuation " | "
                                        ]

                                  else
                                    punctuation ", "
                                , fieldName name
                                , keyword " : "
                                ]
                            , if fieldContent.multiline then
                                Theme.row.zero []
                                    [ Html.text "    "
                                    , fieldContent.content
                                    ]

                              else
                                fieldContent.content
                            ]
                            :: cursor.content
                    , multiline = cursor.multiline || fieldContent.multiline
                    }
                )
                { isFirst = True
                , content = []
                , multiline = True --List.length fields > 1
                }
                fields
                |> (\result ->
                        { multiline = result.multiline
                        , content =
                            Theme.column.zero [ Ui.Attr.gap 4 ]
                                ((punctuation "}" :: result.content)
                                    |> List.reverse
                                )
                        }
                   )


keyword str =
    Theme.el [ Syntax.keyword ] (Html.text str)


fieldName str =
    Theme.el [ Syntax.field ] (Html.text str)


punctuation str =
    Theme.el [ Syntax.punctuation ] (Html.text str)


viewList :
    Bool
    -> Int
    ->
        (Elm.Type.Type
         ->
            { content : Html msg
            , multiline : Bool
            }
        )
    -> List Elm.Type.Type
    ->
        { rowSpacer : Html msg
        , columnSpacer : Html msg
        }
    ->
        { content : Html msg
        , multiline : Bool
        }
viewList forceMultiline indent viewItem items spacer =
    List.foldl
        (\type_ cursor ->
            let
                fieldContent =
                    viewItem type_
            in
            { isFirst = False
            , content =
                columnIf (forceMultiline || fieldContent.multiline)
                    []
                    [ Theme.row.zero []
                        [ if cursor.isFirst then
                            Ui.Attr.none

                          else if forceMultiline || fieldContent.multiline then
                            spacer.columnSpacer

                          else
                            spacer.rowSpacer
                        , fieldContent.content
                        ]
                    ]
                    :: cursor.content
            , multiline = cursor.multiline || fieldContent.multiline
            }
        )
        { isFirst = True
        , content = []
        , multiline = False
        }
        items
        |> (\result ->
                { multiline = result.multiline
                , content =
                    columnIf result.multiline
                        []
                        (result.content
                            |> List.reverse
                        )
                }
           )


viewFnArgs :
    Bool
    -> Int
    -> Elm.Type.Type
    ->
        { items : List (Html msg)
        , multiline : Bool
        }
viewFnArgs forceMultiline indent tipe =
    case tipe of
        Elm.Type.Lambda one two ->
            let
                new =
                    viewNew False indent one

                args =
                    viewFnArgs forceMultiline indent two
            in
            { multiline = args.multiline
            , items =
                Theme.row.zero [ Ui.Attr.alignTop ]
                    [ arrowRight (forceMultiline || args.multiline)
                    , new.content
                    ]
                    :: args.items
            }

        everythingElse ->
            let
                new =
                    viewNew False indent everythingElse
            in
            { multiline = new.multiline
            , items =
                [ Theme.row.zero [ Ui.Attr.alignTop ]
                    [ arrowRight (forceMultiline || new.multiline)
                    , new.content
                    ]
                ]
            }


columnIf : Bool -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
columnIf on attrs children =
    if on then
        Theme.column.zero (Ui.Attr.gap 4 :: attrs) children

    else
        Theme.row.zero attrs children


arrowRight : Bool -> Html msg
arrowRight multiline =
    if multiline then
        Theme.el [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text "-> ")

    else
        Theme.el [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text " -> ")
