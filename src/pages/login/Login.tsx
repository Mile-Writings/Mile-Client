import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderLogoIc, KakaoLoginBtnIc } from '../../assets/svgs';
import Spacing from '../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import loginIlust from '/src/assets/images/loginIlust.png';
import loginWebP from '/src/assets/webps/login.webp';

const Login = () => {
  //const REDIRECT_URL = 'https://www.milewriting.com/redirect-kakao';
  const navigate = useNavigate();
  const { state } = useLocation();
  if (state && state.pathname) {
    localStorage.setItem('beforePathname', state.pathname);
  }

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
      <LoginLayout>
        <LoginContainer>
          <LoginTextBox>
            <HeadText>마일 시작하기</HeadText>
            <Spacing marginBottom="1.6" />
            <SubText>Make it look easy 글쓰기를 쉽고 편안하게</SubText>
          </LoginTextBox>
          <Spacing marginBottom="2.4" />
          <picture>
            <source srcSet={loginWebP} type="image/webp" />
            <LoginImg src={loginIlust} />
          </picture>
          <Spacing marginBottom="2.4" />
          <KakaoLoginBtnIcon onClick={handleKakaoLogin} />
        </LoginContainer>
      </LoginLayout>
    </LoginWrapper>
  );
};

export default Login;

const KakaoLoginBtnIcon = styled(KakaoLoginBtnIc)`
  cursor: pointer;
`;
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
  align-items: center;
  justify-content: center;
`;

const LoginTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30.9rem;
  height: 7.4rem;
`;

const HeadText = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title2};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.title13}
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.subtitle4};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle5}
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  margin-bottom: 13.2rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 10.8rem;
  }
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
  gap: 24px;
  align-items: center;
  width: 61.5rem;
  padding: 4rem 0;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 33.5rem;
  }
`;

const LoginImg = styled.img`
  width: 21.8rem;
  height: 18rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 18rem;
    height: 15rem;
  }
`;
