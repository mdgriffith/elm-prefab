module Ui.Type exposing
    ( needsParens
    , shouldBeMultiline
    , view
    , viewWithIndent
    )

import Elm.Type
import Html exposing (Html)
import Html.Attributes as Attr
import Theme
import Ui.Attr
import Ui.Syntax as Syntax


needsParens : Elm.Type.Type -> Bool
needsParens tipe =
    case tipe of
        Elm.Type.Var _ ->
            False

        Elm.Type.Lambda _ _ ->
            True

        Elm.Type.Type _ [] ->
            False

        Elm.Type.Type _ _ ->
            True

        Elm.Type.Tuple _ ->
            False

        Elm.Type.Record _ _ ->
            False


shouldBeMultiline : Elm.Type.Type -> Bool
shouldBeMultiline tipe =
    linearWidth tipe > 50


{-| View a type definition
-}
view : Elm.Type.Type -> Html msg
view tipe =
    viewWithIndent 0 tipe


viewWithIndent : Int -> Elm.Type.Type -> Html msg
viewWithIndent indent tipe =
    viewNew (shouldBeMultiline tipe) indent tipe
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
    Html.span []
        [ punctuation "("
        , content
        , punctuation ")"
        ]


spacedParens : Html msg -> Html msg
spacedParens content =
    Html.span []
        [ punctuation "( "
        , content
        , punctuation " )"
        ]


verticalParens : Html msg -> Html msg
verticalParens content =
    Html.span []
        [ Html.span []
            [ span
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


span : List (Html.Attribute msg) -> Html msg -> Html msg
span attrs content =
    Html.span attrs [ content ]


isBuiltIn : String -> Bool
isBuiltIn typename =
    (typename == "Int")
        || (typename == "Float")
        || (typename == "String")
        || (typename == "Char")
        || (typename == "Bool")
        || (typename == "List")
        || (typename == "Maybe")
        || (typename == "Result")
        || (typename == "Cmd")
        || (typename == "Sub")
        || (typename == "Array")
        || (typename == "Dict")
        || (typename == "Set")
        || (typename == "Platform.Cmd.Cmd")
        || (typename == "Platform.Sub.Sub")


typeLink : String -> List (Html.Attribute msg) -> Html msg -> Html msg
typeLink typename attrs content =
    if isBuiltIn typename then
        span attrs content

    else
        Html.a
            (Attr.href ("https://package.elm-lang.org/packages/elm/core/latest/" ++ typename ++ "#")
                :: attrs
            )
            [ content ]


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
            , content = span [ Syntax.typevar ] (Html.text var)
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
                        { rowSpacer = span [ Syntax.punctuation ] (Html.text ", ")
                        , columnSpacer = span [ Syntax.punctuation ] (Html.text ", ")
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                renderedItems.content
                    |> spacedParens
            }

        Elm.Type.Type typename [] ->
            { multiline = forceMultiline
            , content =
                typeLink typename
                    [ Syntax.type_
                    ]
                    (Html.text typename)
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
                        , columnSpacer = Html.text " "
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                columnIf (forceMultiline || renderedItems.multiline)
                    []
                    [ Html.span []
                        [ typeLink typename [ Syntax.type_ ] (Html.text typename)
                        , Html.text " "
                        ]
                    , if forceMultiline || renderedItems.multiline then
                        Html.span []
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
                            [ Html.span [ Ui.Attr.alignTop, Syntax.field ]
                                [ if cursor.isFirst then
                                    Html.span []
                                        [ punctuation "{ "
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Html.text ""

                                            Just recordName ->
                                                fieldName recordName
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Html.text ""

                                            Just recordName ->
                                                punctuation " | "
                                        ]

                                  else
                                    punctuation ", "
                                , fieldName name
                                , keyword " : "
                                ]
                            , if fieldContent.multiline then
                                Html.span []
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
                            Theme.column.zero
                                [ Ui.Attr.gap 4
                                , indentPadding indent
                                ]
                                ((punctuation "}" :: result.content)
                                    |> List.reverse
                                )
                        }
                   )


keyword str =
    span [ Syntax.keyword ] (Html.text str)


fieldName str =
    span [ Syntax.field ] (Html.text str)


punctuation str =
    span [ Syntax.punctuation ] (Html.text str)


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
                    [ Html.span []
                        [ if cursor.isFirst then
                            Html.text ""

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


attrIf : Bool -> Html.Attribute msg -> Html.Attribute msg
attrIf condition attr =
    if condition then
        attr

    else
        Attr.class ""


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
                Html.span
                    [ attrIf (forceMultiline || args.multiline) (indentPadding indent)
                    ]
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
                [ Html.span [ attrIf (forceMultiline || new.multiline) (indentPadding indent) ]
                    [ arrowRight (forceMultiline || new.multiline)
                    , new.content
                    ]
                ]
            }


columnIf : Bool -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
columnIf on attrs children =
    if on then
        Html.span (Ui.Attr.gap 4 :: attrs) children

    else
        Html.span attrs children


arrowRight : Bool -> Html msg
arrowRight multiline =
    if multiline then
        span [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text "-> ")

    else
        span [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text " -> ")
