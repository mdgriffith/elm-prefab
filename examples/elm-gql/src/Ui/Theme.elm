module Ui.Theme exposing (border, font, h1, h2, layout, padding, spacing)

{-| 
@docs layout, h1, h2, font, border, spacing, padding
-}


import Html
import Ui
import Ui.Font


layout : List (Ui.Attribute msg) -> Ui.Element msg -> Html.Html msg
layout attrs body =
    Ui.layout (font.base :: attrs) body


h1 : List (Ui.Attribute msg) -> String -> Ui.Element msg
h1 attrs label =
    Ui.el (font.h1 :: attrs) (Ui.text label)


h2 : List (Ui.Attribute msg) -> String -> Ui.Element msg
h2 attrs label =
    Ui.el (font.h2 :: attrs) (Ui.text label)


font :
    { h1 : Ui.Attribute msg
    , h2 : Ui.Attribute msg
    , base : Ui.Attribute msg
    , small : Ui.Attribute msg
    }
font =
    { h1 =
        Ui.Font.font
            { name = "EB Garamond"
            , fallback = [ Ui.Font.serif ]
            , variants = []
            , weight = Ui.Font.regular
            , size = 24
            }
    , h2 =
        Ui.Font.font
            { name = "EB Garamond"
            , fallback = [ Ui.Font.serif ]
            , variants = []
            , weight = Ui.Font.regular
            , size = 20
            }
    , base =
        Ui.Font.font
            { name = "Noto Sans"
            , fallback = [ Ui.Font.serif ]
            , variants = []
            , weight = Ui.Font.regular
            , size = 16
            }
    , small =
        Ui.Font.font
            { name = "Noto Sans"
            , fallback = [ Ui.Font.serif ]
            , variants = []
            , weight = Ui.Font.regular
            , size = 10
            }
    }


border : { small : Ui.Attribute msg }
border =
    { small = Ui.border { width = 1, color = Ui.rgb 23 23 23 } }


spacing :
    { sm4 : Ui.Attribute msg
    , sm3 : Ui.Attribute msg
    , sm2 : Ui.Attribute msg
    , sm : Ui.Attribute msg
    , md : Ui.Attribute msg
    , lg : Ui.Attribute msg
    , lg1 : Ui.Attribute msg
    , lg2 : Ui.Attribute msg
    , lg3 : Ui.Attribute msg
    , lg4 : Ui.Attribute msg
    }
spacing =
    { sm4 = Ui.spacing 2
    , sm3 = Ui.spacing 4
    , sm2 = Ui.spacing 8
    , sm = Ui.spacing 12
    , md = Ui.spacing 16
    , lg = Ui.spacing 20
    , lg1 = Ui.spacing 24
    , lg2 = Ui.spacing 32
    , lg3 = Ui.spacing 40
    , lg4 = Ui.spacing 80
    }


padding :
    { sm4 : Ui.Attribute msg
    , sm3 : Ui.Attribute msg
    , sm2 : Ui.Attribute msg
    , sm : Ui.Attribute msg
    , md : Ui.Attribute msg
    , lg : Ui.Attribute msg
    , lg1 : Ui.Attribute msg
    , lg2 : Ui.Attribute msg
    , lg3 : Ui.Attribute msg
    , lg4 : Ui.Attribute msg
    , xy :
        { sm4 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , sm3 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , sm2 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , sm :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , md :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , lg :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , lg1 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , lg2 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , lg3 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        , lg4 :
            { sm4 : Ui.Attribute msg
            , sm3 : Ui.Attribute msg
            , sm2 : Ui.Attribute msg
            , sm : Ui.Attribute msg
            , md : Ui.Attribute msg
            , lg : Ui.Attribute msg
            , lg1 : Ui.Attribute msg
            , lg2 : Ui.Attribute msg
            , lg3 : Ui.Attribute msg
            , lg4 : Ui.Attribute msg
            }
        }
    }
