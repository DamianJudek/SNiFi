export const palette = {
  black: "#040a12",
  lightBlack: "#1d222a",
  darkGray: "#31363F",
  gray: "#A9A9A9",
  lightGray: "#B6BBC4",
  darkWhite: "#F0F0F0",
  white: "#FFFFFF",
  blue: "#76ABAE",
  darkBlue: "#51878a",
  lightBlue: "#98c0c2",
  red: "#B80000",
  darkRed: "#4d0000",
  lightRed: "#ff0a0a",
  green: "#00FFAB",
  darkGreen: "#00291b",
  gold: "#a87602",
  yellow: "#ffdd29",
  darkYellow: "#382801",
} as const;

export type PaletteKeys = keyof typeof palette;
export type Palette = Record<PaletteKeys, string>;

export default palette;
