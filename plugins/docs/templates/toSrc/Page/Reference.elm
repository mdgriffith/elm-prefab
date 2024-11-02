module Page.Reference exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Page
import App.Page.Id
import App.Resources
import App.View
import App.View.Id
import Broadcast
import Effect exposing (Effect)
import Html exposing (Html)
import Html.Attributes as Attr
import Listen exposing (Listen)
import Ref
import Theme
import Ui.Attr
import Ui.Module


{-| -}
type alias Model =
    { references : List Ref.Ref
    }


{-| -}
type Msg
    = RemoveById Ref.Id
    | RefAdded Ref.Ref


page : App.Page.Page App.Resources.Resources App.Page.Id.Reference_Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init :
    App.Page.Id.Id
    -> App.Page.Id.Reference_Params
    -> App.Resources.Resources
    -> Maybe Model
    -> App.Page.Init Msg Model
init pageId params shared maybeCached =
    case maybeCached of
        Nothing ->
            App.Page.init
                { references = []
                }

        Just model ->
            App.Page.init model


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect Msg )
update resources msg model =
    case msg of
        RefAdded ref ->
            ( { model
                | references = ref :: model.references
              }
            , Effect.none
            )

        RemoveById removedId ->
            ( { model
                | references =
                    List.filter (\{ id } -> id /= removedId)
                        model.references
              }
            , Effect.none
            )


subscriptions : App.Resources.Resources -> Model -> Listen Msg
subscriptions resources model =
    Listen.onBroadcast
        (\broadcastMsg ->
            case broadcastMsg of
                Broadcast.RefPinned ref ->
                    Just (RefAdded ref)
        )


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId shared model =
    { title = "Reference"
    , body =
        Theme.column.lg3
            [ Ui.Attr.pad 48
            , Attr.style "max-width" (String.fromInt 600 ++ "px")
            ]
            (model.references
                |> List.foldl (\{ block } rendered -> Ui.Module.viewBlock block :: rendered) []
            )
    }
