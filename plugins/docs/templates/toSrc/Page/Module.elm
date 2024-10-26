module Page.Module exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Page
import App.Page.Id
import App.Resources
import App.View
import App.View.Id
import Doc.Modules
import Effect exposing (Effect)
import Elm.Docs
import Html
import Listen exposing (Listen)
import Ui.Module


{-| -}
type alias Model =
    { module_ : Elm.Docs.Module
    }


{-| -}
type Msg
    = ReplaceMe


page : App.Page.Page App.Resources.Resources App.Page.Id.Module_Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : App.Page.Id.Id -> App.Page.Id.Module_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model
init pageId params shared maybeCached =
    case maybeCached of
        Just model ->
            App.Page.init model

        Nothing ->
            case lookupModule params.path_ shared.modules of
                Just module_ ->
                    App.Page.init { module_ = module_ }

                Nothing ->
                    App.Page.notFound


lookupModule : List String -> List Elm.Docs.Module -> Maybe Elm.Docs.Module
lookupModule path_ modules =
    let
        moduleName =
            String.join "." path_
    in
    List.foldl
        (\module_ found ->
            case found of
                Just m ->
                    found

                Nothing ->
                    if module_.name == moduleName then
                        Just module_

                    else
                        Nothing
        )
        Nothing
        modules


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect Msg )
update shared msg model =
    ( model, Effect.none )


subscriptions : App.Resources.Resources -> Model -> Listen Msg
subscriptions shared model =
    Listen.none


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId shared model =
    { title = model.module_.name
    , body = Ui.Module.view model.module_
    }
