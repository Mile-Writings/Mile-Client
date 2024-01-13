import styled from '@emotion/styled';

import { GroupBestProfileIc, GroupNoDataImgIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { CURIOUS_PROFILE } from '../constants/CURIOUS_PROFILE';

interface ProfilePropTypes {
  writerName: string;
  information: string;
}

const CuriousProfile = () => {
  return (
    <CuriousProfileWrapper>
      {CURIOUS_PROFILE.popularWriters.length == 0 ? (
        <NoCuriousProfileeWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직은 굼금해요를 많이 받은 작가가 없어요
          <Spacing marginBottom="4" />
        </NoCuriousProfileeWrapper>
      ) : (
        CURIOUS_PROFILE.popularWriters.map((writer: ProfilePropTypes, index: number) => (
          <CuriousProfileLayout key={index}>
            <GroupBestProfileIc />
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
        ))
      )}
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

const NoCuriousProfileeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 22rem;

  color: ${({ theme }) => theme.colors.gray40};

  ${({ theme }) => theme.fonts.subtitle3};
`;
