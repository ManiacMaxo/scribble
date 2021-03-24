import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic'

interface ColorScheme {
    // hex color codes
    colours: string[]

    // len of elements in row
    len: SemanticWIDTHS
}

// ubuntu terminal colors
export const ubuntuTerm: ColorScheme = {
    colours: [
        '#010101',
        '#de382b',
        '#39b54a',
        '#ffc706',
        '#006fb8',
        '#762671',
        '#2cb5e9',
        '#cccccc',
        '#808080',
        '#ff0000',
        '#00ff00',
        '#ffff00',
        '#0000ff',
        '#ff00ff',
        '#00ffff',
        '#ffffff'
    ],
    len: '8'
}

// mac terminal colors
export const macTerm: ColorScheme = {
    colours: [
        '#000000',
        '#c23621',
        '#25bc24',
        '#adad27',
        '#492ee1',
        '#d338d3',
        '#33bbc8',
        '#cbcccd',
        '#818383',
        '#fc391f',
        '#31e722',
        '#eaec23',
        '#5833ff',
        '#f935f8',
        '#14f0f0',
        '#e9ebeb'
    ],
    len: '8'
}

export const skribblio: ColorScheme = {
    colours: [
        '#FFFFFF',
        '#C1C1C1',
        '#EF130B',
        '#FF7100',
        '#FFE400',
        '#00CC00',
        '#00B2FF',
        '#231FD3',
        '#A300BA',
        '#D37CAA',
        '#A0522D',
        '#000000',
        '#4C4C4C',
        '#740B07',
        '#C23800',
        '#E8A200',
        '#005510',
        '#00569E',
        '#0E0865',
        '#550069',
        '#A75574',
        '#63300D'
    ],
    len: '11'
}
