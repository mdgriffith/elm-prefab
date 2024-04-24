module Find exposing
    ( rule, extract
    , functionCall, value, typeDefinition
    , Like, equals, startsWith, contains, endsWith
    )

{-|

    Find.rule
        { name = "MyRule"
        , init = {}
        , queries =
            [ myQuery
            ]
        }


    myQuery =
        Find.functionCall
            { named = Find.startsWith "map"
            , moduleName = Find.startsWith [ "Data" ]
            , onFind =
                (\range args data ->
                    ( data
                    , [ newError ]
                    )
                )
            }


## Finders

@docs rule, extract

@docs functionCall, value, typeDefinition

@docs Like, equals, startsWith, contains, endsWith

@docs Error

-}

import Dict exposing (Dict)
import Elm.Syntax.Declaration as Declaration exposing (Declaration)
import Elm.Syntax.Expression as Expression exposing (Expression, FunctionImplementation, RecordSetter)
import Elm.Syntax.ModuleName exposing (ModuleName)
import Elm.Syntax.Node as Node exposing (Node(..))
import Elm.Syntax.Pattern as Pattern
import Elm.Syntax.Range exposing (Range)
import Elm.Syntax.Type as Type
import Json.Encode
import Review.ModuleNameLookupTable as Lookup
import Review.Rule
import Set exposing (Set)


{-| -}
functionCall :
    { moduleName : Like (List String)
    , name : Like String
    , onFind :
        List String
        -> Range
        -> String
        -> List Expression.Expression
        -> gathered
        -> ( gathered, List Error )
    }
    -> Query gathered
functionCall params =
    Query
        { fromModule = params.moduleName
        , withinModule = Any
        , named = params.name
        , onFind = FunctionCall params.onFind
        }


{-| -}
value :
    { moduleName : Like (List String)
    , name : Like String
    , onFind : List String -> Range -> String -> gathered -> ( gathered, List Error )
    }
    -> Query gathered
value params =
    Query
        { fromModule = params.moduleName
        , withinModule = Any
        , named = params.name
        , onFind = ValueFrom params.onFind
        }


{-| -}
typeDefinition :
    { moduleName : Like (List String)
    , name : Like String
    , onFind : List String -> Range -> Type.Type -> gathered -> ( gathered, List Error )
    }
    -> Query gathered
typeDefinition params =
    Query
        { fromModule = Any
        , withinModule = params.moduleName
        , named = params.name
        , onFind = TypeDefinition params.onFind
        }


type alias Error =
    Review.Rule.Error {}


type Query gathered
    = Query
        { fromModule : Like (List String)
        , withinModule : Like (List String)
        , named : Like String
        , onFind : OnFind gathered
        }


type OnFind gathered
    = FunctionCall
        (List String
         -> Range
         -> String
         -> List Expression.Expression
         -> gathered
         -> ( gathered, List Error )
        )
    | ValueFrom
        (List String
         -> Range
         -> String
         -> gathered
         -> ( gathered, List Error )
        )
    | TypeDefinition
        (List String
         -> Range
         -> Type.Type
         -> gathered
         -> ( gathered, List Error )
        )


type Like value
    = StartsWith value
    | Contains value
    | EndsWith value
    | Equals value
    | Any


startsWith : value -> Like value
startsWith =
    StartsWith


contains : value -> Like value
contains =
    Contains


endsWith : value -> Like value
endsWith =
    EndsWith


equals : value -> Like value
equals =
    Equals


{-| -}
rule :
    { ruleName : String
    , init : gathered
    }
    -> List (Query gathered)
    -> Review.Rule.Rule
rule options queries =
    Review.Rule.newProjectRuleSchema options.ruleName { gathered = Dict.empty }
        |> Review.Rule.withModuleVisitor (Review.Rule.withDeclarationEnterVisitor (findQueries queries))
        |> Review.Rule.withModuleContextUsingContextCreator
            { fromProjectToModule = fromProjectToModule options.init
            , fromModuleToProject = fromModuleToProject
            , foldProjectContexts = foldProjectContexts
            }
        |> Review.Rule.fromProjectRuleSchema


{-| -}
extract :
    { ruleName : String
    , init : gathered
    , toJson : Dict ModuleName gathered -> Json.Encode.Value
    }
    -> List (Query gathered)
    -> Review.Rule.Rule
