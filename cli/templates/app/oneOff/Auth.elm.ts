

function makeReplacements(replacements: Map<string, string>, source: string): string {
  let result = source;

  replacements.forEach((value, key) => {
      // Use a global regular expression for replacement
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, value);
  });

  return result;
}

export const toBody = (replacements: Map<string, string>) => {
  return makeReplacements(replacements, "module Resource.Auth exposing\n    ( resource, isAuthenticated\n    , Authenticated(..), Model, Msg(..)\n    )\n\n{-|\n\n@docs resource, isAuthenticated\n\n@docs Authenticated, Model, Msg\n\n-}\n\nimport App.Resource\nimport Broadcast\nimport Effect\nimport Json.Decode as Decode\nimport Json.Encode as Encode\nimport Listen\nimport Time\nimport Url.Parser exposing ((<?>))\n\n\nisAuthenticated : Model -> Bool\nisAuthenticated model =\n    case model.authenticated of\n        Authenticated _ ->\n            True\n\n        Unauthenticated ->\n            False\n\n\ntype alias Model =\n    { apiUrl : String\n    , authenticated : Authenticated\n    }\n\n\ntype Authenticated\n    = Authenticated\n        { tokens : Tokens\n        }\n    | Unauthenticated\n\n\ntype alias Tokens =\n    { refresh : String\n    , access : String\n    , expiresAt : Time.Posix\n    }\n\n\ntype Msg\n    = LogOut\n    | AuthenticationReceived Tokens\n\n\nresource : App.Resource.Resource Msg Model\nresource =\n    App.Resource.resource\n        { init =\n            \\flags url maybeCachedModel ->\n                let\n                    apiUrl =\n                        case Decode.decodeValue (Decode.field \"apiUrl\" Decode.string) flags of\n                            Err _ ->\n                                \"\"\n\n                            Ok foundApiUrl ->\n                                foundApiUrl\n                in\n                case maybeCachedModel of\n                    Just cached ->\n                        ( { cached\n                            | apiUrl = apiUrl\n                          }\n                        , Effect.none\n                        )\n\n                    Nothing ->\n                        ( { apiUrl = apiUrl\n                          , authenticated = Unauthenticated\n                          }\n                        , Effect.none\n                        )\n        , update =\n            \\msg model ->\n                case msg of\n                    AuthenticationReceived tokens ->\n                        ( { model\n                            | authenticated =\n                                Authenticated\n                                    { tokens = tokens\n                                    }\n                          }\n                        , Effect.none\n                        )\n\n                    LogOut ->\n                        ( { model\n                            | authenticated = Unauthenticated\n                          }\n                        , Effect.none\n                        )\n        , subscriptions = \\_ -> Listen.none\n        }\n        -- Persist the modle to local storage\n        |> App.Resource.withLocalStorage\n            { decoder = decoder\n            , encode = encode\n            }\n\n\n\n{- JSON encoders and decoders.\n\n   These is used to serialize and deserialize the model to and from JSON.\n\n-}\n\n\nencode : Model -> Encode.Value\nencode model =\n    Encode.object\n        [ ( \"apiUrl\", Encode.string model.apiUrl )\n        , ( \"authenticated\", encodeAuthenticated model.authenticated )\n        ]\n\n\nencodeAuthenticated : Authenticated -> Encode.Value\nencodeAuthenticated authenticated =\n    case authenticated of\n        Authenticated { tokens } ->\n            Encode.object\n                [ ( \"tokens\"\n                  , encodeTokens tokens\n                  )\n                ]\n\n        Unauthenticated ->\n            Encode.null\n\n\nencodeTokens : Tokens -> Encode.Value\nencodeTokens tokens =\n    Encode.object\n        [ ( \"refresh\", Encode.string tokens.refresh )\n        , ( \"access\", Encode.string tokens.access )\n        , ( \"expiresAt\", Encode.int (Time.posixToMillis tokens.expiresAt) )\n        ]\n\n\ndecoder : Decode.Decoder Model\ndecoder =\n    Decode.map2\n        (\\apiUrl auth ->\n            { apiUrl = apiUrl\n            , authenticated = auth\n            }\n        )\n        (Decode.field \"apiUrl\" Decode.string)\n        (Decode.field \"authenticated\" decodeAuthenticated)\n\n\ndecodeAuthenticated : Decode.Decoder Authenticated\ndecodeAuthenticated =\n    Decode.oneOf\n        [ Decode.map\n            (\\tokens ->\n                Authenticated\n                    { tokens = tokens\n                    }\n            )\n            (Decode.field \"tokens\" decodeTokens)\n        , Decode.succeed Unauthenticated\n        ]\n\n\ndecodeTokens : Decode.Decoder Tokens\ndecodeTokens =\n    Decode.map3 Tokens\n        (Decode.field \"refresh\" Decode.string)\n        (Decode.field \"access\" Decode.string)\n        (Decode.field \"expiresAt\" (Decode.map Time.millisToPosix Decode.int))\n")
}