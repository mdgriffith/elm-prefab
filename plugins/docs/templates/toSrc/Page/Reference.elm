module Page.Reference exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Page
import App.Page.Id
import App.Resources
import App.View
import App.View.Id
import Effect exposing (Effect)
import Elm.Docs
import Html exposing (Html)
import Html.Attributes as Attr
import Listen exposing (Listen)
import Theme
import Ui.Attr
import Ui.Module


{-| -}
type alias Model =
    { references : List Ref
    }


type Ref
    = Ref RefDetails


type alias RefDetails =
    { id : Id
    , source : Source
    , block : Elm.Docs.Block
    }


type Id
    = Id String


type Source
    = FromModule
        { moduleName : String
        }
    | FromPackage
        { moduleName : String
        , package : String
        }


toId : Source -> Elm.Docs.Block -> Id
toId source block =
    let
        blockId =
            blockToIdString block
    in
    case source of
        FromModule { moduleName } ->
            Id (moduleName ++ ":" ++ blockId)

        FromPackage { moduleName, package } ->
            Id (package ++ ":" ++ moduleName ++ ":" ++ blockId)


blockToIdString : Elm.Docs.Block -> String
blockToIdString block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            markdown

        Elm.Docs.UnionBlock details ->
            details.name

        Elm.Docs.AliasBlock details ->
            details.name

        Elm.Docs.ValueBlock details ->
            details.name

        Elm.Docs.BinopBlock details ->
            details.name

        Elm.Docs.UnknownBlock text ->
            text


{-| -}
type Msg
    = RemoveById Id


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
update shared msg model =
    case msg of
        RemoveById removedId ->
            ( { model
                | references =
                    List.filter (\(Ref { id }) -> id /= removedId)
                        model.references
              }
            , Effect.none
            )


subscriptions : App.Resources.Resources -> Model -> Listen Msg
subscriptions shared model =
    Listen.none


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId shared model =
    { title = "Reference"
    , body =
        Theme.column.lg3
            [ Ui.Attr.pad 48
            , Attr.style "max-width" (String.fromInt 600 ++ "px")
            ]
            (model.references
                |> List.map (\(Ref { block }) -> Ui.Module.viewBlock block)
            )
    }
