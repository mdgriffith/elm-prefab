
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/App/Page/Error.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/App/Page/Error.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Page.Error exposing (Error(..))\n\n{-| You may want to protect a page with a certain error when it is first requested.\n\n  - `NotFound` is built in to `elm-prefab`, so you don't need to capture that here.\n\nCommon errors are\n\n    - Unauthenticated — When you require someone to be signed in in order to see a page.\n    - Permission denied — When you require taht someone is both signed in and has certain permissions.\n\n-}\n\n\ntype Error\n    = Unauthenticated\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/App/View.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/App/View.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.View exposing\n    ( View, map\n    , Regions, isVisible\n    )\n\n{-|\n\n@docs View, map\n\n@docs Regions, isVisible\n\n-}\n\nimport Html\n\n\ntype alias View msg =\n    { title : String\n    , body : Html.Html msg\n    }\n\n\nmap : (a -> b) -> View a -> View b\nmap fn myView =\n    { title = myView.title\n    , body = Html.map fn myView.body\n    }\n\n\n\n{- Regions -}\n\n\n{-| -}\ntype alias Regions view =\n    { primary : Maybe view\n    , detail : List view\n    }\n\n\n{-| -}\nisVisible : view -> Regions view -> Bool\nisVisible view regions =\n    case regions.primary of\n        Just primaryView ->\n            if view == primaryView then\n                True\n\n            else\n                List.any ((==) view) regions.detail\n\n        Nothing ->\n            List.any ((==) view) regions.detail\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Main.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Main.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Main exposing (main)\n\n{-| -}\n\nimport App\nimport App.Page.Id\nimport App.Resources\nimport App.Route\nimport App.View.Id\nimport Browser\nimport Effect\nimport Effect.Nav\nimport Listen\nimport Url\n\n\ntype alias Model =\n    {}\n\n\n{-| -}\nmain : App.App Model Msg\nmain =\n    App.app\n        { init =\n            \\resources flags url ->\n                ( {}, Effect.Nav.toUrl url )\n        , onUrlChange = UrlChanged\n        , onUrlRequest = UrlRequested\n        , update = update\n        , subscriptions =\n            \\resources model -> Listen.none\n        , toCmd =\n            \\resources options model effect ->\n                Effect.toCmd options\n                    (\\httpTarget ->\n                        case httpTarget of\n                            Effect.TargetApi ->\n                                { headers = []\n                                , urlBase = \"\"\n                                }\n\n                            Effect.TargetStaticFile ->\n                                { headers = []\n                                , urlBase = \"\"\n                                }\n\n                            Effect.TargetExternal name ->\n                                { headers = []\n                                , urlBase = \"\"\n                                }\n                    )\n                    effect\n        , toSub =\n            \\resources options model sub ->\n                Listen.toSubscription options sub\n        , view =\n            \\resources toAppMsg model regions ->\n                case regions.primary of\n                    Nothing ->\n                        { title = \"Loading\"\n                        , body = []\n                        }\n\n                    Just (App.Loading _) ->\n                        { title = \"Loading\"\n                        , body = []\n                        }\n\n                    Just App.NotFound ->\n                        { title = \"Not found\"\n                        , body = []\n                        }\n\n                    Just (App.Error error) ->\n                        { title = \"Error\"\n                        , body = []\n                        }\n\n                    Just (App.View pageContent) ->\n                        { title = pageContent.title\n                        , body = [ pageContent.body ]\n                        }\n        }\n\n\ntype Msg\n    = UrlRequested Browser.UrlRequest\n    | UrlChanged Url.Url\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, Effect.Effect Msg )\nupdate resources msg model =\n    case msg of\n        UrlRequested (Browser.Internal url) ->\n            ( model, Effect.Nav.pushUrl (Url.toString url) )\n\n        UrlRequested (Browser.External urlStr) ->\n            ( model, Effect.Nav.load urlStr )\n\n        UrlChanged url ->\n            ( model, Effect.Nav.toUrl url )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
