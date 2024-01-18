import styled from '@emotion/styled';

import CarouselPage from './components/CarouselPage';
import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import Introduction from './components/Introduction';
import { LogInHeader, UnAuthorizationHeader } from './components/MainHeader';
import Manual from './components/Manual';
import OnBoarding from './components/OnBoarding';
import Ruler from './components/Ruler';
import { FAQ_DATA } from './constants/faqData';

import Footer from './../../components/commons/Footer';
import Spacing from './../../components/commons/Spacing';

const Main = () => {
  return (
    <MainPageWrapper>
      {localStorage.getItem('accessToken') ? <LogInHeader /> : <UnAuthorizationHeader />}
      <OnBoarding />
      <CarouselPage />
      <Ruler />
      <Introduction />
      <Manual />
      <FaqTitleWithDropDownLayout>
        <FaqTitle />
        {FAQ_DATA.map(({ id, question, answer }) => (
          <FaqDropdown key={id} id={id} question={question} answer={answer} />
        ))}
      </FaqTitleWithDropDownLayout>
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

const FaqTitleWithDropDownLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
