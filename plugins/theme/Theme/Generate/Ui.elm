module Theme.Generate.Ui exposing (generate)

{-| -}

import Color
import Dict
import Elm
import Elm.Annotation
import Elm.Op
import Gen.Html.Attributes
import Gen.String
import Gen.Ui
import Gen.Ui.Accessibility
import Gen.Ui.Anim
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
    , generateColorTheme theme
    , generateTextElements theme
    , generateTheme theme
    , stylesheet theme
    ]


type Tag
    = Layout
    | Typography
    | Palettes
    | Spacing
    | Borders


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

        Borders ->
            "Borders"


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
            [ typography theme
            , layout theme
            , spacing theme
            , borders theme
            ]
        )


attrBorderWidthsType =
    Elm.Annotation.namedWith [] "BorderWidths" [ attrType ]


border side =
    Elm.fn ( "width", Just Elm.Annotation.int )
        (\widthInt ->
            Gen.Ui.htmlAttribute
                (Gen.Html.Attributes.call_.style (Elm.string ("border-" ++ side ++ "-width"))
                    (Elm.Op.append (Gen.String.call_.fromInt widthInt) (Elm.string "px"))
                )
        )


borders : Theme.Theme -> List Elm.Declaration
borders theme =
    [ Elm.alias "BorderWidths"
        (toFieldsType (\_ -> Elm.Annotation.var "item") theme.borderWidths)
    , Elm.declaration "mapBorderWidths"
        (Elm.fn
            ( "f", Nothing )
            (\f ->
                Elm.record
                    (toFields
                        (\s ->
                            Elm.apply f [ Elm.int s ]
                        )
                        theme.borderWidths
                    )
            )
        )
    , Elm.declaration "borderWidth"
        ([ toFields
            Gen.Ui.border
            theme.borderWidths
         , [ ( "top"
             , Elm.apply (Elm.val "mapBorderWidths") [ border "top" ]
                |> Elm.withType attrBorderWidthsType
             )
           , ( "right"
             , Elm.apply (Elm.val "mapBorderWidths") [ border "right" ]
                |> Elm.withType attrBorderWidthsType
             )
           , ( "bottom"
             , Elm.apply (Elm.val "mapBorderWidths") [ border "bottom" ]
                |> Elm.withType attrBorderWidthsType
             )
           , ( "left"
             , Elm.apply (Elm.val "mapBorderWidths") [ border "left" ]
                |> Elm.withType attrBorderWidthsType
             )
           ]
         ]
            |> List.concat
            |> Elm.record
        )
        |> expose Borders
    , Elm.declaration "borderRadius"
        ([ toFields Gen.Ui.rounded
            theme.borderRadii
         , [ ( "top"
             , toFields (\radii -> Gen.Ui.roundedWith { topLeft = radii, topRight = radii, bottomRight = 0, bottomLeft = 0 })
                theme.borderRadii
                |> Elm.record
             )
           , ( "right"
             , toFields (\radii -> Gen.Ui.roundedWith { topLeft = 0, topRight = radii, bottomRight = radii, bottomLeft = 0 })
                theme.borderRadii
                |> Elm.record
             )
           , ( "bottom"
             , toFields (\radii -> Gen.Ui.roundedWith { topLeft = 0, topRight = 0, bottomRight = radii, bottomLeft = radii })
                theme.borderRadii
                |> Elm.record
             )
           , ( "left"
             , toFields (\radii -> Gen.Ui.roundedWith { topLeft = radii, topRight = 0, bottomRight = 0, bottomLeft = radii })
                theme.borderRadii
                |> Elm.record
             )
           ]
         ]
            |> List.concat
            |> Elm.record
        )
        |> expose Borders
    ]


