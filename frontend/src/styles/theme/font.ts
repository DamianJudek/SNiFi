export const font = {
  inter: "Inter",
  roboto: "Roboto",
  icomoon: "icomoon",
};

type FontKeys = keyof typeof font;
export type Font = Record<FontKeys, string>;

export default font;
