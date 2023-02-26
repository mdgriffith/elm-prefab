module Press.Page exposing (..)

import Markdown.Parser
import Markdown.Renderer


type alias Page flags common msg model effect view =
    { init : flags -> ( model, effect )
    , update : common -> msg -> model -> ( model, effect )
    , view : common -> model -> view
    , subscriptions : common -> model -> Sub msg
    }


markdown :
    { renderer : Markdown.Renderer.Renderer block
    , source : String
    , layout : List block -> view
    , onError : String -> view
    }
    -> Page flags common msg model view
markdown options =
    { init = \{} -> ( {}, {} )
    , update = \common msg model -> ( model, {} )
    , view =
        \_ _ ->
            let
                rendered =
                    Markdown.Parser.parse options.source
                        |> Result.mapError
                            (List.map deadEndToString >> String.join "\n\n")
                        |> Result.map (Markdown.Renderer.render options.renderer)
            in
            case rendered of
                Ok items ->
                    options.layout items

                Err errString ->
                    options.onError errString
    , subscriptions = \_ _ -> Sub.none
    }
