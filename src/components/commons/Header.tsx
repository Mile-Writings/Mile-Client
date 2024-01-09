import styled from '@emotion/styled';

import LogInOutBtn from './LogInOutBtn';
import { HeaderLogoSvg } from '../../assets/svgs';
import MakeGroupBtn from '../../pages/groupFeed/MakeGroupBtn';
import MyGroupBtn from '../../pages/groupFeed/MyGroupBtn';
import theme from '../../styles/theme';

const Header = () => {
  const token = sessionStorage.getItem('token');

  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      {token ? (
        <HeaderBtnLayout>
          <MyGroupBtn />
          <MakeGroupBtn />
          <LogInOutBtn>로그아웃</LogInOutBtn>
        </HeaderBtnLayout>
      ) : (
        <LogInOutBtn>로그인</LogInOutBtn>
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
