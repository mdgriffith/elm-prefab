module Ui.Nav exposing (view)

import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import App.Route
import Docs.Packages
import Ui
import Elm.Docs

padding : Int
padding = 24

width : Int
width = 256

view : {} -> Html msg
view options =
  Html.nav
    [  Ui.width width
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
        ]
        [viewPackages]
    ]

heightWindow =
  Attr.style "height" "100vh"


viewPackages : Html msg
viewPackages =
    Ui.column [Ui.gap 16]
        [ Html.h1 [Ui.pad 0] [ Html.text "Packages" ]
        , Ui.column [Ui.gap 4]
            (List.map viewPackage Docs.Packages.directory)
        ]


viewPackage : { name : String, modules : List Elm.Docs.Module } -> Html msg
viewPackage package =
    Html.div []
      [Html.a
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
