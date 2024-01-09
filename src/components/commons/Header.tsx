import styled from '@emotion/styled';

import LogInOutBtn from './LogInOutBtn';
import MyGroupBtn from './MyGroupBtn';
import { HeaderLogoSvg } from '../../assets/svgs';
import theme from '../../styles/theme';

const Header = () => {
  const token = sessionStorage.getItem('token');
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      {token ? (
        <HeaderBtnLayout>
          <LogInOutBtn>로그아웃</LogInOutBtn>
          <MyGroupBtn />
          <button>글모임 만들기</button>
        </HeaderBtnLayout>
      ) : (
        <HeaderBtnLayout>
          <MyGroupBtn />
          <LogInOutBtn>로그인</LogInOutBtn>
        </HeaderBtnLayout>
      )}
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
  padding-right: 6rem;
  padding-left: 6rem;

  border-bottom: 1px solid ${theme.colors.gray30};
`;

const HeaderBtnLayout = styled.div`
  display: flex;
  align-items: center;
  height: 6.4rem;
`;
