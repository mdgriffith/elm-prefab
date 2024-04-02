module Main exposing (main)

{-| -}

import App
import App.Effect
import App.Flags
import App.Page.Id
import App.Route
import App.Shared
import App.Sub
import App.View
import App.View.Id
import Browser
import Html
import Json.Decode
import Json.Encode as Json
import Url


type alias Model =
    { shared : App.Shared.Shared
    , flags : Result Json.Decode.Error App.Flags.Flags
    }


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
        , toShared = .shared
        , view =
            \fromFrameMsg model regions ->
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
                        view fromFrameMsg model page
        }


init : Json.Value -> Url.Url -> ( Model, App.Effect.Effect Msg )
init flagsValue url =
    let
        decodedFlags =
            App.Flags.decode flagsValue

        initial =
            App.Route.parse url

        model =
            { shared =
                { authenticated =
                    App.Shared.Unauthenticated
                }
            , flags = decodedFlags
            }
    in
    gotoUrl url model App.Effect.none



{-
   Subscriptions and Commands

-}


subscriptions : Model -> App.Sub.Sub Msg
subscriptions model =
    App.Sub.none


toSub : App.SubOptions Msg -> Model -> App.Sub.Sub (App.Msg Msg) -> Sub.Sub (App.Msg Msg)
toSub options model sub =
    App.Sub.toSubscription options sub


toCmd : App.CmdOptions Msg -> Model -> App.Effect.Effect (App.Msg Msg) -> Cmd (App.Msg Msg)
toCmd options model effect =
    case model.flags of
        Err _ ->
            Cmd.none

        Ok flags ->
            App.Effect.toCmd options effect


view :
    (Msg -> App.Msg Msg)
    -> Model
    -> App.View.View (App.Msg Msg)
    -> Browser.Document (App.Msg Msg)
view fromFrameMsg model innerView =
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


update : Msg -> Model -> ( Model, App.Effect.Effect Msg )
update msg model =
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
    case route of
        App.Route.Logout params ->
            ( { model
                | shared =
                    { authenticated = App.Shared.Unauthenticated
                    }
              }
            , App.Effect.batch
                [ App.Effect.replaceUrl "/"
                , eff
                ]
            )

        _ ->
            let
                pageId =
                    if routeRequiresAuthentication route && not (App.Shared.isLoggedIn model.shared) then
                        App.Page.Id.Home {}

                    else
                        routeToPageId route
            in
            ( model
            , App.Effect.batch
                [ App.Effect.loadAt App.View.Id.Primary pageId
                , eff
                ]
            )


routeRequiresAuthentication : App.Route.Route -> Bool
routeRequiresAuthentication route =
    True


routeToPageId : App.Route.Route -> App.Page.Id.Id
routeToPageId route =
    case route of
        App.Route.Home _ ->
            App.Page.Id.Home {}

        App.Route.Logout _ ->
            App.Page.Id.Home {}

        App.Route.Login _ ->
            App.Page.Id.Home {}

        App.Route.Package _ ->
            App.Page.Id.Package {}

        App.Route.Guide _ ->
            App.Page.Id.Guide {}

        App.Route.Module _ ->
            App.Page.Id.Module {}
