export const weight = {
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
};

type WeightKeys = keyof typeof weight;
export type Weight = Record<WeightKeys, string>;

export default weight;
