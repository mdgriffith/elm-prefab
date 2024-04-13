# GraphQL

`elm-prefab` supports GraphQL by calling [vendrinc/elm-gql](https://github.com/Vendrinc/elm-gql) behind the scenes.

Example config:

```json
{
  "graphql": {
    "schema": "https://api.github.com/graphql",
    "headers": ["Authorization: bearer $GITHUB_API_TOKEN"]
  }
}
```

For the `schema` and `headers` fields, if a `$VAR` is found, it'll be replaced by that environment variable internally.
Environment variables must start with a dollar sign and only include uppercase letters and underscore.

Any `*.gql` files in your project will be checked against the schema. You'll either get a nice error message describing what needs to be adjusted in the file, or it'll generate some Elm code for you to use to make that query/mutation in Elm. All generated files will end up in `.elm-prefab` directory!

## Other fields

- `namespace` - Defaults to `Api`, this is the Elm directory to generate code in.
- `queries` - The directory to scan for `.graphql/.gql` files.
- `globalFragments` - The directory that contains all fragments that you want to be available globally.
- `generateMocks` - If this is present, then a bunch of code to help construct graphQL responses for use in [Elm Program Test](https://package.elm-lang.org/packages/avh4/elm-program-test/latest/). This is covered more in depth in the `testing.md` guide!

## Learning more!

The [vendrinc/elm-gql](https://github.com/vendrinc/elm-gql/tree/main/guide) repo has more documentation on usage.
