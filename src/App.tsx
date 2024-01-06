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
  background-color: black;
  border-radius: 100%;
  width: 200px;
  margin: 10px;
  padding: 10px;

  display: flex;

  animation: ease;

  font-size: 14px;
  font-weight: bold;
  color: #e9ecef;
`;
