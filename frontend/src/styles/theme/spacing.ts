export const spacing = {
  tiny: "5px",
  small: "10px",
  medium: "20px",
  large: "35px",
};

type SpacingKeys = keyof typeof spacing;
export type Spacing = Record<SpacingKeys, string>;

export default spacing;
