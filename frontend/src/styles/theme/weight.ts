export const weight = {
  light: "200",
  regular: "300",
  medium: "400",
  bold: "700",
};

type WeightKeys = keyof typeof weight;
export type Weight = Record<WeightKeys, string>;

export default weight;
