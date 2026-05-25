import 'styled-components';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',

  gray: '#DFDFDF',

  mineShaft: '#2F2F36',
  shark: '#1F2025',
  tuna: '#32323B',
  emperor: '#555555',
  dustyGray: '#9A9A9A',

  greenYellow: '#B8FF69',
  radicalRed: '#FF3D86',

  transparent: 'rgba(255, 255, 255, 0)',
};

export default colors;

export type ColorFamily = keyof typeof colors;
type Theme = typeof colors;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
