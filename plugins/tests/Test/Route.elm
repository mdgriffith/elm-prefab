module Test.Route exposing (suite)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer)
import Generate.Route
import Options.Route
import Parser
import Test exposing (Test)


parseRoute : String -> Result (List Parser.DeadEnd) Options.Route.UrlPattern
parseRoute string =
    Parser.run (Options.Route.parseUrlPattern string) string


parsePage : String -> String -> Result (List Parser.DeadEnd) Options.Route.Page
parsePage id string =
    Result.map
        (\ok ->
            { id = id
            , url = ok
            , redirectFrom = []
            , assets = Nothing
            }
        )
        (parseRoute string)


suite : Test
suite =
    Test.describe "Routes"
        [ overlappingFields
        , overlappingRoutes
        ]


overlappingFields : Test
overlappingFields =
    Test.describe "Overlapping fields"
        [ Test.test "Path pieces" <|
            \_ ->
                case parsePage "Home" "/test/:id/other/:id" of
                    Err err ->
                        Expect.fail
                            ("Failed to parse route: " ++ Parser.deadEndsToString err)

                    Ok route ->
                        case Generate.Route.generate [ route ] of
                            Ok _ ->
                                Expect.fail "Fields are not flagged as overlapping"

                            Err [ Generate.Route.FieldCollision collision ] ->
                                Expect.pass

                            Err err ->
                                Expect.fail "An unexpected error was returned"
        , Test.test "Path piece + query parameter" <|
            \_ ->
                case parsePage "Home" "/test/:id/other?{id}" of
                    Err err ->
                        Expect.fail
                            ("Failed to parse route: " ++ Parser.deadEndsToString err)

                    Ok route ->
                        case Generate.Route.generate [ route ] of
                            Ok _ ->
                                Expect.fail "Fields are not flagged as overlapping"

                            Err [ Generate.Route.FieldCollision collision ] ->
                                Expect.pass

                            Err err ->
                                Expect.fail "An unexpected error was returned"
        ]


overlappingRoutes : Test
overlappingRoutes =
    Test.describe "Overlapping routes"
        [ Test.test "Exact match" <|
            \_ ->
                let
                    one =
                        parsePage "Home" "/test/:id/other/"

                    two =
                        parsePage "Other" "/test/:id/other/"
                in
                case Result.map2 Tuple.pair one two of
                    Err err ->
                        Expect.fail
                            ("Failed to parse route: " ++ Parser.deadEndsToString err)

                    Ok ( oneRoute, twoRoute ) ->
                        case Generate.Route.generate [ oneRoute, twoRoute ] of
                            Ok _ ->
                                Expect.fail "Duplicate routes are not overlapping"

                            Err [ Generate.Route.OverlappingRoutes collision ] ->
                                Expect.pass

                            Err err ->
                                Expect.fail ("An unexpected error was returned" ++ Debug.toString err)
        , Test.test "Exact match, different variable names shouldnt matter" <|
            \_ ->
                let
                    one =
                        parsePage "Home" "/test/:id/other/"

                    two =
                        parsePage "Other" "/test/:id123/other/"
                in
                case Result.map2 Tuple.pair one two of
                    Err err ->
                        Expect.fail
                            ("Failed to parse route: " ++ Parser.deadEndsToString err)

                    Ok ( oneRoute, twoRoute ) ->
                        case Generate.Route.generate [ oneRoute, twoRoute ] of
                            Ok _ ->
                                Expect.fail "Duplicate routes are not overlapping"

                            Err [ Generate.Route.OverlappingRoutes collision ] ->
                                Expect.pass

                            Err err ->
                                Expect.fail ("An unexpected error was returned" ++ Debug.toString err)
        ]
