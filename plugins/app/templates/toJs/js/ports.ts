import * as Clipboard from "./clipboard";
import * as LocalStorage from "./local-storage";
import * as TextSelection from "./text-selection";
// Handling data from elm to JS
export function connect(app: any) {
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
        Clipboard.copy(message.details);
        break;

      case "focus-and-select":
        TextSelection.focus_and_select(message.details);
        break;

      default:
        break;
    }
  });
}
