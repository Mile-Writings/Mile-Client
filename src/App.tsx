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
  /* Positioning */
  position: absolute;
  display: block;
  top: 0;
  padding: 10px;
  right: 0;
  height: 100px;

  bottom: 0;
  left: 0;
  z-index: 10;

  float: right;
  width: 100px;
  margin: 10px;

  /* Typography */
  color: #888;
  line-height: 1.3;
  text-align: center;
`;
