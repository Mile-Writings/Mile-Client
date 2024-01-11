import styled from '@emotion/styled';

import { CURIOUS_PROFILE } from './constants/CURIOUS_PROFILE';
import { GroupCuriousProfileOpenIc } from '../../assets/svgs';

interface ProfilePropTypes {
  writerName: string;
  information: string;
}

const CuriousProfile = () => {
  return (
    <CuriousProfileWrapper>
      {CURIOUS_PROFILE.popularWriters.map((writer, index) => (
        <CuriousProfileLayout key={index}>
          <GroupCuriousProfileOpenIc />
          <ProfileWrapper>
            {writer.information == '' ? (
              <ProfileTitle>{writer.writerName}</ProfileTitle>
            ) : (
              <>
                <ProfileTitle>{writer.writerName}</ProfileTitle>
                <ProfileDetail>{writer.information}</ProfileDetail>
              </>
            )}
          </ProfileWrapper>
        </CuriousProfileLayout>
      ))}
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
