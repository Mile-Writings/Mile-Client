import styled from '@emotion/styled';

const GroupTitle = () => {
  return <TextWrapper>마일과 함께하고 있는 글 모임이에요</TextWrapper>;
};
export default GroupTitle;

const TextWrapper = styled.div`
  padding-top: 7.2rem;
  padding-left: 21.8rem;
  ${({ theme }) => theme.fonts.title3};
`;
