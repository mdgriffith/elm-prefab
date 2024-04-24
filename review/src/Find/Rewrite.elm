module Find.Rewrite exposing (remove, replace)

{-| -}

import Elm
import Elm.Syntax.Range exposing (Range)
import Elm.ToString
import Review.Fix exposing (Fix)


remove : Range -> Fix
remove range =
    Review.Fix.removeRange range


replace : Range -> Elm.Expression -> Fix
replace range expression =
    Review.Fix.replaceRangeBy range (Elm.ToString.expression expression |> .body)
