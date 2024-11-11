import styled from '@emotion/styled';
import Responsive from '../../../components/commons/Responsive/Responsive';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
interface recommendPropsTypes {
  content: string | undefined;
}
const DailyKeyword = ({ content }: recommendPropsTypes) => {
  return (
    <>
      <KeyWordWrapper>
        <KeyWordLayout>
          <Responsive only="desktop">
            <KeywordHeaderContainer>
              <KeywordContentBox>
                <TodayKeyWord>오늘의 글감</TodayKeyWord>
                <Pipe />
                <KeyWord>{content}</KeyWord>
              </KeywordContentBox>
            </KeywordHeaderContainer>
          </Responsive>
          <Responsive only="mobile">
            <KeywordHeaderContainer>
              <MobileKeyWordHeader>오늘의 글감</MobileKeyWordHeader>
              <MobileKeyWordText>{content}</MobileKeyWordText>
            </KeywordHeaderContainer>
          </Responsive>
        </KeyWordLayout>
      </KeyWordWrapper>
    </>
  );
};

export default DailyKeyword;

const MobileKeyWordText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
  font-size: 18px;

  /* mTitle 2 */
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: 160%; /* 28.8px */
`;

const MobileKeyWordHeader = styled.header`
  color: ${({ theme }) => theme.colors.mainViolet};
  font-weight: 500;
  font-size: 14px;

  /* mSubtitle 2 */
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: 140%; /* 19.6px */
`;
const KeyWordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;
`;

const KeyWordLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 93rem;
  height: 8.4rem;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 81rem;
  }
`;

const KeywordHeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 1rem;

  ${({ theme }) => theme.fonts.title11};
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0.8rem;
    padding: 1.6rem 3.3rem;
  }
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
