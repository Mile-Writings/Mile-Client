import styled from '@emotion/styled';

import { CarouselItemPropTypes } from './components/Carousel';
import CarouselPage from './components/CarouselPage';
import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import Introduction from './components/Introduction';
import { AuthorizationHeader, UnAuthorizationHeader } from './components/MainHeader';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import Ruler from './components/Ruler';
import { FAQ_DATA } from './constants/faqData';
import { recommendPropsTypes } from './types/recommendTopic';

import Footer from './../../components/commons/Footer';
import Spacing from './../../components/commons/Spacing';

const Main = ({ content }: recommendPropsTypes, { moimId }: CarouselItemPropTypes) => {
  return (
    <MainPageWrapper>
      {localStorage.getItem('accessToken') ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <OnBoarding />
      <CarouselLayout>
        <CarouselPage moimId={moimId} />
      </CarouselLayout>
      <Ruler content={content} />
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

const CarouselLayout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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
