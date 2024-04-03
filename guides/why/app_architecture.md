# Why?

The Elm Architecture is based on a single source of state (`Model`), a single place to update that state(your `update` function), a way to describe what signals your app accepts(`Msg`), and a way to view your state (`view`).

As your app grows, it's very common to model each page as having it's own `Model`/`Msg`/`update`/`view`, and then the global app will handle forwarding page messages on to pages.

The [Realworld SPA example](https://github.com/rtfeldman/elm-spa-example/tree/master) is a really good example of what that looks like.

So, your global model could look something like this

```elm
type Model
    = Home Home.Model
    | Settings Settings.Model
    | Login Login.Model
    | Register Register.Model
    | Profile Username Profile.Model
    | Article Article.Model
    | Editor (Maybe Slug) Editor.Model
```

Which means your model is one of the above values.

This is honestly pretty great because it's so clear!

However, there are a few situations that I really wanted to explore with `elm-prefab`

## Speed

There's a small, subtle problem with modeling your app this way and it's that whenever you navigate to a new page, you drop the entire state of the previous page.

This becomes a bit of a problem if the server you're talking to is slow for whatever reason(which you may or maynot be able to control).

I reaaally care about load times. The types of apps I personally want to make bank heavily on user delight and speed is one of the most fundamental factors you need to make a truly superlative experience.

_One of the prime motivations for building an [SPA_](https://en.wikipedia.org/wiki/Single-page_application) is to decouple server performance from perceived app.

So, this means that:

- I want the ability to `preload` a page's state if I knew the user was likely to visit it soon.
- I want the back button to show content immediately instead of rerequesting info.
- For truly interactive pages, I didn't want the state to be dropped at all, I want to return to things as how I left them. Object permanence is a nice feature of reality that I want in my apps.

## Modern Flexibility

If you open [Notion](https://www.notion.so), it's common to have one note open in the main pane, and a separate note in the side pane. And you can easily expand the sidepane to be in the main pane.

So, things have a hard time fitting nicely into single pages.

You can absolutely do this kind of thing in Elm, but you need some forethought. And depending on the codebase you're in, it might get hairy and take much longer than expected. Especially if you get that requirement after having invested in a one-page-at-a-time.

Refactoring in Elm is wonderfully safe, but it's also not free.

But I want that flexibility by default for all future apps I write in Elm.

When we say a Single-page-app, we don't want the single finger of the monkey paw to curl.

## Page transitions

Being able to track mulitple page states also sets us up for seamless page transitions.

## Page state from a dictionary

So, what does this mean for `elm-prefab`?

It means at it's core, `elm-prefab` tracks page state in a key-value dictionary.

Ultimately there is still this central type for pages(which is generated for you)

```elm
type Page
    = Home Home.Model
    | Settings Settings.Model
    | Login Login.Model
    | Register Register.Model
    | Profile Username Profile.Model
    | Article Article.Model
    | Editor Editor.Model
```

But the global state is

```elm
Dict App.Page.Id.Id Page
```

Where the keys are a type you define:

```elm
-- in App/Page/Id.elm
type Id
    = Home
    | Settings
    | Login
    | Register
    | Profile
    | Article
    | Editor Slug
```

If that is still a little confusing, no worries, it's likely easiest to learn this thing by trying it out as opposed to reading conceptually about it.

But the main result is:

1. You can decide when to preload a page.
2. Returning to a page that is already cached gives you the option for it to be instantaneous, or decide if you want a full reload, or do whatever.
3. You can impose limits on how much stuff you want to cache.

## View regions

I also want that notion-like _modern flexibility_ on rendering multiple pages on the screen. A lot of times I don't need it, but when I do want it, I really want it.

So, when using `elm-prefab`, there's a file called `App/View.elm`, which looks something like this:

```elm
module App.View exposing (Regions)


{-| -}
type alias Regions view =
    { primary : Maybe view
    , nav : Maybe view
    , detail : List view
    }
```

The `Regions` type is read via some :magic*wand: (we ask a special version of the Elm Compiler to read it for us), and what it means is that `primary`, `nav` and `detail` are the top-level \_view regions* for our app.

Concretely this means that you can send a command that says "load this page in this region".

Here's us loading the `Home` page in the `Primary`

```elm
 App.Effect.loadAt App.View.Id.Primary App.Page.Id.Home
```

And the top-level `view` function would receive the following value, allowing it to decide how the regions are rendered.

```elm
{ primary = Just (Html.Html msg)
, nav = Nothing
, details = []
}
```

But, just as easily, we could load the profile page in the details pane by sending

```elm
App.Effect.loadAt App.View.Id.Details App.Page.Id.Profile
```

And our view function would receive

```elm
{ primary = Just (Html.Html msg)
, nav = Nothing
, details = [ Html.Html ]
}
```
