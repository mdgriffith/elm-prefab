module Page.Package exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Effect
import App.Page
import App.Page.Id
import App.Shared
import App.Sub
import App.View
import App.View.Id
import Docs.Packages
import Html
import Html.Attributes as Attr


{-| -}
type alias Model =
    {}


{-| -}
type Msg
    = ReplaceMe


page : App.Page.Page App.Shared.Shared App.Page.Id.Package_Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : App.Page.Id.Package_Params -> App.Shared.Shared -> Maybe Model -> App.Page.Init Msg Model
init params shared maybeCached =
    App.Page.init {}


update : App.Shared.Shared -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update shared msg model =
    ( model, App.Effect.none )


subscriptions : App.Shared.Shared -> Model -> App.Sub.Sub Msg
subscriptions shared model =
    App.Sub.none


view : App.View.Id.Id -> App.Shared.Shared -> Model -> App.View.View Msg
view viewId shared model =
    { title = "Package"
    , body =
        Html.div []
            [ Html.text "Packages:"
            , Html.div []
                (List.map
                    (\package ->
                        Html.div []
                            [ Html.text package.name ]
                    )
                    Docs.Packages.directory
                )
            ]
    }
