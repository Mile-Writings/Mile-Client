import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import Responsive from '../../components/commons/Responsive/Responsive';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import { AuthorizationHeader, UnAuthorizationHeader } from './../../components/commons/Header';
import Spacing from './../../components/commons/Spacing';
import DailyKeyword from './components/DailyKeyword';
import GroupCarousel from './components/GroupCarousel';
import Introduction from './components/Introduction';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import { SkeletonComponent } from './components/skeletons/SkeletonComponent';
import { useGetGroupContent, useGetRecommendTopic } from './hooks/queries';
const Main = () => {
  const { content, moimId } = useParams();
  const topic = useGetRecommendTopic(content || '');
  const { data, isFetching, isLoading } = useGetGroupContent(moimId || '');
  const groupLength = data?.length;

  return (
    <MainPageWrapper>
      {localStorage.getItem('accessToken') ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <Spacing marginBottom="6.4" />
      <OnBoarding />

      <GroupCarouselLayout>
        <CarouselContainer>
          <Responsive only={'desktop'}>
            <CarouselTitle>마일과 함께하고 있는 글 모임이에요</CarouselTitle>
          </Responsive>
          {isLoading || isFetching ? (
            <SkeletonComponent groupLength={groupLength} />
          ) : (
            <CarouselBox>
              <GroupCarousel data={data} />
            </CarouselBox>
          )}
        </CarouselContainer>
      </GroupCarouselLayout>
      <Spacing marginBottom="10" />

      <DailyKeyword content={topic?.data?.content} />
      <Spacing marginBottom="10" />
      <Introduction />
      <Spacing marginBottom="10" />

      <Manual />
      {/*
      <FaqLayout>
        <FaqContainer>
          <FaqTitle>자주 묻는 질문</FaqTitle>
          <Spacing marginBottom="3.6" />
          {FAQ_DATA.map(({ id, question, answer }) => (
            <FaqDropdown key={id} id={id} question={question} answer={answer} />
          ))}
        </FaqContainer>
      </FaqLayout>

      <Spacing marginBottom="17.3" />
      <Footer /> */}
    </MainPageWrapper>
  );
};

export default Main;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.backGroundGray};

  /* @media ${MOBILE_MEDIA_QUERY} {
    max-width: 76rem;
  } */
`;

const GroupCarouselLayout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110rem;
`;

const CarouselContainer = styled.div`
  width: 93rem;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 420px;
  }
`;

const CarouselBox = styled.div`
  cursor: default;
`;

const CarouselTitle = styled.h1`
  padding-top: 7.2rem;

  ${({ theme }) => theme.fonts.title3};
`;

const FaqLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FaqContainer = styled.div`
  cursor: default;
`;

const FaqTitle = styled.h3`
  ${({ theme }) => theme.fonts.title3};
`;
