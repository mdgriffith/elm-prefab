import * as path from "path";
import * as ElmPress from "./press";

ElmPress.generate({
  output: "generated",
  generators: [
    ElmPress.app({
      markdown: path.join(__dirname, "../examples/elm-gql/guide"),
      elm: {
        dir: path.join(__dirname, "../examples/elm-gql/src/Page"),
        urls: [
          {
            page: "Home.elm",
            url: "/test/:id?{search,tags,**}",
          },
        ],
      },
    }),
    // ElmPress.ui({ colors: [] }),
    // ElmPress.figma({ apiKey: "string" }),
    // ElmPress.notion({ apiKey: "string" }),
  ],
});
