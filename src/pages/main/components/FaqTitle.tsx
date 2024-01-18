import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';

const FaqTitle = () => {
  return (
    <>
      <TitleText>자주 묻는 질문이에요</TitleText>
      <Spacing marginBottom="3.6" />
    </>
  );
};

export default FaqTitle;

const TitleText = styled.p`
  ${({ theme }) => theme.fonts.title3};
`;
