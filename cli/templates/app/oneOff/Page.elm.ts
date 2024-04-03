

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
  return makeReplacements(replacements, "module Page.{{name}} exposing\n    ( Model, Msg\n    , page\n    )\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Shared\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Html\n\n\n{-|\n\n-}\ntype alias Params =\n    App.Page.Id.{{name}}_Params\n\n\n{-| -}\ntype alias Model =\n    {}\n\n\n{-| -}\ntype Msg\n    = ReplaceMe\n\n\npage : App.Page.Page App.Shared.Shared Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : Params -> App.Shared.Shared -> Maybe Model -> App.Page.Init Msg Model\ninit params shared maybeCached =\n    App.Page.init {}\n\n\nupdate : App.Shared.Shared -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate shared msg model =\n    ( model, App.Effect.none )\n\n\nsubscriptions : App.Shared.Shared -> Model -> App.Sub.Sub Msg\nsubscriptions shared model =\n    App.Sub.none\n\n\nview : App.View.Id.Id -> App.Shared.Shared -> Model -> App.View.View Msg\nview viewId shared model =\n   { title = \"{{name}}\"\n   , body = Html.text \"{{name}}\"\n   }\n")
}
