module Page.Package exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Effect
import App.Page
import App.Page.Id
import App.Resources
import App.Sub
import App.View
import App.View.Id
import Docs.Packages
import Elm.Docs
import Theme.Layout as Layout
import Theme.Text as Text
import Ui
import Ui.Events as Events
import Ui.Markdown


{-| -}
type alias Model =
    { name : String
    , modules : List Elm.Docs.Module
    , focusedModule : Maybe String
    }


{-| -}
type Msg
    = ModuleClicked String


page : App.Page.Page App.Resources.Resources App.Page.Id.Package_Params Msg Model
page =
    App.Page.page
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : App.Page.Id.Package_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model
init params shared maybeCached =
    let
        key =
            String.join "/" params.path_

        docs =
            List.foldl
                (\doc found ->
                    case found of
                        Just d ->
                            found

                        Nothing ->
                            if doc.name == key then
                                Just doc

                            else
                                Nothing
                )
                Nothing
                Docs.Packages.directory
    in
    case docs of
        Nothing ->
            App.Page.notFound

        Just doc ->
            App.Page.init
                { name = doc.name
                , modules = doc.modules
                , focusedModule =
                    List.head doc.modules
                        |> Maybe.map .name
                }


update : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update shared msg model =
    case msg of
        ModuleClicked name ->
            ( { model | focusedModule = Just name }, App.Effect.none )


subscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg
subscriptions shared model =
    App.Sub.none


getModule : List Elm.Docs.Module -> String -> Maybe Elm.Docs.Module
getModule modules name =
    List.foldl
        (\mod found ->
            case found of
                Just m ->
                    found

                Nothing ->
                    if mod.name == name then
                        Just mod

                    else
                        Nothing
        )
        Nothing
        modules


view : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg
view viewId shared model =
    { title = model.name
    , body =
        Layout.column.md []
            [ Text.h1 model.name
            , Layout.column.md []
                (List.map
                    (\mod ->
                        Ui.el
                            [ Events.onClick (ModuleClicked mod.name) ]
                            (Ui.text mod.name)
                    )
                    model.modules
                )
            , case Maybe.andThen (getModule model.modules) model.focusedModule of
                Nothing ->
                    Ui.none

                Just focusedModule ->
                    viewModule focusedModule
            ]
    }


viewModule : Elm.Docs.Module -> Ui.Element Msg
viewModule mod =
    Layout.column.md []
        [ Text.h2 mod.name
        , Ui.text mod.comment
        , Layout.column.md []
            (mod
                |> Elm.Docs.toBlocks
                |> List.map
                    viewBlock
            )
        ]


viewBlock : Elm.Docs.Block -> Ui.Element Msg
viewBlock block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            Ui.Markdown.view markdown

        Elm.Docs.UnionBlock details ->
            Layout.column.md []
                [ Ui.Markdown.view details.comment
                ]

        Elm.Docs.AliasBlock details ->
            Layout.column.md []
                [ Ui.Markdown.view details.comment
                ]

        Elm.Docs.ValueBlock details ->
            Layout.column.md []
                [ Ui.Markdown.view details.comment
                ]

        Elm.Docs.BinopBlock details ->
            Layout.column.md []
                [ Ui.Markdown.view details.comment
                ]

        Elm.Docs.UnknownBlock text ->
            Ui.text text