layout : Theme.Theme -> List Elm.Declaration
layout theme =
    [ Elm.declaration "layout"
        Gen.Ui.Anim.values_.layout
        |> expose Layout
    , Elm.declaration "el"
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
    Elm.Annotation.namedWith [] "Spaced" [ attrType ]


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
    Gen.Ui.Font.weight weight


getHeaderAttr : String -> Maybe Elm.Expression
getHeaderAttr cls =
    String.split "-" cls
        |> List.foldl
            (\val found ->
                case found of
                    Nothing ->
                        case val of
                            "h1" ->
                                Just Gen.Ui.Accessibility.h1

                            "h2" ->
                                Just Gen.Ui.Accessibility.h2

                            "h3" ->
                                Just Gen.Ui.Accessibility.h3

                            "h4" ->
                                Just Gen.Ui.Accessibility.h4

                            "h5" ->
                                Just Gen.Ui.Accessibility.h5

                            "h6" ->
                                Just Gen.Ui.Accessibility.h6

                            _ ->
                                Nothing

                    Just _ ->
                        found
            )
            Nothing


generateTextElements : Theme.Theme -> Elm.File
generateTextElements theme =
    Elm.file [ "Ui", "Theme", "Text" ]
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

                        fullClassAttr =
                            classAttr fullClassName

                        addAcccessibilityAttrs : Elm.Expression -> Elm.Expression
                        addAcccessibilityAttrs attrs =
                            case getHeaderAttr fullClassName of
                                Nothing ->
                                    attrs

                                Just headerAttr ->
                                    Elm.Op.cons
                                        headerAttr
                                        attrs

                        elFn =
                            Elm.fn2
                                ( "attrs", Nothing )
                                ( "child", Just Elm.Annotation.string )
                                (\attrs child ->
                                    Gen.Ui.call_.el
                                        (addAcccessibilityAttrs (Elm.Op.cons fullClassAttr attrs))
                                        (Gen.Ui.call_.text child)
                                )

                        innerName =
                            Theme.weightNameField (Tuple.first typeface.item.weight)
                    in
                    case Tuple.first typeface.item.weight of
                        Theme.Default ->
                            Dict.insert basename
                                [ ( innerName, elFn )
                                ]
                                gathered

                        _ ->
                            Dict.update basename
                                (\maybe ->
                                    case maybe of
                                        Just fields ->
                                            Just (( innerName, elFn ) :: fields)

                                        Nothing ->
                                            Just
                                                [ ( innerName, elFn )
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
                            (Elm.declaration name (Tuple.second single)
                                |> Elm.expose
                            )
                                :: typographyRecord

                        many ->
                            let
                                new =
                                    List.map
                                        (\( innerName, body ) ->
                                            Elm.declaration (name ++ capitalize innerName) body
                                                |> Elm.expose
                                        )
                                        many
                            in
                            new ++ typographyRecord
                )
                []
        )


generateColors : Theme.Theme -> Elm.File
generateColors theme =
    Elm.file [ "Ui", "Theme", "Color", "Palette" ]
        (List.foldl
            (\colorInstance list ->
                case colorInstance.color of
                    Theme.Color.Color clr ->
                        (Elm.declaration (Theme.toColorName colorInstance) (toColor clr)
                            |> Elm.expose
                        )
                            :: list

                    Theme.Color.Grad _ ->
                        list
            )
            []
            theme.colors
        )


generateColorTheme : Theme.Theme -> Elm.File
generateColorTheme theme =
    Elm.file [ "Ui", "Theme", "Color" ]
        (case theme.themes of
            Nothing ->
                []

            Just themes ->
                [ List.foldl
                    (\( fullColorName, colorVal ) list ->
                        case colorVal of
                            Theme.Color.Color clr ->
                                (Elm.declaration (Theme.toFullColorName "text" fullColorName)
                                    (Gen.Ui.Font.color (toColor clr))
                                    |> Elm.expose
                                    |> Elm.withDocumentation (Theme.toFullColorDescription fullColorName)
                                    |> Tuple.pair (Theme.toFullColorName "Text" fullColorName)
                                )
                                    :: list

                            Theme.Color.Grad _ ->
                                list
                    )
                    []
                    themes.default.text
                , List.foldl
                    (\( fullColorName, colorVal ) list ->
                        case colorVal of
                            Theme.Color.Color clr ->
                                (Elm.declaration (Theme.toFullColorName "background" fullColorName)
                                    (Gen.Ui.background (toColor clr))
                                    |> Elm.expose
                                    |> Elm.withDocumentation (Theme.toFullColorDescription fullColorName)
                                    |> Tuple.pair (Theme.toFullColorName "background" fullColorName)
                                )
                                    :: list

                            Theme.Color.Grad _ ->
                                list
                    )
                    []
                    themes.default.background
                , List.foldl
                    (\( fullColorName, colorVal ) list ->
                        case colorVal of
                            Theme.Color.Color clr ->
                                (Elm.declaration (Theme.toFullColorName "border" fullColorName)
                                    (Gen.Ui.borderColor (toColor clr))
                                    |> Elm.expose
                                    |> Elm.withDocumentation (Theme.toFullColorDescription fullColorName)
                                    |> Tuple.pair (Theme.toFullColorName "border" fullColorName)
                                )
                                    :: list

                            Theme.Color.Grad _ ->
                                list
                    )
                    []
                    themes.default.border
                ]
                    |> List.concat
                    |> List.sortBy Tuple.first
                    |> List.map Tuple.second
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
                let
                    ( textTransform, italic, variants ) =
                        captureVariants Nothing False [] item.variants

                    fontSize =
                        case Maybe.andThen .fontSizeByCapital item.capitalSizing of
                            Nothing ->
                                toFloat item.size

                            Just ratio ->
                                toFloat item.size * ratio

                    fontClass =
                        typographyClassName name (Tuple.first item.weight)
                in
                [ Style.class fontClass
                    [ Style.string "font-family" (fontFamily (item.face :: item.fallback))
                    , Style.int "font-weight" (Tuple.second item.weight)
                    , Style.fontSizeInPxAsRem fontSize
                    , Style.float "line-height" item.lineHeight
                    , if italic then
                        Style.string "font-style" "italic"

                      else
                        Style.none
                    , case textTransform of
                        Just transform ->
                            Style.string "text-transform" transform

                        Nothing ->
                            Style.none
                    , case variants of
                        [] ->
                            Style.none

                        _ ->
                            Style.string "font-variant" (String.join " " variants)
                    ]
                , case item.capitalSizing of
                    Nothing ->
                        Style.none

                    Just capitalSizing ->
                        Style.custom
                            (Style.AllChildren
                                (Style.Class fontClass)
                                -- Paragraph class in elm-ui
                                (Style.Class "p")
                                |> Style.After
                            )
                            [ Style.string "content" "\" \""
                            , Style.string "margin-top"
                                -- autocalc is :  "calc((1lh - 1cap) / -2)"
                                ("calc(1em * " ++ String.fromFloat capitalSizing.bottom ++ ")")
                            , Style.string "display" "table"
                            ]
                , case item.capitalSizing of
                    Nothing ->
                        Style.none

                    Just capitalSizing ->
                        Style.custom
                            (Style.AllChildren
                                (Style.Class fontClass)
                                -- Paragraph class in elm-ui
                                (Style.Class "p")
                                |> Style.Before
                            )
                            [ Style.string "content" "\" \""
                            , Style.string "margin-bottom"
                                -- autocalc is :  "calc((1lh - 1cap) / -2)"
                                ("calc(1em * " ++ String.fromFloat capitalSizing.top ++ ")")
                            , Style.string "display" "table"
                            ]
                , case item.capitalSizing of
                    Nothing ->
                        Style.none

                    Just capitalSizing ->
                        Style.custom
                            (Style.AllChildren
                                (Style.Class fontClass)
                                -- text class in elm-ui
                                (Style.Class "t")
                                |> Style.After
                            )
                            [ Style.string "content" "\" \""
                            , Style.string "margin-top"
                                -- autocalc is :  "calc((1lh - 1cap) / -2)"
                                ("calc(1em * " ++ String.fromFloat capitalSizing.bottom ++ ")")
                            , Style.string "display" "table"
                            ]
                , case item.capitalSizing of
                    Nothing ->
                        Style.none

                    Just capitalSizing ->
                        Style.custom
                            (Style.AllChildren
                                (Style.Class fontClass)
                                -- text class in elm-ui
                                (Style.Class "t")
                                |> Style.Before
                            )
                            [ Style.string "content" "\" \""
                            , Style.string "margin-bottom"
                                -- autocalc is :  "calc((1lh - 1cap) / -2)"
                                ("calc(1em * " ++ String.fromFloat capitalSizing.top ++ ")")
                            , Style.string "display" "table"
                            ]
                ]
            )


captureVariants :
    Maybe String
    -> Bool
    -> List String
    -> List String
    -> ( Maybe String, Bool, List String )
captureVariants textTransform italic variants vars =
    case vars of
        [] ->
            ( textTransform, italic, variants )

        var :: rest ->
            case var of
                "italic" ->
                    captureVariants textTransform True variants rest

                "uppercase" ->
                    captureVariants (Just "uppercase") italic variants rest

                "lowercase" ->
                    captureVariants (Just "lowercase") italic variants rest

                "capitalize" ->
                    captureVariants (Just "capitalize") italic variants rest

                _ ->
                    captureVariants textTransform italic (var :: variants) rest


fontFamily : List String -> String
fontFamily fonts =
    String.join ", " (List.map (\f -> "\"" ++ f ++ "\"") fonts)
