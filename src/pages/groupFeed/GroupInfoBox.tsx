import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface GroupInfoPropTypes {
  icon: ReactNode;
  title: string;
  detail: string;
}

const GroupInfoBox = (infoProps: GroupInfoPropTypes) => {
  const { icon, title, detail } = infoProps;
  return (
    <GroupInfoBoxWrapper>
      {icon}
      <TitleText>{title}</TitleText>
      <DetailText>{detail}</DetailText>
    </GroupInfoBoxWrapper>
  );
};

export default GroupInfoBox;

const GroupInfoBoxWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const TitleText = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.subtitle6}
`;

const DetailText = styled.div`
  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.body1};
`;
