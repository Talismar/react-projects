import "styled-components";
import { defaultTheme } from "../styles/themes/default";

// Extends types of styled-components

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
