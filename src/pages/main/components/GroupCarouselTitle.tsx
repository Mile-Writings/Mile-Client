import styled from '@emotion/styled';

const Summary = () => {
  return <TextBox>베스트 활동 모임 3개와 글 각 4개</TextBox>;
};

export default Summary;

const TextBox = styled.div`
  padding-top: 7.2rem;
  padding-left: 21.8rem;
  ${({ theme }) => theme.fonts.title3};
`;
