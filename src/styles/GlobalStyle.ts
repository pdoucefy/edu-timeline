'use client';

import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    html,
    body {
      max-width: 100vw;
      height: 100%;
      overflow-x: hidden;
      font-family: ${theme.typography.fontFamily.base};

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button,
    input,
    select,
    textarea,
    label {
      font-family: inherit;
    }
  `,
);
