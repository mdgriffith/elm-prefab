module Press.Generate exposing (Error, decode, errorToDetails, generate)

{-| Press generates the minimal amount needed to have a working app.

The goal is to generate pieces that you can integrate into an existing Elm app.

List of things to generate

1.  The directory of all source files used to generate stuff.
    This can be used to show a sidebar r a directory of all informations.

2.  A route parser and encoder.

3.  Files for each markdown file.

It will also generate a full app for you??

-}

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Elm.Op
import Gen.App.Markdown
import Gen.App.State
import Gen.AppUrl
import Gen.Browser
import Gen.Browser.Navigation
import Gen.Dict
import Gen.Html
import Gen.Http
import Gen.Json.Encode
import Gen.List
import Gen.Markdown.Parser
import Gen.Markdown.Renderer
import Gen.Platform.Cmd
import Gen.Platform.Sub
import Gen.String
import Gen.Tuple
import Gen.Url
import Gen.Url.Parser
import Gen.Url.Parser.Query
import Json.Decode
import Markdown.Block as Block
import Markdown.Parser
import Parser exposing ((|.), (|=))
import Path
import Press.Generate.Directory
import Press.Generate.Engine
import Press.Generate.PageId
import Press.Generate.Regions
import Press.Model exposing (..)
import Set exposing (Set)



{- GENERATES -}


type Error
    = RouteCollision
        { base : Press.Model.Page
        , collisions : List Press.Model.UrlPattern
        }


errorToDetails : Error -> { title : String, description : String }
errorToDetails error =
    case error of
        RouteCollision collision ->
            { title = "Route collision"
            , description = ""
            }


generate : Options -> Result (List Error) (List Elm.File)
generate options =
    Ok
        [ Press.Generate.PageId.generate options
        , Press.Generate.Regions.generate options
        , Press.Generate.Engine.generate options

        -- :: Press.Generate.Route.generate options.pages
        -- :: Press.Generate.Directory.generate options.pages
        ]


validateRoutes : List Page -> List Error
validateRoutes pages =
    List.concatMap (validatePageRoutes pages) pages


validatePageRoutes : List Page -> Page -> List Error
validatePageRoutes allPages page =
    let
        otherRoutes =
            allPages
                |> List.filter (\p -> p.id /= page.id)
                |> List.concatMap Press.Model.getRoutes
    in
    case List.filter (Press.Model.hasCollisions page.url) otherRoutes of
        [] ->
            []

        collisions ->
            [ RouteCollision
                { base = page
                , collisions = collisions
                }
            ]



{- Decode source data -}


type alias Options =
    Press.Model.Model


decode : Json.Decode.Decoder Options
decode =
    Json.Decode.map2 Press.Model.Model
        (Json.Decode.field "regions" Press.Model.decodeViewRegions)
        (Json.Decode.field "pageUsages" Press.Model.decodePageUsages)
