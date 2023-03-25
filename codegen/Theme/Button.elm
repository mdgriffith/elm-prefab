module Theme.Button exposing (..)

{-| -}

import Theme
import Themed


button =
    Theme.el
        [ theme.colors Primary
            [ Secondary
            ]
        , theme.sizes.oneOf Medium
            [ Small
            ]
        , Theme.Dynamic.onClick
        , Theme.attrs []
        ]
        (Theme.Dynamic.label "label")
