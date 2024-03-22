# Elm Prefab

> **Prefab** _(Noun)_  
> A prefabricated building or structure that is manufactured in sections, typically in a factory, and then transported and assembled on site to form a complete structure.

> **Prefab** _(Adjective)_
> A portmanteau of "Pretty" and "Fabulous" :sparkles:

Elm Prefab is a collection of codegeneration plugins for generating and maintaining an Elm app. Each plugin is independent, so you can pick and choose what you want.

- **App** - A base app architecture that has

  - Page-level state caching
  - Notion-like flexibility for viewing multiple pages at once.
  - Built-in support for [`elm-program-test`](https://package.elm-lang.org/packages/avh4/elm-program-test/latest/) for full end-to-end testing of your Elm app.

- **Routes** - Spend as little time futzing with routes as possible!

- **Assets** - Be able to link to any static asset

[The Elm Architecture](https://guide.elm-lang.org/architecture/) is a very stable way to build apps, but there are some nuances to master.

This project is born out of years of experience working on large(>500k lines) Elm apps at Blissfully and now [Vendr](vendr.com).

This is for those who want to speed up development for new projects and avoid some tricky situations that become expensive to fix later on.

## Getting started

In general, `elm-prefab` has a config file called `elm.generate.json`, and you run `elm-prefab` to generate the code.

Generated code lives in the `.elm-prefab` directory.

Getting started

```bash
# navigate to your projects directory and install `elm-prefab`
npm install --savedev elm-prefab

# Running `elm-prefab` will drop you into an interactive guide to getting started.
npm run elm-prefab
```

## Plugin List
