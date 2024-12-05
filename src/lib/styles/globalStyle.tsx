import { Global, css } from '@emotion/react';

import { reset } from './reset';

export const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

      ${reset}
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `}
  />
);
