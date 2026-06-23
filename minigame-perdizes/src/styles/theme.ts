import 'styled-components';

export const colors = {
  black: '#000',
  white: '#fff',
  gray: '#DFDFDF',
  transparent: 'rgba(255, 255, 255, 0)',
};

export default colors;

export type ColorFamily = keyof typeof colors;
type Theme = typeof colors;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
