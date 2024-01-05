import '@emotion/react';

type colors = 'primary' | 'positive' | 'negative';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      positive: string;
      negative: string;
    };
  }
}
