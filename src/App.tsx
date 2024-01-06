import styled from '@emotion/styled';

type HeaderProps = {
  type: boolean;
};

const App = () => {
  //test
  return (
    <>
      <Header type={true}>마일 웨비 화이팅</Header>
    </>
  );
};

export default App;

const Header = styled.h1<HeaderProps>`
  font-size: small;
  color: ${({ theme }) => theme.colors.__main_point_violet};
`;
