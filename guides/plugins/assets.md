# Assets

**Config example**

```json
{
  "assets": {
    "Images": { "src": "./path/to/your/images", "onServer": "images" },
    "Posts": { "src": "./path/to/your/posts", "onServer": "posts" }
  }
}
```

The `assets` field is an object where you can have any number of entries and you can list the local directory as `src` and the directory on the server as `onServer`.

So, the `Posts` entry above will generate a file `.elm-prefab/Assets/Posts.elm`, which will have the following:

Let's assume there are 2 Markdown files in `./path/to/your/posts`: `first-post.md`, and `recipes/carrots_with_hummus.md`.

```elm
module Assets.Posts exposing (firstPost, recipes_carrotsWithHummus, directory_)

import Asset

firstPost : Asset.Src
firstPost =
    Asset.Src "/posts/first-post.md"

recipes_carrotsWithHummus : Asset.Src
recipes_carrotsWithHummus =
    Asset.Src "/posts/recipes/carrots_with_hummus.md"


{-|


-}
directory_ :
    List
        { name : String
        , title : String
        , content : Asset.Content
        , crumbs : List String
        , pathOnServer : Asset.Src
        }
directory_ =
    [ { name = "first-post"
      , title = "First Post"
      , content =
          Asset.Markdown
            { headers =
                 [ { level = 1, text = "Troll" }
                 , { level = 3, text = "Actions" }
                 ]
            }
      , crumbs = [ ]
      , src =  Asset.Src "/posts/first-post.md"
      }
    , { name = "carrots_with_hummus"
      , title = "Carrots with Hummus"
      , headers =
           Asset.Markdown
            { headers =
                [ { level = 1, text = "Carrots" }
                , { level = 3, text = "And then the hummus" }
                ]
            }
      , crumbs = [ "recipes" ]
      , src = Asset.Src "/posts/recipes/carrots_with_hummus.md"
      }
    ]

```

Which means you can have:

- A typesafe URL to a static file.
- And a `directory_` which lists all the files it found as well as some metadata if it's available.

The `directory_` can be really nice to build a quick nav bar!

## Asset.Src Type

`elm-prefab` also generated a file called `Asset.elm`, and looks like this:

```elm

{-|-}
type Src =
    Src String

{-|


-}
toString : Src -> String
toString (Src src) =
    src

```

Which means, if you encounter a `Asset.Src` type, you can use it by running it through `Asset.toString`:

```elm

myImage = Html.img [Html.Attributes.src (Asset.toString Assets.Images.firstPost) ] []
```

Why do we want this?

Because it means we can write a function that takes a value we know was correct last time we shipped!

```elm

image : Asset.Src -> Html.Html msg
image src =
    Html.img [Html.Attributes.src (Asset.toString src) ] []
```

## Optimization!

Elm will only include values _you actually use_ in your JS file. So, it's ok if these files get kinda huge because we're probably not going to actually _ship_ everything.
