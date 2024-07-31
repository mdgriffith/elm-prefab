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
import Generate.Route
import Options.App
import Parser exposing ((|.), (|=))
import Press.Generate.Engine
import Press.Model exposing (..)


type alias Error =
    Generate.Route.Error


errorToDetails : Error -> { title : String, description : String }
errorToDetails error =
    Generate.Route.errorToDetails error


generate : Options.App.Options -> Result (List Error) (List Elm.File)
generate options =
    let
        routes =
            List.filterMap .route options.pages

        pages =
            List.map populateParamType options.pages
    in
    case Generate.Route.generate routes of
        Err err ->
            Err err

        Ok routeFile ->
            Ok
                (Press.Generate.Engine.generate options.resources pages
                    :: generatePageId options.pages
                    :: routeFile
                    :: generateResources options.resources
                )


populateParamType : Options.App.PageUsage -> Options.App.PageUsage
populateParamType page =
    { page | paramType = Just (page.id ++ "_Params") }


generateResources : List Options.App.Resource -> List Elm.File
generateResources resources =
    [ Elm.file [ "App", "Resources" ]
        [ Elm.alias "Resources"
            (Type.record
                (List.map
                    (\resource ->
                        ( resource.id
                        , Type.named [ "Resource", resource.id ] "Model"
                        )
                    )
                    resources
                )
            )
        ]
    ]


generatePageId : List Options.App.PageUsage -> Elm.File
generatePageId pageUsages =
    let
        pageIdType =
            Elm.customType "Id"
                (List.filterMap
                    (\page ->
                        if page.urlOnly then
                            Nothing

                        else
                            Just
                                (Elm.variantWith page.id [ Type.named [] (page.id ++ "_Params") ])
                    )
                    pageUsages
                )

        paramAliases =
            List.filterMap
                (\page ->
                    if page.urlOnly then
                        Nothing

                    else
                        Just <|
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
