# An Example Elm Prefab app

Here's an overview of what's generated

- `.elm-prefab` - The `.elm-prefab` directory is where a number of files are generated that are "internal" to `elm-prefab`, meaning you aren't supposed to modify them, but you can definitely check out what they're doing. They might be overwritten each time `elm-prefab` runs.

  _This is intended to be ignored via your `.gitignore` file_.

- `src/*` - Elm files will be generated in the `src` directory and are owned by _you_, meaning you can modify them as you want! Once they're generated, `elm-prefab` doesn't modify them.
- `src-js/*` - These are some JS, HTML, and CSS files that are also owned by you!
- There are also a number of config files that will be generated at the root of your project, including
  - elm.json
  - package.json
  - tsconfig.json
  - vite.config.js

**Note** - Vite, Typescript, and NPM are not _required_ to use `elm-prefab`, it's just convenient to include them.
