
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, summary: Options.Summary) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Input/Text.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Input/Text.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Input.Text exposing (..)\n\n{-|\n\n@docs text, search\n\n@docs with\n\n@docs view\n\n-}\n\nimport Ui\nimport Ui.Dropdown\nimport Ui.Input\nimport Ui.Theme\n\n\ntype TextInput msg\n    = TextInput (Details msg)\n\n\ntype alias Details msg =\n    { value : String\n    , onChange : String -> msg\n    , onSubmit : Maybe msg\n    , placeholder : String\n    }\n\n\ntext :\n    { onChange : String -> msg\n    , text : String\n    }\n    -> Ui.Element msg\ntext options =\n    TextInput\n        { value = options.text\n        , onChange = options.onChange\n        }\n\n\nsearch :\n    { onSubmit : msg\n    , onChange : String -> msg\n    , text : String\n    , results : List SearchResult\n    }\n    -> Ui.Element msg\nsearch options =\n    TextInput\n        { value = options.text\n        , onChange = options.onChange\n        }\n\n\nview : TextInput msg -> Ui.Element msg\nview (TextInput details) =\n    Ui.Input.search\n        [ Ui.Theme.border.small\n        , Ui.below\n            (viewResults options.results)\n        ]\n        { onChange = options.onChange\n        , text = options.text\n        , placeholder =\n            Just (Ui.Input.placeholder [] (Ui.text details.placeholder))\n        , label =\n            Ui.Input.labelHidden options.label\n        }\n\n\ntype alias SearchResult =\n    { name : String\n    , group : String\n    , url : String\n    }\n\n\nviewResults : List SearchResult -> Ui.Element msg\nviewResults results =\n    case results of\n        [] ->\n            Ui.none\n\n        _ ->\n            let\n                groups =\n                    groupWhile\n                        (\\one two ->\n                            one.group == two.group\n                        )\n                        results\n            in\n            Ui.column\n                [ Ui.Theme.border.small\n                , Ui.Theme.padding.sm\n                , Ui.width Ui.fill\n                , Ui.Theme.spacing.sm\n                ]\n                (List.map\n                    (\\( top, others ) ->\n                        Ui.column [ Ui.width Ui.fill, Ui.Theme.spacing.sm3 ]\n                            [ Ui.el\n                                [ Ui.ellipsis\n                                , Ui.width Ui.fill\n                                , Ui.Theme.font.small\n                                ]\n                                (Ui.text top.group)\n                            , Ui.column [ Ui.width Ui.fill, Ui.Theme.spacing.sm2 ]\n                                (List.map\n                                    (\\item ->\n                                        Ui.el\n                                            [ Ui.link item.url\n                                            , Ui.ellipsis\n                                            , Ui.width Ui.fill\n                                            ]\n                                            (Ui.text item.name)\n                                    )\n                                    (top :: others)\n                                )\n                            ]\n                    )\n                    groups\n                )\n\n\ngroupWhile : (a -> a -> Bool) -> List a -> List ( a, List a )\ngroupWhile isSameGroup items =\n    List.foldr\n        (\\x acc ->\n            case acc of\n                [] ->\n                    [ ( x, [] ) ]\n\n                ( y, restOfGroup ) :: groups ->\n                    if isSameGroup x y then\n                        ( x, y :: restOfGroup ) :: groups\n\n                    else\n                        ( x, [] ) :: acc\n        )\n        []\n        items\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Table/Column.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Table/Column.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Table.Column exposing\n    ( text\n    , int, dollars\n    , date, dateTime\n    )\n\n{-|\n\n@docs text\n\n@docs int, dollars\n\n@docs date, dateTime\n\n-}\n\nimport Time\nimport Ui.Table\nimport Ui.Theme\n\n\n{-| Standard header styling.\n\nThis isn't exposed for a reason! We want to keep this detail internal to this module so there's one place where headers are styled.\n\n-}\nheader : String -> Ui.Table.Header msg\nheader label =\n    Ui.Table.cell\n        [ Ui.background Ui.Theme.colors.grey100\n        , Ui.Font.bold\n        ]\n        (Ui.text label)\n\n\n{-| Standard cell styling\n-}\ncell : List (Ui.Attribute msg) Ui.Element msg -> Ui.Table.Cell msg\ncell attrs content =\n    Ui.Table.cell attrs\n        content\n\n\n{-| -}\ntext :\n    { header : String\n    , toText : data -> String\n    }\n    -> Ui.Table.Column state data msg\ntext options =\n    Ui.Table.column\n        { header = header options.header\n        , view =\n            \\data ->\n                cell [] (Ui.text (options.toText data))\n        }\n\n\n\n{-|-}\nint :\n    { header : String\n    , toInt : data -> Int\n    }\n    -> Ui.Table.Column state data msg\nint options ==\n    number \n        { header = options.header\n        , toFloat = options.toInt >> toFloat\n        , format = { currency = Nothing, decimalPlaces = 0 }\n        }\n\n\n{-|-}\ndollars :\n    { header : String\n    , toFloat : data -> Float\n    }\n    -> Ui.Table.Column state data msg\ndollars options ==\n    number \n        { header = options.header\n        , toFloat = options.toFloat\n        , format = { currency = Just \"$\", decimalPlaces = 2 }\n        }\n\n\n{- Number cell implementation -}\n\n\ntype alias NumberFormat =\n    { currency : Maybe String\n    , decimalPlaces : Int\n    }\n\n\n{-| -}\nnumber :\n    { header : String\n    , toFloat : data -> Float\n    , format : NumberFormat\n    }\n    -> Ui.Table.Column state data msg\nnumber options =\n    Ui.Table.column\n        { header =\n            header options.header\n        , view =\n            \\data ->\n                cell\n                    [ Ui.Font.alignRight\n                    , Ui.Font.variants\n                        [ Ui.Font.tabularNumbers ]\n                    ]\n                    (Ui.text (formatFloat options.format (options.toFloat data)))\n        }\n\n\nformatFloat : NumberFormat -> Float -> String\nformatFloat format float =\n    case format.currency of\n        Just currency ->\n            currency ++ floatToString format float\n\n        Nothing ->\n            floatToString format float\n\n\nfloatToString : NumberFormat -> Float -> String\nfloatToString format float =\n    if max 0 format.decimalPlaces == 0 then\n        String.fromInt (floor float)\n\n    else\n        let\n            topString =\n                String.fromInt (floor float)\n                    -- Add commas as a thousands separator\n                    -- We could extend the formatter to allow for switching the period and commas\n                    -- Which is commonly used in places like France and Germany.\n                    |> String.foldr\n                        (\\char ( count, gathered ) ->\n                            if count == 3 then\n                                ( 1, Char.toString char ++ \",\" ++ gathered )\n\n                            else\n                                ( count + 1, Char.toString char ++ gathered )\n                        )\n                        ( 1, \"\" )\n                    |> Tuple.second\n\n            multiplier =\n                10 ^ format.decimalPlaces\n\n            tail =\n                floor ((float - toFloat (floor float)) * multiplier)\n        in\n        topString ++ \".\" ++ String.fromInt tail\n\n\n{-| -}\ntype DateFormat\n    = Date\n    | DateTime\n\n\n{-| -}\ndate :\n    { header : String\n    , toTimeZone : state -> Time.Zone\n    , toDate : data -> Time.Posix\n    }\n    -> Ui.Table.Column state data msg\ndate options =\n    dateCell\n        { header = options.header\n        , toTimeZone = options.toTimeZone\n        , toDate = options.toDate\n        , format = Date\n        }\n\n\n{-| -}\ndateTime :\n    { header : String\n    , toTimeZone : state -> Time.Zone\n    , toDate : data -> Time.Posix\n    }\n    -> Ui.Table.Column state data msg\ndateTime options =\n    dateCell\n        { header = options.header\n        , toTimeZone = options.toTimeZone\n        , toDate = options.toDate\n        , format = DateTime\n        }\n\n\n\n{- Date Cell Implementation -}\n\ndateCell :\n    { header : String\n    , toTimeZone : state -> Time.Zone\n    , toDate : data -> Time.Posix\n    , format : DateFormat\n    }\n    -> Ui.Table.Column state data msg\ndateCell options =\n    Ui.Table.columnWithState\n        { header =\n            \\state ->\n                header options.header\n        , view =\n            \\index state data ->\n                cell []\n                    (Ui.text (formatDate options.format (options.toTimeZone state) (options.toDate data)))\n        }\n\n\nformatDate : DateFormat -> Time.Zone -> Time.Posix -> String\nformatDate dateFormat zone posix =\n    case dateFormat of\n        Date ->\n            toMonthName (Time.toMonth zone time)\n                ++ \" \"\n                ++ String.fromInt (Time.toDay zone time)\n                ++ \", \"\n                ++ String.fromInt (Time.toYear zone time)\n\n        DateTime ->\n            toMonthName (Time.toMonth zone time)\n                ++ \" \"\n                ++ String.fromInt (Time.toDay zone time)\n                ++ \", \"\n                ++ String.fromInt (Time.toYear zone time)\n                ++ \" \"\n                ++ String.fromInt (Time.toHour zone time)\n                ++ \":\"\n                ++ String.fromInt (Time.toMinute zone time)\n                ++ \":\"\n                ++ String.fromInt (Time.toSecond zone time)\n\n\ntoMonthName : Time.Month -> String\ntoMonthName month =\n    case month of\n        Time.Jan ->\n            \"Jan\"\n\n        Time.Feb ->\n            \"Feb\"\n\n        Time.Mar ->\n            \"Mar\"\n\n        Time.Apr ->\n            \"Apr\"\n\n        Time.May ->\n            \"May\"\n\n        Time.Jun ->\n            \"Jun\"\n\n        Time.Jul ->\n            \"Jul\"\n\n        Time.Aug ->\n            \"Aug\"\n\n        Time.Sep ->\n            \"Sep\"\n\n        Time.Oct ->\n            \"Oct\"\n\n        Time.Nov ->\n            \"Nov\"\n\n        Time.Dec ->\n            \"Dec\"\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Button.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Button.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Button exposing\n    ( Button, primary, secondary\n    , withSmall\n    , withWidthFill\n    , view, viewRow\n    )\n\n{-|\n\n@docs Button, primary, secondary\n\n\n## Sizing\n\n@docs withSmall\n\n\n## Misc\n\n@docs withWidthFill\n\n@docs view, viewRow\n\n-}\n\nimport Ui\nimport Ui.Theme\nimport Ui.Theme.Palette\n\n\ntype Button msg\n    = Button (Details msg)\n\n\ntype alias Details msg =\n    { label : String\n    , style : Style\n    , size : Size\n    , widthFill : Bool\n    , corners : Corners\n    , onClick : msg\n    }\n\n\ntype Size\n    = Normal\n    | Small\n\n\ntype Corners\n    = Rounded\n    | RoundedLeft\n    | RoundedRight\n    | Sharp\n\n\ntype Style\n    = Primary\n    | Secondary\n\n\n{-| -}\nprimary :\n    { label : String\n    , onClick : msg\n    }\n    -> Button msg\nprimary options =\n    Button\n        { label = options.label\n        , onClick = options.onClick\n        , style = Primary\n        , widthFill = False\n        , corners = Rounded\n        , size = Normal\n        }\n\n\n{-| -}\nsecondary :\n    { label : String\n    , onClick : msg\n    }\n    -> Button msg\nsecondary options =\n    Button\n        { label = options.label\n        , onClick = options.onClick\n        , style = Secondary\n        , widthFill = False\n        , corners = Rounded\n        , size = Normal\n        }\n\n\n{-| -}\nwithWidthFill : Button msg -> Button msg\nwithWidthFill (Button details) =\n    Button\n        { details\n            | widthFill = True\n        }\n\n\n{-| -}\nwithSmall : Button msg -> Button msg\nwithSmall (Button details) =\n    Button\n        { details\n            | size = Small\n        }\n\n\n{-| -}\nwithSecondary : Button msg -> Button msg\nwithSecondary (Button details) =\n    Button\n        { details\n            | size = Secondary\n        }\n\n\n{-| -}\nview : Button msg -> Ui.Element msg\nview (Button details) =\n    Ui.el\n        [ Ui.onClick details.onClick\n        , Ui.Theme.font.default\n\n        -- Variable styles\n        , if details.widthFill then\n            Ui.width Ui.fill\n\n          else\n            Ui.noAttr\n        , case details.size of\n            Small ->\n                Ui.Theme.padding.sm\n\n            Normal ->\n                Ui.Theme.padding.md\n        , case details.style of\n            Primary ->\n                Ui.Theme.Palette.primary\n\n            Secondary ->\n                Ui.Theme.Palette.secondary\n        , case details.corners of\n            Rounded ->\n                Ui.rounded 4\n\n            RoundedLeft ->\n                Ui.roundedWith\n                    { topLeft = 0\n                    , topRight = 4\n                    , bottomLeft = 0\n                    , bottomRight = 4\n                    }\n\n            RoundedRight ->\n                Ui.roundedWith\n                    { topLeft = 4\n                    , topRight = 0\n                    , bottomLeft = 4\n                    , bottomRight = 0\n                    }\n\n            Sharp ->\n                Ui.noAttr\n        ]\n        (Ui.text details.label)\n\n\n{-| -}\nviewRow : List (Button msg) -> Ui.Element msg\nviewRow buttons =\n    let\n        buttonCount =\n            List.length buttons\n    in\n    Ui.row []\n        (List.indexedMap\n            (\\index (Button details) ->\n                Button\n                    { details\n                        | corners =\n                            if index == 0 then\n                                RoundedRight\n\n                            else if index == buttonCount - 1 then\n                                RoundedLeft\n\n                            else\n                                Sharp\n                    }\n                    |> view\n            )\n            buttons\n        )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Card.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Card.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Card exposing (view)\n\n{-| -}\n\nimport Ui\nimport Ui.Theme\nimport Ui.Theme.Palette\nimport WebComponents.Portal as Portal\n\n\n{-| -}\nview :\n    List (Ui.Element msg)\n    -> Ui.Element msg\nview content =\n    Ui.column\n        [ Ui.Theme.Palette.neutral\n        , Ui.Theme.spacing.sm3\n        , Ui.Theme.padding.sm\n        , Ui.rounded 4\n        , Ui.width Ui.fill\n        ]\n        content\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Divider.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Divider.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Divider exposing (horizontal, vertical)\n\n{-| -}\n\nimport Ui\nimport Ui.Theme\nimport Ui.Theme.Palette\n\n\n{-| -}\nhorizontal : Ui.Element msg\nhorizontal =\n    Ui.el\n        [ Ui.height (Ui.px 1)\n        , Ui.width Ui.fill\n        , Ui.Theme.Palette.neutralInverted\n        ]\n        Ui.none\n\n\n{-| -}\nvertical : Ui.Element msg\nvertical =\n    Ui.el\n        [ Ui.width (Ui.px 1)\n        , Ui.height Ui.fill\n        , Ui.Theme.Palette.neutralInverted\n        ]\n        Ui.none\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Dropdown.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Dropdown.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Dropdown exposing (Visible, init, withMenu)\n\n{-| This is for attaching a dropdown menu\n-}\n\nimport Ui\nimport WebComponent.Portal\n\n\ninit : Visible\ninit =\n    Visible WebComponent.Portal.closed\n\n\ntype Visible\n    = Visible WebComponent.Portal.Model\n\n\nwithMenu :\n    { open : Visible\n    , onOpen : Visible -> msg\n    , menu : Ui.Element msg\n    }\n    -> Ui.Element msg\n    -> Ui.Element msg\nwithMenu options root =\n    Ui.html <|\n        WebComponent.Portal.view\n            { position = WebComponent.Portal.ToRightOf\n            , model =\n                case options.open of\n                    Visible portal ->\n                        portal\n            , onMsg = options.onOpen << Visible\n            , button = Ui.embed [] root\n            , menu = Ui.embed [] options.menu\n            }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Label.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Label.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Label exposing (..)\n\n{-| -}\n\nimport Ui\nimport Ui.Input\nimport Ui.Theme\n\n\nlabel : String -> Ui.Input.Label msg\nlabel str =\n    Ui.Input.label\n        { text = str\n        , theme = theme\n        }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Markdown.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Markdown.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Markdown exposing (parse, render)\n\nimport Html exposing (Html)\nimport Html.Attributes\nimport Http\nimport Markdown.Block as Block\nimport Markdown.Parser\nimport Markdown.Renderer\nimport Ui\nimport Ui.Font\nimport Ui.Table\nimport Ui.Theme\n\n\nparse : String -> Result (List String) (List Block.Block)\nparse src =\n    Markdown.Parser.parse src\n        |> Result.mapError (List.map Markdown.Parser.deadEndToString)\n\n\nrender : Block.Block -> Ui.Element msg\nrender block =\n    case block of\n        Block.Heading Block.H1 content ->\n            Ui.Theme.h1 []\n                (Block.extractInlineText content)\n\n        Block.Heading Block.H2 content ->\n            Ui.Theme.h2 []\n                (Block.extractInlineText content)\n\n        Block.Heading _ content ->\n            Ui.Theme.h2 []\n                (Block.extractInlineText content)\n\n        Block.Paragraph inlines ->\n            paragraph []\n                (List.map renderInline inlines)\n\n        Block.HtmlBlock html ->\n            Ui.none\n\n        Block.UnorderedList tight items ->\n            Ui.column [ Ui.Theme.spacing.sm ]\n                (List.map\n                    (\\(Block.ListItem checked innerBlocks) ->\n                        Ui.row [ Ui.Theme.spacing.sm ]\n                            [ Ui.text \"•\"\n                            , paragraph [] (List.map render innerBlocks)\n                            ]\n                    )\n                    items\n                )\n\n        Block.OrderedList tight startingIndex items ->\n            Ui.column [ Ui.Theme.spacing.sm ]\n                (List.indexedMap\n                    (\\index innerBlocks ->\n                        Ui.row [ Ui.Theme.spacing.sm ]\n                            [ Ui.text (String.fromInt (startingIndex + index))\n                            , paragraph [] (List.map render innerBlocks)\n                            ]\n                    )\n                    items\n                )\n\n        Block.CodeBlock codeBlock ->\n            Ui.none\n\n        Block.ThematicBreak ->\n            Ui.el\n                [ Ui.height (Ui.px 1)\n                , Ui.background (Ui.rgb 0 0 0)\n                , Ui.width Ui.fill\n                ]\n                Ui.none\n\n        Block.BlockQuote nestedBlocks ->\n            paragraph [ Ui.Theme.padding.lg ]\n                (List.map render nestedBlocks)\n\n        Block.Table headers rows ->\n            let\n                columns =\n                    Ui.Table.columns\n                        (List.indexedMap\n                            (\\index cell ->\n                                let\n                                    isNumeric =\n                                        rows\n                                            |> List.take 3\n                                            |> List.any\n                                                (isNumericText << Block.extractInlineText << getIndex index)\n                                in\n                                Ui.Table.column\n                                    { header =\n                                        header\n                                            [ if isNumeric then\n                                                Ui.alignRight\n\n                                              else\n                                                Ui.noAttr\n                                            ]\n                                            (Block.extractInlineText cell.label)\n                                    , view =\n                                        \\row ->\n                                            let\n                                                inlines =\n                                                    getIndex index row\n                                            in\n                                            inlines\n                                                |> List.map renderInline\n                                                |> paragraph\n                                                    [ if isNumeric then\n                                                        Ui.alignRight\n\n                                                      else\n                                                        Ui.width Ui.fill\n                                                    ]\n                                                |> Ui.el [ Ui.width Ui.fill ]\n                                                |> Ui.Table.cell\n                                                    [ if index == 0 then\n                                                        Ui.width (Ui.px 10)\n\n                                                      else\n                                                        Ui.noAttr\n                                                    ]\n                                    }\n                                    |> Ui.Table.withWidth\n                                        { fill = index /= 0\n                                        , min = Nothing\n                                        , max = Nothing\n                                        }\n                            )\n                            headers\n                        )\n            in\n            Ui.Table.view [ Ui.width Ui.fill ] columns rows\n\n\nrenderInline : Block.Inline -> Ui.Element msg\nrenderInline inline =\n    case inline of\n        Block.Strong innerInlines ->\n            paragraph [ Ui.Font.weight Ui.Font.bold ]\n                (List.map renderInline innerInlines)\n\n        Block.Emphasis innerInlines ->\n            paragraph [ Ui.Font.italic ]\n                (List.map renderInline innerInlines)\n\n        Block.Strikethrough innerInlines ->\n            paragraph [ Ui.Font.strike ]\n                (List.map renderInline innerInlines)\n\n        Block.Image src title children ->\n            Ui.none\n\n        Block.Text string ->\n            Ui.text string\n\n        Block.CodeSpan string ->\n            Ui.el\n                [ Ui.Theme.padding.lg\n                , Ui.Theme.border.small\n                ]\n                (Ui.text string)\n\n        Block.Link destination title inlines ->\n            Ui.el [ Ui.link destination ]\n                (Ui.text (Block.extractInlineText inlines))\n\n        Block.HardLineBreak ->\n            Ui.el [ Ui.Font.exactWhitespace ]\n                (Ui.html (Html.text \"\\n\"))\n\n        Block.HtmlInline html ->\n            Ui.none\n\n\nisNumericText : String -> Bool\nisNumericText str =\n    String.any Char.isDigit str\n\n\ngetIndex : Int -> List (List thing) -> List thing\ngetIndex index items =\n    case items of\n        [] ->\n            []\n\n        first :: remaining ->\n            if index <= 0 then\n                first\n\n            else\n                getIndex (index - 1) remaining\n\n\nheader attrs content =\n    Ui.Table.cell\n        [ Ui.borderWith\n            { color = Ui.rgb 200 200 200\n            , width =\n                { top = 0\n                , left = 0\n                , right = 0\n                , bottom = 1\n                }\n            }\n        , Ui.paddingEach\n            { top = 16\n            , left = 16\n            , right = 16\n            , bottom = 8\n            }\n        , Ui.height Ui.fill\n        ]\n        (Ui.el [ Ui.width Ui.fill ]\n            (Ui.el attrs (Ui.text content))\n        )\n\n\nparagraph attrs =\n    Ui.paragraph (Ui.Font.lineHeight 1.4 :: attrs)\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Modal.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Modal.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Modal exposing\n    ( Modal, modal\n    , withCloseOnBackdropClick\n    , view\n    )\n\n{-|\n\n@docs Modal, modal\n\n@docs withCloseOnBackdropClick\n\n@docs view\n\n-}\n\nimport Ui\nimport Ui.Input\nimport Ui.Theme\n\n\ntype Modal msg\n    = Modal (Details msg)\n\n\ntype alias Details msg =\n    { visible : Bool\n    , closeOnClickBackdrop : Maybe (Bool -> msg)\n    , content : Ui.Element msg\n    }\n\n\n{-| -}\nmodal :\n    { visible : Bool\n    , content : Ui.Element msg\n    }\n    -> Switch msg\nmodal options =\n    Modal\n        { visible = options.visible\n        , content = options.content\n        , closeOnClickBackdrop = Nothing\n        }\n\n\nwithCloseOnBackdropClick : (Bool -> msg) -> Modal msg -> Modal msg\nwithCloseOnBackdropClick closeOnClickBackdrop (Modal details) =\n    Modal\n        { details\n            | closeOnClickBackdrop = Just closeOnClickBackdrop\n        }\n\n\n{-| -}\nview : Modal msg -> Ui.Element msg\nview (Modal options) =\n    Ui.el\n        [ Ui.width Ui.fill\n        , Ui.height Ui.fill\n        , Ui.Theme.background.backdrop\n        , case options.closeOnClickBackdrop of\n            Nothing ->\n                Ui.noAttr\n\n            Just msg ->\n                -- TODO: Ui.clickOnThisElement?\n                Ui.onClick msg\n        ]\n        (Ui.el\n            [ Ui.width (Ui.px 800)\n            , Ui.height (Ui.px 600)\n            , Ui.centerX\n            , Ui.centerY\n            ]\n            options.content\n        )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Progress.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Progress.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Slider.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Slider.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Switch.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Switch.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Switch exposing\n    ( Switch, switch\n    , view\n    )\n\n{-|\n\n@docs Switch, switch\n\n@docs view\n\n-}\n\nimport Ui\nimport Ui.Input\nimport Ui.Theme\nimport Ui.Theme.Palette\n\n\ntype Switch msg\n    = Switch (Details msg)\n\n\ntype alias Details msg =\n    { label : String\n    , value : Bool\n    , onToggle : Bool -> msg\n    }\n\n\n{-| -}\nswitch :\n    { onToggle : Bool -> msg\n    , value : Bool\n    }\n    -> Switch msg\nswitch options =\n    Switch\n        { label = Nothing\n        , value = options.value\n        , onToggle = options.onToggle\n        }\n\n\n{-| -}\nview : Switch msg -> Ui.Element msg\nview (Switch options) =\n    Ui.Input.checkbox []\n        { onChange = options.onToggle\n        , icon = Just (viewToggle options)\n        , checked = options.value\n        , label =\n            Ui.Input.labelRight []\n                (Ui.text optinos.label)\n        }\n\n\nviewToggle : Details msg -> Bool -> Ui.Element msg\nviewToggle details on =\n    Ui.el\n        (List.concat\n            [ [ Ui.width (Ui.px 36)\n              , Ui.height (Ui.px 16)\n              , Ui.circle\n              , Ui.Theme.padding.sm4\n\n              --   , Ui.disabledIf config.isDisabled\n              --   , Ui.Transition.create\n              --         [ Ui.Transition.FontColor\n              --         , Ui.Transition.BackgroundColor\n              --         ]\n              ]\n            , -- if config.isDisabled then\n              --     if on then\n              --         [ Ui.backgroundColor.primaryHighlight\n              --         , Ui.fontColor.greyscale600\n              --         ]\n              --     else\n              --         [ Ui.backgroundColor.greyscale200\n              --         , Ui.fontColor.greyscale500\n              --         ]\n              --   else\n              if on then\n                -- [ Ui.backgroundColor.primary\n                -- , Ui.fontColor.greyscale0\n                -- , Ui.hover.backgroundColor.primaryHover\n                -- , Ui.active.backgroundColor.primaryActive\n                -- ]\n                Ui.Theme.Palette.primary\n\n              else\n                -- [ Ui.backgroundColor.greyscale300\n                -- , Ui.fontColor.greyscale800\n                -- , Ui.hover.backgroundColor.greyscale400\n                -- , Ui.active.backgroundColor.greyscale500\n                -- ]\n                Ui.Theme.Palette.inactive\n            ]\n        )\n        (Ui.el\n            [ Ui.Theme.Palette.secondary\n\n            -- , Ui.Theme.border.small\n            , Ui.width (Ui.px 20)\n            , Ui.height (Ui.px 20)\n            , Ui.circle\n            , Ui.move\n                (if config.value then\n                    Ui.right 16\n\n                 else\n                    Ui.right 0\n                )\n\n            -- , Ui.Transition.create [ Ui.Transition.Transform ]\n            ]\n            Ui.none\n        )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Ui/Tooltip.elm"))) {
    const filepath = path.join(baseDir, "/Ui/Tooltip.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Ui.Tooltip exposing (..)\n\n{-| -}\n\nimport Ui\nimport Ui.Theme\nimport Ui.Theme.Palette\nimport WebComponents.Portal as Portal\n\n\n{-| -}\ntooltip : String -> Ui.Attribute msg\ntooltip label =\n    Ui.above\n        (Ui.el [ Ui.Theme.Palette.neutralInverted ]\n            (Ui.text label)\n        )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
