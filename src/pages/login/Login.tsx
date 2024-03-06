import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { HeaderLogoIc, KakaoLoginBtnIc as KakaoLoginBtnIcon, LoginIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';

const Login = () => {
  //const REDIRECT_URL = 'https://www.milewriting.com/redirect-kakao';
  const navigate = useNavigate();

  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_API_KEY
  }&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  const handleNavigateMain = () => {
    navigate('/');
  };

  return (
    <LoginWrapper>
      <HeaderWrapper>
        <HeaderLogoIcon onClick={handleNavigateMain} />
        <HeaderBtnLayout />
      </HeaderWrapper>
      <Spacing marginBottom="6.4" />
      <LoginLayout>
        <LoginContainer>
          <LoginTextBox>
            <HeadText>마일 시작하기</HeadText>
            <SubText>Make it look easy 글쓰기를 쉽고 편안하게</SubText>
          </LoginTextBox>
          <LoginIc />
          <KakaoLoginBtnIcon onClick={handleKakaoLogin} />
        </LoginContainer>
      </LoginLayout>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 7.4rem);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  padding-top: 13.2rem;
`;

const LoginTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 30.9rem;
  height: 7.4rem;
`;

const HeadText = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title2};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
`;

const HeaderBtnLayout = styled.div`
  display: flex;
  align-items: center;
  height: 6.4rem;
`;

const HeaderLogoIcon = styled(HeaderLogoIc)`
  cursor: pointer;
`;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
