

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
  return makeReplacements(replacements, "module Listen.{{name}} exposing (..)\n\n{-|\n\n\n\n-}\n\nimport Json.Decode\nimport Json.Encode\nimport Platform.Sub\nimport Sub\n\n\nport {{name_decapitalized}}Updated : (Json.Encode.Value -> msg) -> Platform.Sub.Sub msg\n\n\nlisten :\n    { key : String\n    , decoder : Json.Decode.Decoder msg\n    }\n    -> Sub.Sub msg\nlisten options =\n    Sub.OnFromJs\n        { portName = \"{{name_decapitalized}}Updated\"\n        , subscription =\n            {{name_decapitalized}}Updated\n                (Json.Decode.decodeValue options.decoder)\n        }\n")
}
