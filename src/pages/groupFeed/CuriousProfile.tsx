import styled from '@emotion/styled';

import { GroupCuriousProfile } from '../../assets/svgs';

const CuriousProfile = () => {
  return (
    <CuriousProfileWrapper>
      <CuriousProfileLayout>
        <GroupCuriousProfile />
        <ProfileWrapper>
          <ProfileTitle>프로필명</ProfileTitle>
          <ProfileDetail>프로필 소개글이 들어갈 자리입니다.</ProfileDetail>
        </ProfileWrapper>
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
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ProfileTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const ProfileDetail = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body6};
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
