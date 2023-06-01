module Theme.El exposing
    ( Attr, Elem
    , el, row, column
    , attrs
    , text, static
    )

{-|

@docs Attr, Elem

@docs el, row, column

@docs attrs

@docs text, static

-}

import Elm
import Gen.Ui


type Elem
    = Elem (List Attr) (List Elem)
    | Text String
    | TextVariable String


type Attr
    = Attrs (List Elm.Expression)
    | Event
    | Variants
        (List
            { condition : Condition
            , attrs : List Attr
            }
        )


attrs : List Elm.Expression -> Attr
attrs =
    Attrs


text : String -> Elem
text =
    TextVariable


static : String -> Elem
static =
    Text


el : List Attr -> Elem -> Elem
el attrs elem =
    Elem attr [ elem ]


row : List Attr -> List Elem -> Elem
row attrs elems =
    Elem attr elems


column : List Attr -> List Elem -> Elem
column attrs elems =
    Elem attr elems
