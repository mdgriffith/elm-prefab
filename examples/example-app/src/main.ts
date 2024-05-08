// @ts-ignore
import { Elm } from "./src/app/Main.elm";
import * as Clipboard from "./js/clipboard";
import * as LocalStorage from "./js/localStorage";

// Boot up the Elm App
const app = Elm.Main.init({
  flags: { now: Date.now(), localStorage: LocalStorage.getAll() },
});

// Handling data from elm to JS
app.ports?.outgoing?.subscribe?.((message: any) => {
  switch (message.tag) {
    case "local-storage":
      LocalStorage.set(message.details.key, message.details.value);
      if (app.ports?.localStorageUpdated) {
        app.ports.localStorageUpdated.send(message.details);
      }

      break;

    case "local-storage-clear":
      LocalStorage.clear(message.details.key);
      break;

    case "copy-to-clipboard":
      Clipboard.copy(message.details.text);
      break;

    default:
      break;
  }
});
