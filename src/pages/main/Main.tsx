import styled from '@emotion/styled';

import Carousel from './components/Carousel';
import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import GroupCarouselTitle from './components/GroupCarouselTitle';
import Introduction from './components/Introduction';
import { MainHeader } from './components/MainHeader';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import Ruler from './components/Ruler';
import { FAQ_DATA } from './constants/faqData';

import Footer from './../../components/commons/Footer';
import Spacing from './../../components/commons/Spacing';

const Main = () => {
  return (
    <MainPageWrapper>
      <MainHeader />
      <OnBoarding />
      <CarouselComponentLayout>
        <GroupCarouselTitle />
        <Carousel />
      </CarouselComponentLayout>
      <Ruler />
      <Introduction />
      <Manual />
      <FaqTitle />
      {FAQ_DATA.map(({ id, question, answer }) => (
        <FaqDropdown key={id} id={id} question={question} answer={answer} />
      ))}
      <Spacing marginBottom="17.3" />
      <Footer />
    </MainPageWrapper>
  );
};

export default Main;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const CarouselComponentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding-bottom: 10rem;
`;
