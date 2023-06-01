module Theme.Button exposing (..)

{-| -}

import Theme
import Theme.El as El


button =
    El.el
        [ theme.colors Primary
            [ Secondary
            ]
        , theme.sizes.oneOf Medium
            [ Small
            ]
        , Theme.Dynamic.onClick
        , El.attrs []
        ]
        (El.text "label")
