export const palette = {
  black: "#222831",
  darkGray: "#31363F",
  gray: "#A9A9A9",
  lightGray: "#B6BBC4",
  white: "#FFFFFF",
  blue: "#76ABAE",
  red: "#B80000",
  green: "#00FFAB",
} as const;

type PaletteKeys = keyof typeof palette;
export type Palette = Record<PaletteKeys, string>;

export default palette;
