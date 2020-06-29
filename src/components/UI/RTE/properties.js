const ArialBlack = '"Arial Black"';
const Arial = 'Arial';
const CourierNew = '"Courier New"';
const TimesNewRoman = '"Times New Roman"';

export const AlignLeft = 'left';
export const AlignRight = 'right';
export const AlignCenter = 'center';
export const AlignJustify = 'justify';

export const Fonts = [Arial, ArialBlack, CourierNew, TimesNewRoman];
export const TextAlign = [AlignLeft, AlignCenter, AlignJustify, AlignRight];
export const AlignToCommand = {
    [AlignLeft]: 'justifyLeft',
    [AlignCenter]: 'justifyCenter',
    [AlignJustify]: 'justifyFull',
    [AlignRight]: 'justifyRight',
};

export const FontSizeDefault = 'default';
export const FontSizeVerySmall = 'x-small';
export const FontSizeABitSmall = 'small'; // 13px
export const FontSizeNormal = 'medium'; // 16px
export const FontSizeMediumLarge = 'large';
export const FontSizeBig = 'x-large';
export const FontSizeVeryBig = 'xx-large';
export const FontSizeMaximum = 'xxx-large';

// Font sizes are not in pixels !
// Font size:
// 1 = 8pt
// 2 = 10pt
// 3 = 12pt
// 4 = 14pt
// 5 = 18pt
// 6 = 24pt
// 7 = 36pt

export const fontSizeLiteralToAbsolute = {
    [FontSizeVerySmall]: 1,
    [FontSizeABitSmall]: 2,
    [FontSizeNormal]: 3,
    [FontSizeMediumLarge]: 4,
    [FontSizeBig]: 5,
    [FontSizeVeryBig]: 6,
    [FontSizeMaximum]: 7,
};

export const defaultProperties = {
    tagName: 'P',
    color: 'black',
    backgroundColor: 'white',
    textAlign: AlignLeft,
    fontFamily: TimesNewRoman,
    fontSize: FontSizeDefault,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: '',

};

export const defaultSizesForTags = {
    H1: FontSizeVeryBig,
    H2: FontSizeBig,
    H3: FontSizeMediumLarge,
    H4: FontSizeNormal,
    H5: FontSizeABitSmall,
    H6: FontSizeVerySmall,
    P: FontSizeNormal,
    PRE: FontSizeABitSmall,
};
