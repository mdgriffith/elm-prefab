
import * as path from "path";
import * as fs from "fs";

export const copyTo = (baseDir: string, overwrite: boolean) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Engine/Page.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/Engine/Page.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/Engine/Page.elm"), "module App.Engine.Page exposing\n    ( Page, page\n    , Init, init, initWith, notFound, loadFrom, error\n    , withGuard\n    , InitPlan(..), toInternalDetails, mapInitPlan\n    )\n\n{-|\n\n@docs Page, page\n\n@docs Init, init, initWith, notFound, loadFrom, error\n\n@docs withGuard\n\n\n# Internal Details\n\nThese are used internally and you shouldn't need to worry about them!\n\n@docs InitPlan, toInternalDetails, mapInitPlan\n\n-}\n\nimport App.Effect\nimport App.PageError\nimport App.Shared\nimport App.Sub\nimport App.View\nimport App.View.Regions.Id\n\n\ntype Page shared params msg model\n    = Page\n        { init : params -> shared -> Maybe model -> Init msg model\n        , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )\n        , subscriptions : shared -> model -> App.Sub.Sub msg\n        , view : App.View.Regions.Id.Id -> shared -> model -> Result App.PageError.Error (App.View.View msg)\n        }\n\n\n{-| -}\npage :\n    { init : params -> App.Shared.Shared -> Maybe model -> Init msg model\n    , update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg )\n    , subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg\n    , view : App.View.Regions.Id.Id -> App.Shared.Shared -> model -> App.View.View msg\n    }\n    -> Page App.Shared.Shared params msg model\npage options =\n    Page\n        { init = options.init\n        , update = options.update\n        , subscriptions = options.subscriptions\n        , view =\n            \\region shared model ->\n                Ok (options.view region shared model)\n        }\n\n\n{-| -}\nwithGuard :\n    (shared -> Result App.PageError.Error newShared)\n    -> Page newShared params msg model\n    -> Page shared params msg model\nwithGuard toShared (Page options) =\n    Page\n        { init =\n            \\params shared maybeModel ->\n                case toShared shared of\n                    Err err ->\n                        Error err\n\n                    Ok newShared ->\n                        options.init params newShared maybeModel\n        , update =\n            \\shared msg model ->\n                case toShared shared of\n                    Err err ->\n                        ( model, App.Effect.none )\n\n                    Ok newShared ->\n                        options.update newShared msg model\n        , subscriptions =\n            \\shared model ->\n                case toShared shared of\n                    Err err ->\n                        App.Sub.none\n\n                    Ok newShared ->\n                        options.subscriptions newShared model\n        , view =\n            \\region shared model ->\n                case toShared shared of\n                    Err err ->\n                        Err err\n\n                    Ok newShared ->\n                        options.view region newShared model\n        }\n\n\n{-| -}\ntype alias Init msg model =\n    InitPlan msg model\n\n\n{-| -}\ntype InitPlan msg model\n    = NotFound\n    | Error App.PageError.Error\n    | Loaded model (App.Effect.Effect msg)\n    | LoadFrom (App.Effect.Effect (InitPlan msg model))\n\n\n{-| -}\nmapInitPlan :\n    { onModel : model -> model2\n    , onMsg : msg -> msg2\n    }\n    -> InitPlan msg model\n    -> InitPlan msg2 model2\nmapInitPlan ({ onModel, onMsg } as fns) initPlan =\n    case initPlan of\n        NotFound ->\n            NotFound\n\n        Error err ->\n            Error err\n\n        Loaded model effect ->\n            Loaded (onModel model) (App.Effect.map onMsg effect)\n\n        LoadFrom effect ->\n            LoadFrom (App.Effect.map (mapInitPlan fns) effect)\n\n\n{-| -}\ninit : model -> Init msg model\ninit model =\n    Loaded model App.Effect.none\n\n\n{-| -}\ninitWith : model -> App.Effect.Effect msg -> Init msg model\ninitWith model effect =\n    Loaded model effect\n\n\n{-| -}\nnotFound : Init msg model\nnotFound =\n    NotFound\n\n\n{-| -}\nloadFrom : App.Effect.Effect (Init msg model) -> Init msg model\nloadFrom effect =\n    LoadFrom effect\n\n\n{-| -}\nerror : App.PageError.Error -> Init msg model\nerror pageError =\n    Error pageError\n\n\n\n{- Internal -}\n\n\n{-| -}\ntoInternalDetails :\n    Page shared params msg model\n    ->\n        { init : params -> shared -> Maybe model -> Init msg model\n        , update : shared -> msg -> model -> ( model, App.Effect.Effect msg )\n        , subscriptions : shared -> model -> App.Sub.Sub msg\n        , view : App.View.Regions.Id.Id -> shared -> model -> Result App.PageError.Error (App.View.View msg)\n        }\ntoInternalDetails (Page details) =\n    details\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Markdown.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/Markdown.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/Markdown.elm"), "module App.Markdown exposing (Model, Msg, Page, page)\n\n{-| -}\n\nimport App\nimport Browser\nimport Html exposing (Html)\nimport Http\nimport Markdown.Block\nimport Markdown.Parser\nimport Markdown.Renderer\nimport Result\n\n\ntype alias Model =\n    { source : { sourceUrl : String }\n    , markdown : Result (List String) (List Markdown.Block.Block)\n    }\n\n\ntype Msg\n    = MarkdownReceived (Result Http.Error String)\n\n\ntype alias Page shared =\n    App.Page { sourceUrl : String } shared Model Msg (Browser.Document Msg)\n\n\npage : String -> Page shared\npage markdown =\n    App.page\n        { init =\n            \\params shared ->\n                ( { source = params\n                  , markdown =\n                        Markdown.Parser.parse markdown\n                            |> Result.mapError (List.map Markdown.Parser.deadEndToString)\n                  }\n                , App.get\n                    { url = params.sourceUrl\n                    , expect =\n                        Http.expectString MarkdownReceived\n                    }\n                )\n        , update = update\n        , subscriptions = \\pageUnpack unpack -> App.Subscription Sub.none\n        , view =\n            \\model ->\n                { title = \"test\"\n                , body =\n                    case model.markdown of\n                        Ok parsed ->\n                            case\n                                Markdown.Renderer.render\n                                    Markdown.Renderer.defaultHtmlRenderer\n                                    parsed\n                            of\n                                Ok rendered ->\n                                    rendered\n\n                                Err errorText ->\n                                    [ Html.text errorText ]\n\n                        Err parsingErrors ->\n                            [ Html.text \"Error parsing\" ]\n                }\n        }\n\n\nupdate msg model =\n    case msg of\n        MarkdownReceived (Err err) ->\n            ( model, App.none )\n\n        MarkdownReceived (Ok markdown) ->\n            ( { model\n                | markdown =\n                    Markdown.Parser.parse markdown\n                        |> Result.mapError (List.map Markdown.Parser.deadEndToString)\n              }\n            , App.none\n            )\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/State.elm"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/App/State.elm")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/App/State.elm"), "module App.State exposing\n    ( Cache, init, current, get\n    , insert, remove, drop\n    , setCurrent, clearCurrent\n    )\n\n{-|\n\n@docs Cache, init, current, get\n\n@docs insert, remove, drop\n\n@docs setCurrent, clearCurrent\n\n-}\n\nimport Dict\n\n\ntype Cache state\n    = Cache\n        { current :\n            Maybe\n                { key : String\n                , state : state\n                }\n        , cache : Dict.Dict String state\n        }\n\n\n{-| -}\ninit : Cache state\ninit =\n    Cache\n        { current = Nothing\n        , cache = Dict.empty\n        }\n\n\n{-| -}\ncurrent : Cache state -> Maybe state\ncurrent (Cache details) =\n    Maybe.map .state details.current\n\n\n{-| This is called when there is no clear new current state.\n\nSuch as when the URL has changed to a new page that does not exist.\n\n-}\nclearCurrent : Cache state -> Cache state\nclearCurrent (Cache details) =\n    Cache\n        { details\n            | current = Nothing\n            , cache =\n                -- move the current state to the cache if it needs to be\n                case details.current of\n                    Nothing ->\n                        details.cache\n\n                    Just previousCurrent ->\n                        details.cache\n                            |> Dict.insert previousCurrent.key previousCurrent.state\n        }\n\n\n{-|\n\n    Drop everything but the current item\n\n-}\ndrop : Cache state -> Cache state\ndrop (Cache details) =\n    Cache { details | cache = Dict.empty }\n\n\n{-| -}\nsetCurrent : String -> Cache state -> Cache state\nsetCurrent key cache =\n    let\n        (Cache cleared) =\n            clearCurrent cache\n    in\n    Cache\n        { cleared\n            | current =\n                case Dict.get key cleared.cache of\n                    Nothing ->\n                        Nothing\n\n                    Just currentState ->\n                        Just\n                            { key = key\n                            , state = currentState\n                            }\n            , cache =\n                Dict.remove key cleared.cache\n        }\n\n\n{-| -}\nget : String -> Cache state -> Maybe state\nget key (Cache details) =\n    case details.current of\n        Nothing ->\n            Dict.get key details.cache\n\n        Just cur ->\n            if cur.key == key then\n                Just cur.state\n\n            else\n                Dict.get key details.cache\n\n\n{-| -}\ninsert : String -> state -> Cache state -> Cache state\ninsert key newState (Cache details) =\n    case details.current of\n        Nothing ->\n            Cache { details | cache = Dict.insert key newState details.cache }\n\n        Just curr ->\n            if curr.key == key then\n                Cache { details | current = Just { curr | state = newState } }\n\n            else\n                Cache { details | cache = Dict.insert key newState details.cache }\n\n\n{-| -}\nremove : String -> Cache state -> Cache state\nremove key (Cache details) =\n    case details.current of\n        Nothing ->\n            Cache { details | cache = Dict.remove key details.cache }\n\n        Just curr ->\n            if curr.key == key then\n                Cache { details | current = Nothing }\n\n            else\n                Cache { details | cache = Dict.remove key details.cache }\n");
  }

}
