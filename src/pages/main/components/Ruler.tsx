import styled from '@emotion/styled';

import { mainGrapicGradation as MainGrapicGradationIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { KEYWORD_DATA } from '../constants/keyword';

const Ruler = () => {
  return (
    <RulerWrapper>
      <RulerHeaderLayout>
        <MainGrapicGradationIcon />
        <Spacing marginBottom="0.5" />
        <RulerContentContainer>
          <TodayKeyWord>오늘의 글감</TodayKeyWord>
          <Pipe />
          <KeyWord>
            {KEYWORD_DATA.map((item) => (
              <p key={item.recommend}>{item.recommend}</p>
            ))}
          </KeyWord>
        </RulerContentContainer>
        <Spacing marginBottom="1.2" />
      </RulerHeaderLayout>
    </RulerWrapper>
  );
};

export default Ruler;

const RulerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 93rem;
  height: 8.4rem;
  margin-left: 21.8rem;
`;

const RulerHeaderLayout = styled.section`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.mileGreen};
  border-radius: 1rem;

  ${({ theme }) => theme.fonts.title11};
`;

const MainGrapicGradationIcon = styled(MainGrapicGradationIc)`
  margin-left: 2.1rem;
`;

const RulerContentContainer = styled.div`
  display: flex;
  gap: 4.8rem;
  align-items: center;
  margin-right: 3.6rem;
  margin-left: 3.6rem;
`;

const TodayKeyWord = styled.span`
  width: 30rem;
`;

const Pipe = styled.div`
  width: 100%;
  height: 0.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10rem;
`;

const KeyWord = styled.p`
  width: fit-content;

  white-space: nowrap;
  text-align: right;
`;
