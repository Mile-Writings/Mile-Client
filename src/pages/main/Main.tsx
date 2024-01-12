import styled from '@emotion/styled';

import OnBoarding from './components/OnBoarding';

const Main = () => {
  return (
    <Wrapper>
      <OnBoarding />
      {/* <FaqTitle />
      {FAQ_DATA.map(({ id, question, answer }) => (
        <FaqDropdown key={id} id={id} question={question} answer={answer} />
      ))} */}
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;
