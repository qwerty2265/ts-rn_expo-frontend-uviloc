import { Appearance } from "react-native";

const DARK_THEME = {
    text: '#d4d3de',
    background: '#0f0f0f',
    primary: '#545454',
    secondary: '#808080',
    accent: '#acd43d'
}

const LIGHT_THEME = {
    text: '#22212c',
    background: '#f0f0f0',
    primary: '#ababab',
    secondary: '#808080',
    accent: '#98c02a'
}

const COLORS = Appearance.getColorScheme() === 'dark' ? DARK_THEME : LIGHT_THEME;

const FONT = {
    regular: 'SMRegular',
    bold: 'SMBold'
}

export { COLORS, FONT };