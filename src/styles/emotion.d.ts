import type { SerializedStyles } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      mainViolet: string;
      mileViolet: string;
      middleViolet: string;
      lightViolet: string;
      darkViolet: string;
      grayViolet: string;
      midGrayViolet: string;
      mainGreen: string;
      mileGreen: string;
      middleGreen: string;
      secondGreen: string;
      lightGreen: string;
      backGroundGray: string;
      thumbnailGradient: string;
      categoryGradient: string;
      black: string;
      grayBlack: string;
      gray100: string;
      gray90: string;
      gray80: string;
      gray70: string;
      gray60: string;
      gray50: string;
      gray40: string;
      gray30: string;
      gray20: string;
      gray10: string;
      gray5: string;
      white: string;
    };
    fonts: {
      title1: SerializedStyles;
      title2: SerializedStyles;
      title3: SerializedStyles;
      title4: SerializedStyles;
      title5: SerializedStyles;
      title6: SerializedStyles;
      title7: SerializedStyles;
      title8: SerializedStyles;
      title9: SerializedStyles;
      title10: SerializedStyles;
      title11: SerializedStyles;
      title12: SerializedStyles;
      subtitle1: SerializedStyles;
      subtitle2: SerializedStyles;
      subtitle3: SerializedStyles;
      subtitle4: SerializedStyles;
      subtitle5: SerializedStyles;
      subtitle6: SerializedStyles;
      subtitle7: SerializedStyles;
      body1: SerializedStyles;
      body2: SerializedStyles;
      body3: SerializedStyles;
      body4: SerializedStyles;
      body5: SerializedStyles;
      body6: SerializedStyles;
      body7: SerializedStyles;
      body8: SerializedStyles;
      button1: SerializedStyles;
      button2: SerializedStyles;
      button3: SerializedStyles;
      button4: SerializedStyles;
    };
  }
}
