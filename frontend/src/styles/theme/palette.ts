export const palette = {
  black: "#222831",
  darkGray: "#31363F",
  gray: "#A9A9A9",
  lightGray: "#B6BBC4",
  white: "#FFFFFF",
  blue: "#76ABAE",
  blueDarker: "#51878a",
  blueLighter: "#98c0c2",
  red: "#B80000",
  redDarker: "#8a0000",
  redLighter: "#ff0a0a",
  green: "#00FFAB",
} as const;

type PaletteKeys = keyof typeof palette;
export type Palette = Record<PaletteKeys, string>;

export default palette;
