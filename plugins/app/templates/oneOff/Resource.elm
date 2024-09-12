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
                ( { cached
                    | apiUrl = apiUrl
                  }
                , Effect.none
                )
        , update =
            \msg model ->
                ( model, Effect.none )
        , subscriptions = \_ -> Listen.none
        }
