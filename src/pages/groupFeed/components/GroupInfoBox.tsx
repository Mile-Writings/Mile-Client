import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface GroupInfoPropTypes {
  icon: ReactNode;
  title: string;
  detail: string;
}

const GroupInfoBox = (infoProps: GroupInfoPropTypes) => {
  const { icon, title, detail } = infoProps;
  return (
    <GroupInfoBoxWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <TitleText>{title}</TitleText>
      <DetailText>{detail}</DetailText>
    </GroupInfoBoxWrapper>
  );
};

export default GroupInfoBox;

const IconWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 1.6rem;
    height: 1.6rem;
  }

  svg {
    width: 100%; /* SVG 아이콘에 크기 적용 */
    height: 100%;
  }
`;

const GroupInfoBoxWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0.4rem;
  }
`;

const TitleText = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle6}

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1}
  }
`;

const DetailText = styled.div`
  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body1};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;
