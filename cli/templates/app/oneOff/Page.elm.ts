

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
  return makeReplacements(replacements, "module Page.{{name}} exposing\n    ( Model, Msg\n    , page\n    )\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Resources\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Html\n\n\n{-|\n\n-}\ntype alias Params =\n    App.Page.Id.{{name}}_Params\n\n\n{-| -}\ntype alias Model =\n    {}\n\n\n{-| -}\ntype Msg\n    = ReplaceMe\n\n\npage : App.Page.Page App.Resources.Resources Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model\ninit params resources maybeCached =\n    App.Page.init {}\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate resources msg model =\n    ( model, App.Effect.none )\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions resources model =\n    App.Sub.none\n\n\nview : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg\nview viewId resources model =\n   { title = \"{{name}}\"\n   , body = Html.text \"{{name}}\"\n   }\n")
}
