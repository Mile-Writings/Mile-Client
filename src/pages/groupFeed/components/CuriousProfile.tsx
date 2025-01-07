import styled from '@emotion/styled';

import { GroupBestProfileIc, GroupNoDataImgIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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
        <NoCuriousProfileWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직 궁금해요를 받은 필명의 글쓴이가 없어요
          <Spacing marginBottom="4" />
        </NoCuriousProfileWrapper>
      ) : (
        mostCuriousWriter?.map((writer: ProfilePropTypes, index: number) => (
          <CuriousProfileLayout key={index}>
            <GroupBestProfileIcon />
            <ProfileTitle>{writer.writerName}</ProfileTitle>
          </CuriousProfileLayout>
        ))
      )}
    </CuriousProfileWrapper>
  );
};

export default CuriousProfile;

const GroupBestProfileIcon = styled(GroupBestProfileIc)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 5rem;
    height: 5rem;
  }
`;

const CuriousProfileWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 3.2rem;
  }
`;

const ProfileTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 0.8rem;
    height: 10.6rem;
    padding: 1.4rem;

    &:only-child {
      width: 100vw;
    }

    &:nth-child(1):nth-last-child(2),
    &:nth-child(2):nth-last-child(1) {
      width: 50vw;
    }
  }
`;

const NoCuriousProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 22rem;

  color: ${({ theme }) => theme.colors.gray40};

  ${({ theme }) => theme.fonts.subtitle3};
`;
