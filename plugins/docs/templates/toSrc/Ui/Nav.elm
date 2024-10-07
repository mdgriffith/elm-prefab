module Ui.Nav exposing (view)

import App.Route
import Docs.Packages
import Elm.Docs
import Html exposing (Html)
import Html.Attributes as Attr
import Theme
import Ui.Attr


padding : Int
padding =
    24


width : Int
width =
    256


view : {} -> Html msg
view options =
    Html.nav
        [ Ui.Attr.width width
        , Ui.Attr.widthMax width
        , Ui.Attr.noShrink
        , Ui.Attr.noGrow
        , Ui.Attr.borderBox
        , heightWindow
        ]
        [ Html.div
            [ Attr.style "position" "fixed"
            , heightWindow
            , Ui.Attr.pad padding
            , Ui.Attr.width width
            , Ui.Attr.widthMax width
            , Ui.Attr.borderBox
            , Ui.Attr.scrollbars
            , Attr.class "navbar"
            ]
            [ viewSection "Guides"
                ()
            , viewSection "Packages"
                (List.map viewPackage Docs.Packages.directory)
            ]
        ]


heightWindow =
    Attr.style "height" "100vh"


viewSection : String -> List (Html msg) -> Html msg
viewSection title items =
    Theme.column.sm []
        [ Html.h2 [ Ui.pad 0 ] [ Html.text title ]
        , Theme.column.zero [ Ui.gap -2 ] items
        ]


viewPackage : { name : String, modules : List Elm.Docs.Module } -> Html msg
viewPackage package =
    Html.div []
        [ Html.a
            [ Attr.href
                (App.Route.toString
                    (App.Route.Package { path_ = String.split "/" package.name })
                )
            , Ui.Attr.ellipsis
            , Ui.Attr.width (width - (padding * 2))
            , Attr.style "display" "inline-block"
            ]
            [ Html.text package.name ]
        ]
