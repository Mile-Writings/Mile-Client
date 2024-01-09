import styled from '@emotion/styled';

const MyGroupBtn = () => {
  return <MyGroupBtnWrapper>내 글 모임</MyGroupBtnWrapper>;
};

export default MyGroupBtn;

const MyGroupBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 6.2rem;

  color: ${({ theme }) => theme.colors.gray70};
  text-align: center;

  ${({ theme }) => theme.fonts.subtitle6}

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;
