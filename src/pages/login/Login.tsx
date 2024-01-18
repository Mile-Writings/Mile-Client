import styled from '@emotion/styled';

import { KakaoLoginBtnIc as KakaoLoginBtnIcon, LoginIc } from '../../assets/svgs';

const Login = () => {
  // const REDIRECT_URL = 'http://localhost:5173/redirect-kakao';
  // const REDIRECT_URL = 'https://mile-client-git-develop-seojinyoons-projects/redirect-kakao';
  const REDIRECT_URL = 'https://www.milewriting.com/redirect-kakao';
  // const REDIRECT_URL = 'https://www.milewriting.com/kakao/callback';
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_API_KEY
  }&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginTextBox>
          <HeadText>마일 시작하기</HeadText>
          <SubText>Make it look easy 글쓰기를 쉽고 편안하게</SubText>
        </LoginTextBox>
        <LoginIc />
        <KakaoLoginBtnIcon onClick={handleKakaoLogin} />
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13.2rem;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding: 4rem 0;
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
