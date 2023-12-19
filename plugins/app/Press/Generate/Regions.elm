module Press.Generate.Regions exposing (generate, values)

import Elm
import Elm.Annotation as Type
import Elm.Case
import Elm.Let
import Elm.Op
import Gen.App.Effect
import Gen.List
import Gen.Maybe
import Press.Model


values =
    { empty =
        Elm.value
            { importFrom = [ "App", "View", "Id" ]
            , name = "empty"
            , annotation = Nothing
            }
    , mapOperation =
        \fn region ->
            Elm.apply
                (Elm.value
                    { importFrom = [ "App", "View", "Id" ]
                    , name = "mapOperation"
                    , annotation = Nothing
                    }
                )
                [ fn
                , region
                ]
    , toList =
        Elm.value
            { importFrom = [ "App", "View", "Id" ]
            , name = "toList"
            , annotation = Nothing
            }
    , setRegion =
        \region value regions ->
            Elm.apply
                (Elm.value
                    { importFrom = [ "App", "View", "Id" ]
                    , name = "setRegion"
                    , annotation = Nothing
                    }
                )
                [ region, value, regions ]
    , update =
        \msg model ->
            Elm.apply
                (Elm.value
                    { importFrom = [ "App", "View", "Id" ]
                    , name = "update"
                    , annotation = Nothing
                    }
                )
                [ msg
                , model
                ]
    }


generate : Press.Model.ViewRegions -> Elm.File
generate viewRegions =
    generateRegionIndex viewRegions


types =
    { region =
        Type.named [] "Region"
    , regionRecord =
        Type.namedWith [ "App", "View" ] "Regions" [ Type.var "view" ]
    , regionRecordWith =
        \var ->
            Type.namedWith [ "App", "View" ] "Regions" [ Type.var var ]
    , changes =
        Type.namedWith [] "Changes" [ Type.var "view" ]
    , id =
        Type.named [] "Id"
    , operation =
        Type.namedWith [] "Operation" [ Type.var "view" ]
    , operationWith =
        \str ->
            Type.namedWith [] "Operation" [ Type.var str ]
    }


generateRegionIndex : Press.Model.ViewRegions -> Elm.File
generateRegionIndex viewRegions =
    let
        otherRegions =
            viewRegions.regions
                |> List.map
                    (\( name, regionType ) ->
                        Elm.variant name
                    )

        idName base =
            base ++ "Id"

        otherRegionIds =
            viewRegions.regions
                |> List.map
                    (\( name, regionType ) ->
                        case regionType of
                            Press.Model.One ->
                                Elm.variant (idName name)

                            Press.Model.Many ->
                                Elm.variantWith (idName name) [ Type.int ]
                    )

        -- Useful references
        route =
            Press.Model.types.routeType
    in
    Elm.fileWith [ "App", "View", "Id" ]
        { docs = List.map Elm.docs
        , aliases = []
        }
        [ Elm.customType "Region"
            otherRegions
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , Elm.customType "Id"
            otherRegionIds
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , Elm.alias "Changes"
            (Type.record
                [ ( "added", Type.list (Type.var "view") )
                , ( "removed", Type.list (Type.var "view") )
                ]
            )
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , Elm.customType "Operation"
            [ Elm.variantWith "Push" [ types.region, Type.var "view" ]
            , Elm.variantWith "PushTo" [ types.id, Type.var "view" ]
            , Elm.variantWith "ReplaceAt" [ types.id, Type.var "view" ]
            , Elm.variantWith "Clear" []
            , Elm.variantWith "ClearRegion" [ types.region ]
            , Elm.variantWith "ClearView" [ types.id ]
            ]
            |> Elm.exposeWith
                { exposeConstructor = True
                , group = Nothing
                }
        , mapOperation
        , update viewRegions

        -- Region management
        , setRegion viewRegions
        , setRegionItem viewRegions
        , clearRegion viewRegions
        , clearRegionAt viewRegions
        , toList viewRegions
        , allRegionsDeclaration viewRegions
        , mapRegion viewRegions
        , Elm.declaration "empty"
            (initViewRegions viewRegions)
            |> Elm.expose
        ]


