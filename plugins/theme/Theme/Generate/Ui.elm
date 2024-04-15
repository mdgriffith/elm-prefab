module Theme.Generate.Ui exposing (generate)

{-| -}

import Color
import Dict
import Elm
import Elm.Annotation
import Elm.Op
import Gen.Html.Attributes
import Gen.Ui
import Gen.Ui.Font
import Gen.Ui.Input
import Theme
import Theme.Generate.Stylesheet as Style


attr : Elm.Expression -> Elm.Expression
attr a =
    a
        |> Elm.withType attrType


attrType : Elm.Annotation.Annotation
attrType =
    Gen.Ui.annotation_.attribute (Elm.Annotation.var "msg")


generate : Theme.Theme -> List Elm.File
generate theme =
    [ generateColors theme
    , generateTheme theme
    , stylesheet theme
    ]


type Tag
    = Layout
    | Typography
    | Palettes
    | Spacing


tagToString : Tag -> String
tagToString tag =
    case tag of
        Layout ->
            "Layout"

        Typography ->
            "Typography"

        Palettes ->
            "Palettes"

        Spacing ->
            "Spacing"


expose tag =
    Elm.exposeWith
        { group = Just (tagToString tag)
        , exposeConstructor = True
        }


addNamespace : String -> String -> String
addNamespace namespace name =
    if namespace == "" then
        name

    else
        namespace ++ "-" ++ name


generateTheme : Theme.Theme -> Elm.File
generateTheme theme =
    Elm.file [ "Ui", "Theme" ]
        (List.concat
            [ layout theme
            , theme.palettes
                |> List.map
                    (\{ name, item } ->
                        Elm.declaration (Theme.nameToString name)
                            (Gen.Ui.htmlAttribute
                                (Gen.Html.Attributes.class (addNamespace theme.namespace (Theme.nameToString name)))
                            )
                            |> expose Palettes
                    )
            , [ Elm.declaration "border"
                    (toFields
                        (\border ->
                            Gen.Ui.border border.width
                        )
                        theme.borders
                        |> Elm.record
                    )
                    |> Elm.expose
              ]
            , spacing theme
            , typography theme
            ]
        )


layout : Theme.Theme -> List Elm.Declaration
layout theme =
    [ Elm.declaration "el"
        Gen.Ui.values_.el
        |> expose Layout
    , Elm.declaration "row"
        (Elm.record
            (toFields
                (\space ->
                    Elm.fn2
                        ( "attrs", Nothing )
                        ( "children", Nothing )
                        (\attrs children ->
                            Gen.Ui.call_.row (Elm.Op.cons (Gen.Ui.spacing space) attrs) children
                        )
                )
                theme.spacing
            )
        )
        |> expose Layout
    , Elm.declaration "column"
        (Elm.record
            (toFields
                (\space ->
                    Elm.fn2
                        ( "attrs", Nothing )
                        ( "children", Nothing )
                        (\attrs children ->
                            Gen.Ui.call_.column (Elm.Op.cons (Gen.Ui.spacing space) attrs) children
                        )
                )
                theme.spacing
            )
        )
        |> expose Layout
    ]


attrSpacingType =
    Elm.Annotation.namedWith [] "AttrSpacing" [ Elm.Annotation.var "msg" ]


spacing : Theme.Theme -> List Elm.Declaration
spacing theme =
    [ Elm.declaration "space"
        (Elm.record
            (toFields Elm.int
                theme.spacing
            )
        )
    , Elm.declaration "mapSpace"
        (Elm.fn
            ( "f", Nothing )
            (\f ->
                Elm.record
                    (toFields
                        (\s ->
                            Elm.apply f [ Elm.int s ]
                        )
                        theme.spacing
                    )
            )
        )
    , Elm.declaration "spacing"
        (Elm.record
            (toFields (attr << Gen.Ui.spacing)
                theme.spacing
            )
        )
        |> expose Spacing
    , Elm.alias "Spaced"
        (toFieldsType (\_ -> Elm.Annotation.var "item") theme.spacing)
    , Elm.alias "AttrSpacing"
        (Elm.Annotation.namedWith [] "Spaced" [ attrType ])
    , Elm.declaration "padding"
        (Elm.record
            (toFields (attr << Gen.Ui.padding)
                theme.spacing
                ++ [ ( "xy"
                     , Elm.apply (Elm.val "mapSpace")
                        [ Elm.fn
                            ( "spacingX", Just Elm.Annotation.int )
                            (\spacingX ->
                                Elm.apply (Elm.val "mapSpace")
                                    [ Elm.fn
                                        ( "spacingY", Just Elm.Annotation.int )
                                        (\spacingY ->
                                            Gen.Ui.call_.paddingXY spacingX spacingY
                                        )
                                    ]
                            )
                        ]
                        |> Elm.withType
                            (Elm.Annotation.namedWith []
                                "Spaced"
                                [ attrSpacingType
                                ]
                            )
                     )
                   , ( "top"
                     , Elm.apply (Elm.val "mapSpace") [ Gen.Ui.values_.paddingTop ]
                        |> Elm.withType attrSpacingType
                     )
                   , ( "right"
                     , Elm.apply (Elm.val "mapSpace") [ Gen.Ui.values_.paddingRight ]
                        |> Elm.withType attrSpacingType
                     )
                   , ( "bottom"
                     , Elm.apply (Elm.val "mapSpace") [ Gen.Ui.values_.paddingBottom ]
                        |> Elm.withType attrSpacingType
                     )
                   , ( "left"
                     , Elm.apply (Elm.val "mapSpace") [ Gen.Ui.values_.paddingLeft ]
                        |> Elm.withType attrSpacingType
                     )
                   ]
            )
        )
        |> expose Spacing
    ]


