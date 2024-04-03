# Why have a generator for routing?

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
