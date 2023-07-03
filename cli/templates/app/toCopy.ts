
import * as path from "path";
import * as fs from "fs";

export const copyTo = (baseDir: string, overwrite: boolean) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Effect.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/Effect.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/Effect.elm"), "port module App.Effect exposing\n    ( none, pushUrl, replaceUrl, load, reload, forward, back\n    , Effect, toCmd, map\n    )\n\n{-|\n\n@docs none, pushUrl, replaceUrl, load, reload, forward, back\n\n\n# Effects\n\n@docs Effect, toCmd, map\n\n-}\n\nimport Browser\nimport Browser.Dom\nimport Browser.Navigation\nimport Html\nimport Http\nimport Json.Encode\n\n\nnone : Effect msg\nnone =\n    None\n\n\npushUrl : String -> Effect msg\npushUrl =\n    PushUrl\n\n\nreplaceUrl : String -> Effect msg\nreplaceUrl =\n    ReplaceUrl\n\n\nload : String -> Effect msg\nload =\n    Load\n\n\nreload : Effect msg\nreload =\n    Reload\n\n\nforward : Int -> Effect msg\nforward =\n    Forward\n\n\nback : Int -> Effect msg\nback =\n    Back\n\n\ntype Effect msg\n    = None\n    | PushUrl String\n    | ReplaceUrl String\n    | Load String\n    | Reload\n    | Forward Int\n    | Back Int\n    | SendToWorld\n        { tag : String\n        , details : Maybe Json.Encode.Value\n        }\n\n\nport outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg\n\n\ntoCmd : { navKey : Browser.Navigation.Key } -> Effect msg -> Cmd msg\ntoCmd { navKey } effect =\n    case effect of\n        None ->\n            Cmd.none\n\n        PushUrl url ->\n            Browser.Navigation.pushUrl navKey url\n\n        ReplaceUrl url ->\n            Browser.Navigation.replaceUrl navKey url\n\n        Load url ->\n            Browser.Navigation.load url\n\n        Reload ->\n            Browser.Navigation.reload\n\n        Forward steps ->\n            Browser.Navigation.forward key steps\n\n        Back steps ->\n            Browser.Navigation.back key steps\n\n        SendToWorld outgoingMsg ->\n            outgoing outgoingMsg\n\n\nmap : (a -> b) -> Effect a -> Effect b\nmap f effect =\n    case effect of\n        None ->\n            None\n\n        PushUrl url ->\n            PushUrl url\n\n        ReplaceUrl url ->\n            ReplaceUrl url\n\n        Load url ->\n            Load url\n\n        Reload ->\n            Reload\n\n        Forward n ->\n            Forward n\n\n        Back n ->\n            Back n\n\n        SendToWorld { tag, details } ->\n            SendToWorld { tag = tag, details = details }\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Shared.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/Shared.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/Shared.elm"), "module App.Shared exposing (Shared)\n\n{-| Data that is shared between the global app and the individual pages.\n-}\n\n\ntype alias Shared =\n    {}\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Sub.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/Sub.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/Sub.elm"), "port module App.Sub exposing\n    ( none, batch\n    , map, toSubscription\n    , Sub\n    )\n\n{-|\n\n\n# Subscriptions\n\n@docs Subscription\n\n@docs none, batch\n\n@docs map, toSubscription\n\n-}\n\nimport Json.Encode\nimport Platform.Sub\n\n\ntype Sub msg\n    = Sub (Platform.Sub.Sub msg)\n    | Batch (List (Sub msg))\n\n\n{-| -}\nnone : Sub msg\nnone =\n    Sub Platform.Sub.none\n\n\n{-| -}\nbatch : List (Sub msg) -> Sub msg\nbatch =\n    Batch\n\n\n{-| -}\nmap : (a -> b) -> Sub a -> Sub b\nmap func sub =\n    case sub of\n        Sub subscription ->\n            Sub (Platform.Sub.map func subscription)\n\n        Batch subs ->\n            Batch (List.map (map func) subs)\n\n\n{-| -}\ntoSubscription : Sub msg -> Platform.Sub.Sub msg\ntoSubscription sub =\n    case sub of\n        Sub subscription ->\n            subscription\n\n        Batch subs ->\n            Platform.Sub.batch (List.map toSubscription subs)\n\n\nport incoming :\n    ({ tag : String\n     , details : Maybe Json.Encode.Value\n     }\n     -> msg\n    )\n    -> Platform.Sub.Sub msg\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/View.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/View.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/View.elm"), "module App.View exposing (View, map)\n\n{-|\n\n@docs View, map\n\n-}\n\nimport Html\n\n\ntype alias View msg =\n    { title : String\n    , body : Html.Html msg\n    }\n\n\nmap : (a -> b) -> View a -> View b\nmap fn myView =\n    { title = myView.title\n    , body = Html.map fn myView.body\n    }\n");
  }

}
