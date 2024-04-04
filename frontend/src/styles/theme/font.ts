export const font = {
  inter: "Inter",
};

type FontKeys = keyof typeof font;
export type Font = Record<FontKeys, string>;

export default font;
