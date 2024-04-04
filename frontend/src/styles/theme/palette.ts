export const palette = {
  black: "#000000",
  white: "#FFFFFF",
} as const;

type PaletteKeys = keyof typeof palette;
export type Palette = Record<PaletteKeys, string>;

export default palette;
