import styled from '@emotion/styled';

import { GroupDateIc, GroupLeaderIc, GroupMemberIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import Responsive from '../../../components/commons/Responsive/Responsive';

interface GroupInfoPropTypes {
  moimTitle: string | undefined;
  imageUrl: string | undefined;
  leader: string | undefined;
  foundedDate: string | undefined;
  memberCount: number | undefined;
  description: string | undefined;
}

const GroupInfo = (props: GroupInfoPropTypes) => {
  const { moimTitle, imageUrl, leader, foundedDate, memberCount, description } = props;

  return (
    <GroupInfoWrapper>
      <GroupImg src={imageUrl} alt={'모임 이미지'} />
      <GroupInfoContainer>
        <GroupName>{moimTitle}</GroupName>
        <Responsive only="desktop">
          <Spacing marginBottom="1.8" />
        </Responsive>
        <Responsive only="mobile">
          <Spacing marginBottom="1.2" />
        </Responsive>

        <GroupInfoContentWrapper>
          <GroupLeaderIc />
          <GroupInfoContent>모임방장</GroupInfoContent>
          <GroupInfoText>{leader}</GroupInfoText>
        </GroupInfoContentWrapper>
        <GroupInfoContentWrapper>
          <GroupDateIc />
          <GroupInfoContent>설립날짜</GroupInfoContent>
          <GroupInfoText>{foundedDate}~</GroupInfoText>
        </GroupInfoContentWrapper>
        <GroupInfoContentWrapper>
          <GroupMemberIc />
          <GroupInfoContent>모임인원</GroupInfoContent>
          <GroupInfoText>{memberCount}명의 작가들</GroupInfoText>
        </GroupInfoContentWrapper>
        <GroupDetailWrapper>
          <BorderBar />
          <GroupDetail>{description}</GroupDetail>
        </GroupDetailWrapper>
      </GroupInfoContainer>
    </GroupInfoWrapper>
  );
};

export default GroupInfo;

const GroupInfoWrapper = styled.section`
  display: flex;
  gap: 4.5rem;
  align-items: center;
  width: 100%;
  height: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 2.4rem;
    align-items: flex-start;
  }
`;

const GroupImg = styled.img`
  width: 36.4rem;
  height: 27.3rem;

  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 33.2rem;
    height: 18.7rem;
  }
`;

const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 41.7rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const GroupName = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title10};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle4};
  }
`;

const GroupInfoContentWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 2.4rem;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-bottom: 1.2rem;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 1.2rem;
    }
  }
`;

const GroupInfoContent = styled.span`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle6};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle1};
  }
`;

const GroupInfoText = styled.span`
  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body1};
`;

const GroupDetailWrapper = styled.section`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0.2rem;
  }
`;

const BorderBar = styled.div`
  width: 4px;

  background-color: ${({ theme }) => theme.colors.middleViolet};
  border-radius: 2px;
`;

const GroupDetail = styled.p`
  width: 100%;
  height: fit-content;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body2};
  line-height: 2.9rem;
  white-space: pre-wrap;
  word-break: keep-all;
  line-break: auto;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mBody3};
  }
`;
