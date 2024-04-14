module Main exposing (main)

{-| -}

import App
import App.Effect
import App.Page.Id
import App.Resources
import App.Route
import App.Sub
import App.View
import App.View.Id
import Browser
import Html
import Json.Decode
import Json.Encode as Json
import Url


type alias Model =
    {}


{-| -}
main : App.App Model Msg
main =
    App.app
        { init = init
        , onUrlChange = UrlChanged
        , onUrlRequest = UrlRequested
        , update = update
        , subscriptions = subscriptions
        , toCmd = toCmd
        , toSub = toSub
        , view =
            \resources toAppMsg model regions ->
                case regions.primary of
                    Nothing ->
                        { title = "Nothing"
                        , body = [ Html.text "Nothing" ]
                        }

                    Just (App.Loading _) ->
                        { title = "Loading"
                        , body = [ Html.text "Loading" ]
                        }

                    Just App.NotFound ->
                        --
                        { title = "Not found"
                        , body = [ Html.text "Not found" ]
                        }

                    Just (App.Error error) ->
                        -- error is a type you control that lives at App.Page.Error
                        { title = "Not found"
                        , body = [ Html.text "Not found" ]
                        }

                    Just (App.View page) ->
                        view resources toAppMsg model page
        }


init : App.Resources.Resources -> Json.Value -> Url.Url -> ( Model, App.Effect.Effect Msg )
init resources flagsValue url =
    let
        initial =
            App.Route.parse url

        model =
            {}
    in
    gotoUrl url model App.Effect.none



{-
   Subscriptions and Commands

-}


subscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg
subscriptions resources model =
    App.Sub.none


toSub : App.Resources.Resources -> App.SubOptions Msg -> Model -> App.Sub.Sub (App.Msg Msg) -> Sub.Sub (App.Msg Msg)
toSub resources options model sub =
    App.Sub.toSubscription options sub


toCmd : App.Resources.Resources -> App.CmdOptions Msg -> Model -> App.Effect.Effect (App.Msg Msg) -> Cmd (App.Msg Msg)
toCmd resources options model effect =
    App.Effect.toCmd options effect


view :
    App.Resources.Resources
    -> (Msg -> App.Msg Msg)
    -> Model
    -> App.View.View (App.Msg Msg)
    -> Browser.Document (App.Msg Msg)
view resources toAppMsg model innerView =
    { title = innerView.title
    , body =
        [ innerView.body
        ]
    }



{-
   Updates
-}


type Msg
    = UrlChanged Url.Url
    | UrlRequested Browser.UrlRequest


update : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )
update resources msg model =
    case msg of
        UrlRequested (Browser.Internal url) ->
            case App.Route.parse url of
                Nothing ->
                    ( model
                    , App.Effect.none
                    )

                Just route ->
                    ( model
                    , App.Effect.navigateTo route.route
                    )

        UrlRequested (Browser.External urlStr) ->
            ( model, App.Effect.pushUrl urlStr )

        UrlChanged url ->
            gotoUrl url model App.Effect.none


gotoUrl : Url.Url -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )
gotoUrl url model eff =
    case App.Route.parse url of
        Nothing ->
            ( model
            , eff
            )

        Just route ->
            gotoRoute route model eff


gotoRoute : { isRedirect : Bool, route : App.Route.Route } -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )
gotoRoute { isRedirect, route } model eff =
    if isRedirect then
        ( model, App.Effect.replaceUrl (App.Route.toString route) )

    else
        case App.Page.Id.fromRoute route of
            Nothing ->
                ( model, App.Effect.none )

            Just pageId ->
                ( model
                , App.Effect.batch
                    [ App.Effect.loadAt App.View.Id.Primary pageId
                    , eff
                    ]
                )
