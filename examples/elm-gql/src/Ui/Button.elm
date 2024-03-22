module Ui.Button exposing
    ( Button
    , primary
    , secondary
    , view
    , withWidthFill
    )

{-| -}

import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events


type Button msg
    = Button (Details msg)


type alias Details msg =
    { style : Style
    , widthFill : Bool
    , onClick : msg
    , label : String
    }


type Style
    = Primary
    | Secondary


primary : { label : String, onClick : msg } -> Button msg
primary options =
    Button
        { style = Primary
        , widthFill = False
        , onClick = options.onClick
        , label = options.label
        }


secondary : { label : String, onClick : msg } -> Button msg
secondary options =
    Button
        { style = Secondary
        , widthFill = False
        , onClick = options.onClick
        , label = options.label
        }


withWidthFill : Bool -> Button msg -> Button msg
withWidthFill on (Button button) =
    Button { button | widthFill = on }


view : Button msg -> Html msg
view (Button button) =
    Html.button [ Events.onClick button.onClick ]
        [ Html.text button.label ]
