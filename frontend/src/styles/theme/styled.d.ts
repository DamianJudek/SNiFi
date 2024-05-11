import "styled-components";
import { Palette } from "./palette";
import { Weight } from "./weight";
import { Font } from "./font";
import { Spacing } from "./spacing";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: Palette;
    font: Font;
    weight: Weight;
    spacing: Spacing;
  }
}
