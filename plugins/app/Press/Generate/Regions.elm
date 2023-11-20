module Press.Generate.Regions exposing (generate)

import Elm
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
    in
    Elm.fileWith [ "App", "View", "Regions", "Id" ]
        { docs = List.map Elm.docs
        , aliases = []
        }
        [ Elm.customType "Id"
            (primary
                :: otherRegions
            )
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        ]
