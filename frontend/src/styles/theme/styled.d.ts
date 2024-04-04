import "styled-components";
import { Palette } from "./palette";
import { Weight } from "./weight";
import { Font } from "./font";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: Palette;
    font: Font;
    weight: Weight;
  }
}
