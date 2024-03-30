module Theme.Generate.Ui exposing (generate)

{-| -}

import Elm
import Elm.Annotation
import Elm.Op
import Gen.Ui
import Gen.Ui.Font
import Gen.Ui.Input
import Theme


attr : Elm.Expression -> Elm.Expression
attr a =
    a
        |> Elm.withType
            (Gen.Ui.annotation_.attribute (Elm.Annotation.var "msg"))


generate : Theme.Theme -> List Elm.File
generate theme =
    [ generateColors theme
    , generateText theme
    , generateLayout theme
    ]


generateLayout : Theme.Theme -> Elm.File
generateLayout theme =
    Elm.file [ "Theme", "Layout" ]
        (List.concat
            [ [ Elm.declaration "layout"
                    (Elm.fn2
                        ( "attrs"
                        , Just
                            (Elm.Annotation.list
                                (Gen.Ui.annotation_.attribute (Elm.Annotation.var "msg"))
                            )
                        )
                        ( "body", Nothing )
                        (\attrs body ->
                            Gen.Ui.call_.layout
                                (Elm.Op.cons
                                    (Elm.get "default"
                                        (Elm.val "font")
                                    )
                                    attrs
                                )
                                body
                        )
                    )
                    |> Elm.expose
              ]
            , [ Elm.declaration "border"
                    (toFields
                        (\border ->
                            Gen.Ui.border border.width
                        )
                        theme.borders
                        |> Elm.record
                    )
                    |> Elm.expose
              , Elm.declaration "spacing"
                    (Elm.record
                        (toFields (attr << Gen.Ui.spacing)
                            theme.spacing
                        )
                    )
                    |> Elm.expose
              , Elm.declaration "row"
                    (Elm.record
                        (toFields
                            (\spacing ->
                                Elm.fn2
                                    ( "attrs", Nothing )
                                    ( "children", Nothing )
                                    (\attrs children ->
                                        Gen.Ui.call_.row (Elm.Op.cons (Gen.Ui.spacing spacing) attrs) children
                                    )
                            )
                            theme.spacing
                        )
                    )
                    |> Elm.expose
              , Elm.declaration "column"
                    (Elm.record
                        (toFields
                            (\spacing ->
                                Elm.fn2
                                    ( "attrs", Nothing )
                                    ( "children", Nothing )
                                    (\attrs children ->
                                        Gen.Ui.call_.column (Elm.Op.cons (Gen.Ui.spacing spacing) attrs) children
                                    )
                            )
                            theme.spacing
                        )
                    )
                    |> Elm.expose
              , Elm.declaration "padding"
                    (Elm.record
                        (toFields (attr << Gen.Ui.padding)
                            theme.spacing
                            ++ [ ( "xy"
                                 , Elm.record
                                    (toFields
                                        (\spacingX ->
                                            Elm.record
                                                (toFields
                                                    (\spacingY ->
                                                        attr
                                                            (Gen.Ui.paddingXY spacingX spacingY)
                                                    )
                                                    theme.spacing
                                                )
                                        )
                                        theme.spacing
                                    )
                                 )
                               , ( "top"
                                 , Elm.record
                                    (toFields (attr << Gen.Ui.paddingTop) theme.spacing)
                                 )
                               , ( "right"
                                 , Elm.record
                                    (toFields (attr << Gen.Ui.paddingRight) theme.spacing)
                                 )
                               , ( "bottom"
                                 , Elm.record
                                    (toFields (attr << Gen.Ui.paddingBottom) theme.spacing)
                                 )
                               , ( "left"
                                 , Elm.record
                                    (toFields (attr << Gen.Ui.paddingLeft) theme.spacing)
                                 )
                               ]
                        )
                    )
                    |> Elm.expose
              ]
            ]
        )


generateText : Theme.Theme -> Elm.File
generateText theme =
    Elm.file [ "Theme", "Text" ]
        (List.concat
            [ List.concatMap
                (\{ name, item } ->
                    List.map
                        (\typeface ->
                            Elm.fn
                                ( "label", Just Elm.Annotation.string )
                                (\label ->
                                    Gen.Ui.call_.el
                                        (Elm.list
                                            [ Elm.val
                                                "attr"
                                                |> Elm.get (Theme.nameToString typeface.name)
                                            ]
                                        )
                                        (Gen.Ui.call_.text label)
                                )
                                |> Elm.declaration (Theme.nameToString typeface.name)
                                |> Elm.expose
                        )
                        item
                )
                theme.typography

            -- as attributes
            , [ Elm.declaration "attr"
                    (List.concatMap
                        (\{ name, item } ->
                            List.map
                                (\typeface ->
                                    ( Theme.nameToString typeface.name
                                    , Gen.Ui.Font.font
                                        { name = typeface.item.face
                                        , fallback = [ Gen.Ui.Font.serif ]
                                        , variants = []
                                        , weight =
                                            toWeight typeface.item.weight
                                        , size = typeface.item.size
                                        }
                                    )
                                )
                                item
                        )
                        theme.typography
                        |> Elm.record
                    )
                    |> Elm.expose
              ]
            ]
        )


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
    Elm.file [ "Theme", "Color" ]
        (toFields toColor theme.colors
            |> List.map
                (\( name, val ) ->
                    Elm.declaration name val
                        |> Elm.expose
                )
        )



-- generatePalettes : Theme.Theme -> Elm.File
-- generatePalettes theme =
--     Elm.file [ "Ui", "Theme", "Palette" ]
--         (theme.palettes
--             |> List.map
--                 (\{ name, item } ->
--                     Elm.declaration (Theme.nameToString name)
--                         (Gen.Ui.palette
--                             { background = toColor item.background
--                             , font = toColor item.foreground
--                             , border = toColor item.border
--                             }
--                         )
--                         |> Elm.expose
--                 )
--         )
{- HELPERS -}


toColor : Theme.Color -> Elm.Expression
toColor (Theme.Color r g b) =
    Gen.Ui.rgb r g b


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
