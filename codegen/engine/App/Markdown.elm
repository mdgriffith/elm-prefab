module App.Markdown exposing (Model, Msg, Page, page)

{-| -}

import App
import Browser
import Html exposing (Html)
import Markdown.Block
import Markdown.Parser
import Markdown.Renderer
import Result


type alias Model =
    Result (List String) (List Markdown.Block.Block)


type alias Msg =
    {}


type alias Page shared =
    App.Page shared Model Msg (Browser.Document Msg)


page : String -> Page shared
page markdown =
    App.page
        { init =
            \shared ->
                ( Markdown.Parser.parse markdown
                    |> Result.mapError (List.map Markdown.Parser.deadEndToString)
                , App.None
                )
        , update = \shared msg model -> ( model, App.None )
        , subscriptions = \pageUnpack -> \unpack -> App.Subscription Sub.none
        , view =
            \shared model ->
                { title = "test"
                , body =
                    case model of
                        Ok parsed ->
                            case
                                Markdown.Renderer.render
                                    Markdown.Renderer.defaultHtmlRenderer
                                    parsed
                            of
                                Ok rendered ->
                                    rendered

                                Err errorText ->
                                    [ Html.text errorText ]

                        Err parsingErrors ->
                            [ Html.text "Error parsing" ]
                }
        }
