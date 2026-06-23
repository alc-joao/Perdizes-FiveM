'use client';
import theme from '@/styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/global';
import { fontNames } from '@/styles/_fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={fontNames}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
