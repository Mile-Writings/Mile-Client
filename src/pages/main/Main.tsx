import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import Introduction from './components/Introduction';
import { AuthorizationHeader, UnAuthorizationHeader } from './components/MainHeader';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import Ruler from './components/Ruler';
import { SkeletonComponent } from './components/skeletons/SkeletonComponent';
import { FAQ_DATA } from './constants/faqData';
import { useGetGroupContent, useGetRecommendTopic } from './hooks/queries';

import Footer from './../../components/commons/Footer';
import Spacing from './../../components/commons/Spacing';

const Main = () => {
  const lazyCarousel = import('./components/GroupCarousel');
  const LazyCarousel = lazy(() => lazyCarousel);
  const { content, moimId } = useParams();
  const topic = useGetRecommendTopic(content || '');
  const { data, groupLength, isFetching, isLoading } = useGetGroupContent(moimId || '');
  return (
    <MainPageWrapper>
      {localStorage.getItem('accessToken') ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <OnBoarding />
      <GroupCarouselLayout>
        {isLoading || isFetching ? (
          <CarouselComponentBox>
            {groupLength && (
              <Suspense fallback={<SkeletonComponent groupLength={groupLength} />}>
                <LazyCarousel data={data} groupLength={groupLength} />
              </Suspense>
            )}
          </CarouselComponentBox>
        ) : (
          <CarouselWithTitleContainer>
            <CarouselTitle>마일과 함께하고 있는 글 모임이에요</CarouselTitle>
            <CarouselComponentBox>
              {groupLength && (
                <Suspense fallback={<SkeletonComponent groupLength={groupLength} />}>
                  <LazyCarousel data={data} groupLength={groupLength} />
                </Suspense>
              )}
            </CarouselComponentBox>
          </CarouselWithTitleContainer>
        )}
      </GroupCarouselLayout>

      <Ruler data={topic?.data} />
      <Introduction />
      <Manual />
      <FaqLayout>
        <FaqTitleWithDropDownContainer>
          <FaqTitle />
          {FAQ_DATA.map(({ id, question, answer }) => (
            <FaqDropdown key={id} id={id} question={question} answer={answer} />
          ))}
        </FaqTitleWithDropDownContainer>
      </FaqLayout>
      <Spacing marginBottom="17.3" />
      <Footer />
    </MainPageWrapper>
  );
};

export default Main;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const GroupCarouselLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CarouselWithTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CarouselTitle = styled.p`
  justify-content: flex-start;
  width: fit-content;
  padding-top: 7.2rem;

  ${({ theme }) => theme.fonts.title3};
`;

const CarouselComponentBox = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 10rem;
`;

const FaqLayout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FaqTitleWithDropDownContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