typography : Theme.Theme -> List Elm.Declaration
typography theme =
    List.concat
        [ List.map
            (\typeface ->
                Elm.fn
                    ( "label", Just Elm.Annotation.string )
                    (\label ->
                        Gen.Ui.call_.el
                            (Elm.list
                                [ Elm.val "typography"
                                    |> Elm.get (Theme.nameToString typeface.name)
                                ]
                            )
                            (Gen.Ui.call_.text label)
                    )
                    |> Elm.declaration (Theme.nameToString typeface.name)
                    |> expose Typography
            )
            theme.typography
        , [ Elm.declaration "typography"
                (List.map
                    (\typeface ->
                        ( Theme.nameToString typeface.name
                        , Gen.Ui.Font.font
                            { name = typeface.item.face
                            , fallback = [ Gen.Ui.Font.serif ]
                            , variants = []
                            , weight =
                                toWeight typeface.item.weight
                            , size = typeface.item.size
                            , lineSpacing = round (toFloat typeface.item.size * 1.4)
                            , capitalSizeRatio = 1
                            }
                        )
                    )
                    theme.typography
                    |> Elm.record
                )
                |> expose Typography
          ]
        ]


capitalize : String -> String
capitalize str =
    let
        top =
            String.left 1 str

        remain =
            String.dropLeft 1 str
    in
    String.toUpper top ++ remain


toWeight : Int -> Elm.Expression
toWeight weight =
    if weight == 100 then
        Gen.Ui.Font.hairline

    else if weight == 200 then
        Gen.Ui.Font.extraLight

    else if weight == 300 then
        Gen.Ui.Font.light

    else if weight == 400 then
        Gen.Ui.Font.regular

    else if weight == 500 then
        Gen.Ui.Font.medium

    else if weight == 600 then
        Gen.Ui.Font.semiBold

    else if weight == 700 then
        Gen.Ui.Font.bold

    else if weight == 800 then
        Gen.Ui.Font.extraBold

    else if weight == 900 then
        Gen.Ui.Font.heavy

    else
        Gen.Ui.Font.regular


generateColors : Theme.Theme -> Elm.File
generateColors theme =
    Elm.file [ "Ui", "Theme", "Color" ]
        (Dict.foldl
            (\name val list ->
                (Elm.declaration name (toColor val)
                    |> Elm.expose
                )
                    :: list
            )
            []
            theme.colors
        )



{- HELPERS -}


maybeColor : Maybe Theme.Color -> Elm.Expression
maybeColor maybe =
    case maybe of
        Just color ->
            toColor color

        Nothing ->
            Gen.Ui.rgba 0 0 0 0


to255 : Float -> Int
to255 value =
    round (value * 255)


toColor : Theme.Color -> Elm.Expression
toColor clr =
    let
        rgb =
            Color.toRgba clr
    in
    Gen.Ui.rgb
        (to255 rgb.red)
        (to255 rgb.green)
        (to255 rgb.blue)


toFieldsType : (thing -> Elm.Annotation.Annotation) -> List (Theme.Named thing) -> Elm.Annotation.Annotation
toFieldsType toType fields =
    fields
        |> List.map
            (\named ->
                ( Theme.nameToString named.name, toType named.item )
            )
        |> Elm.Annotation.record


toFields : (thing -> Elm.Expression) -> List (Theme.Named thing) -> List ( String, Elm.Expression )
toFields toExp fields =
    fields
        |> List.map
            (\item -> field item toExp)


record : (thing -> Elm.Expression) -> List (Theme.Named thing) -> Elm.Expression
record toExp fields =
    Elm.record
        (fields
            |> List.map
                (\item -> field item toExp)
        )


field : Theme.Named thing -> (thing -> Elm.Expression) -> ( String, Elm.Expression )
field named toVal =
    ( Theme.nameToString named.name, toVal named.item )



{---}


stylesheet : Theme.Theme -> Elm.File
stylesheet theme =
    Style.file (Just theme.namespace)
        [ "elm-ui.css" ]
        (theme.palettes
            |> List.concatMap
                (\{ name, item } ->
                    let
                        class =
                            Theme.nameToString name
                    in
                    List.filterMap identity
                        [ Style.class class
                            [ Style.color "color" item.text
                            , Style.maybe (Style.color "background-color") item.background
                            , Style.maybe (Style.color "border-color") item.border
                            , if item.hover /= Nothing || item.focus /= Nothing || item.active /= Nothing then
                                Style.transition 200

                              else
                                Style.none
                            ]
                            |> Just
                        , item.hover
                            |> Maybe.map
                                (\hover ->
                                    Style.hover class
                                        [ Style.maybe (Style.color "color") hover.text
                                        , Style.maybe (Style.color "background-color") hover.background
                                        , Style.maybe (Style.color "border-color") hover.border
                                        , Style.transition 0
                                        ]
                                )
                        , item.focus
                            |> Maybe.map
                                (\hover ->
                                    Style.hover class
                                        [ Style.maybe (Style.color "color") hover.text
                                        , Style.maybe (Style.color "background-color") hover.background
                                        , Style.maybe (Style.color "border-color") hover.border
                                        , Style.transition 0
                                        ]
                                )
                        , item.active
                            |> Maybe.map
                                (\hover ->
                                    Style.hover class
                                        [ Style.maybe (Style.color "color") hover.text
                                        , Style.maybe (Style.color "background-color") hover.background
                                        , Style.maybe (Style.color "border-color") hover.border
                                        , Style.transition 0
                                        ]
                                )
                        ]
                )
        )
