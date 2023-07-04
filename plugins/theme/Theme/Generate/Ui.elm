module Theme.Generate.Ui exposing (generate)

{-| -}

import Elm
import Elm.Annotation
import Elm.Op
import Gen.Ui as Ui
import Gen.Ui.Font
import Gen.Ui.Input
import Theme


attr : Elm.Expression -> Elm.Expression
attr a =
    a
        |> Elm.withType
            (Ui.annotation_.attribute (Elm.Annotation.var "msg"))


generate : Theme.Theme -> List Elm.File
generate theme =
    [ generateColors theme
    , Elm.file [ "Ui", "Theme" ]
        (List.concat
            [ [ Elm.declaration "layout"
                    (Elm.fn2
                        ( "attrs"
                        , Just
                            (Elm.Annotation.list
                                (Ui.annotation_.attribute (Elm.Annotation.var "msg"))
                            )
                        )
                        ( "body", Nothing )
                        (\attrs body ->
                            Ui.call_.layout
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
            , List.filterMap
                (\typeface ->
                    let
                        name =
                            Theme.nameToString typeface.name
                    in
                    if List.member name [ "h1", "h2", "h3", "h4", "h5", "h6" ] then
                        Elm.declaration name
                            (Elm.fn2
                                ( "attrs"
                                , Just
                                    (Elm.Annotation.list
                                        (Ui.annotation_.attribute (Elm.Annotation.var "msg"))
                                    )
                                )
                                ( "label", Just Elm.Annotation.string )
                                (\attrs label ->
                                    Ui.call_.el
                                        (Elm.Op.cons
                                            (Elm.get name
                                                (Elm.val "font")
                                            )
                                            attrs
                                        )
                                        (Ui.call_.text label)
                                )
                            )
                            |> Elm.expose
                            |> Just

                    else
                        Nothing
                )
                theme.typography
            , [ Elm.declaration "font"
                    (toFields
                        (\typeface ->
                            Gen.Ui.Font.font
                                { name = typeface.face
                                , fallback = [ Gen.Ui.Font.serif ]
                                , variants = []
                                , weight =
                                    if typeface.weight == 400 then
                                        Gen.Ui.Font.regular

                                    else
                                        Gen.Ui.Font.bold
                                , size = typeface.size
                                }
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
        )
    ]


generateColors : Theme.Theme -> Elm.File
generateColors theme =
    Elm.file [ "Ui", "Theme", "Color" ]
        (toFields toColor theme.colors
            |> List.map
                (\( name, val ) ->
                    Elm.declaration name val
                        |> Elm.expose
                )
        )



{- HELPERS -}


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
