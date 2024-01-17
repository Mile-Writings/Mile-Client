import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { HeaderLogoIc } from '../../../assets/svgs';
import LogInOutBtn from '../../../components/commons/LogInOutBtn';
import theme from '../../../styles/theme';
import logout from '../../../utils/logout';
import MakeGroupBtn from '../../groupFeed/components/MakeGroupBtn';
import MyGroupBtn from '../../groupFeed/components/MyGroupBtn';

// 메인 페이지 헤더
export const AuthorizationHeader = () => {
  const handleLogOut = () => {
    logout();
    alert('로그아웃 되었습니다');
    location.reload();
  };

  return (
    <HeaderWrapper>
      <HeaderLogoIc />
      <HeaderBtnLayout>
        <MyGroupBtn />
        <CommonBtnLayout>
          <MakeGroupBtn />
          <LogInOutBtn onClick={handleLogOut}>로그아웃</LogInOutBtn>
        </CommonBtnLayout>
      </HeaderBtnLayout>
    </HeaderWrapper>
  );
};

//아직 로그인을 하지 않았을 때 헤더
export const UnAuthorizationHeader = () => {
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate(`/login`);
  };
  return (
    <HeaderWrapper>
      <HeaderLogoIc />
      <LogInOutBtn onClick={handleLogIn}>로그인</LogInOutBtn>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray30};
`;

const HeaderBtnLayout = styled.div`
  display: flex;
  align-items: center;
  height: 6.4rem;
`;

const CommonBtnLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  height: 6.4rem;
`;
