module Ui.Button exposing
    ( Button
    , primary
    , secondary
    , view
    , withWidthFill
    )

{-| -}

import Html exposing (Html)
import Html.Attribute as Attr


type Button msg
    = Button (Details msg)


type alias Details =
    { style : style
    , widthFill : Bool
    , onClick : msg
    , label : String
    }


type Style
    = Primary
    | Secondary


primary : { label : String, onClick : msg } -> Button
primary options =
    Button
        { style = Primary
        , widthFill = False
        , onClick = options.onClick
        , label = options.label
        }


secondary : { label : String, onClick : msg } -> Button
secondary options =
    Button
        { style = Secondary
        , widthFill = False
        , onClick = options.onClick
        , label = options.label
        }


withWidthFill : Bool -> Button -> Button
withWidthFill on (Button button) =
    Button { button | widthFill = on }


view : Button -> Html msg
view (Button button) =
    Html.button [ Events.onClick button.onClick ]
        [ Html.text button.label ]
