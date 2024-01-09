import React, { ReactNode } from 'react';

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
`;

const TitleText = styled.div`
  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body6}
`;

const DetailText = styled.div`
  color: ${theme.colors.gray80};

  ${({ theme }) => theme.fonts.body6}
`;
