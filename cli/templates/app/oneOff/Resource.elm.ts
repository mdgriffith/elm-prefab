

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
  return makeReplacements(replacements, "module Resource.{{name}} exposing\n    ( resource\n    , Model, Msg(..)\n    )\n\n{-|\n\n@docs resource\n\n@docs Model, Msg\n\n-}\n\nimport App.Resource\nimport Effect\nimport Json.Decode\nimport Json.Encode\nimport Listen\n\n\ntype alias Model =\n    {}\n\n\ntype Msg\n    = ReplaceMe\n\n\nresource : App.Resource.Resource Msg Model\nresource =\n    App.Resource.resource\n        { init =\n            \\flags url maybeCachedModel ->\n                let\n                    model =\n                        -- `maybeCachedModel` is the model from localstorage\n                        -- If `App.Resource.withLocalStorage` is defined\n                        -- and it's available\n                        maybeCachedModel\n                            |> Maybe.withDefault\n                                {}\n                in\n                ( model\n                , Effect.none\n                )\n        , update =\n            \\msg model ->\n                ( model, Effect.none )\n        , subscriptions = \\_ -> Listen.none\n        }\n        |> App.Resource.withLocalStorage\n            { decoder = decoder\n            , encode = encode\n            }\n\n\nencode : Model -> Json.Encode.Value\nencode model =\n    Json.Encode.object []\n\n\ndecoder : Json.Decode.Decoder Model\ndecoder =\n    Json.Decode.succeed {}\n")
}
