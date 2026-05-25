import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: var(--gotham);
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    /* scroll-behavior: smooth; */
  }

  html {
    font-size: calc(100vw / 1920 * 10);
    text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -webkit-text-size-adjust: none;

    @media (max-width: 1024px)  {
      font-size: calc(55vw / 1024 * 10);
    }

    @media (max-width: 414px)  {
      font-size: calc(100vw / 414 * 10);
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};

    @media (max-width: 900px)  {
      width: 4px;
    }
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.white};
    border-radius: 20px;

    &:hover {
      background-color: ${({ theme }) => theme.white};
    }
  }

  body {
    overscroll-behavior: none;
  }

  main {
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  li {
    list-style-type: none;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export default GlobalStyles;
