import * as ToolbarIcons from '../../../../assets/svgs/editorSVG';
import styled from '@emotion/styled';
import { MOBILE_MEDIA_QUERY } from '../../../../styles/mediaQuery';
import React from 'react';

const toolbarColorSvgs = [
  'EditorTextColorBlackIcn',
  'EditorTextColorBlueIcn',
  'EditorTextColorGrayIcn',
  'EditorTextColorGreenIcn',
  'EditorTextColorOrangeIcn',
  'EditorTextColorPinkIcn',
  'EditorTextColorRedIcn',
  'EditorTextColorVioletIcn',
  'EditorTextColorYellowIcn',
  'EditorTextBgColorBlueIcn',
  'EditorTextBgColorGrayIcn',
  'EditorTextBgColorGreenIcn',
  'EditorTextBgColorOrangeIcn',
  'EditorTextBgColorPinkIcn',
  'EditorTextBgColorRedIcn',
  'EditorTextBgColorVioletIcn',
  'EditorTextBgColorWhiteIcn',
  'EditorTextBgColorYellowIcn',
];

const wrapSvgComponent = (Component: React.FC<React.SVGProps<SVGSVGElement>>) => styled(Component)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 2.4rem;
    height: 2.4rem;

    :hover {
      & > rect {
        stroke: ${({ theme }) => theme.colors.mainViolet};
        stroke-width: 1.5px;
      }
    }
  }
`;

const ToolbarColorIcons = toolbarColorSvgs.reduce(
  (acc, colorSvg) => {
    const colorIcon = ToolbarIcons[colorSvg as keyof typeof ToolbarIcons] as React.FC<
      React.SVGProps<SVGSVGElement>
    >;
    acc[colorSvg] = wrapSvgComponent(colorIcon);
    return acc;
  },
  {} as Record<string, ReturnType<typeof wrapSvgComponent>>,
);

export default ToolbarColorIcons;
