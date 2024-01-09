import styled from '@emotion/styled';

const Login = () => {
  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginTextBox>
          <HeadText>마일 시작하기</HeadText>
          <SubText>Make it look easy 글쓰기를 쉽고 편안하게</SubText>
        </LoginTextBox>
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

  gap: 2.4rem;
`;

const LoginTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const KakaoLoginBtn = styled.button``;
