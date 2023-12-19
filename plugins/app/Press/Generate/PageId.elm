module Press.Generate.PageId exposing (generate)

import Elm
import Elm.Annotation as Type
import Press.Model


generate : List Press.Model.PageUsage -> Elm.File
generate pageUsages =
    generateRegionIndex pageUsages


generateRegionIndex : List Press.Model.PageUsage -> Elm.File
generateRegionIndex pageUsages =
    let
        -- Useful references
        region =
            Type.named [] "Region"

        id =
            Type.named [] "Id"

        route =
            Press.Model.types.routeType
    in
    Elm.fileWith [ "App", "Page", "Id" ]
        { docs = List.map Elm.docs
        , aliases = []
        }
        [ Elm.customType "Id"
            (pageUsages
                |> List.map pageToIdVariant
            )
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        ]


pageToIdVariant : Press.Model.PageUsage -> Elm.Variant
pageToIdVariant page =
    Elm.variantWith page.id
        [ Type.named [] page.paramType
        ]
