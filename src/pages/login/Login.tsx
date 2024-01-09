import styled from '@emotion/styled';

const Login = () => {
  const REDIRECT_URI = 'http://localhost:5173/redirect-kakao';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_REDIRECT_URI
  }&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
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
  padding: 4rem 0;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 2.4rem;
`;

const LoginTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
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
  background-color: pink;
  width: 21rem;
  height: 14rem;
`;

const KakaoLoginBtn = styled.button`
  width: 30rem;
  height: 4.5rem;
  background-image: url('src/assets/images/kakao_login_medium_wide.png');
`;
