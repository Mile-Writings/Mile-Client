import styled from '@emotion/styled';

import { useGetRecommendTopic } from '../hooks/queries';
import { recommendPropsTypes } from '../types/recommendTopic';

import { MainGraphicGradationIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const Ruler = ({ content }: recommendPropsTypes) => {
  const topic = useGetRecommendTopic(content || '');

  return (
    <RulerWrapper>
      <RulerLayout>
        <RulerHeaderContainer>
          <MainGraphicGradationIcon />
          <Spacing marginBottom="0.5" />
          <RulerContentBox>
            <TodayKeyWord>오늘의 글감</TodayKeyWord>
            <Pipe />
            <KeyWord>{topic?.data.content}</KeyWord>
          </RulerContentBox>
          <Spacing marginBottom="1.2" />
        </RulerHeaderContainer>
      </RulerLayout>
    </RulerWrapper>
  );
};

export default Ruler;

const RulerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RulerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 93rem;
  height: 8.4rem;
`;

const RulerHeaderContainer = styled.section`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.middleGreen};
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.title11};
`;

const MainGraphicGradationIcon = styled(MainGraphicGradationIc)`
  margin-left: 2.1rem;
`;

const RulerContentBox = styled.div`
  display: flex;
  gap: 4.8rem;
  align-items: center;
  margin-right: 3.6rem;
  margin-left: 3.6rem;
`;

const TodayKeyWord = styled.span`
  width: fit-content;

  white-space: nowrap;
`;

const Pipe = styled.div`
  width: 100%;
  height: 0.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10rem;
`;

const KeyWord = styled.div`
  width: fit-content;

  white-space: nowrap;
  text-align: right;
`;
