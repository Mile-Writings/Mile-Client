import styled from '@emotion/styled';

import FaqDropdown from './components/FaqDropdown';
import FaqTitle from './components/FaqTitle';
import { FAQ_DATA } from './constants/faqData';

const Main = () => {
  return (
    <Wrapper>
      <FaqTitle />
      {FAQ_DATA.map(({ id, question, answer }) => (
        <FaqDropdown key={id} id={id} question={question} answer={answer} />
      ))}
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;
