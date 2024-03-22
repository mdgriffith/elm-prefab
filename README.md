# Elm Prefab

> **Prefab** _(Noun)_  
> A prefabricated building or structure that is manufactured in sections, typically in a factory, and then transported and assembled on site to form a complete structure.

> **Prefab** _(Adjective)_
> A portmanteau of "Pretty" and "Fabulous" :sparkles:

Elm Prefab is a collection of codegeneration plugins for generating and maintaining an Elm app. Each plugin is independent, so you can pick and choose what you want.

[The Elm Architecture](https://guide.elm-lang.org/architecture/) is a very stable way to build apps, but there are some nuances to master.

This project is born out of years of experience working on large(>500k lines) Elm apps at Blissfully and now [Vendr](vendr.com), and attempts to speed up development for new projects and avoid some tricky situations that become expensive to fix later on.

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

**App architecture** -

**Routes** -

**Assets** -
