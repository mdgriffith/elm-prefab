# Routing

**Config example**

```json
{
  "routes": {
    "Home": "/home",
    "Post": "/post/:id",
    "Posts": "/posts/*",
    "Dashboard": "/dashboard?{search,filter,sort}",
    "Everything": "/everything/:tag/*?{search,filter}"
  }
}
```

**routes** is an object where the keys are capitalized, and the key is a [URL template](#UrlTemplate)

This will generate `App/Route.elm` in the `.elm-prefab` directory, which will have

```elm
{-| A type
-}
type Route
    = Home {}
    | Post { id : String }
    | Posts { path : List String }
    | Dasboard { search : Maybe String, filter : Maybe String, sort : Maybe String }
    | Everything
        { tag : String
        , path : List String
        , search : Maybe String
        , filter : Maybe String
        , sort : Maybe String
        }

parse : Url.Url -> Maybe Route
toString : Route -> String
```

## URL Templates

We are introducing a way to describe a URL, but hopefully it'll feel pretty intuitive.

- `/home` - Parses `/home`
- `/post/:id` - Parses something like `/post/ABC1234` and provides `ABC1234` as an `id` field.
- `/posts/*` - Parses the full path after `/posts`.
  - So, if you have `/posts/containing/tag/whatever`:
  - you'd get a type
    `Posts { path = ["containing", "tag", "whatever" ]}`
  - You can only have one `*` at the end

Handling URL query parameters.

Add a `?` to the end of the url, and any values within the braces are the URL query parameters

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

## Redirects.

Instead of a URL string, you can also specify a list of redirects if needed.

Lets say emails just went out that link to `pots` instead of `posts`. Ugh. Anxiety.

No problem, we can pop that into a redirect.

```json
{
  "routes": {
    "Posts": { "url": "/posts/*", "redirectFrom": ["/pots/*"] }
  }
}
```

:muscle:

This means the app will parse both URLs as `Posts`.

You can also know if a url was a redirect by using `App.Route.isRedirect : Url -> Bool`.

## Why have a generator for this?

The main motivations for this are:

- Minimizing the time spent on routing.
- To have a single, scannable place to see all the routes of a project.
- To know exactly what information is available for each route. (e.g. "Oh, we care about the search URL param for this page, cool.")

Also, when handling routing in Elm you need to make sure that the URL parser and the URL toString function stay in sync.
This isn't that _hard_ to do, but once routing gets large, it can be a source of anxiety.

Anxiety kills your development speed and is no fun. :heart:

## Why not Filesystem based routing?

One of the differentiators between this project and something like [Elm Land](https://elm.land/) is that we describe routes in a config as opposed to generating them from a directory structure.

Filesystem routing is pretty cool! So, why the heck aren't we using it?

## Deprecated routes and redirects

What if we want to change the url for a page for whatever reason? Well we can go ahead and change it, but what about all the existing external links that are out there? It's pretty common to send out emails with links to specific parts of your app.

I guess we'll just never change things.

## Not all URLs correspond to a page

`/logout` is a very common route which is not an actual page. We generally want to logout the user and return them to the home page.

You can read more about this in the [App plugin](guides/plugins/app.md), but long story short, it can be pretty cool to have multiple "pages" rendered at once.

But if we do that, then which one owns the URL?
