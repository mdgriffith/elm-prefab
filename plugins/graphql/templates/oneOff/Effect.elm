module Effect.{{name}} exposing (query, mutation)

{-| -}

import Effect exposing (Effect)
import Effect.Http
import Json.Decode
import GraphQL.Engine
import Http
import {{name}}

query :
    { onError : GraphQL.Engine.Error -> msg
    , query : {{name}}.Query msg
    }
    -> Effect msg
query options =
    let
        { payload, decoder } =
            GraphQL.Engine.queryToTestingDetails options.query
    in
    Effect.Http.request
        { method = "POST"
        , headers = []
        , url = Effect.TargetApi
        , body = Http.jsonBody payload
        , expect = expect options.onError decoder
        , timeout = Nothing
        , tracker = Nothing
        }


mutation :
    { onError : GraphQL.Engine.Error -> msg
    , mutation : {{name}}.Mutation msg
    }
    -> Effect msg
mutation options =
    let
        { payload, decoder } =
            GraphQL.Engine.mutationToTestingDetails options.query
    in
    Effect.Http.request
        { method = "POST"
        , headers = []
        , url = Effect.TargetApi
        , body = Http.jsonBody payload
        , expect = expect options.onError decoder
        , timeout = Nothing
        , tracker = Nothing
        }


{-| -}
expect : (GraphQL.Engine.Error -> msg) -> Json.Decode.Decoder msg -> Effect.Expect msg
expect fromError decoder =
    Effect.ExpectStringResponse
        (\response ->
            case responseToResult decoder response of
                Ok data ->
                    data

                Err err ->
                    fromError err
        )


responseToResult : Json.Decode.Decoder data -> Http.Response String -> Result GraphQL.Engine.Error data
responseToResult decoder response =
    case response of
        Http.BadUrl_ url ->
            Err (GraphQL.Engine.BadUrl url)

        Http.Timeout_ ->
            Err GraphQL.Engine.Timeout

        Http.NetworkError_ ->
            Err GraphQL.Engine.NetworkError

        Http.BadStatus_ metadata responseBody ->
            Err
                (GraphQL.Engine.BadStatus
                    { status = metadata.statusCode
                    , responseBody = responseBody
                    }
                )

        Http.GoodStatus_ metadata responseBody ->
            let
                bodyDecoder =
                    Json.Decode.oneOf
                        [ Json.Decode.map2
                            (\_ errs ->
                                Err errs
                            )
                            (Json.Decode.field "data" (Json.Decode.null ()))
                            (Json.Decode.field "errors"
                                (Json.Decode.list gqlErrorDecoder)
                            )
                        , Json.Decode.field "data" decoder
                            |> Json.Decode.map Ok
                        , Json.Decode.field "errors"
                            (Json.Decode.list gqlErrorDecoder)
                            |> Json.Decode.map Err
                        ]
            in
            case Json.Decode.decodeString bodyDecoder responseBody of
                Ok (Ok success) ->
                    Ok success

                Ok (Err graphqlErrors) ->
                    Err
                        (GraphQL.Engine.ErrorField
                            { errors = graphqlErrors
                            }
                        )

                Err err ->
                    Err
                        (GraphQL.Engine.BadBody
                            { responseBody = responseBody
                            , decodingError = Json.Decode.errorToString err
                            }
                        )
