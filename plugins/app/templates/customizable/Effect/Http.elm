module Effect.Http exposing
    ( get, request
    , expectString, expectStringResponse, expectJson, expectBytes, expectWhatever
    )

{-|


# Http

@docs get, request

@docs Expect, expectString, expectStringResponse, expectJson, expectBytes, expectWhatever

-}

import Bytes.Decode
import Effect
import Http
import Json.Decode


type alias Expect msg =
    Effect.Expect


get : String -> Expect msg -> Effect msg
get url expect =
    request
        { method = "GET"
        , headers = []
        , url = Effect.TargetUrl url
        , body = Http.emptyBody
        , expect = expect
        , timeout = Nothing
        , tracker = Nothing
        }


request :
    { method : String
    , headers : List Http.Header
    , url : Effect.HttpTarget
    , body : Http.Body
    , expect : Expect msg
    , timeout : Maybe Float
    , tracker : Maybe String
    }
    -> Effect msg
request options =
    HttpRequest options


expectString : (Result Http.Error String -> msg) -> Expect msg
expectString =
    ExpectString


{-| When you need more control over the error handling
-}
expectStringResponse : (Http.Response String -> msg) -> Expect msg
expectStringResponse =
    ExpectStringResponse


expectJson : Json.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg
expectJson =
    ExpectJson


expectBytes : Bytes.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg
expectBytes =
    ExpectBytes


expectWhatever : (Result Http.Error () -> msg) -> Expect msg
expectWhatever =
    ExpectWhatever
