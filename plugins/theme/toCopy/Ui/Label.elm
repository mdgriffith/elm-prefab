module Ui.Label exposing (..)

{-| -}

import Ui
import Ui.Input
import Ui.Theme


label : String -> Ui.Input.Label msg
label str =
    Ui.Input.label
        { text = str
        , theme = theme
        }
