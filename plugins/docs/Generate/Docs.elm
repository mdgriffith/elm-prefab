module Generate.Docs exposing (generate)

{-| -}

import Dict exposing (Dict)
import Elm
import Elm.Annotation as Type
import Elm.Docs
import Elm.Package
import Elm.Project
import Elm.Version
import Generate.Docs.Module
import Json.Encode
import Options.Docs
import Press.Generate


generate : Options.Docs.Docs -> List Elm.File
generate docs =
    [ generateProject docs
    , generateGuides docs
    , generateModules docs
    ]


generateProject : Options.Docs.Docs -> Elm.File
generateProject docs =
    Elm.file [ "Docs", "Project" ]
        [ Elm.declaration "project"
            (genProject docs.project)
        , Elm.customType "Project"
            [ Elm.variantWith "App"
                [ Type.record
                    [ ( "dirs", Type.list Type.string )
                    , ( "depsDirect", Type.list versionName )
                    , ( "depsIndirect", Type.list versionName )
                    , ( "testDepsDirect", Type.list versionName )
                    , ( "testDepsIndirect", Type.list versionName )
                    ]
                ]
            , Elm.variantWith "Package"
                [ Type.record
                    [ ( "name", Type.string )
                    , ( "summary", Type.string )
                    , ( "version", versionType )
                    ]
                ]
            ]
        ]


versionName : Type.Annotation
versionName =
    Type.record
        [ ( "name", Type.string )
        , ( "version", versionType )
        ]


versionType : Type.Annotation
versionType =
    Type.triple Type.int Type.int Type.int


{-|

    type Project
        = Application ApplicationInfo
        | Package PackageInfo

-}
genProject : Elm.Project.Project -> Elm.Expression
genProject project =
    case project of
        Elm.Project.Application app ->
            Elm.apply (Elm.val "App") [ genApplication app ]
                |> Elm.withType (Type.named [] "Project")

        Elm.Project.Package pkg ->
            Elm.apply (Elm.val "Package") [ genPackage pkg ]
                |> Elm.withType (Type.named [] "Project")


{-|

    { name = Name
    , summary = String
    , license = License
    , version = Version
    , exposed = Exposed
    , deps = Deps Constraint
    , testDeps = Deps Constraint
    , elm = Constraint
    }

-}
genPackage : Elm.Project.PackageInfo -> Elm.Expression
genPackage pkg =
    Elm.record
        [ ( "name", Elm.string (Elm.Package.toString pkg.name) )
        , ( "summary", Elm.string pkg.summary )
        , ( "version", genVersion pkg.version )
        ]


{-|

    { elm = Version
    , dirs = List String
    , depsDirect = Deps Version
    , depsIndirect = Deps Version
    , testDepsDirect = Deps Version
    , testDepsIndirect = Deps Version
    }

-}
genApplication : Elm.Project.ApplicationInfo -> Elm.Expression
genApplication app =
    Elm.record
        [ ( "dirs", Elm.list (List.map Elm.string app.dirs) )
        , ( "depsDirect", Elm.list (List.map fromDeps app.depsDirect) )
        , ( "depsIndirect", Elm.list (List.map fromDeps app.depsIndirect) )
        , ( "testDepsDirect", Elm.list (List.map fromDeps app.testDepsDirect) )
        , ( "testDepsIndirect", Elm.list (List.map fromDeps app.testDepsIndirect) )
        ]


fromDeps : ( Elm.Package.Name, Elm.Version.Version ) -> Elm.Expression
fromDeps ( name, version ) =
    Elm.record
        [ ( "name", Elm.string (Elm.Package.toString name) )
        , ( "version", genVersion version )
        ]


genVersion : Elm.Version.Version -> Elm.Expression
genVersion version =
    let
        ( major, minor, patch ) =
            Elm.Version.toTuple version
    in
    Elm.triple (Elm.int major) (Elm.int minor) (Elm.int patch)


generateGuides : Options.Docs.Docs -> Elm.File
generateGuides docs =
    Elm.file [ "Docs", "Guides" ]
        (case docs.guides of
            [] ->
                [ Elm.declaration "guides" (Elm.list []) ]

            _ ->
                List.map
                    (\guide ->
                        Elm.declaration guide.name
                            (Elm.string guide.content)
                    )
                    docs.guides
        )


generateModules : Options.Docs.Docs -> Elm.File
generateModules docs =
    Elm.file [ "Docs", "Modules" ]
        (case docs.modules of
            [] ->
                [ Elm.declaration "modules" (Elm.string "No modules found") ]

            _ ->
                List.map
                    (\mod ->
                        Elm.declaration (String.replace "." "_" mod.name)
                            (Generate.Docs.Module.generate mod)
                    )
                    docs.modules
        )
