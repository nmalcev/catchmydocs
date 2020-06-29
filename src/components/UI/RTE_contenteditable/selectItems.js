import {
    Fonts, 
    AlignLeft, AlignCenter, AlignJustify, AlignRight, 
    FontSizeDefault, FontSizeVerySmall, FontSizeABitSmall, FontSizeNormal, FontSizeMediumLarge, FontSizeBig, FontSizeVeryBig, FontSizeMaximum
} from './properties';

export const SelectFontItems = Fonts.reduce((items, fontName) => {
    items.push({props: {value: fontName}, textContent: fontName.replace(/\"/g, '')},)
    return items;
}, [
    {props: {selected: true}, textContent: '- font -'}
]);

export const SelectArticleItems = [
    {props: {selected: true}, textContent: '- formatting -'},
    {props: {value: 'H1'}, textContent: 'Title 1 <h1>'},
    {props: {value: 'H2'}, textContent: 'Title 2 <h2>'},
    {props: {value: 'H3'}, textContent: 'Title 3 <h3>'},
    {props: {value: 'H4'}, textContent: 'Title 4 <h4>'},
    {props: {value: 'H5'}, textContent: 'Title 5 <h5>'},
    {props: {value: 'H6'}, textContent: 'Title 6 <h6>'},
    {props: {value: 'P'}, textContent: 'Paragraph <p>'},
    {props: {value: 'PRE'}, textContent: 'Preformatted <pre>'},
];

export const SelectAlignItems = [
    {props: {selected: true}, textContent: '- align -'},
    {props: {value: AlignLeft}, textContent: 'Left'},
    {props: {value: AlignCenter}, textContent: 'Center'},
    {props: {value: AlignJustify}, textContent: 'Full'},
    {props: {value: AlignRight}, textContent: 'Right'},
];

export const SelectColorItems = [
    {props: {selected: true}, textContent: '- color -'},
    {props: {value: 'red', style: {color: 'red'}}, textContent: 'Red'},
    {props: {value: 'green', style: {color: 'green'}}, textContent: 'Green'},
    {props: {value: 'black', style: {color: 'black'}}, textContent: 'Black'},
];

export const SelectFontSizeItems = [
    {props: {value: FontSizeDefault, selected: true}, textContent: 'Default font size'},
    {props: {value: FontSizeVerySmall}, textContent: 'Very small'},
    {props: {value: FontSizeABitSmall}, textContent: 'A bit small'},
    {props: {value: FontSizeNormal}, textContent: 'Normal'},
    {props: {value: FontSizeMediumLarge}, textContent: 'Medium-large'},
    {props: {value: FontSizeBig}, textContent: 'Big'},
    {props: {value: FontSizeVeryBig}, textContent: 'Very big'},
    {props: {value: FontSizeMaximum}, textContent: 'Maximum'},
];

export const SelectBackgroundItems = [
    {props: {selected: true}, textContent: '- background -'},
    {props: {value: 'red', style: {color: 'red'}}, textContent: 'Red'},
    {props: {value: 'green', style: {color: 'green'}}, textContent: 'Green'},
    {props: {value: 'black', style: {color: 'black'}}, textContent: 'Black'},
    {props: {value: 'white', style: {color: 'black'}}, textContent: 'White'},
];
