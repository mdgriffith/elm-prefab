
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";


export const Main = {
   moduleName: "Main",
   path: "/Main.elm",
   contents: "module Main exposing (main)\n\n{-| -}\n\nimport App\nimport App.Resources\nimport Browser\nimport Effect\nimport Effect.Nav\nimport Effect.Scroll\nimport Listen\nimport Url\n\n\ntype alias Model =\n    {}\n\n\n{-| -}\nmain : App.App Model Msg\nmain =\n    App.app\n        { init =\n            \\resources flags url ->\n                ( {}, Effect.Nav.toUrl url )\n        , onUrlChange = UrlChanged\n        , onUrlRequest = UrlRequested\n        , update = update\n        , subscriptions =\n            \\resources model -> Listen.none\n        , toCmd =\n            \\resources options model effect ->\n                Effect.toCmd options\n                    (\\urlBase ->\n                        case urlBase of\n                            Effect.UrlApi ->\n                                { headers = []\n                                , urlBase = \"\"\n                                }\n\n                            Effect.UrlStaticFile ->\n                                { headers = []\n                                , urlBase = \"\"\n                                }\n\n                            Effect.UrlCustom base ->\n                                { headers = []\n                                , urlBase = base\n                                }\n                    )\n                    effect\n        , toSub =\n            \\resources options model sub ->\n                Listen.toSubscription options sub\n        , view =\n            \\resources toAppMsg model regions ->\n                case regions.primary of\n                    Nothing ->\n                        { title = \"Loading\"\n                        , body = []\n                        }\n\n                    Just (App.Loading _) ->\n                        { title = \"Loading\"\n                        , body = []\n                        }\n\n                    Just App.NotFound ->\n                        { title = \"Not found\"\n                        , body = []\n                        }\n\n                    Just (App.Error error) ->\n                        { title = \"Error\"\n                        , body = []\n                        }\n\n                    Just (App.View pageContent) ->\n                        { title = pageContent.title\n                        , body = [ pageContent.body ]\n                        }\n        }\n\n\ntype Msg\n    = UrlRequested Browser.UrlRequest\n    | UrlChanged Url.Url\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, Effect.Effect Msg )\nupdate resources msg model =\n    case msg of\n        UrlRequested (Browser.Internal url) ->\n            ( model, Effect.Nav.pushUrl (Url.toString url) )\n\n        UrlRequested (Browser.External urlStr) ->\n            ( model, Effect.Nav.load urlStr )\n\n        UrlChanged url ->\n            ( model\n            , Effect.batch\n                [ Effect.Nav.toUrl url\n                , Effect.Scroll.resetWindow\n                ]\n            )\n"
}

export const all = [
  Main
]

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => {
   for (const file of all) {
      if (overwrite || (!fs.existsSync(path.join(baseDir, file.path)) && !skip)) {
        const filepath = path.join(baseDir, file.path);
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, file.contents);
        const generated = { outputDir: baseDir, path: filepath}
        Options.addGenerated(summary, generated);
      }
   }
}
