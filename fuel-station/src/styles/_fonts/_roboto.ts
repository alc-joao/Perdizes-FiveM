import localFont from 'next/font/local';

export const roboto = localFont({
  variable: '--roboto',
  src: [
    {
      path: '../../../public/fonts/roboto/roboto-black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-blackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/roboto/roboto-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-boldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/roboto/roboto-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-mediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/roboto/roboto-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/roboto/roboto-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-lightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/roboto/roboto-thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto/roboto-thinItalic.woff2',
      weight: '200',
      style: 'italic',
    },
  ],
});
