export const font = {
  inter: "Inter",
  roboto: "Roboto",
};

type FontKeys = keyof typeof font;
export type Font = Record<FontKeys, string>;

export default font;
