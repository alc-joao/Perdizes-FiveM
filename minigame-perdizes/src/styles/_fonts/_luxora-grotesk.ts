import localFont from 'next/font/local';

export const luxoraGrotesk = localFont({
  variable: '--luxora-grotesk',
  src: [
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-heavy.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-heavy-italic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-bold-italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-medium-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-light-italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/luxora-grotesk/luxora-grotesk-thin-italic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  display: 'swap',
});
