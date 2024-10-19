module Ui.Nav exposing (view)

import App.Route
import Docs.Guides
import Docs.Packages
import Elm.Docs
import Html exposing (Html, i)
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
                (List.map viewGuide Docs.Guides.all_)
            , viewSection "Packages"
                (List.map viewPackage Docs.Packages.directory)
            ]
        ]


heightWindow =
    Attr.style "height" "100vh"


viewSection : String -> List (Html msg) -> Html msg
viewSection title items =
    if List.isEmpty items then
        Html.text ""

    else
        Theme.column.sm []
            [ Html.h2 [ Ui.Attr.pad 0 ] [ Html.text title ]
            , Theme.column.zero [ Ui.Attr.gap -2 ] items
            ]


viewGuide : { path : String, content : String } -> Html msg
viewGuide guide =
    Html.a
        [ Attr.href
            (App.Route.toString
                (App.Route.Guide
                    { path_ =
                        String.split "/"
                            guide.path
                    }
                )
            )
        , Ui.Attr.ellipsis
        , Ui.Attr.width (width - (padding * 2))
        , Attr.style "display" "inline-block"
        ]
        [ Html.text guide.path ]


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
