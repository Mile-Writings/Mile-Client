import React from 'react';

import styled from '@emotion/styled';

import { HeaderLogoSvg } from './assets/svgs';
import theme from './styles/theme';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <button>버튼</button>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding: 1.2rem 6rem;

  border: 1px solid ${theme.colors.gray30};
`;