extract options queries =
    Review.Rule.newProjectRuleSchema options.ruleName { gathered = Dict.empty }
        |> Review.Rule.withModuleVisitor (Review.Rule.withDeclarationEnterVisitor (findQueries queries))
        |> Review.Rule.withModuleContextUsingContextCreator
            { fromProjectToModule = fromProjectToModule options.init
            , fromModuleToProject = fromModuleToProject
            , foldProjectContexts = foldProjectContexts
            }
        |> Review.Rule.withDataExtractor (.gathered >> options.toJson)
        |> Review.Rule.fromProjectRuleSchema


type alias ModuleName =
    List String


type alias Project gathered =
    { gathered : Dict ModuleName gathered
    }


type alias Module gathered =
    { lookupTable : Lookup.ModuleNameLookupTable
    , moduleName : ModuleName
    , gathered : gathered
    }


fromModuleToProject : Review.Rule.ContextCreator (Module gathered) (Project gathered)
fromModuleToProject =
    Review.Rule.initContextCreator
        (\{ moduleName, gathered } ->
            { gathered = Dict.insert moduleName gathered Dict.empty
            }
        )


fromProjectToModule : gathered -> Review.Rule.ContextCreator (Project gathered) (Module gathered)
fromProjectToModule initModule =
    Review.Rule.initContextCreator
        (\lookupTable moduleName _ ->
            { lookupTable = lookupTable
            , moduleName = moduleName
            , gathered = initModule
            }
        )
        |> Review.Rule.withModuleNameLookupTable
        |> Review.Rule.withModuleName


foldProjectContexts : Project gathered -> Project gathered -> Project gathered
foldProjectContexts l r =
    { gathered = Dict.union l.gathered r.gathered
    }


likeList : Like (List String) -> List String -> Bool
likeList like list =
    case like of
        StartsWith prefix ->
            startsWithList prefix list

        Contains item ->
            containsList item list False

        EndsWith suffix ->
            let
                suffixLength =
                    List.length suffix

                valueLength =
                    List.length list
            in
            if suffixLength > valueLength then
                False

            else
                List.drop (valueLength - suffixLength) list == suffix

        Equals exact ->
            list == exact

        Any ->
            True


containsList : List String -> List String -> Bool -> Bool
containsList inner list capturing =
    case inner of
        [] ->
            True

        i :: is ->
            case list of
                [] ->
                    False

                v :: vs ->
                    if i == v && not capturing then
                        containsList is vs True

                    else if i == v && capturing then
                        containsList is vs True

                    else if capturing then
                        False

                    else
                        containsList inner vs False


startsWithList : List String -> List String -> Bool
startsWithList prefix list =
    case prefix of
        [] ->
            True

        p :: ps ->
            case list of
                [] ->
                    False

                v :: vs ->
                    if p == v then
                        startsWithList ps vs

                    else
                        False


likeString : Like String -> String -> Bool
likeString like str =
    case like of
        StartsWith prefix ->
            String.startsWith prefix str

        Contains inner ->
            String.contains inner str

        EndsWith suffix ->
            String.endsWith suffix str

        Equals exact ->
            str == exact

        Any ->
            True



{- QUERY EXECUTOR -}


findQueries :
    List (Query gathered)
    -> Node Declaration
    -> Module gathered
    -> ( List Error, Module gathered )
findQueries query declaration gathered =
    case Node.value declaration of
        Declaration.FunctionDeclaration function ->
            let
                funDecl : FunctionImplementation
                funDecl =
                    Node.value function.declaration
            in
            expressionVisitor query Dict.empty ( [], gathered ) funDecl.expression

        Declaration.CustomTypeDeclaration tipe ->
            List.foldl
                (\(Query q) (( errs, modGathered ) as untouched) ->
                    case q.onFind of
                        FunctionCall _ ->
                            untouched

                        ValueFrom _ ->
                            untouched

                        TypeDefinition onFind ->
                            if likeList q.fromModule gathered.moduleName && likeString q.named (Node.value tipe.name) then
                                let
                                    ( newGathered, newErrors ) =
                                        onFind gathered.moduleName
                                            (Node.range declaration)
                                            tipe
                                            modGathered.gathered
                                in
                                ( errs ++ newErrors
                                , { modGathered
                                    | gathered = newGathered
                                  }
                                )

                            else
                                untouched
                )
                ( [], gathered )
                query

        _ ->
            ( [], gathered )


expressionVisitor :
    List (Query gathered)
    -> Dict String (Node Expression)
    -> ( List Error, Module gathered )
    -> Node Expression
    -> ( List Error, Module gathered )
