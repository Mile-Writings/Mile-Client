import styled from '@emotion/styled';

import { Rect } from './assets/svgs';

const App = () => {
  //test
  return (
    <>
      <StyledH1>마일 웨비 화이팅</StyledH1>
      <Rect />
    </>
  );
};

export default App;

const StyledH1 = styled.h1`
  display: flex;
  width: 200px;
  margin: 10px;
  padding: 10px;

  color: #e9ecef;
  font-weight: bold;
  font-size: 14px;

  background-color: black;
  border-radius: 100%;

  animation: ease;
`;
