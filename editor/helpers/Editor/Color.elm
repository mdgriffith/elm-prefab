module Editor.Color exposing (Editor(..), color)

{-| -}

import Html exposing (Html)
import Theme exposing (Color)


type Editor thing model msg
    = Editor
        { new : thing
        , init : thing -> model
        , toValue : model -> thing
        , update : msg -> model -> ( model, Cmd msg )
        , view : model -> Html msg
        }


type alias Model =
    { color : Color
    }


type Msg
    = NoOp


color : Editor Color Model Msg
color =
    Editor
        { new = Theme.Color 0 0 0
        , init = \thing -> { color = thing }
        , toValue = .color
        , update = update
        , view = view
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    let
        (Theme.Color r g b) =
            model.color
    in
    Html.text (String.fromInt r)
