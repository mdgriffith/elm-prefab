module Page.Package exposing (page, Model, Msg)

{-|

@docs page, Model, Msg

-}

import App.Page
import App.Page.Id
import App.Resources
import App.View
import App.View.Id
import Docs.Packages
import Effect exposing (Effect)
import Elm.Docs
import Elm.Type
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import Listen exposing (Listen)
import Theme
import Ui.Attr
import Ui.Docs.Block
import Ui.Markdown
import Ui.Type


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


init : App.Page.Id.Id -> App.Page.Id.Package_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model
init pageId params shared maybeCached =
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


update : App.Resources.Resources -> Msg -> Model -> ( Model, Effect Msg )
update shared msg model =
    case msg of
        ModuleClicked name ->
            ( { model | focusedModule = Just name }
            , Effect.none
            )


subscriptions : App.Resources.Resources -> Model -> Listen Msg
subscriptions shared model =
    Listen.none


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
        Theme.column.lg3
            [ Ui.Attr.pad 48
            , Ui.Attr.width 800
            ]
            [ Html.h1 [] [ Html.text model.name ]
            , Html.div []
                (List.map
                    (\mod ->
                        Html.div
                            [ Events.onClick (ModuleClicked mod.name)
                            , Attr.style "cursor" "pointer"
                            , Attr.style "text-decoration" "underline"
                            ]
                            [ Html.text mod.name ]
                    )
                    model.modules
                )
            , case Maybe.andThen (getModule model.modules) model.focusedModule of
                Nothing ->
                    Html.text ""

                Just focusedModule ->
                    viewModule focusedModule
            ]
    }


viewModule : Elm.Docs.Module -> Html Msg
viewModule mod =
    Theme.column.lg []
        [ Html.h2 [] [ Html.text mod.name ]
        , Theme.column.lg
            []
            (mod
                |> Elm.Docs.toBlocks
                |> List.map
                    viewBlock
            )
        ]


viewBlock : Elm.Docs.Block -> Html Msg
viewBlock block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            viewMarkdown markdown

        Elm.Docs.UnionBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.AliasBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.ValueBlock details ->
            Html.div []
                [ viewTypeDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.BinopBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.UnknownBlock text ->
            Html.text text


viewName : String -> Html Msg
viewName name =
    Html.h2 []
        [ Html.text name
        ]


viewTypeDefinition : { docs | name : String, tipe : Elm.Type.Type } -> Html Msg
viewTypeDefinition details =
    Theme.row.zero []
        [ Html.span [] [ Html.text (details.name ++ " : ") ]
        , Ui.Type.view details.tipe
        ]


viewMarkdown : String -> Html Msg
viewMarkdown markdown =
    Ui.Markdown.view markdown
