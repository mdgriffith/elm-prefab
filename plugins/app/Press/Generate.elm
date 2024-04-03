module Press.Generate exposing
    ( Error
    , errorToDetails
    , generate
    )

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
import Generate.Route
import Json.Decode
import Markdown.Block as Block
import Markdown.Parser
import Options.App
import Parser exposing ((|.), (|=))
import Path
import Press.Generate.Engine
import Press.Generate.Regions
import Press.Model exposing (..)
import Set exposing (Set)


type alias Error =
    Generate.Route.Error


errorToDetails : Error -> { title : String, description : String }
errorToDetails error =
    Generate.Route.errorToDetails error


generate : List Options.App.PageUsage -> Result (List Error) (List Elm.File)
generate pageUsages =
    let
        routes =
            List.filterMap .route pageUsages

        pages =
            List.map populateParamType pageUsages
    in
    case Generate.Route.generate routes of
        Err err ->
            Err err

        Ok routeFile ->
            Ok
                [ Press.Generate.Engine.generate pages
                , generatePageId pageUsages
                , routeFile
                ]


populateParamType : Options.App.PageUsage -> Options.App.PageUsage
populateParamType page =
    { page | paramType = Just (page.id ++ "_Params") }


generatePageId : List Options.App.PageUsage -> Elm.File
generatePageId pageUsages =
    let
        pageIdType =
            Elm.customType "Id"
                (List.map
                    (\page ->
                        Elm.variantWith page.id [ Type.named [] (page.id ++ "_Params") ]
                    )
                    pageUsages
                )

        paramAliases =
            List.map
                (\page ->
                    case page.route of
                        Nothing ->
                            Elm.alias
                                (page.id ++ "_Params")
                                (Type.record [])

                        Just parsedRoute ->
                            case Generate.Route.checkForErrors [ parsedRoute ] of
                                Err _ ->
                                    Elm.alias
                                        (page.id ++ "_Params")
                                        (Type.record [])

                                Ok [ route ] ->
                                    Elm.alias
                                        (page.id ++ "_Params")
                                        (Type.named [ "App", "Route" ] (page.id ++ "_Params"))

                                _ ->
                                    Elm.alias
                                        (page.id ++ "_Params")
                                        (Type.record [])
                )
                pageUsages

        fromRoute =
            Elm.declaration "fromRoute"
                (Elm.fn
                    ( "route", Just (Type.named [ "App", "Route" ] "Route") )
                    (\route ->
                        Elm.Case.custom route
                            (Type.named [ "App", "Route" ] "Route")
                            (List.filterMap
                                (\page ->
                                    case page.route of
                                        Nothing ->
                                            Nothing

                                        Just parsedRoute ->
                                            case Generate.Route.checkForErrors [ parsedRoute ] of
                                                Err _ ->
                                                    Nothing

                                                Ok [ pageRoute ] ->
                                                    Just
                                                        (Elm.Case.branch1 pageRoute.id
                                                            ( "params", Type.named [ "App", "Route" ] (pageRoute.id ++ "_Params") )
                                                            (\params ->
                                                                if page.urlOnly then
                                                                    Elm.nothing

                                                                else
                                                                    Elm.apply
                                                                        (Elm.val pageRoute.id)
                                                                        [ params ]
                                                                        |> Elm.just
                                                            )
                                                        )

                                                _ ->
                                                    Nothing
                                )
                                pageUsages
                            )
                            |> Elm.withType (Type.maybe (Type.named [] "Id"))
                    )
                )
    in
    Elm.file
        [ "App", "Page", "Id" ]
        (pageIdType :: fromRoute :: paramAliases)
