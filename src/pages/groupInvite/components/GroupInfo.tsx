import styled from '@emotion/styled';

import { GroupDateIc, GroupLeaderIc, GroupMemberIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

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
        <Spacing marginBottom="1.8" />
        <GroupInfoContentWrapper>
          <GroupLeaderIc />
          <GroupInfoContent>모임방장</GroupInfoContent>
          <GroupInfoText>{leader}</GroupInfoText>
        </GroupInfoContentWrapper>
        <Spacing marginBottom="1.2" />
        <GroupInfoContentWrapper>
          <GroupDateIc />
          <GroupInfoContent>설립날짜</GroupInfoContent>
          <GroupInfoText>{foundedDate}~</GroupInfoText>
        </GroupInfoContentWrapper>
        <Spacing marginBottom="1.2" />
        <GroupInfoContentWrapper>
          <GroupMemberIc />
          <GroupInfoContent>모임인원</GroupInfoContent>
          <GroupInfoText>{memberCount}명의 작가들</GroupInfoText>
        </GroupInfoContentWrapper>
        <Spacing marginBottom="2.4" />
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
`;

const GroupImg = styled.img`
  width: 36.4rem;
  height: 27.3rem;

  border-radius: 8px;
`;

const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 41.7rem;
`;

const GroupName = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title10};
`;

const GroupInfoContentWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
`;

const GroupInfoContent = styled.span`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle6};
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
`;

const BorderBar = styled.div`
  width: 4px;

  background-color: ${({ theme }) => theme.colors.middleViolet};
  border-radius: 2px;
`;

const GroupDetail = styled.p`
  width: 100%;
  max-width: 41.4rem;
  height: fit-content;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body2};
  line-height: 2.9rem;
  line-break: auto;

  word-break: keep-all;
`;
