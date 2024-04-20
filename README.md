# Elm Prefab

> **Prefab** _(Noun)_  
> A prefabricated building or structure that is manufactured in sections, typically in a factory, and then transported and assembled on site to form a complete structure.

> **Prefab** _(Adjective)_
> A portmanteau of "Pretty" and "Fabulous" :sparkles:

Elm Prefab is a codegeneration tool for generating and maintaining Elm apps.

It's organized via plugins, where each plugin is independent. You can pick and choose what you want.

- **App** - A base app architecture that has

  - Page-level state caching
  - Notion-like flexibility for _viewing multiple pages_ at once.
  - Routing generation - Spend as little time futzing with routes as possible!
  - Built-in support for [`elm-program-test`](https://package.elm-lang.org/packages/avh4/elm-program-test/latest/) for full end-to-end testing of your Elm app.

- **Assets** - Be able to link to a static asset

- **GraphQL** - Write GraphQL queries and mutations and get Elm code to use them! (Powered by [vendrinc/elm-gql](https://github.com/Vendrinc/elm-gql))

[The Elm Architecture](https://guide.elm-lang.org/architecture/) is a very stable way to build apps, but there are some nuances to master.

This project is born out of years of experience working on large (>500k lines) Elm apps at Blissfully and now [Vendr](vendr.com).

This is for those who want to speed up development for new projects, avoid some tricky situations that become expensive to fix, and get some super powers along the way 🚀.

## Getting started

Generate a new Elm project!:

```bash
npx elm-prefab
```

- [Check out an example of what's generated.](https://github.com/mdgriffith/elm-prefab/blob/main/examples/example-app/README.md)

Or, if you want to get started more "traditionally":

```bash
# navigate to your project directory and install `elm-prefab`
npm install --save-dev elm-prefab

# Running `elm-prefab` will generate working
npm run elm-prefab
```

## Starting the Vite development server

`npm run dev` will start a dev server using [`Vite`](https://vitejs.dev/) so you can get coding!

Running `npm run build` will build things for production, with the resultant files in the `dist` folder. Feel free to check out the [ViteJS docs](https://vitejs.dev/guide/).

## The first place to look

`elm-prefab` has generated [`src/Page/Home.elm`](https://github.com/mdgriffith/elm-prefab/blob/main/examples/example-app/src/Page/Home.elm) for you, let's take a look.

If you've worked with Elm before it should be pretty familiar as a standard `model/update/Msg/view` thing.

The next place to look is [`src/Main.elm`](https://github.com/mdgriffith/elm-prefab/blob/main/examples/example-app/src/Main.elm).

This is the _global_ part of the app. This is where you can control:

- Global layout, including showing multiple pages in one layout.
- Authentication logic.
- Any other "App-wide" thing you might want.

Now go build something! If you have questions, check out the below guides.

- [Adding a new page](https://github.com/mdgriffith/elm-prefab/blob/main/guides/how-to/add-a-page.md)
- [Using local storage](https://github.com/mdgriffith/elm-prefab/blob/main/guides/how-to/using-localstorage.md)

- [Managing routes and pages](https://github.com/mdgriffith/elm-prefab/blob/main/guides/plugins/app/routes_and_pages.md)
- [Managing assets](https://github.com/mdgriffith/elm-prefab/blob/main/guides/plugins/assets.md)
- [Using GraphQL](https://github.com/mdgriffith/elm-prefab/blob/main/guides/plugins/graphql.md)

## FAQ

- [Why does this thing exist?](https://github.com/mdgriffith/elm-prefab/blob/main/guides/why/app_architecture.md)
- [Why is routing handled like it is?](https://github.com/mdgriffith/elm-prefab/blob/main/guides/why/routes.md)
- [Is Elm Prefab a Framework?](https://github.com/mdgriffith/elm-prefab/blob/main/guides/why/is_this_a_framework.md)
