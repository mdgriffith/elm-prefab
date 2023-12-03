module Press.Generate.PageId exposing (generate)

import Elm
import Elm.Annotation as Type
import Press.Model


generate : Press.Model.Model -> Elm.File
generate options =
    generateRegionIndex options


generateRegionIndex : Press.Model.Model -> Elm.File
generateRegionIndex model =
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
            (model.pageUsages
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
