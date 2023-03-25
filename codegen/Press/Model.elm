module Press.Model exposing (..)

{-| -}

import Elm.Annotation as Type
import Gen.App
import Gen.Browser
import Set exposing (Set)


type alias RouteInfo =
    { name : String
    , moduleName : List String
    , pattern : UrlPattern
    , type_ : RouteType
    }


type RouteType
    = Elm
    | Markdown
        { path : String
        , source : String
        }


type UrlPattern
    = UrlPattern
        { path : List UrlPiece
        , queryParams : QueryParams
        }


type alias QueryParams =
    { includeCatchAll : Bool
    , specificFields : Set String
    }


type UrlPiece
    = Token String
    | Variable String


types =
    { msg = Type.namedWith [] "Msg" [ Type.var "frameMsg" ]
    , pageMsg = Type.named [] "PageMsg"
    , model = Type.namedWith [] "Model" [ Type.var "frame" ]
    , frame =
        Gen.App.annotation_.frame
            (Type.var "frame")
            (Type.var "frameMsg")
            (Type.namedWith [] "Msg" [ Type.var "frameMsg" ])
            (Gen.Browser.annotation_.document
                (Type.namedWith [] "Msg" [ Type.var "frameMsg" ])
            )
    , pageModel = Type.named [] "PageModel"
    , effect = Type.namedWith [] "Effect" [ Type.var "msg" ]
    , subscription = Type.namedWith [] "Subscription" [ Type.var "msg" ]
    , pageConfig =
        Type.namedWith []
            "Page"
            [ Type.var "frame"
            , Type.var "model"
            , Type.var "msg"
            ]
    , cache = Type.named [] "Cache"
    , toPageMsg =
        \string ->
            "To" ++ string
    }
