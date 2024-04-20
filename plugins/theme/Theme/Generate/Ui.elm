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
import Theme.Color
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


classNameString : String -> Theme.Name -> String -> String
classNameString namespace name suffix =
    addNamespace namespace (Theme.nameToString name ++ suffix)


classAttr : String -> Elm.Expression
classAttr name =
    Gen.Ui.htmlAttribute
        (Gen.Html.Attributes.class name)


className : String -> Theme.Name -> String -> Elm.Expression
className namespace name suffix =
    Gen.Ui.htmlAttribute
        (Gen.Html.Attributes.class (classNameString namespace name suffix))


generateTheme : Theme.Theme -> Elm.File
generateTheme theme =
    Elm.file [ "Ui", "Theme" ]
        (List.concat
            [ layout theme
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
    [ Elm.declaration "font"
        (theme.typography
            |> List.foldl
                (\typeface gathered ->
                    let
                        basename =
                            Theme.nameToString typeface.name

                        fullClassName =
                            -- className theme.namespace typeface.name (Theme.weightNameToString (Tuple.first typeface.item.weight))
                            typographyClassName typeface.name (Tuple.first typeface.item.weight)
                                |> addNamespace theme.namespace
                                |> classAttr

                        innerName =
                            Theme.weightNameField (Tuple.first typeface.item.weight)
                    in
                    case Tuple.first typeface.item.weight of
                        Theme.Default ->
                            Dict.insert basename
                                [ ( innerName, fullClassName )
                                ]
                                gathered

                        _ ->
                            Dict.update basename
                                (\maybe ->
                                    case maybe of
                                        Just fields ->
                                            Just (( innerName, fullClassName ) :: fields)

                                        Nothing ->
                                            Just
                                                [ ( innerName, fullClassName )
                                                ]
                                )
                                gathered
                )
                Dict.empty
            |> Dict.foldl
                (\name fields typographyRecord ->
                    case fields of
                        [] ->
                            typographyRecord

                        [ single ] ->
                            ( name, Tuple.second single )
                                :: typographyRecord

                        many ->
                            ( name, Elm.record many )
                                :: typographyRecord
                )
                []
            |> Elm.record
        )
        |> expose Typography
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
                case val of
                    Theme.Color.Color clr ->
                        (Elm.declaration name (toColor clr)
                            |> Elm.expose
                        )
                            :: list

                    Theme.Color.Grad _ ->
                        list
            )
            []
            theme.colors
        )



{- HELPERS -}


to255 : Float -> Int
to255 value =
    round (value * 255)


toColor : Color.Color -> Elm.Expression
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


color : String -> Theme.Color.Color -> Style.Rule
color name clr =
    case clr of
        Theme.Color.Color c ->
            Style.color name c

        Theme.Color.Grad gradient ->
            Style.string name gradient


stylesheet : Theme.Theme -> Elm.File
stylesheet theme =
    Style.file (Just theme.namespace)
        [ "elm-ui.css" ]
        (List.concat
            [ typographyStyles theme
            ]
        )


typographyClassName : Theme.Name -> Theme.WeightName -> String
typographyClassName name weight =
    "font-" ++ Theme.nameToString name ++ Theme.weightNameToString weight


typographyStyles : Theme.Theme -> List Style.Rule
typographyStyles theme =
    theme.typography
        |> List.concatMap
            (\{ name, item } ->
                [ Style.class (typographyClassName name (Tuple.first item.weight))
                    [ Style.string "font-family" (fontFamily (item.face :: item.fallback))
                    , Style.int "font-weight" (Tuple.second item.weight)
                    , Style.px "font-size" item.size
                    , case item.variants of
                        [] ->
                            Style.none

                        _ ->
                            Style.string "font-variant" (String.join " " item.variants)
                    ]
                ]
            )


fontFamily : List String -> String
fontFamily fonts =
    String.join ", " (List.map (\f -> "\"" ++ f ++ "\"") fonts)
