import { css } from '@emotion/react';
import reset from 'emotion-reset';

import theme from './theme';

const globalStyle = css`
  ${reset}
  * {
    box-sizing: border-box;

    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }

  html,
  body {
    box-sizing: border-box;
    margin: 0 auto;

    font-size: 62.5%;

    background-color: ${theme.colors.backGroundGray};
  }

  input {
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;

    cursor: pointer;
  }

  button {
    font: inherit;

    background: none;
    cursor: pointer;
    border: none;
  }

  select {
    cursor: pointer;
  }

  textarea {
    outline: none;

    resize: none;
  }
`;

export default globalStyle;
