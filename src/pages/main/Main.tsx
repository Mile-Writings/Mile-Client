import styled from '@emotion/styled';

import Carousel from './components/Carousel';
import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import Introduction from './components/Introduction';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import Ruler from './components/Ruler';
import { FAQ_DATA } from './constants/faqData';
// import Summary from './components/Summary';

const Main = () => {
  return (
    <MainPageWrapper>
      <OnBoarding />

      <CarouselComponentLayout>
        {/* <Summary /> */}
        <Carousel />
        <Carousel />
        <Carousel />
      </CarouselComponentLayout>
      <Ruler />
      <Introduction />
      <Manual />
      <Wrapper>
        <FaqTitle />
        {FAQ_DATA.map(({ id, question, answer }) => (
          <FaqDropdown key={id} id={id} question={question} answer={answer} />
        ))}
      </Wrapper>
    </MainPageWrapper>
  );
};

export default Main;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const MainPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const CarouselComponentLayout = styled.div`
  padding-bottom: 10rem;
`;
