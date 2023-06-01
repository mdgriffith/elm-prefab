module App.Markdown exposing (Model, Msg, Page, page)

{-| -}

import App
import Browser
import Html exposing (Html)
import Http
import Markdown.Block
import Markdown.Parser
import Markdown.Renderer
import Result


type alias Model =
    { source : { sourceUrl : String }
    , markdown : Result (List String) (List Markdown.Block.Block)
    }


type Msg
    = MarkdownReceived (Result Http.Error String)


type alias Page shared =
    App.Page { sourceUrl : String } shared Model Msg (Browser.Document Msg)


page : String -> Page shared
page markdown =
    App.page
        { init =
            \params shared ->
                ( { source = params
                  , markdown =
                        Markdown.Parser.parse markdown
                            |> Result.mapError (List.map Markdown.Parser.deadEndToString)
                  }
                , App.get
                    { url = params.sourceUrl
                    , expect =
                        Http.expectString MarkdownReceived
                    }
                )
        , update = update
        , subscriptions = \pageUnpack unpack -> App.Subscription Sub.none
        , view =
            \model ->
                { title = "test"
                , body =
                    case model.markdown of
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


update msg model =
    case msg of
        MarkdownReceived (Err err) ->
            ( model, App.none )

        MarkdownReceived (Ok markdown) ->
            ( { model
                | markdown =
                    Markdown.Parser.parse markdown
                        |> Result.mapError (List.map Markdown.Parser.deadEndToString)
              }
            , App.none
            )
