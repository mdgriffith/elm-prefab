

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
  return makeReplacements(replacements, "module Resource.{{name}} exposing\n    ( resource\n    , Model, Msg(..)\n    )\n\n{-|\n\n@docs resource\n\n@docs Model, Msg\n\n-}\n\nimport App.Resource\nimport Effect\nimport Listen\n\ntype alias Model =\n    {}\n\n\ntype Msg\n    = ReplaceMe\n\n\nresource : App.Resource.Resource Msg Model\nresource =\n    App.Resource.resource\n        { init =\n            \\flags url maybeCachedModel ->\n                ( { cached\n                    | apiUrl = apiUrl\n                  }\n                , Effect.none\n                )\n        , update =\n            \\msg model ->\n                ( model, Effect.none )\n        , subscriptions = \\_ -> Listen.none\n        }\n")
}
