import styled from '@emotion/styled';

import { KEYWORD_DATA } from '../constants/keyword';

const Ruler = () => {
  return (
    <RulerWrapper>
      <TodayKeyWord>오늘의 글감</TodayKeyWord>
      <Pipe></Pipe>
      <KeyWord>
        {KEYWORD_DATA.map((item) => (
          <p key={item.recommend}>{item.recommend}</p>
        ))}
      </KeyWord>
    </RulerWrapper>
  );
};

export default Ruler;

const RulerWrapper = styled.section`
  display: flex;
  gap: 4.8rem;
  align-items: center;
  width: 93rem;
  height: 8.4rem;
  padding-right: 3.6rem;
  padding-left: 3.6rem;

  background-color: ${({ theme }) => theme.colors.mileGreen};
  border-radius: 1rem;

  ${({ theme }) => theme.fonts.title11};
`;

const TodayKeyWord = styled.p`
  width: 100%;
`;

const Pipe = styled.div`
  width: 100%;
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const KeyWord = styled.p`
  width: 100%;

  text-align: right;
`;
