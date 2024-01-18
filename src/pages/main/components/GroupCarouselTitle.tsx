import styled from '@emotion/styled';

const GroupCarouselTitle = () => {
  return <TextWrapper>마일과 함께하고 있는 글 모임이에요</TextWrapper>;
};
export default GroupCarouselTitle;

const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 7.2rem;

  ${({ theme }) => theme.fonts.title3};
`;
