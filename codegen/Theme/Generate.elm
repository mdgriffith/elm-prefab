module Theme.Generate exposing (..)

import Elm
import Elm.Annotation
import Gen.Ui as Ui
import Gen.Ui.Font
import Theme


attr a =
    a
        |> Elm.withType
            (Ui.annotation_.attribute (Elm.Annotation.var "msg"))


generate : Theme.Theme -> List Elm.File
generate theme =
    [ Elm.file [ "Ui", "Theme" ]
        [ Elm.declaration "font"
            (toFields
                (\typeface ->
                    toFields
                        (\variant ->
                            Gen.Ui.Font.font
                                { name = typeface.face
                                , fallback = [ Gen.Ui.Font.serif ]
                                , sizing =
                                    Gen.Ui.Font.byCapital
                                        (Gen.Ui.Font.make_.adjustment
                                            { offset = Elm.float 0.045
                                            , height = Elm.float 0.73
                                            }
                                        )
                                , variants =
                                    []
                                , weight = Gen.Ui.Font.regular
                                , size = variant.size
                                }
                        )
                        typeface.variants
                        |> Elm.record
                )
                theme.typography
                |> Elm.record
            )
            |> Elm.expose
        , Elm.declaration "border"
            (toFields
                (\border ->
                    Ui.border
                        { width = border.width
                        , color = toColor border.color
                        }
                )
                theme.borders
                |> Elm.record
            )
            |> Elm.expose
        , Elm.declaration "spacing"
            (Elm.record
                (toFields (attr << Ui.spacing)
                    theme.spacing
                )
            )
            |> Elm.expose
        , Elm.declaration "padding"
            (Elm.record
                (toFields (attr << Ui.padding)
                    theme.spacing
                    ++ [ ( "xy"
                         , Elm.record
                            (toFields
                                (\spacingX ->
                                    Elm.record
                                        (toFields
                                            (\spacingY ->
                                                attr (Ui.paddingXY spacingX spacingY)
                                            )
                                            theme.spacing
                                        )
                                )
                                theme.spacing
                            )
                         )
                       ]
                )
            )
            |> Elm.expose
        ]
    ]


toColor : Theme.Color -> Elm.Expression
toColor (Theme.Color r g b) =
    Ui.rgb r g b


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
