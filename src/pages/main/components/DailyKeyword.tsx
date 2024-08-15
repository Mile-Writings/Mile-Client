import styled from '@emotion/styled';
import { isAxiosError } from 'axios';

import { useGetRecommendTopic } from '../hooks/queries';

import Spacing from '../../../components/commons/Spacing';

const DailyKeyword = () => {
  const { data, error } = useGetRecommendTopic();

  if (isAxiosError(error)) {
    if (error.response?.data.status === 40412) {
      console.error('내용을 불러올 수 없어요. 잠시 후에 다시 시도해주세요.');
    } else {
      console.error(error);
    }
  }

  return (
    <KeyWordWrapper>
      <KeyWordLayout>
        <KeywordHeaderContainer>
          <Spacing marginBottom="0.5" />
          <KeywordContentBox>
            <TodayKeyWord>오늘의 글감</TodayKeyWord>
            <Pipe />
            <KeyWord>{data?.data.content}</KeyWord>
          </KeywordContentBox>
        </KeywordHeaderContainer>
      </KeyWordLayout>
    </KeyWordWrapper>
  );
};

export default DailyKeyword;

const KeyWordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KeyWordLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 93rem;
  height: 8.4rem;
`;

const KeywordHeaderContainer = styled.section`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.title11};
`;

const KeywordContentBox = styled.div`
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

  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 10rem;
`;

const KeyWord = styled.div`
  width: fit-content;
  padding: 1.6rem;

  white-space: nowrap;
  text-align: right;
`;
