import localFont from 'next/font/local';

export const gotham = localFont({
  variable: '--gotham',
  src: [
    {
      path: '../../../public/fonts/gotham/GothamHTF-Ultra.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Black.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-XLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/gotham/GothamHTF-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
  display: 'swap',
});
