module Ref exposing
    ( Id
    , Ref
    , fromModule
    , fromPackage
    )

import Elm.Docs


type alias Ref =
    { id : Id
    , source : Source
    , block : Elm.Docs.Block
    }


type Id
    = Id String


type Source
    = FromModule
        { moduleName : String
        }
    | FromPackage
        { moduleName : String
        , package : String
        }


fromModule : String -> Elm.Docs.Block -> Ref
fromModule moduleName block =
    let
        src =
            FromModule { moduleName = moduleName }
    in
    { id = toId src block
    , source = src
    , block = block
    }


fromPackage : String -> String -> Elm.Docs.Block -> Ref
fromPackage package moduleName block =
    let
        src =
            FromPackage
                { moduleName = moduleName
                , package = package
                }
    in
    { id = toId src block
    , source = src
    , block = block
    }


toId : Source -> Elm.Docs.Block -> Id
toId source block =
    let
        blockId =
            blockToIdString block
    in
    case source of
        FromModule { moduleName } ->
            Id (moduleName ++ ":" ++ blockId)

        FromPackage { moduleName, package } ->
            Id (package ++ ":" ++ moduleName ++ ":" ++ blockId)


blockToIdString : Elm.Docs.Block -> String
blockToIdString block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            markdown

        Elm.Docs.UnionBlock details ->
            details.name

        Elm.Docs.AliasBlock details ->
            details.name

        Elm.Docs.ValueBlock details ->
            details.name

        Elm.Docs.BinopBlock details ->
            details.name

        Elm.Docs.UnknownBlock text ->
            text
