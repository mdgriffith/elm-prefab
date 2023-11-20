module Press.Generate.Regions exposing (generate)

import Elm
import Elm.Annotation as Type
import Press.Model


generate : Press.Model.Model -> Elm.File
generate options =
    generateRegionIndex options.viewRegions


generateRegionIndex : Press.Model.ViewRegions -> Elm.File
generateRegionIndex viewRegions =
    let
        primary =
            Elm.variant "Primary"

        otherRegions =
            viewRegions.regions
                |> List.map
                    (\( name, regionType ) ->
                        Elm.variant name
                    )

        idName base =
            base ++ "Id"

        primaryId =
            Elm.variant (idName "Primary")

        otherRegionIds =
            viewRegions.regions
                |> List.map
                    (\( name, regionType ) ->
                        case regionType of
                            Press.Model.One ->
                                Elm.variant (idName name)

                            Press.Model.Many ->
                                Elm.variantWith (idName name) [ Type.int ]
                    )

        -- Useful references
        region =
            Type.named [] "Region"

        id =
            Type.named [] "Id"

        route =
            Press.Model.types.routeType
    in
    Elm.fileWith [ "App", "View", "Id" ]
        { docs = List.map Elm.docs
        , aliases = []
        }
        [ Elm.customType "Region"
            (primary :: otherRegions)
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , Elm.customType "Id"
            (primaryId
                :: otherRegionIds
            )
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , Elm.customType "Operation"
            [ Elm.variantWith "Push" [ region, route ]
            , Elm.variantWith "PushTo" [ id, route ]
            , Elm.variantWith "ReplaceAt" [ id, route ]
            , Elm.variantWith "Clear" []
            , Elm.variantWith "ClearRegion" [ region ]
            , Elm.variantWith "ClearView" [ id ]
            ]
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        ]
