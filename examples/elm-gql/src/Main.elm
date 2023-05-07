module Main exposing (main)

{-| -}

import App.Effect as Effect
import App.Engine
import App.Sub
import Browser.Navigation
import Html


main : App.Engine.App { nav : Browser.Navigation.Key } ()
main =
    App.Engine.app
        { init =
            \navKey flags ->
                ( { nav = navKey }
                , Effect.none
                )
        , update = \_ model -> ( model, Effect.none )
        , subscriptions = \_ -> App.Sub.none
        , view =
            \fromFrameMsg model innerView ->
                case innerView of
                    App.Engine.NotFound ->
                        { title = "Not found"
                        , body =
                            [ Html.text "not found"
                            ]
                        }

                    App.Engine.View page ->
                        { title = page.title
                        , body =
                            [ page.body
                            ]
                        }
        , toCmd = \model effect -> Effect.toCmd model.nav effect
        , toSub = \model sub -> App.Sub.toSubscription sub
        }
