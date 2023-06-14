module Ui.Button exposing
    ( Button
    , init, withEnabled, withSmall, withSecondary
    , view
    )

{-|

@docs Button

@docs init, withEnabled, withSmall, withSecondary

@docs view

-}

import Element exposing (Element)
import Element.Border as Border
import Element.Font as Font
import Html exposing (Html)
import Html.Attributes as Attr


{-| -}
type Button msg
    = Button
        { text : String
        , enabled : Bool
        , size : Size
        , style : Style
        , onClick : msg
        }


type Style
    = Primary
    | Secondary


type Size
    = Small
    | Normal


{-| -}
init :
    { text : String
    , onClick : msg
    }
    -> Button msg
init opts =
    Button
        { text = opts.text
        , onClick = opts.onClick
        , size = Normal
        , style = Primary
        , enabled = True
        }


{-| -}
withEnabled : Bool -> Button msg -> Button msg
withEnabled bool (Button button) =
    Button { button | enabled = bool }


{-| -}
withSecondary : Button msg -> Button msg
withSecondary (Button button) =
    Button { button | style = Secondary }


{-| -}
withSmall : Button msg -> Button msg
withSmall (Button button) =
    Button { button | size = Small }


{-| -}
view : Button msg -> Element msg
view (Button button) =
    Element.el
        [ Element.padding
            (case button.size of
                Small ->
                    12

                Normal ->
                    20
            )
        , Element.width (Element.px 100)
        , Font.center
        , Font.color
            (case button.style of
                Primary ->
                    Element.rgb 1 1 1

                Secondary ->
                    Element.rgb 0 0 0
            )
        , Font.size 16
        , Border.width
            (case button.style of
                Primary ->
                    0

                Secondary ->
                    2
            )
        , Border.rounded 4
        , Element.htmlAttribute
            (Attr.style "border-color"
                (case button.style of
                    Primary ->
                        "transparent"

                    Secondary ->
                        "#9166ff"
                )
            )
        , Element.htmlAttribute
            (Attr.style "background"
                (case button.style of
                    Primary ->
                        if not button.enabled then
                            "grey"

                        else
                            "linear-gradient(120deg,#de2898,#9166ff)"

                    Secondary ->
                        if not button.enabled then
                            "grey"

                        else
                            "transparent"
                )
            )
        ]
        (Element.text button.text)
