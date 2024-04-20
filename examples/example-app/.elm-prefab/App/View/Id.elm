module App.View.Id exposing (Changes, Id(..), Operation(..), Region(..), empty, mapOperation, mapRegion, setRegion, toList, update)

{-| 
@docs Region, Id, Changes, Operation, mapOperation, update, setRegion, toList, mapRegion, empty
-}


import App.Page.Id
import App.View


type Region
    = Primary
    | Detail


type Id
    = PrimaryId
    | DetailId Int


type alias Changes view =
    { added : List view, removed : List view }


type Operation view
    = Push Region view
    | PushTo Id view
    | ReplaceAt Id view
    | Clear
    | ClearRegion Region
    | ClearView Id


mapOperation : (App.Page.Id.Id -> b) -> Operation App.Page.Id.Id -> Operation b
mapOperation fn operation =
    case operation of
        Push region pageId ->
            Push region (fn pageId)

        PushTo regionId route ->
            PushTo regionId (fn route)

        ReplaceAt regionId pageId ->
            ReplaceAt regionId (fn pageId)

        Clear ->
            Clear

        ClearRegion region ->
            ClearRegion region

        ClearView regionId ->
            ClearView regionId


update : Operation a -> App.View.Regions a -> ( App.View.Regions a, Changes a )
update operation regions =
    case operation of
        Push region val ->
            let
                modelWithRegionSet =
                    setRegion region val regions
            in
            ( modelWithRegionSet, { added = [ val ], removed = [] } )

        PushTo regionId val ->
            let
                modelWithRegionSet =
                    setRegionItem regionId val regions False
            in
            ( modelWithRegionSet, { added = [ val ], removed = [] } )

        ReplaceAt regionId val ->
            let
                modelWithRegionSet =
                    setRegionItem regionId val regions True
            in
            ( modelWithRegionSet, { added = [ val ], removed = [] } )

        Clear ->
            ( List.foldl clearRegion regions allRegions
            , { added = [], removed = [] }
            )

        ClearRegion region ->
            ( clearRegion region regions, { added = [], removed = [] } )

        ClearView regionId ->
            ( clearRegionAt regionId regions, { added = [], removed = [] } )


setRegion : Region -> view -> App.View.Regions view -> App.View.Regions view
setRegion region contentId viewRegions =
    case region of
        Primary ->
            { viewRegions | primary = Just contentId }

        Detail ->
            { viewRegions | detail = [ contentId ] }


setRegionItem :
    Id -> view -> App.View.Regions view -> Bool -> App.View.Regions view
setRegionItem regionId contentId viewRegions replaceExisting =
    case regionId of
        PrimaryId ->
            { viewRegions | primary = Just contentId }

        DetailId index ->
            if index <= 0 then
                { viewRegions | detail = contentId :: viewRegions.detail }

            else if index > List.length viewRegions.detail then
                { viewRegions | detail = viewRegions.detail ++ [ contentId ] }

            else
                { viewRegions
                    | detail =
                        List.concat
                            (List.indexedMap
                                (\itemIndex pageId ->
                                    if itemIndex == index then
                                        [ contentId, pageId ]

                                    else
                                        [ pageId ]
                                )
                                viewRegions.detail
                            )
                }


clearRegion : Region -> App.View.Regions view -> App.View.Regions view
clearRegion region viewRegions =
    case region of
        Primary ->
            { viewRegions | primary = Nothing }

        Detail ->
            { viewRegions | detail = [] }


clearRegionAt : Id -> App.View.Regions view -> App.View.Regions view
clearRegionAt regionId viewRegions =
    case regionId of
        PrimaryId ->
            { viewRegions | primary = Nothing }

        DetailId index ->
            { viewRegions
                | detail =
                    List.concat
                        (List.indexedMap
                            (\itemIndex pageId ->
                                if itemIndex == index then
                                    []

                                else
                                    [ pageId ]
                            )
                            viewRegions.detail
                        )
            }


toList : App.View.Regions view -> List view
toList viewRegions =
    List.concat
        [ Maybe.withDefault
            []
            (Maybe.map (\mapUnpack -> [ mapUnpack ]) viewRegions.primary)
        , viewRegions.detail
        ]


allRegions : List Region
allRegions =
    [ Primary, Detail ]


mapRegion : (Id -> view -> b) -> App.View.Regions view -> App.View.Regions b
mapRegion fn regions =
    { primary = Maybe.map (fn PrimaryId) regions.primary
    , detail =
        List.indexedMap
            (\index pageId -> fn (DetailId index) pageId)
            regions.detail
    }


empty : App.View.Regions view
empty =
    { primary = Nothing, detail = [] }