import styled from '@emotion/styled';

import Footer from '../../components/commons/Footer';
import Spacing from '../../components/commons/Spacing';
import Carousel from './components/Carousel';
import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import GroupTitle from './components/GroupTitle';
import Introduction from './components/Introduction';
import Manual from './components/Manual';
import Ruler from './components/Ruler';
import { FAQ_DATA } from './constants/faqData';

const Main = () => {
  return (
    <MainPageWrapper>
      <CarouselComponentLayout>
        <GroupTitle />
        <Carousel />
        <Carousel />
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
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const CarouselComponentLayout = styled.div`
  padding-bottom: 10rem;
`;
