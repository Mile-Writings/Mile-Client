import React from 'react';

import styled from '@emotion/styled';

import { GroupCuriousProfile } from '../../assets/svgs';

const CuriousProfile = () => {
  return (
    <CuriousProfileWrapper>
      <GroupCuriousProfile /> 프로필명
    </CuriousProfileWrapper>
  );
};

export default CuriousProfile;

const CuriousProfileWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  padding: 2.4rem;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.colors.white}
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;
