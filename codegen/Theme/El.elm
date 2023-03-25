module Theme.El exposing (Attr, Elem, column, el, row)

{-| -}


type Elem
    = Elem (List Attr) (List Elem)
    | Text String
    | TextVariable String


type Attr
    = Attrs (List String)
    | Event
    | Variants
        (List
            { condition : Condition
            , attrs : List Attr
            }
        )


el : List Attr -> Elem -> Elem
el attrs elem =
    Elem attr [ elem ]


row : List Attr -> List Elem -> Elem
row attrs elems =
    Elem attr elems


column : List Attr -> List Elem -> Elem
column attrs elems =
    Elem attr elems
