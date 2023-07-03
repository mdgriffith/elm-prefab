module Ui.Card exposing (view)

{-| -}

import Ui
import Ui.Theme
import WebComponents.Portal as Portal


{-| -}
view :
    List (Ui.Element msg)
    -> Ui.Element msg
view content =
    Ui.column
        [ Ui.Theme.border.small
        , Ui.Theme.spacing.sm3
        , Ui.Theme.padding.sm
        , Ui.rounded 4
        , Ui.width Ui.fill
        , Ui.background Ui.Theme.color.white
        ]
        content
