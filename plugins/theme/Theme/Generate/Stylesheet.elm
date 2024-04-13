module Theme.Generate.Stylesheet exposing
    ( File, file
    , none, color, string, transition, maybe
    , class, id
    , hover, focus, active
    )

{-|

@docs File, file

@docs none, color, string, transition, maybe

@docs class, id

@docs hover, focus, active

-}

import Color


type alias File =
    { path : String
    , contents : String
    , warnings :
        List
            { declaration : String
            , warning : String
            }
    }


file : Maybe String -> List String -> List Rule -> File
file namespace path rules =
    { path = String.join "/" path
    , contents = toString namespace rules
    , warnings = []
    }


none : Rule
none =
    Prop NoProp


maybe : (a -> Rule) -> Maybe a -> Rule
maybe f m =
    case m of
        Just a ->
            f a

        Nothing ->
            none


color : String -> Color.Color -> Rule
color key c =
    Prop (Color key c)


string : String -> String -> Rule
string key value =
    Prop (Str key value)


class : String -> List Rule -> Rule
class name rules =
    Rule (Class name) rules


id : String -> List Rule -> Rule
id name rules =
    Rule (Id name) rules


hover : String -> List Rule -> Rule
hover name rules =
    Rule (Pseudo Hover (Class name)) rules


focus : String -> List Rule -> Rule
focus name rules =
    Rule (Pseudo Focus (Class name)) rules


active : String -> List Rule -> Rule
active name rules =
    Rule (Pseudo Active (Class name)) rules


transition : Int -> Rule
transition ms =
    Prop
        (Str "transition"
            (("transform " ++ String.fromInt ms ++ "ms, ")
                ++ ("opacity " ++ String.fromInt ms ++ "ms")
            )
        )


type Selector
    = Root
    | Class String
    | Id String
    | Pseudo PseudoClass Selector
    | Child Selector Selector
    | AllChildren Selector Selector
    | After Selector
    | Before Selector


type PseudoClass
    = Active
    | Focus
    | Hover


type Rule
    = Rule Selector (List Rule)
    | RuleList (List Rule)
    | Prop Property


type CompiledRule
    = Compiled Selector (List Property)


type Property
    = Color String Color.Color
    | Str String String
    | NoProp


type alias Cursor =
    { rules : List CompiledRule
    , props : List Property
    }


empty : Cursor
empty =
    { rules = []
    , props = []
    }


flatten : Selector -> List Rule -> Cursor -> Cursor
flatten selector rules cursor =
    List.foldr (flattenRule selector) cursor rules


combineSelectors : Selector -> Selector -> Selector
combineSelectors parent selector =
    case parent of
        Root ->
            selector

        _ ->
            Child parent selector


flattenRule : Selector -> Rule -> Cursor -> Cursor
flattenRule parentSelector rule cursor =
    case rule of
        Rule selector rules ->
            let
                newSelector =
                    combineSelectors parentSelector selector

                gathered =
                    flatten newSelector rules empty

                newRule =
                    Compiled newSelector gathered.props
            in
            { rules = gathered.rules ++ [ newRule ] ++ cursor.rules
            , props = cursor.props
            }

        RuleList rules ->
            flatten parentSelector rules cursor

        Prop prop ->
            { cursor
                | props = prop :: cursor.props
            }


toString : Maybe String -> List Rule -> String
toString namespace rules =
    flatten Root rules empty
        |> .rules
        |> List.map (ruleToString namespace)
        |> String.join "\n\n"


ruleToString : Maybe String -> CompiledRule -> String
ruleToString namespace (Compiled selector props) =
    let
        renderedProps =
            renderProps props ""
    in
    selectorToString namespace selector ++ " {\n" ++ renderedProps ++ "}"


renderProps : List Property -> String -> String
renderProps props rendered =
    case props of
        [] ->
            rendered

        NoProp :: rest ->
            renderProps rest rendered

        prop :: rest ->
            renderProps rest (rendered ++ "  " ++ propToString prop ++ "\n")


selectorToString : Maybe String -> Selector -> String
selectorToString maybeNamespace selector =
    case selector of
        Root ->
            ""

        Class name ->
            "." ++ withNamespace maybeNamespace name

        Id name ->
            "#" ++ withNamespace maybeNamespace name

        Pseudo pseudo inner ->
            selectorToString maybeNamespace inner ++ ":" ++ pseudoToString pseudo

        Child parent child ->
            selectorToString maybeNamespace parent ++ " > " ++ selectorToString maybeNamespace child

        AllChildren parent child ->
            selectorToString maybeNamespace parent ++ " " ++ selectorToString maybeNamespace child

        After inner ->
            selectorToString maybeNamespace inner ++ "::after"

        Before inner ->
            selectorToString maybeNamespace inner ++ "::before"


withNamespace : Maybe String -> String -> String
withNamespace maybeNamespace name =
    case maybeNamespace of
        Just namespace ->
            namespace ++ "-" ++ name

        Nothing ->
            name


pseudoToString : PseudoClass -> String
pseudoToString pseudo =
    case pseudo of
        Active ->
            "active"

        Focus ->
            "focus"

        Hover ->
            "hover"


propToString : Property -> String
propToString prop =
    case prop of
        Color key clr ->
            key ++ ": " ++ Color.toCssString clr ++ ";"

        Str key value ->
            key ++ ": " ++ value ++ ";"

        NoProp ->
            ""
