import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import GroupInfoBox from './GroupInfoBox';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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

const GroupMobileInfo = (props: {
  groupInfoData: GroupInfoPropTypes;
  isMember: boolean | undefined;
  isOwner: boolean | undefined;
  writerName: string | undefined;
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { groupInfoData, isMember, isOwner, setShowEditProfileModal, writerName } = props;
  const { groupId } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Spacing marginBottom="2.4" />
      <GroupSideHeaderWrapper>
        {groupInfoData && (
          <>
            <MobileInfoLayout>
              <div>
                <GroupSideHeaderTitle>{groupInfoData.moimName}</GroupSideHeaderTitle>
                <Spacing marginBottom="1.6" />
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
              </div>
              <GroupSideHeaderDetailBox>{groupInfoData.description}</GroupSideHeaderDetailBox>
            </MobileInfoLayout>
            {isOwner && (
              <SideButtonWrapper>
                <SideHeaderButton onClick={() => navigate(`/admin/${groupId}`)}>
                  관리자페이지
                </SideHeaderButton>
              </SideButtonWrapper>
            )}
          </>
        )}
      </GroupSideHeaderWrapper>
      {isMember && (
        <>
          <Spacing marginBottom="1.6" />
          <MemberWrapper>
            <ProfileWrapper>
              <GroupBestProfileIc /> {writerName}
            </ProfileWrapper>
            <SideHeaderButton
              onClick={() => {
                setShowEditProfileModal(true);
              }}
            >
              소개글 수정
            </SideHeaderButton>
          </MemberWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default GroupMobileInfo;

const MobileInfoLayout = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 1.6rem;
  width: 30.3rem;
`;

const SideButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (width <= 690px) {
    width: 30.3rem;
  }

  @media screen and (width <= 540px) {
    width: 100%;
    padding-top: 1.4rem;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  min-width: 13.7rem;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.mButton1};

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const MemberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8rem;
  padding: 1.8rem;

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

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 30.3rem;
  }

  @media screen and (width <= 690px) {
    flex-direction: column;
    width: 100%;
    max-width: 30.3rem;
    height: auto;
  }

  @media screen and (width <= 540px) {
    max-width: none;
  }
`;

const GroupSideHeaderTitle = styled.div`
  align-self: flex-start;
  ${({ theme }) => theme.fonts.mTitle1};
`;

const GroupSideHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15.1rem;
  padding: 1.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  @media screen and (width <= 690px) {
    gap: 1.3rem;
    justify-content: start;
  }

  @media screen and (width <= 540px) {
    flex-direction: column;
    height: auto;
  }
`;

const GroupSideHeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const GroupSideHeaderDetailBox = styled.div`
  display: flex;
  gap: 1.2rem;
  width: 14rem;

  color: ${({ theme }) => theme.colors.gray70};
  word-break: keep-all;

  ${({ theme }) => theme.fonts.mSubtitle1};
`;
