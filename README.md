# Elm Prefab

> **Prefab** _(Noun)_  
> A prefabricated building or structure that is manufactured in sections, typically in a factory, and then transported and assembled on site to form a complete structure.

> **Prefab** _(Adjective)_
> A portmanteau of "Pretty" and "Fabulous" :sparkles:

Elm Prefab is a collection of codegeneration plugins for generating and maintaining an Elm app.

Each plugin is independent, so you can pick and choose what you want.

- **App** - A base app architecture that has

  - Page-level state caching
  - Notion-like flexibility for _viewing multiple pages_ at once.
  - Built-in support for [`elm-program-test`](https://package.elm-lang.org/packages/avh4/elm-program-test/latest/) for full end-to-end testing of your Elm app.

- **Routes** - Spend as little time futzing with routes as possible!

- **Assets** - Be able to link to a static asset

- **GraphQL** - Write GraphQL queries and mutations and get Elm code to use them! (Powered by [vendrinc/elm-gql](https://github.com/Vendrinc/elm-gql))

[The Elm Architecture](https://guide.elm-lang.org/architecture/) is a very stable way to build apps, but there are some nuances to master.

This project is born out of years of experience working on large(>500k lines) Elm apps at Blissfully and now [Vendr](vendr.com).

This is for those who want to speed up development for new projects and avoid some tricky situations that become expensive to fix later on.

## Getting started

In general, `elm-prefab` has a config file called `elm.generate.json`, and you run `elm-prefab` to generate the code.

Getting started

```bash
# navigate to your projects directory and install `elm-prefab`
npm install --savedev elm-prefab

# Running `elm-prefab` will generate working
npm run elm-prefab
```

When running `elm-prefab` for the first time, a number of files will be generated.

- `.elm-prefab` - Files in the `.elm-prefab` directory are owned by `elm-prefab`. Take a look, but know that they will be overwritten as needed.
- `src/*` - Elm files will be generated in the `src` directory and are owned by _you_, meaning you can modify them as you want! Once they're generated, `elm-prefab` doesn't modify them.
- `src-js/*` - These are some JS, HTML, and CSS files that are also owned by you!
- There are also a number of config files that will be generated at the root of your project, including
  - elm.json
  - package.json
  - tsconfig.json
  - vite.config.js

**Note** - Vite, Typescript, and NPM are not _required_ to use `elm-prefab`, it's just convenient to include them.

## Starting the Vite development server

Once you're run `npm run elm-prefab`, you now have a working [`Vite`](https://vitejs.dev/) setup.

`npm run dev` will start a dev server so you can get coding!

Running `npm run build` will build things for production, with the resultant files in the `dist` folder. Feel free to check out the [ViteJS docs](https://vitejs.dev/guide/)

## The first place to look

`elm-prefab` has generated `src/Page/Home.elm` for you, let's take a look.

If you've worked with elm before it should be pretty familiar as a standard `model/update/Msg/view` thing.

The next place to look is `src/Main.elm`.

This is the _global_ part of the app. This is where you can control:

- Global layout, including showing multiple pages in one layout.
- Authentication logic.
- Any other "App-wide" thing you might want.

Now go build something! If you have a questions, check out the below guides.

- [Adding a new page](https://github.com/mdgriffith/elm-prefab/blob/main/guides/how-to/add-a-page.md)
- [Using local storage](https://github.com/mdgriffith/elm-prefab/blob/main/guides/how-to/using-localstorage.md)
