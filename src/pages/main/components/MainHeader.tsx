import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderLogoIc } from '../../../assets/svgs';
import LogInOutBtn from '../../../components/commons/LogInOutBtn';
import useNavigateToHome from '../../../hooks/useNavigateHome';
import theme from '../../../styles/theme';
import logout from '../../../utils/logout';
import MakeGroupBtn from '../../groupFeed/components/MakeGroupBtn';
import MyGroupBtn from '../../groupFeed/components/MyGroupBtn';

// 메인 페이지 헤더
export const AuthorizationHeader = () => {
  const { navigateToHome } = useNavigateToHome();
  const handleLogOut = () => {
    logout();
    location.reload();
  };

  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
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
  const { navigateToHome } = useNavigateToHome();
  const navigate = useNavigate();
  const { navigateToHome } = useNavigateToHome();
  const pathname = useLocation();
  const handleLogIn = () => {
    navigate(`/login`, { state: pathname });
  };
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
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

const HeaderLogoIcon = styled(HeaderLogoIc)`
  cursor: pointer;
`;
