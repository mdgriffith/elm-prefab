module Effect.Scroll exposing
    ( toTop, toBottom, to
    , resetWindowScroll
    )

{-|

@docs toTop, toBottom, to

@docs reset

-}

import Effect exposing (Effect)
import Json.Encode as Json


{-| -}
toTop : { id : String, onScrollFinish : msg } -> Effect msg
toTop =
    Effect.ScrollToTopOf


{-| -}
toBottom : { id : String, onScrollFinish : msg } -> Effect msg
toBottom =
    Effect.ScrollToBottomOf


{-| -}
to :
    { scrollTo : String
    , viewport : String
    , offsetY : Float
    , onScrollFinish : Result Browser.Dom.Error () -> msg
    }
    -> Effect msg
to =
    Effect.ScrollTo


port resetWindowScrollInJs : Json.Value -> Cmd msg


{-| -}
resetWindowScroll : Effect msg
resetWindowScroll =
    Effect.SendToWorld
        { toPort = resetWindowScrollInJs
        , portName = "resetWindowScrollInJs"
        , payload =
            Json.bool True
        }
