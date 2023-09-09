module Main exposing (..)

{-|

@docs main

-}

import App.Effect
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
                , App.Effect.none
                )
        , update = \_ model -> ( model, App.Effect.none )
        , subscriptions = \_ -> App.Sub.none
        , view =
            \fromFrameMsg model innerView ->
                case innerView of
                    App.Engine.NotFound _ ->
                        { title = "Not found"
                        , body =
                            [ Html.text "not found"
                            ]
                        }

                    App.Engine.Error pageError ->
                        { title = "Unauthorized"
                        , body =
                            [ Html.text "Unauthorized"
                            ]
                        }

                    App.Engine.Loading _ ->
                        { title = "Loading"
                        , body =
                            [ Html.text "loading"
                            ]
                        }

                    App.Engine.View page ->
                        { title = page.title
                        , body =
                            [ page.body
                            ]
                        }
        , toCmd = \model effect -> App.Effect.toCmd model.nav effect
        , toSub = \model sub -> App.Sub.toSubscription sub
        , toShared = \model -> {}
        }
