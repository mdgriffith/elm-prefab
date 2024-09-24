module Ui.Type exposing (view)

import Ui
import Elm.Type
import Html exposing (Html)
import Html.Attributes as Attr
import Ui.Syntax as Syntax





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
    Ui.padXY
        (indent * 8)
        0


parens : Html msg -> Html msg
parens content =
    Ui.row []
        [ punctuation "("
        , content
        , punctuation ")"
        ]


verticalParens : Html msg -> Html msg
verticalParens content =
    Ui.column []
        [ Ui.row []
            [ Ui.el
                [ Ui.alignTop
                , Syntax.punctuation
                ]
                (Ui.text "(")
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
            , content = Ui.el [ Syntax.typevar, Ui.alignTop ] (Ui.text var)
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
                        { rowSpacer = Ui.el [ Syntax.punctuation ] (Ui.text ", ")
                        , columnSpacer = Ui.el [ Syntax.punctuation ] (Ui.text ", ")
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                renderedItems.content
                    |> parens
            }

        Elm.Type.Type typename [] ->
            { multiline = forceMultiline
            , content = Ui.el [ Syntax.type_, Ui.alignTop ] (Ui.text typename)
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
                        { rowSpacer = Ui.text " "
                        , columnSpacer = Ui.none
                        }
            in
            { multiline = forceMultiline || renderedItems.multiline
            , content =
                columnIf (forceMultiline || renderedItems.multiline)
                    []
                    [ Ui.row [ Ui.alignTop ]
                        [ Ui.el [ Ui.alignTop, Syntax.type_ ] (Ui.text typename)
                        , Ui.text " "
                        ]
                    , if forceMultiline || renderedItems.multiline then
                        Ui.row []
                            [ Ui.text "    "
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
                            [ Ui.row [ Ui.alignTop, Syntax.field ]
                                [ if cursor.isFirst then
                                    Ui.row []
                                        [ punctuation "{ "
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Ui.none

                                            Just recordName ->
                                                fieldName recordName
                                        , case maybeExtensibleName of
                                            Nothing ->
                                                Ui.none

                                            Just recordName ->
                                                punctuation " | "
                                        ]

                                  else
                                    punctuation ", "
                                , fieldName name
                                , keyword " : "
                                ]
                            , if fieldContent.multiline then
                                Ui.row []
                                    [ Ui.text "    "
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
                            Ui.column [ Ui.gap 4 ]
                                ((punctuation "}" :: result.content)
                                    |> List.reverse
                                )
                        }
                   )


keyword str =
    Ui.el [ Syntax.keyword ] (Ui.text str)


fieldName str =
    Ui.el [ Syntax.field ] (Ui.text str)


punctuation str =
    Ui.el [ Syntax.punctuation ] (Ui.text str)


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
                    [ Ui.row []
                        [ if cursor.isFirst then
                            Ui.none

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
                Ui.row [ Ui.alignTop ]
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
                [ Ui.row [ Ui.alignTop ]
                    [ arrowRight (forceMultiline || new.multiline)
                    , new.content
                    ]
                ]
            }


columnIf : Bool -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
columnIf on attrs children =
    if on then
        Ui.column (Ui.gap 4 :: attrs) children

    else
        Ui.row attrs children


arrowRight : Bool -> Html msg
arrowRight multiline =
    if multiline then
        Ui.el [ Ui.alignTop, Syntax.keyword ] (Ui.text "-> ")

    else
        Ui.el [ Ui.alignTop, Syntax.keyword ] (Ui.text " -> ")
