import styled from '@emotion/styled';

import GroupInfoBox from './GroupInfoBox';
import { GroupDateIc, GroupLeaderIc, GroupMemberIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface GroupInfoPropTypes {
  moimName: string;
  ownerName: string;
  startDate: string;
  writerCount: number;
  description: string;
}

interface GroupSideHeaderProps {
  groupInfoData: GroupInfoPropTypes;
}

const GroupSideHeader = (props: GroupSideHeaderProps) => {
  const { groupInfoData } = props;
  console.log(groupInfoData);

  return (
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
          <Spacing marginBottom="2.4" />
          <GroupSideHeaderDetailBox>
            <DetailBoxRect />
            {groupInfoData?.description}
          </GroupSideHeaderDetailBox>{' '}
        </>
      )}
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
