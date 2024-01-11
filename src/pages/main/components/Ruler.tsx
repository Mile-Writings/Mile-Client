import styled from '@emotion/styled';

import { KEYWORD_DATA } from '../constants/keyword';

const Ruler = () => {
  return (
    <RulerWrapper>
      오늘의 글감
      {KEYWORD_DATA.map((item) => (
        <p key={item.recommend}>{item.recommend}</p>
      ))}
    </RulerWrapper>
  );
};

export default Ruler;

const RulerWrapper = styled.section``;
