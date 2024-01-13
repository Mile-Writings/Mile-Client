import styled from '@emotion/styled';

import GroupInfoBox from './GroupInfoBox';
import { GroupDateIc, GroupLeaderIc, GroupMemberIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { useGroupInfo } from '../hooks/queries';

interface GroupSideHeaderPropTypes {
  groupId: string | undefined;
}

const GroupSideHeader = (props: GroupSideHeaderPropTypes) => {
  const { groupId } = props;
  const { groupInfoData, isLoading, isError, error } = useGroupInfo(groupId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data..{error?.message}</div>;
  }

  console.log(groupInfoData, 'data');

  return (
    <GroupSideHeaderWrapper>
      <GroupSideHeaderTitle>{groupInfoData.moimName}</GroupSideHeaderTitle>
      <Spacing marginBottom="2.8" />
      <GroupSideHeaderLayout>
        <GroupInfoBox icon={<GroupLeaderIc />} title="모임방장" detail={groupInfoData.ownerName} />
        <GroupInfoBox icon={<GroupDateIc />} title="설립날짜" detail={groupInfoData.startDate} />
        <GroupInfoBox
          icon={<GroupMemberIc />}
          title="모임인원"
          detail={`${groupInfoData.writerCount}명의 작가들`}
        />
      </GroupSideHeaderLayout>
      <Spacing marginBottom="2.4" />
      <GroupSideHeaderDetailBox>
        <DetailBoxRect />
        {groupInfoData.description}
      </GroupSideHeaderDetailBox>
    </GroupSideHeaderWrapper>
  );
};

export default GroupSideHeader;

const GroupSideHeaderTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title3};
`;

const GroupSideHeaderWrapper = styled.div`
  position: sticky;
  top: 2rem;
  width: 27.7rem;
  height: 34.2rem;
`;

const GroupSideHeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const DetailBoxRect = styled.div`
  width: 0.4rem;
  height: 7rem;

  background-color: ${({ theme }) => theme.colors.mileGreen};
  border-radius: 2px;
`;

const GroupSideHeaderDetailBox = styled.div`
  display: flex;
  gap: 1.2rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body2};
`;
