
import * as path from "path";
import * as fs from "fs";

export const copyTo = (baseDir: string, overwrite: boolean) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/elm.json"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/elm.json")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/elm.json"), "{\n  \"type\": \"application\",\n  \"source-directories\": [\"src\", \".elm-prefab\"],\n  \"elm-version\": \"0.19.1\",\n  \"dependencies\": {\n    \"direct\": {\n      \"dillonkearns/elm-markdown\": \"7.0.1\",\n      \"elm/browser\": \"1.0.2\",\n      \"elm/bytes\": \"1.0.8\",\n      \"elm/core\": \"1.0.5\",\n      \"elm/file\": \"1.0.5\",\n      \"elm/html\": \"1.0.0\",\n      \"elm/http\": \"2.0.0\",\n      \"elm/json\": \"1.1.3\",\n      \"elm/random\": \"1.0.0\",\n      \"elm/time\": \"1.0.0\",\n      \"elm/url\": \"1.0.0\",\n      \"lydell/elm-app-url\": \"1.0.3\"\n    },\n    \"indirect\": {\n      \"elm/parser\": \"1.1.0\",\n      \"elm/regex\": \"1.0.0\",\n      \"elm/virtual-dom\": \"1.0.3\",\n      \"rtfeldman/elm-hex\": \"1.0.0\"\n    }\n  },\n  \"test-dependencies\": {\n    \"direct\": {},\n    \"indirect\": {}\n  }\n}\n");
  }

}
