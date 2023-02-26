module Press.Generate exposing (decode, generate)

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
import Elm.Op
import Gen.Url.Parser
import Json.Decode
import Path



{- Decode source data -}


type alias SourceDirectory =
    { base : String
    , files : List Source
    }


type alias Source =
    { path : String
    , contents : String
    }


decode : Json.Decode.Decoder SourceDirectory
decode =
    Json.Decode.map2 SourceDirectory
        (Json.Decode.field "base" Json.Decode.string)
        (Json.Decode.field "files" (Json.Decode.list decodeSource))


decodeSource : Json.Decode.Decoder Source
decodeSource =
    Json.Decode.map2 Source
        (Json.Decode.field "path" Json.Decode.string)
        (Json.Decode.field "contents" Json.Decode.string)



{- GENERATES -}


generate : SourceDirectory -> List Elm.File
generate source =
    generateDirectory source :: generatePages source


generateDirectory : SourceDirectory -> Elm.File
generateDirectory ({ base, files } as source) =
    Elm.file [ "Directory" ]
        (List.concat
            [ routeType source
            , urlEncoder source
            , urlParser source
            ]
        )


toRoutePieces : String -> String -> Maybe (List String)
toRoutePieces base filepath =
    let
        ( relativePath, ext ) =
            Path.relative base filepath
                |> Path.extension
    in
    if ext == "md" || ext == "markdown" then
        let
            pieces =
                relativePath
                    |> String.split "/"
                    |> List.map toElmTypeName
                    |> List.filter (not << String.isEmpty)
        in
        Just pieces

    else
        Nothing


routeType : SourceDirectory -> List Elm.Declaration
routeType { base, files } =
    [ Elm.customType "Route"
        (List.filterMap
            (\file ->
                case toRoutePieces base file.path of
                    Nothing ->
                        Nothing

                    Just [] ->
                        Nothing

                    Just pieces ->
                        Just
                            (Elm.variantWith
                                (String.join "" pieces)
                                []
                            )
            )
            files
        )
        |> Elm.expose
    ]


urlEncoder : SourceDirectory -> List Elm.Declaration
urlEncoder { base, files } =
    let
        variants =
            files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                Just ( file, pieces )
                    )
    in
    [ Elm.declaration "toUrl"
        (Elm.fn ( "route", Just (Type.named [] "Route") )
            (\route ->
                Elm.Case.custom route
                    (Type.named [] "Route")
                    (variants
                        |> List.map
                            (\( file, pieces ) ->
                                Elm.Case.branch0 (String.join "" pieces)
                                    (Elm.string (String.join "/" pieces))
                            )
                    )
            )
        )
        |> Elm.expose
    ]


urlParser : SourceDirectory -> List Elm.Declaration
urlParser { base, files } =
    [ Elm.declaration "parser"
        (Gen.Url.Parser.oneOf
            (files
                |> List.filterMap
                    (\file ->
                        case toRoutePieces base file.path of
                            Nothing ->
                                Nothing

                            Just pieces ->
                                Just ( file, pieces )
                    )
                |> List.map
                    (\( file, pieces ) ->
                        let
                            typename =
                                String.join "" pieces
                                    |> Elm.val
                        in
                        Gen.Url.Parser.map typename
                            (toUrlParser pieces)
                    )
            )
            |> Elm.withType
                (Gen.Url.Parser.annotation_.parser
                    (Type.function
                        [ Type.named [] "Route"
                        ]
                        (Type.var "a")
                    )
                    (Type.var "a")
                )
        )
        |> Elm.expose
    ]


toUrlParser pieces =
    case pieces of
        [] ->
            Gen.Url.Parser.top

        top :: [] ->
            Gen.Url.Parser.s top

        top :: remaining ->
            Elm.Op.slash
                (Gen.Url.Parser.s top)
                (toUrlParser remaining)


toElmTypeName : String -> String
toElmTypeName source =
    source
        |> String.split "-"
        |> List.map capitalize
        |> String.join ""


capitalize : String -> String
capitalize str =
    case String.uncons str of
        Nothing ->
            str

        Just ( first, tail ) ->
            String.fromChar (Char.toUpper first) ++ tail



{- GENERATE PAGES -}


generatePages : SourceDirectory -> List Elm.File
generatePages { base, files } =
    List.filterMap
        (generatePage base)
        files


generatePage base file =
    case toRoutePieces base file.path of
        Nothing ->
            Nothing

        Just pieces ->
            Just
                (Elm.file ("Page" :: pieces)
                    [ Elm.declaration "route"
                        (Elm.value
                            { importFrom = [ "Route" ]
                            , name = String.join "" pieces
                            , annotation = Just (Type.named [ "Route" ] "Route")
                            }
                        )
                        |> Elm.expose
                    , Elm.declaration "source"
                        (Elm.string file.contents)
                    ]
                )
