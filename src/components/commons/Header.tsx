import styled from '@emotion/styled';

import LogInOutBtn from './LogInOutBtn';
import { HeaderLogoSvg } from '../../assets/svgs';
import theme from '../../styles/theme';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <LogInOutBtn>로그인</LogInOutBtn>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding: 1.2rem 6rem;

  border-bottom: 1px solid ${theme.colors.gray30};
`;
