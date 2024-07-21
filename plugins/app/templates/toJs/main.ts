// @ts-ignore
import { Elm } from "./app/Main.elm";
import * as LocalStorage from "./js/localStorage";
import * as Ports from "./js/ports";
import Webcomponents from "./js/webcomponents";

// Include any custom elements we need.
Webcomponents();

// Boot up the Elm App
const app = Elm.Main.init({
  flags: { now: Date.now(), localStorage: LocalStorage.getAll() },
});

// Connect ports
Ports.connect(app);
