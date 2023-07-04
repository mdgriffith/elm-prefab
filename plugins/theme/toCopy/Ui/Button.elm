module Ui.Button exposing
    ( Button, button
    , withSecondary
    , withSmall
    , withWidthFill
    , view, viewRow
    )

{-|

@docs Button, button


## Color

@docs withSecondary


## Sizing

@docs withSmall


## Misc

@docs withWidthFill

@docs view, viewRow

-}

import Ui


type Button msg
    = Button (Details msg)


type alias Details msg =
    { label : String
    , style : Style
    , size : Size
    , widthFill : Bool
    , corners : Corners
    , onClick : msg
    }


type Size
    = Normal
    | Small


type Corners
    = Rounded
    | RoundedLeft
    | RoundedRight
    | Sharp


type Style
    = Primary
    | Secondary


{-| -}
button :
    { label : String
    , onClick : msg
    }
    -> Button msg
button options =
    Button
        { label = options.label
        , onClick = options.onClick
        , style = Primary
        , widthFill = False
        , corners = Rounded
        , size = Normal
        }


{-| -}
withWidthFill : Button msg -> Button msg
withWidthFill (Button details) =
    Button
        { details
            | widthFill = True
        }


{-| -}
withSmall : Button msg -> Button msg
withSmall (Button details) =
    Button
        { details
            | size = Small
        }


{-| -}
withSecondary : Button msg -> Button msg
withSecondary (Button details) =
    Button
        { details
            | size = Secondary
        }


{-| -}
view : Button msg -> Ui.Element msg
view (Button details) =
    Ui.el
        [ Ui.onClick details.onClick
        , Ui.Theme.font.base

        -- Variable styles
        , if details.widthFill then
            Ui.width Ui.fill

          else
            Ui.noAttr
        , case details.size of
            Small ->
                Ui.Theme.padding.sm

            Normal ->
                Ui.Theme.padding.md
        , case details.corners of
            Rounded ->
                Ui.rounded 4

            RoundedLeft ->
                Ui.roundedWith
                    { topLeft = 0
                    , topRight = 4
                    , bottomLeft = 0
                    , bottomRight = 4
                    }

            RoundedRight ->
                Ui.roundedWith
                    { topLeft = 4
                    , topRight = 0
                    , bottomLeft = 4
                    , bottomRight = 0
                    }

            Sharp ->
                Ui.noAttr
        ]
        (Ui.text details.label)


{-| -}
viewRow : List (Button msg) -> Ui.Element msg
viewRow buttons =
    let
        buttonCount =
            List.length buttons
    in
    Ui.row []
        (List.indexedMap
            (\index (Button details) ->
                Button
                    { details
                        | corners =
                            if index == 0 then
                                RoundedRight

                            else if index == buttonCount - 1 then
                                RoundedLeft

                            else
                                Sharp
                    }
                    |> view
            )
            buttons
        )
