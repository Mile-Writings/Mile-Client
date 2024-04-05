import styled from '@emotion/styled';

import GroupInfoBox from './GroupInfoBox';

import {
  GroupDateIc,
  GroupLeaderIc,
  GroupMemberIc,
  GroupBestProfileIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface GroupInfoPropTypes {
  moimName: string;
  ownerName: string;
  startDate: string;
  writerCount: number;
  description?: string;
}

const GroupSideHeader = (props: { groupInfoData: GroupInfoPropTypes }) => {
  const { groupInfoData } = props;

  return (
    <HeaderWrapper>
      <GroupSideHeaderWrapper>
        {groupInfoData && (
          <>
            <GroupSideHeaderTitle>{groupInfoData.moimName}</GroupSideHeaderTitle>
            <Spacing marginBottom="2.8" />
            <GroupSideHeaderLayout>
              <GroupInfoBox
                icon={<GroupLeaderIc />}
                title="모임방장"
                detail={groupInfoData.ownerName}
              />
              <GroupInfoBox
                icon={<GroupDateIc />}
                title="설립날짜"
                detail={groupInfoData.startDate}
              />
              <GroupInfoBox
                icon={<GroupMemberIc />}
                title="모임인원"
                detail={`${groupInfoData.writerCount}명의 작가들`}
              />
            </GroupSideHeaderLayout>
            <Spacing marginBottom="2" />
            <GroupSideHeaderDetailBox>{groupInfoData.description}</GroupSideHeaderDetailBox>
            <Spacing marginBottom="2" />
            <SideHeaderButton>관리자페이지</SideHeaderButton>
          </>
        )}
      </GroupSideHeaderWrapper>
      <Spacing marginBottom="1.6" />
      <MemberSideHeaderWrapper>
        <ProfileWrapper>
          <GroupBestProfileIc /> 일이삼사
        </ProfileWrapper>
        <Spacing marginBottom="1.6" />
        <SideHeaderButton>소개글 수정</SideHeaderButton>
      </MemberSideHeaderWrapper>
    </HeaderWrapper>
  );
};

export default GroupSideHeader;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const MemberSideHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25.6rem;
  height: fit-content;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const SideHeaderButton = styled.button`
  width: 20.8rem;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 8px;
  ${({ theme }) => theme.fonts.button3};
`;

const GroupSideHeaderTitle = styled.div`
  align-self: flex-start;
  ${({ theme }) => theme.fonts.title13};
`;

const GroupSideHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25.6rem;
  height: fit-content;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const GroupSideHeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const GroupSideHeaderDetailBox = styled.div`
  display: flex;
  gap: 1.2rem;

  color: ${({ theme }) => theme.colors.gray70};
  word-break: keep-all;

  ${({ theme }) => theme.fonts.body2};
`;