viewRegionAlias : Press.Model.ViewRegions -> Elm.Declaration
viewRegionAlias regions =
    let
        regionFields =
            regions.regions
                |> List.map
                    (\( field, regionType ) ->
                        ( field
                        , case regionType of
                            Press.Model.One ->
                                Type.maybe Type.string

                            Press.Model.Many ->
                                Type.list Type.string
                        )
                    )
    in
    Elm.alias "ViewRegions"
        (Type.record regionFields)


update regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "update"
        (Elm.fn2
            ( "operation", Just types.operation )
            ( "regions", Just types.regionRecord )
            (\operation model ->
                Elm.Case.custom operation
                    types.operation
                    [ Elm.Case.branch2 "Push"
                        ( "region", types.region )
                        ( "pageId", Type.var "view" )
                        (\region pageId ->
                            -- let
                            --     shared =
                            --         Press.Model.toShared config (Elm.get "frame" model)
                            --     pageId =
                            --         Elm.apply
                            --             (Elm.val "toPageKey")
                            --             [ pageIdToLoad ]
                            -- in
                            Elm.Let.letIn
                                (\newModel ->
                                    -- getPageInit.call pageIdToLoad
                                    --     shared
                                    --     (Elm.get "states" newModel)
                                    --     |> preloadPage.call config newModel pageIdToLoad
                                    Elm.tuple newModel noChanges
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.apply (Elm.val "setRegion")
                                        [ region
                                        , pageId
                                        , model
                                        ]
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch2 "PushTo"
                        ( "regionId", types.id )
                        ( "route", Type.var "view" )
                        (\regionId pageId ->
                            -- let
                            --     shared =
                            --         Press.Model.toShared config (Elm.get "frame" model)
                            --     pageId =
                            --         Elm.apply
                            --             (Elm.val "toPageKey")
                            --             [ pageIdToLoad ]
                            -- in
                            Elm.Let.letIn
                                (\newModel ->
                                    -- getPageInit.call pageIdToLoad
                                    --     shared
                                    --     (Elm.get "states" newModel)
                                    --     |> preloadPage.call config newModel pageIdToLoad
                                    Elm.tuple newModel noChanges
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.apply (Elm.val "setRegionItem")
                                        [ regionId
                                        , pageId
                                        , model
                                        , Elm.bool False
                                        ]
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch2 "ReplaceAt"
                        ( "regionId", types.id )
                        ( "pageId", Press.Model.types.pageId )
                        (\regionId pageId ->
                            -- let
                            --     shared =
                            --         Press.Model.toShared config (Elm.get "frame" model)
                            --     pageId =
                            --         Elm.apply
                            --             (Elm.val "toPageKey")
                            --             [ pageIdToLoad ]
                            -- in
                            Elm.Let.letIn
                                (\newModel ->
                                    -- getPageInit.call pageIdToLoad
                                    --     shared
                                    --     (Elm.get "states" newModel)
                                    --     |> preloadPage.call config newModel pageIdToLoad
                                    Elm.tuple newModel noChanges
                                )
                                |> Elm.Let.value "modelWithRegionSet"
                                    (Elm.apply (Elm.val "setRegionItem")
                                        [ regionId
                                        , pageId
                                        , model
                                        , Elm.bool True
                                        ]
                                    )
                                |> Elm.Let.toExpression
                        )
                    , Elm.Case.branch0 "Clear"
                        (Elm.tuple
                            (Gen.List.call_.foldl
                                (Elm.val "clearRegion")
                                model
                                (Elm.val "allRegions")
                            )
                            noChanges
                        )
                    , Elm.Case.branch1 "ClearRegion"
                        ( "region", types.region )
                        (\region ->
                            Elm.tuple
                                (Elm.apply (Elm.val "clearRegion")
                                    [ region
                                    , model
                                    ]
                                )
                                noChanges
                        )
                    , Elm.Case.branch1 "ClearView"
                        ( "regionId", types.id )
                        (\regionId ->
                            Elm.tuple
                                (Elm.apply (Elm.val "clearRegionAt")
                                    [ regionId
                                    , model
                                    ]
                                )
                                noChanges
                        )
                    ]
                    |> Elm.withType
                        (Type.tuple
                            types.regionRecord
                            types.changes
                        )
            )
        )
        |> Elm.expose


noChanges =
    Elm.record
        [ ( "added", Elm.list [] )
        , ( "removed", Elm.list [] )
        ]


{-| Clear a region and set the new content
-}
setRegion : Press.Model.ViewRegions -> Elm.Declaration
setRegion regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "setRegion"
        (Elm.fn3
            ( "region", Just types.region )
            ( "contentId", Just (Type.var "view") )
            ( "viewRegions", Just types.regionRecord )
            (\region contentId viewRegions ->
                Elm.Case.custom region
                    types.region
                    (List.map
                        (\( field, regionType ) ->
                            Elm.Case.branch0 field
                                (Elm.updateRecord
                                    [ ( field
                                      , case regionType of
                                            Press.Model.One ->
                                                Elm.just contentId

                                            Press.Model.Many ->
                                                Elm.list [ contentId ]
                                      )
                                    ]
                                    viewRegions
                                )
                        )
                        allRegions
                    )
            )
        )
        |> Elm.expose


capitalize : String -> String
capitalize str =
    let
        top =
            String.left 1 str

        remain =
            String.dropLeft 1 str
    in
    String.toUpper top ++ remain


{-| Given a specific region ID, insert a new page id at that
-}
setRegionItem : Press.Model.ViewRegions -> Elm.Declaration
setRegionItem regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "setRegionItem"
        (Elm.fn4
            ( "regionId", Just types.id )
            ( "contentId", Just (Type.var "view") )
            ( "viewRegions", Just types.regionRecord )
            ( "replaceExisting", Just Type.bool )
            (\regionId newPageId viewRegions replaceExisting ->
                Elm.Case.custom regionId
                    types.id
                    (List.map
                        (\( field, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.Case.branch0 (toRegionIdType field)
                                        (Elm.updateRecord
                                            [ ( field
                                              , Elm.just newPageId
                                              )
                                            ]
                                            viewRegions
                                        )

                                Press.Model.Many ->
                                    Elm.Case.branch1 (toRegionIdType field)
                                        ( "index", Type.int )
                                        (\index ->
                                            Elm.ifThen (Elm.Op.lte index (Elm.int 0))
                                                -- Add to the beginning
                                                (Elm.updateRecord
                                                    [ ( field
                                                      , Elm.Op.cons newPageId (Elm.get field viewRegions)
                                                      )
                                                    ]
                                                    viewRegions
                                                )
                                                (Elm.ifThen (Elm.Op.gt index (Gen.List.call_.length (Elm.get field viewRegions)))
                                                    -- Add to the end
                                                    (Elm.updateRecord
                                                        [ ( field
                                                          , Elm.Op.append
                                                                (Elm.get field viewRegions)
                                                                (Elm.list [ newPageId ])
                                                          )
                                                        ]
                                                        viewRegions
                                                    )
                                                    -- Add at the index, pushing whatever back
                                                    (Elm.updateRecord
                                                        [ ( field
                                                          , Elm.get field viewRegions
                                                                |> Gen.List.call_.indexedMap
                                                                    (Elm.fn2
                                                                        ( "itemIndex", Just Type.int )
                                                                        ( "pageId", Just Type.string )
                                                                        (\itemIndex pageId ->
                                                                            Elm.ifThen (Elm.Op.equal itemIndex index)
                                                                                (Elm.list [ newPageId, pageId ])
                                                                                (Elm.list [ pageId ])
                                                                        )
                                                                    )
                                                                |> Gen.List.call_.concat
                                                          )
                                                        ]
                                                        viewRegions
                                                    )
                                                )
                                        )
                        )
                        allRegions
                    )
                    |> Elm.withType types.regionRecord
            )
        )


clearRegion : Press.Model.ViewRegions -> Elm.Declaration
clearRegion regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "clearRegion"
        (Elm.fn2
            ( "region", Just types.region )
            ( "viewRegions", Just types.regionRecord )
            (\region viewRegions ->
                Elm.Case.custom region
                    types.region
                    (List.map
                        (\( field, regionType ) ->
                            Elm.Case.branch0 field
                                (Elm.updateRecord
                                    [ ( field
                                      , case regionType of
                                            Press.Model.One ->
                                                Elm.nothing

                                            Press.Model.Many ->
                                                Elm.list []
                                      )
                                    ]
                                    viewRegions
                                )
                        )
                        allRegions
                    )
            )
        )


toRegionIdType base =
    capitalize base ++ "Id"


clearRegionAt : Press.Model.ViewRegions -> Elm.Declaration
clearRegionAt regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "clearRegionAt"
        (Elm.fn2
            ( "regionId", Just types.id )
            ( "viewRegions", Just types.regionRecord )
            (\regionId viewRegions ->
                Elm.Case.custom regionId
                    types.id
                    (List.map
                        (\( field, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.Case.branch0 (toRegionIdType field)
                                        (Elm.updateRecord
                                            [ ( field
                                              , Elm.nothing
                                              )
                                            ]
                                            viewRegions
                                        )

                                Press.Model.Many ->
                                    Elm.Case.branch1 (toRegionIdType field)
                                        ( "index", Type.int )
                                        (\index ->
                                            -- Add at the index, pushing whatever back
                                            Elm.updateRecord
                                                [ ( field
                                                  , Elm.get field viewRegions
                                                        |> Gen.List.call_.indexedMap
                                                            (Elm.fn2
                                                                ( "itemIndex", Just Type.int )
                                                                ( "pageId", Just Type.string )
                                                                (\itemIndex pageId ->
                                                                    Elm.ifThen (Elm.Op.equal itemIndex index)
                                                                        (Elm.list [])
                                                                        (Elm.list [ pageId ])
                                                                )
                                                            )
                                                        |> Gen.List.call_.concat
                                                  )
                                                ]
                                                viewRegions
                                        )
                        )
                        allRegions
                    )
                    |> Elm.withType types.regionRecord
            )
        )


allRegionsDeclaration : Press.Model.ViewRegions -> Elm.Declaration
allRegionsDeclaration regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "allRegions"
        (Elm.list
            (regions.regions
                |> List.map
                    (\( regionName, _ ) ->
                        Elm.value
                            { importFrom = []
                            , name = capitalize regionName
                            , annotation = Just types.region
                            }
                    )
            )
        )


toList : Press.Model.ViewRegions -> Elm.Declaration
toList regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "toList"
        (Elm.fn
            ( "viewRegions", Just types.regionRecord )
            (\viewRegions ->
                allRegions
                    |> List.map
                        (\( typename, regionType ) ->
                            case regionType of
                                Press.Model.One ->
                                    Elm.get typename viewRegions
                                        |> Gen.Maybe.map (\x -> Elm.list [ x ])
                                        |> Gen.Maybe.withDefault (Elm.list [])

                                Press.Model.Many ->
                                    Elm.get typename viewRegions
                        )
                    |> Elm.list
                    |> Gen.List.call_.concat
                    |> Elm.withType (Type.list (Type.var "view"))
            )
        )
        |> Elm.expose


initViewRegions : Press.Model.ViewRegions -> Elm.Expression
initViewRegions regions =
    let
        regionFields =
            regions.regions
                |> List.map
                    (\( field, regionType ) ->
                        ( field
                        , case regionType of
                            Press.Model.One ->
                                Elm.nothing

                            Press.Model.Many ->
                                Elm.list []
                        )
                    )
    in
    Elm.record regionFields
        |> Elm.withType types.regionRecord


mapOperation : Elm.Declaration
mapOperation =
    Elm.declaration "mapOperation"
        (Elm.fn2
            ( "fn"
            , Just
                (Type.function
                    [ Type.var "view"
                    ]
                    (Type.var "b")
                )
            )
            ( "operation", Just types.operation )
            (\fn operation ->
                Elm.Case.custom operation
                    types.operation
                    [ Elm.Case.branch2 "Push"
                        ( "region", types.region )
                        ( "pageId", Type.var "view" )
                        (\region pageId ->
                            Elm.apply
                                (Elm.val "Push")
                                [ region
                                , Elm.apply fn [ pageId ]
                                ]
                        )
                    , Elm.Case.branch2 "PushTo"
                        ( "regionId", types.id )
                        ( "route", Type.var "view" )
                        (\regionId pageId ->
                            Elm.apply
                                (Elm.val "PushTo")
                                [ regionId
                                , Elm.apply fn [ pageId ]
                                ]
                        )
                    , Elm.Case.branch2 "ReplaceAt"
                        ( "regionId", types.id )
                        ( "pageId", Press.Model.types.pageId )
                        (\regionId pageId ->
                            Elm.apply
                                (Elm.val "ReplaceAt")
                                [ regionId
                                , Elm.apply fn [ pageId ]
                                ]
                        )
                    , Elm.Case.branch0 "Clear"
                        (Elm.val "Clear")
                    , Elm.Case.branch1 "ClearRegion"
                        ( "region", types.region )
                        (\region ->
                            Elm.apply
                                (Elm.val "ClearRegion")
                                [ region ]
                        )
                    , Elm.Case.branch1 "ClearView"
                        ( "regionId", types.id )
                        (\regionId ->
                            Elm.apply
                                (Elm.val "ClearView")
                                [ regionId ]
                        )
                    ]
                    |> Elm.withType
                        (types.operationWith "b")
            )
        )
        |> Elm.expose


mapRegion : Press.Model.ViewRegions -> Elm.Declaration
mapRegion regions =
    let
        allRegions =
            regions.regions
    in
    Elm.declaration "mapRegion"
        (Elm.fn2
            ( "fn", Just (Type.function [ types.id, Type.var "view" ] (Type.var "b")) )
            ( "regions", Just types.regionRecord )
            (\fn viewRegions ->
                allRegions
                    |> List.map
                        (\( fieldName, regionType ) ->
                            let
                                idName =
                                    capitalize fieldName ++ "Id"

                                regionId =
                                    Elm.value
                                        { importFrom = []
                                        , name = idName
                                        , annotation = Just types.id
                                        }
                            in
                            ( fieldName
                            , case regionType of
                                Press.Model.One ->
                                    Elm.get fieldName viewRegions
                                        |> Gen.Maybe.call_.map
                                            (Elm.apply
                                                fn
                                                [ regionId
                                                ]
                                            )

                                Press.Model.Many ->
                                    Elm.get fieldName viewRegions
                                        |> Gen.List.call_.indexedMap
                                            (Elm.fn2
                                                ( "index", Just Type.int )
                                                ( "pageId", Just (Type.var "view") )
                                                (\index pageId ->
                                                    Elm.apply fn
                                                        [ Elm.apply regionId
                                                            [ index
                                                            ]
                                                        , pageId
                                                        ]
                                                )
                                            )
                            )
                        )
                    |> Elm.record
                    |> Elm.withType
                        (types.regionRecordWith "b")
            )
        )
        |> Elm.expose
