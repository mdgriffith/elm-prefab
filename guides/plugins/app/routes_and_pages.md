# Routes and Pages

```json
{
  "app": {
    "pages": {
      "Home": "/home",
      "Post": "/post/:id",
      "Posts": "/posts/*",
      "Dashboard": "/dashboard?{search,filter,sort}",
      "Everything": "/everything/:tag/*?{search,filter}"
    }
  }
}
```

**pages** is an object where the keys are capitalized, and the value is a [URL template](#UrlTemplate).

When specifying pages above, a few things happen.

1. Routes are generated in `App/Route.elm`.
2. If a page in `src/Page/{PageName}.elm` doesn't exist, a placeholder page will be generated for you.

Let's take a look at the generated `App/Route.elm` file which will be in the `.elm-prefab` directory.

```elm
{-| A type representing our route.
-}
type Route
    = Home {}
    | Post { id : String }
    | Posts { path_ : List String }
    | Dasboard { search : Maybe String, filter : Maybe String, sort : Maybe String }
    | Everything
        { tag : String
        , path_ : List String
        , search : Maybe String
        , filter : Maybe String
        , sort : Maybe String
        }

-- A way to parse a route
parse : Url.Url -> Maybe { route : Route, isRedirect : Bool }

-- A way to turn a route back into a string.
toString : Route -> String
```

## URL Templates

Let's break down the URL format, hopefully it'll feel pretty intuitive.

- `/home` - Parses `/home`
- `/post/:id` - Parses something like `/post/ABC1234` and provides `ABC1234` as an `id` field.
- `/posts/*` - Parses the full path after `/posts`.
  - So, if you have `/posts/containing/tag/whatever` you'd get a type `Posts { path_ = ["containing", "tag", "whatever" ]}`
  - You can only have one `*` at the end

Though what if you want to handle query parameters?

Add a `?` to the end of the url, and any values within the braces are the URL query parameters.

So, here's a dashboard where we care about the params `search`, `filter` and `sort`:

`/dashboard?{search,filter,sort}`

Then, the generated type will be

```elm
type Route =
    Dashboard
        { search : Maybe String
        , filter : Maybe String
        , sort : Maybe String
        }
```

All query parameters are ultimately strings, so you may need to parse them further if you're getting really spicy about it.

Knowing the exact query parameters a URL uses can be really cool.

It means you can safely link to a page with a certain configuration.

## Redirects

Instead of a URL string, you can also specify a list of redirects if needed.

Lets say emails just went out that link to `pots` instead of `posts`. Ugh. Anxiety.

No problem, we can pop that into a redirect.

```json
{
  "pages": {
    "Posts": { "url": "/posts/*", "redirectFrom": ["/pots/*"] }
  }
}
```

:muscle:

This means the app will parse both URLs as `Posts`.

You can also know if a url was redirected because `App.Route.parse` returns `Maybe { route : Route, isRedirect : Bool }`.

This is useful because if a redirect happens, you'll need to

## URLs without a page

It's common for `/logout` to not be a literal page, but for it to be a url you still want to capture.

If you use `urlOnly`, then only a route will be generated, and no actual `Page/{PageName}.elm` will be required.

```json
{
  "pages": {
    "Logout": { "urlOnly": "/logout" }
  }
}
```

## Why are things handled this way?

Check out "[why is routing handled like it is?](https://github.com/mdgriffith/elm-prefab/blob/main/guides/why/routes.md)" for more information!
