// Type definition file

import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// Sobrescrevendo os types do pacote styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
