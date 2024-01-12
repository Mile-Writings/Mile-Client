import styled from '@emotion/styled';

const Login = () => {
  const REDIRECT_URL = 'http://localhost:5173/redirect-kakao';
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_REDIRECT_URI
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
        <LoginImageTemp />
        <KakaoLoginBtn onClick={handleKakaoLogin} />
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

const LoginImageTemp = styled.div`
  width: 21rem;
  height: 14rem;

  background-color: pink;
`;

const KakaoLoginBtn = styled.button`
  width: 30rem;
  height: 4.5rem;

  background-image: url('src/assets/images/kakao_login_medium_wide.png');
`;
