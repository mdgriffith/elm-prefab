module Resource.{{name}} exposing
    ( resource
    , Model, Msg(..)
    )

{-|

@docs resource

@docs Model, Msg

-}

import App.Resource
import Effect
import Json.Decode
import Json.Encode
import Listen


type alias Model =
    {}


type Msg
    = ReplaceMe


resource : App.Resource.Resource Msg Model
resource =
    App.Resource.resource
        { init =
            \flags url maybeCachedModel ->
                let
                    model =
                        -- `maybeCachedModel` is the model from localstorage
                        -- If `App.Resource.withLocalStorage` is defined
                        -- and it's available
                        maybeCachedModel
                            |> Maybe.withDefault
                                {}
                in
                ( model
                , Effect.none
                )
        , update =
            \msg model ->
                ( model, Effect.none )
        , subscriptions = \_ -> Listen.none
        }
        |> App.Resource.withLocalStorage
            { decoder = decoder
            , encode = encode
            }


encode : Model -> Json.Encode.Value
encode model =
    Json.Encode.object []


decoder : Json.Decode.Decoder Model
decoder =
    Json.Decode.succeed {}
