import localFont from 'next/font/local';

export const sfProDisplay = localFont({
  variable: '--font-sf-pro-display',
  src: [
    {
      path: '../../../public/fonts/sf-pro-display/SFPRODISPLAYREGULAR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/sf-pro-display/SFPRODISPLAYMEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/sf-pro-display/SFPRODISPLAYBOLD.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});