expressionVisitor query letEnv context expression =
    let
        foldVisit_ =
            foldVisit query letEnv context
    in
    case Node.value expression of
        Expression.Application exprs ->
            case List.map Node.value exprs of
                [] ->
                    context

                (Expression.FunctionOrValue modName name) :: args ->
                    let
                        gathered =
                            List.foldl
                                (\(Query q) (( errs, modGathered ) as untouched) ->
                                    case q.onFind of
                                        FunctionCall onFind ->
                                            if likeList q.fromModule modName && likeString q.named name then
                                                let
                                                    ( newGathered, newErrors ) =
                                                        onFind modName
                                                            (Node.range expression)
                                                            name
                                                            args
                                                            modGathered.gathered
                                                in
                                                ( errs ++ newErrors
                                                , { modGathered
                                                    | gathered = newGathered
                                                  }
                                                )

                                            else
                                                untouched

                                        ValueFrom _ ->
                                            untouched

                                        TypeDefinition _ ->
                                            untouched
                                )
                                context
                                query
                    in
                    foldVisit query letEnv gathered exprs

                _ ->
                    foldVisit_ exprs

        Expression.IfBlock cond ifTrue ifFalse ->
            foldVisit_ [ cond, ifTrue, ifFalse ]

        Expression.OperatorApplication "<|" _ l r ->
            foldVisit_ [ l, r ]

        Expression.OperatorApplication _ _ l r ->
            foldVisit_ [ l, r ]

        Expression.TupledExpression exprs ->
            foldVisit_ exprs

        Expression.ListExpr exprs ->
            foldVisit_ exprs

        Expression.ParenthesizedExpression e ->
            expressionVisitor query letEnv context e

        Expression.Negation e ->
            expressionVisitor query letEnv context e

        Expression.RecordAccess e _ ->
            expressionVisitor query letEnv context e

        Expression.LambdaExpression l ->
            expressionVisitor query letEnv context l.expression

        Expression.LetExpression letBlock ->
            let
                expressions : List (Node Expression)
                expressions =
                    List.map
                        (\declaration ->
                            case Node.value declaration of
                                Expression.LetDestructuring _ e ->
                                    e

                                Expression.LetFunction lf ->
                                    (Node.value lf.declaration).expression
                        )
                        letBlock.declarations

                newLetEnv : Dict String (Node Expression)
                newLetEnv =
                    List.foldl
                        (\declaration ->
                            case Node.value declaration of
                                Expression.LetFunction f ->
                                    let
                                        functionDeclaration : FunctionImplementation
                                        functionDeclaration =
                                            Node.value f.declaration
                                    in
                                    if List.isEmpty functionDeclaration.arguments then
                                        Dict.insert (Node.value functionDeclaration.name) functionDeclaration.expression

                                    else
                                        identity

                                Expression.LetDestructuring (Node _ (Pattern.VarPattern v)) e ->
                                    Dict.insert v e

                                _ ->
                                    identity
                        )
                        letEnv
                        letBlock.declarations
            in
            foldVisit query newLetEnv context (letBlock.expression :: expressions)

        Expression.RecordExpr setters ->
            foldVisit_ <| List.map (Node.value >> Tuple.second) setters

        Expression.RecordUpdateExpression _ setters ->
            foldVisit_ <| List.map (Node.value >> Tuple.second) setters

        Expression.CaseExpression caseBlock ->
            foldVisit_ <| caseBlock.expression :: List.map Tuple.second caseBlock.cases

        Expression.UnitExpr ->
            context

        Expression.FunctionOrValue modName name ->
            List.foldl
                (\(Query q) (( errs, modGathered ) as untouched) ->
                    case q.onFind of
                        FunctionCall _ ->
                            untouched

                        ValueFrom onFind ->
                            if likeList q.fromModule modName && likeString q.named name then
                                let
                                    ( newGathered, newErrors ) =
                                        onFind modName (Node.range expression) name modGathered.gathered
                                in
                                ( errs ++ newErrors
                                , { modGathered
                                    | gathered = newGathered
                                  }
                                )

                            else
                                untouched

                        TypeDefinition _ ->
                            untouched
                )
                context
                query

        Expression.PrefixOperator _ ->
            context

        Expression.Operator _ ->
            context

        Expression.Integer _ ->
            context

        Expression.Hex _ ->
            context

        Expression.Floatable _ ->
            context

        Expression.Literal _ ->
            context

        Expression.CharLiteral _ ->
            context

        Expression.RecordAccessFunction _ ->
            context

        Expression.GLSLExpression _ ->
            context


foldVisit :
    List (Query gathered)
    -> Dict String (Node Expression)
    -> ( List Error, Module gathered )
    -> List (Node Expression)
    -> ( List Error, Module gathered )
foldVisit query letEnv context expressions =
    List.foldl
        (\e contextAndErrors ->
            expressionVisitor query letEnv contextAndErrors e
        )
        context
        expressions
