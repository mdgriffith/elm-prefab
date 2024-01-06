module Main exposing (..)

{-|

@docs main

-}

import App.Effect
import App.Engine
import App.Shared
import App.Sub
import Browser.Navigation
import Html


main : App.Engine.App { shared : { authenticated : App.Shared.Authenticated } } ()
main =
    App.Engine.app
        { init =
            \flags url ->
                ( { shared = { authenticated = App.Shared.Authenticated } }
                , App.Effect.none
                )
        , update = \_ model -> ( model, App.Effect.none )
        , subscriptions = \_ -> App.Sub.none
        , view =
            \fromFrameMsg model regions ->
                case regions.primary of
                    Nothing ->
                        { title = "Not found"
                        , body =
                            [ Html.text "not found"
                            ]
                        }

                    Just App.Engine.NotFound ->
                        { title = "Not found"
                        , body =
                            [ Html.text "not found"
                            ]
                        }

                    Just (App.Engine.Error pageError) ->
                        { title = "Unauthorized"
                        , body =
                            [ Html.text "Unauthorized"
                            ]
                        }

                    Just (App.Engine.Loading _) ->
                        { title = "Loading"
                        , body =
                            [ Html.text "loading"
                            ]
                        }

                    Just (App.Engine.View page) ->
                        { title = page.title
                        , body =
                            [ page.body
                            ]
                        }
        , toCmd = \options model effect -> App.Effect.toCmd options effect
        , toSub = \options model sub -> App.Sub.toSubscription options sub
        , toShared = .shared
        , onUrlChange = \_ -> ()
        , onUrlRequest = \_ -> ()
        }
