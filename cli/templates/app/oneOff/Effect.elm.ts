

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
  return makeReplacements(replacements, "port module Effect.{{name}} exposing (send)\n\n{-| -}\n\nimport Effect\nimport Json.Encode as Json\n\n\nport {{name}} : Json.Encode.Value -> Cmd msg\n\n\nsend : String -> Json.Value -> Effect.Effect msg\nsend operation value =\n    Effect.SendToWorld\n        { toPort = {{name}}\n        , portName = \"{{name}}\"\n        , payload =\n            Json.object\n                [ ( \"operation\", Json.string operation )\n                , ( \"details\", value )\n                ]\n        }\n")
}
