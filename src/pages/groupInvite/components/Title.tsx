import styled from '@emotion/styled';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

const Title = () => {
  return (
    <TitleWrapper>
      <InviteText1>글 모임에 초대되었어요</InviteText1>
      <InviteText2>초대된 글 모임에 가입해볼까요?</InviteText2>
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  justify-content: flex-start;
  width: 100%;
`;

const InviteText1 = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle4};
  }
`;

const InviteText2 = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};

  ${({ theme }) => theme.fonts.title1};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle6};
  }
`;
