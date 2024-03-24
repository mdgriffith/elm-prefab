module Run exposing (..)

{-| -}

import Elm
import Gen.CodeGen.Generate as Generate
import Generate.Assets
import Generate.Route
import Json.Decode
import Options.Assets
import Options.Route
import Press.Generate
import Press.Generate.Regions
import Press.Model
import Theme
import Theme.Decoder
import Theme.Generate


type PluginRun
    = App (List Press.Model.PageUsage)
    | AppView Press.Model.ViewRegions
    | Route (List Options.Route.ParsedPage)
    | Assets (List Options.Assets.AssetGroup)
    | Theme Theme.Theme


main : Program Json.Decode.Value () ()
main =
    Generate.withFeedback
        (\flags ->
            case Json.Decode.decodeValue decodePlugin flags of
                Ok (App pageUsages) ->
                    case Press.Generate.generate pageUsages of
                        Ok output ->
                            Ok
                                { info = []
                                , files = output
                                }

                        Err errorList ->
                            Err (List.map Press.Generate.errorToDetails errorList)

                Ok (AppView viewRegions) ->
                    Ok
                        { info = []
                        , files = [ Press.Generate.Regions.generate viewRegions ]
                        }

                Ok (Route routes) ->
                    case Generate.Route.generate routes of
                        Ok file ->
                            Ok
                                { info = []
                                , files = [ file ]
                                }

                        Err errors ->
                            Err
                                (List.map
                                    Generate.Route.errorToDetails
                                    errors
                                )

                Ok (Assets assets) ->
                    Ok
                        { info = []
                        , files = Generate.Assets.generate assets
                        }

                Ok (Theme theme) ->
                    Ok
                        { info = []
                        , files = Theme.Generate.generate theme
                        }

                Err errors ->
                    Err
                        [ { title = "Error decoding flags"
                          , description = Json.Decode.errorToString errors
                          }
                        ]
        )


decodePlugin : Json.Decode.Decoder PluginRun
decodePlugin =
    Json.Decode.oneOf
        [ Json.Decode.field "app" (Json.Decode.map App Press.Model.decodePageUsages)
        , Json.Decode.field "app-view" (Json.Decode.map AppView Press.Model.decodeViewRegions)
        , Json.Decode.field "routes" (Json.Decode.map Route (Json.Decode.list Options.Route.decodePage))
        , Json.Decode.field "assets" (Json.Decode.map Assets (Json.Decode.list Options.Assets.decodeAssetGroup))
        , Json.Decode.field "theme" (Json.Decode.map Theme Theme.Decoder.decode)
        ]
