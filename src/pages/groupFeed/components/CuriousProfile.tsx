import styled from '@emotion/styled';

import { GroupBestProfileIc, GroupNoDataImgIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface ProfilePropTypes {
  writerName: string;
}

interface CuriousProfilePropTypes {
  mostCuriousWriter?: {
    writerName: string;
  }[];
}

const CuriousProfile = (props: CuriousProfilePropTypes) => {
  const { mostCuriousWriter } = props;

  return (
    <CuriousProfileWrapper>
      {mostCuriousWriter?.length === 0 ? (
        <NoCuriousProfileeWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직 궁금해요를 받은 필명의 글쓴이가 없어요
          <Spacing marginBottom="4" />
        </NoCuriousProfileeWrapper>
      ) : (
        mostCuriousWriter?.map((writer: ProfilePropTypes, index: number) => (
          <CuriousProfileLayout key={index}>
            <GroupBestProfileIc />
            <ProfileWrapper>
              <ProfileTitle>{writer.writerName}</ProfileTitle>
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
  width: 100%;
`;

const ProfileTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
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
