import styled from '@emotion/styled';
import useClickOutside from '../../hooks/useClickOutside';
import logout from '../../utils/logout';
import useNavigateToHome from '../../hooks/useNavigateHome';

import { useRef } from 'react';
import { LogInOutBtn } from './HeaderButton';
import CreateGroupBtn from '../../pages/groupFeed/components/CreateGroupBtn';
import useNavigateLoginWithPath from '../../hooks/useNavigateLoginWithPath';
import { Moim } from '../../pages/groupFeed/apis/fetchHeaderGroup';
import { useNavigate } from 'react-router-dom';

export const MobileUnAuthorizedSidebar = ({ onClose }: { onClose: () => void }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { navigateToLogin } = useNavigateLoginWithPath();

  useClickOutside(sidebarRef, () => {
    //헤더 이외부분 클릭시 닫히게
    if (sidebarRef.current) onClose();
  });

  return (
    <>
      <SideBarLayout ref={sidebarRef}>
        <LogInOutBtn onClick={navigateToLogin}>로그인</LogInOutBtn>
      </SideBarLayout>
    </>
  );
};

interface AuthorizedPropTypes {
  onClose: () => void;
  groupCount: number;
  groupData: Moim[] | [];
}

export const MobileAuthorizedSidebar = ({
  onClose,
  groupCount,
  groupData,
}: AuthorizedPropTypes) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { navigateToHome } = useNavigateToHome();
  const navigate = useNavigate();

  useClickOutside(sidebarRef, () => {
    //헤더 이외부분 클릭시 닫히게
    if (sidebarRef.current) onClose();
  });
  const handleLogOut = () => {
    logout();
    navigateToHome();
  };

  const handleRoutingGroupFeed = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <>
      <Background onClick={onClose} />
      <SideBarLayout>
        <LogInOutBtn onClick={handleLogOut}>로그아웃</LogInOutBtn>
        <CreateGroupBtn groupCount={groupCount} />
        <CustomLine />
        <MyGroup> 내 글 모임</MyGroup>
        <GroupList>
          {groupData?.length > 0 ? (
            groupData.map(({ moimId, moimName }: Moim) => (
              <GroupData key={moimId} onClick={() => handleRoutingGroupFeed(moimId)}>
                {moimName}
              </GroupData>
            ))
          ) : (
            <div>{`가입한 글 모임이\n 없습니다.`}</div>
          )}
        </GroupList>
      </SideBarLayout>
    </>
  );
};

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const GroupData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.9rem;
  height: 4.4rem;

  color: ${({ theme }) => theme.colors.gray70};

  cursor: pointer;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.mSubtitle2};

  :hover {
    color: black;

    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;

const MyGroup = styled.p`
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.fonts.mButton1};
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CustomLine = styled.hr`
  width: 161px;
  height: 2px;
  margin: 0.4rem 0;

  background-color: ${({ theme }) => theme.colors.gray20};
  border: none;
  border-radius: 1px; /* 선의 끝을 둥글게 설정 */
`;

const SideBarLayout = styled.div`
  position: fixed;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  width: 19.1rem;
  height: 100vh;
  padding: 1.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 16%);
`;
