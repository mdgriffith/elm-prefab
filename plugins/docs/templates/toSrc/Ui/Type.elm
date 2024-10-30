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
    viewType (shouldBeMultiline tipe) indent tipe


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
    -> Html msg
    -> Html msg
addParensInFunction tipe elem =
    case tipe of
        Elm.Type.Lambda _ _ ->
            parens elem

        _ ->
            elem


span : List (Html.Attribute msg) -> Html msg -> Html msg
span attrs content =
    Html.span attrs [ content ]


isBuiltIn : String -> Bool
isBuiltIn typename =
    (typename == "Int")
        || (typename == "Basics.Int")
        || (typename == "Basics.Float")
        || (typename == "Float")
        || (typename == "String")
        || (typename == "String.String")
        || (typename == "Char")
        || (typename == "Basics.Char")
        || (typename == "Bool")
        || (typename == "Basics.Bool")
        || (typename == "List")
        || (typename == "List.List")
        || (typename == "Maybe")
        || (typename == "Maybe.Maybe")
        || (typename == "Result")
        || (typename == "Result.Result")
        || (typename == "Cmd")
        || (typename == "Sub")
        || (typename == "Array")
        || (typename == "Dict")
        || (typename == "Set")
        || (typename == "Platform.Cmd.Cmd")
        || (typename == "Platform.Sub.Sub")


builtInName : String -> String
builtInName typename =
    case typename of
        "String.String" ->
            "String"

        "List.List" ->
            "List"

        "Basics.Bool" ->
            "Bool"

        "Basics.Float" ->
            "Float"

        "Basics.Int" ->
            "Int"

        "Result.Result" ->
            "Result"

        "Maybe.Maybe" ->
            "Maybe"

        "Platform.Cmd.Cmd" ->
            "Cmd"

        "Platform.Sub.Sub" ->
            "Sub"

        _ ->
            typename


typeLink : String -> List (Html.Attribute msg) -> Html msg
typeLink typename attrs =
    if isBuiltIn typename then
        span attrs (Html.text (builtInName typename))

    else
        Html.a
            (Attr.href ("https://package.elm-lang.org/packages/elm/core/latest/" ++ typename ++ "#")
                :: attrs
            )
            [ Html.text (builtInName typename) ]


viewType :
    Bool
    -> Int
    -> Elm.Type.Type
    -> Html msg
viewType forceMultiline indent tipe =
    case tipe of
        Elm.Type.Var var ->
            span [ Syntax.typevar ] (Html.text var)

        Elm.Type.Lambda one two ->
            let
                oneRendered =
                    viewType forceMultiline indent one

                twoRendered =
                    viewFnArgs forceMultiline indent two

                multiline =
                    forceMultiline

                realMultiline =
                    if multiline then
                        multiline

                    else
                        linearWidth tipe > 50
            in
            Html.span []
                (addParensInFunction one oneRendered
                    :: twoRendered
                )

        Elm.Type.Tuple [] ->
            parens (Html.text "")

        Elm.Type.Tuple vals ->
            let
                renderedItems =
                    viewList forceMultiline
                        indent
                        (viewType forceMultiline (indent + 4))
                        vals
                        { rowSpacer = span [ Syntax.punctuation ] (Html.text ", ")
                        , columnSpacer = span [ Syntax.punctuation ] (Html.text ", ")
                        }
            in
            renderedItems.content
                |> spacedParens

        Elm.Type.Type typename [] ->
            typeLink typename
                [ Syntax.type_
                ]

        Elm.Type.Type typename varTypes ->
            let
                renderedItems =
                    viewList forceMultiline
                        indent
                        (\var ->
                            let
                                rendered =
                                    viewType forceMultiline (indent + 4) var
                            in
                            addParens var rendered
                        )
                        varTypes
                        { rowSpacer = Html.text " "
                        , columnSpacer = Html.text " "
                        }
            in
            Html.span []
                [ Html.span []
                    [ typeLink typename [ Syntax.type_ ]
                    , Html.text " "
                    ]
                , renderedItems.content
                ]

        Elm.Type.Record fields maybeExtensibleName ->
            case fields of
                [] ->
                    Html.span [] [ punctuation "{}" ]

                _ ->
                    List.foldl
                        (\( name, type_ ) cursor ->
                            let
                                fieldContent =
                                    viewType False (indent + 4) type_
                            in
                            { isFirst = False
                            , content =
                                Html.span []
                                    [ Html.span [ Syntax.field ]
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
                                    , fieldContent
                                    ]
                                    :: cursor.content
                            , multiline = cursor.multiline
                            }
                        )
                        { isFirst = True
                        , content = []
                        , multiline = True --List.length fields > 1
                        }
                        fields
                        |> (\result ->
                                Theme.column.zero
                                    [ indentPadding indent
                                    ]
                                    ((punctuation "}" :: result.content)
                                        |> List.reverse
                                    )
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
    -> (Elm.Type.Type -> Html msg)
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
                Html.span []
                    [ Html.span []
                        [ if cursor.isFirst then
                            Html.text ""

                          else if forceMultiline then
                            spacer.columnSpacer

                          else
                            spacer.rowSpacer
                        , fieldContent
                        ]
                    ]
                    :: cursor.content
            , multiline = cursor.multiline
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
                    Html.span []
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
    -> List (Html msg)
viewFnArgs forceMultiline indent tipe =
    let
        node =
            if forceMultiline then
                Html.div
                    [ attrIf forceMultiline (indentPadding indent)
                    ]

            else
                Html.span
                    [ attrIf forceMultiline (indentPadding indent)
                    ]
    in
    case tipe of
        Elm.Type.Lambda one two ->
            let
                args =
                    viewFnArgs forceMultiline indent two
            in
            node
                [ arrowRight forceMultiline
                , viewType False indent one
                ]
                :: args

        everythingElse ->
            [ node
                [ arrowRight forceMultiline
                , viewType False indent everythingElse
                ]
            ]


arrowRight : Bool -> Html msg
arrowRight multiline =
    if multiline then
        span [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text "-> ")

    else
        span [ Ui.Attr.alignTop, Syntax.keyword ] (Html.text " -> ")
