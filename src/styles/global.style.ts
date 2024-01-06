import { css } from '@emotion/react';

const globalStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;

    overflow-y: auto;
    background-color: pink;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default globalStyle;
