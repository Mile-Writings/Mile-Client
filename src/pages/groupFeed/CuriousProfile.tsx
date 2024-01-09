import styled from '@emotion/styled';

import { GroupCuriousProfile } from '../../assets/svgs';

const CuriousProfile = () => {
  return (
    <CuriousProfileWrapper>
      <CuriousProfileLayout>
        <GroupCuriousProfile /> 프로필명
      </CuriousProfileLayout>
    </CuriousProfileWrapper>
  );
};

export default CuriousProfile;

const CuriousProfileWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const CuriousProfileLayout = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 35.2rem;
  padding: 2.4rem;

  color: ${({ theme }) => theme.colors.gray90};

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.subtitle3};
`;
