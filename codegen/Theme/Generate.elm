module Theme.Generate exposing (..)

import Elm
import Elm.Annotation
import Gen.Ui as Ui
import Gen.Ui.Border as Border
import Gen.Ui.Font as Font
import Theme


attr a =
    a
        |> Elm.withType
            (Ui.annotation_.attribute (Elm.Annotation.var "msg"))


generate : Theme.Theme -> List Elm.File
generate theme =
    let
        _ =
            Debug.log "THEME" theme
    in
    [ Elm.file [ "Ui", "Theme" ]
        [ Elm.declaration "spacing"
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

        -- , Elm.declaration "font"
        --     (record
        --         (attr << Font.size)
        --         theme.typography.sizes
        --     )
        --     |> Elm.expose
        , Elm.declaration "border"
            (Elm.record
                [ Tuple.pair "size"
                    (record (attr << Border.width)
                        theme.borders.sizes
                    )
                , Tuple.pair "rouned"
                    (record (attr << Border.rounded)
                        theme.borders.rounded
                    )
                ]
            )
            |> Elm.expose
        ]
    ]


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
