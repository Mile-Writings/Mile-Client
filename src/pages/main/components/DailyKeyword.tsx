import styled from '@emotion/styled';

interface recommendPropsTypes {
  content: string | undefined;
}
const DailyKeyword = ({ content }: recommendPropsTypes) => {
  return (
    <KeyWordWrapper>
      <KeyWordLayout>
        <KeywordHeaderContainer>
          <KeywordContentBox>
            <TodayKeyWord>오늘의 글감</TodayKeyWord>
            <Pipe />
            <KeyWord>{content}</KeyWord>
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
  width: 100%;
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
  height: 100%;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.title11};
`;

const KeywordContentBox = styled.div`
  display: flex;
  gap: 4.8rem;
  align-items: center;
  height: 100%;
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
  height: 100%;
  padding: 1.6rem;

  white-space: nowrap;
  text-align: right;
`;