padding =
    { sm4 = Ui.padding 2
    , sm3 = Ui.padding 4
    , sm2 = Ui.padding 8
    , sm = Ui.padding 12
    , md = Ui.padding 16
    , lg = Ui.padding 20
    , lg1 = Ui.padding 24
    , lg2 = Ui.padding 32
    , lg3 = Ui.padding 40
    , lg4 = Ui.padding 80
    , xy =
        { sm4 =
            { sm4 = Ui.paddingXY 2 2
            , sm3 = Ui.paddingXY 2 4
            , sm2 = Ui.paddingXY 2 8
            , sm = Ui.paddingXY 2 12
            , md = Ui.paddingXY 2 16
            , lg = Ui.paddingXY 2 20
            , lg1 = Ui.paddingXY 2 24
            , lg2 = Ui.paddingXY 2 32
            , lg3 = Ui.paddingXY 2 40
            , lg4 = Ui.paddingXY 2 80
            }
        , sm3 =
            { sm4 = Ui.paddingXY 4 2
            , sm3 = Ui.paddingXY 4 4
            , sm2 = Ui.paddingXY 4 8
            , sm = Ui.paddingXY 4 12
            , md = Ui.paddingXY 4 16
            , lg = Ui.paddingXY 4 20
            , lg1 = Ui.paddingXY 4 24
            , lg2 = Ui.paddingXY 4 32
            , lg3 = Ui.paddingXY 4 40
            , lg4 = Ui.paddingXY 4 80
            }
        , sm2 =
            { sm4 = Ui.paddingXY 8 2
            , sm3 = Ui.paddingXY 8 4
            , sm2 = Ui.paddingXY 8 8
            , sm = Ui.paddingXY 8 12
            , md = Ui.paddingXY 8 16
            , lg = Ui.paddingXY 8 20
            , lg1 = Ui.paddingXY 8 24
            , lg2 = Ui.paddingXY 8 32
            , lg3 = Ui.paddingXY 8 40
            , lg4 = Ui.paddingXY 8 80
            }
        , sm =
            { sm4 = Ui.paddingXY 12 2
            , sm3 = Ui.paddingXY 12 4
            , sm2 = Ui.paddingXY 12 8
            , sm = Ui.paddingXY 12 12
            , md = Ui.paddingXY 12 16
            , lg = Ui.paddingXY 12 20
            , lg1 = Ui.paddingXY 12 24
            , lg2 = Ui.paddingXY 12 32
            , lg3 = Ui.paddingXY 12 40
            , lg4 = Ui.paddingXY 12 80
            }
        , md =
            { sm4 = Ui.paddingXY 16 2
            , sm3 = Ui.paddingXY 16 4
            , sm2 = Ui.paddingXY 16 8
            , sm = Ui.paddingXY 16 12
            , md = Ui.paddingXY 16 16
            , lg = Ui.paddingXY 16 20
            , lg1 = Ui.paddingXY 16 24
            , lg2 = Ui.paddingXY 16 32
            , lg3 = Ui.paddingXY 16 40
            , lg4 = Ui.paddingXY 16 80
            }
        , lg =
            { sm4 = Ui.paddingXY 20 2
            , sm3 = Ui.paddingXY 20 4
            , sm2 = Ui.paddingXY 20 8
            , sm = Ui.paddingXY 20 12
            , md = Ui.paddingXY 20 16
            , lg = Ui.paddingXY 20 20
            , lg1 = Ui.paddingXY 20 24
            , lg2 = Ui.paddingXY 20 32
            , lg3 = Ui.paddingXY 20 40
            , lg4 = Ui.paddingXY 20 80
            }
        , lg1 =
            { sm4 = Ui.paddingXY 24 2
            , sm3 = Ui.paddingXY 24 4
            , sm2 = Ui.paddingXY 24 8
            , sm = Ui.paddingXY 24 12
            , md = Ui.paddingXY 24 16
            , lg = Ui.paddingXY 24 20
            , lg1 = Ui.paddingXY 24 24
            , lg2 = Ui.paddingXY 24 32
            , lg3 = Ui.paddingXY 24 40
            , lg4 = Ui.paddingXY 24 80
            }
        , lg2 =
            { sm4 = Ui.paddingXY 32 2
            , sm3 = Ui.paddingXY 32 4
            , sm2 = Ui.paddingXY 32 8
            , sm = Ui.paddingXY 32 12
            , md = Ui.paddingXY 32 16
            , lg = Ui.paddingXY 32 20
            , lg1 = Ui.paddingXY 32 24
            , lg2 = Ui.paddingXY 32 32
            , lg3 = Ui.paddingXY 32 40
            , lg4 = Ui.paddingXY 32 80
            }
        , lg3 =
            { sm4 = Ui.paddingXY 40 2
            , sm3 = Ui.paddingXY 40 4
            , sm2 = Ui.paddingXY 40 8
            , sm = Ui.paddingXY 40 12
            , md = Ui.paddingXY 40 16
            , lg = Ui.paddingXY 40 20
            , lg1 = Ui.paddingXY 40 24
            , lg2 = Ui.paddingXY 40 32
            , lg3 = Ui.paddingXY 40 40
            , lg4 = Ui.paddingXY 40 80
            }
        , lg4 =
            { sm4 = Ui.paddingXY 80 2
            , sm3 = Ui.paddingXY 80 4
            , sm2 = Ui.paddingXY 80 8
            , sm = Ui.paddingXY 80 12
            , md = Ui.paddingXY 80 16
            , lg = Ui.paddingXY 80 20
            , lg1 = Ui.paddingXY 80 24
            , lg2 = Ui.paddingXY 80 32
            , lg3 = Ui.paddingXY 80 40
            , lg4 = Ui.paddingXY 80 80
            }
        }
    }