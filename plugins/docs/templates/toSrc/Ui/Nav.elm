module Ui.Nav exposing (view)

import App.Route
import Docs.Packages
import Elm.Docs
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import Ui


padding : Int
padding =
    24


width : Int
width =
    256


view : {} -> Html msg
view options =
    Html.nav
        [ Ui.width width
        , Ui.widthMax width
        , Ui.noShrink
        , Ui.noGrow
        , Ui.borderBox
        , heightWindow
        ]
        [ Html.div
            [ Attr.style "position" "fixed"
            , heightWindow
            , Ui.pad padding
            , Ui.width width
            , Ui.widthMax width
            , Ui.borderBox
            , Ui.scrollbars
            , Attr.class "navbar"
            ]
            [ viewSection "Packages"
                (List.map viewPackage Docs.Packages.directory)
            ]
        ]


heightWindow =
    Attr.style "height" "100vh"


viewSection : String -> List (Html msg) -> Html msg
viewSection title items =
    Ui.column [ Ui.gap 16 ]
        [ Html.h2 [ Ui.pad 0 ] [ Html.text title ]
        , Ui.column [ Ui.gap -2 ] items
        ]


viewPackage : { name : String, modules : List Elm.Docs.Module } -> Html msg
viewPackage package =
    Html.div []
        [ Html.a
            [ Attr.href
                (App.Route.toString
                    (App.Route.Package { path_ = String.split "/" package.name })
                )
            , Ui.ellipsis
            , Ui.width (width - (padding * 2))
            , Attr.style "display" "inline-block"
            ]
            [ Html.text package.name ]
        ]
