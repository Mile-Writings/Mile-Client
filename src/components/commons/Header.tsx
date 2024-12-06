import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Button from './Button';
import { LogInOutBtn } from './HeaderButton';

import { HamburgerIc, HeaderLogoIc, LinkIc } from '../../assets/svgs';
import {
  default as useNavigateHome,
  default as useNavigateToHome,
} from '../../hooks/useNavigateHome';
import useNavigateLoginWithPath from '../../hooks/useNavigateLoginWithPath';
import { Moim } from '../../pages/groupFeed/apis/fetchHeaderGroup';
import CreateGroupBtn from '../../pages/groupFeed/components/CreateGroupBtn';
import MyGroupDropDown from '../../pages/groupFeed/components/MyGroupDropDown';
import { useFetchHeaderGroup } from '../../pages/groupFeed/hooks/queries';
import logout from '../../utils/logout';

import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import Responsive from './Responsive/Responsive';
import { MobileUnAuthorizedSidebar, MobileAuthorizedSidebar } from './MyMobileSidebar';

import { useParams } from 'react-router-dom';
import { useFetchInvitationLink } from '../../pages/admin/hooks/queries';
import { copyLink } from '../../utils/copyLink';

interface onClickEditProps {
  onClickEditSave: () => void;
}

interface OnClickTwoProps {
  onClickTempSave: () => void;
  onClickSubmit: () => void;
}

interface OnClickTempExistProps {
  onClickSubmit: () => void;
}

// 로그인된 경우 헤더
export const AuthorizationHeader = () => {
  const [moims, setMoims] = useState<Moim[]>([]);
  const { navigateToHome } = useNavigateToHome();
  const { moimsData } = useFetchHeaderGroup();
  const handleLogOut = () => {
    logout();
    navigateToHome();
  };
  useEffect(() => {
    if (moimsData) setMoims(moimsData);
  }, [moimsData]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Responsive only="desktop">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <HeaderLayout>
            <MyGroupDropDown groupData={moims ?? []} />
            <HeaderBtnContainer>
              <CreateGroupWrapper>
                <CreateGroupBtn groupCount={moimsData?.length ?? 0} />
              </CreateGroupWrapper>
              <LogInOutBtn onClick={handleLogOut}>로그아웃</LogInOutBtn>
            </HeaderBtnContainer>
          </HeaderLayout>
        </HeaderWrapper>
      </Responsive>
      <Responsive only="mobile">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <MobileHeaderButtons>
            <HamburgerIcon
              onClick={() => {
                setIsSidebarOpen(true);
              }}
            />
          </MobileHeaderButtons>
        </HeaderWrapper>
        {isSidebarOpen && (
          <MobileAuthorizedSidebar
            onClose={() => {
              setIsSidebarOpen(false);
            }}
            groupCount={moimsData?.length ?? 0}
            groupData={moims ?? []}
          />
        )}
      </Responsive>
    </>
  );
};

// 로그아웃된 경우 헤더
export const UnAuthorizationHeader = () => {
  const { navigateToHome } = useNavigateHome();
  const { navigateToLogin } = useNavigateLoginWithPath();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Responsive only="desktop">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <LogInWrapper>
            <LogInOutBtn onClick={navigateToLogin}>로그인</LogInOutBtn>
          </LogInWrapper>
        </HeaderWrapper>
      </Responsive>
      <Responsive only="mobile">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <MobileHeaderButtons>
            <HamburgerIcon
              onClick={() => {
                setIsSidebarOpen(true);
              }}
            />
          </MobileHeaderButtons>
        </HeaderWrapper>
        {isSidebarOpen && (
          <MobileUnAuthorizedSidebar
            onClose={() => {
              setIsSidebarOpen(false);
            }}
          />
        )}
      </Responsive>
    </>
  );
};

// 에디터 창에서 글을 수정하고 있을 때 헤더
export const EditorEditHeader = ({ onClickEditSave }: onClickEditProps) => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <Button typeName="submitEditType" onClick={onClickEditSave}>
        수정 완료하기
      </Button>
    </HeaderWrapper>
  );
};

// 임시저장 글 존재 X -> 에디터 창에서 글을 쓰고 있을 때
export const EditorTempNotExistHeader = ({ onClickTempSave, onClickSubmit }: OnClickTwoProps) => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <HeaderBtnContainer>
        <Button typeName="deleteTempType" onClick={onClickTempSave}>
          임시저장
        </Button>
        <Button typeName="submitEditType" onClick={onClickSubmit}>
          글 제출하기
        </Button>
      </HeaderBtnContainer>
    </HeaderWrapper>
  );
};

// 임시저장 글 존재 O -> 에디터 창에서 글을 쓰고 있을 때
export const EditorTempExistHeader = ({ onClickSubmit }: OnClickTempExistProps) => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <HeaderBtnContainer>
        <Button typeName="submitEditType" onClick={onClickSubmit}>
          글 제출하기
        </Button>
      </HeaderBtnContainer>
    </HeaderWrapper>
  );
};

// 로고만 있는 헤더
export const DefaultHeader = () => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
    </HeaderWrapper>
  );
};

// 관리자 헤더
export const AdminHeader = () => {
  const { navigateToHome } = useNavigateHome();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [moims, setMoims] = useState<Moim[]>([]);
  const { moimsData } = useFetchHeaderGroup();
  const { groupId } = useParams();
  const { invitationCode } = useFetchInvitationLink(groupId);

  const handleCopyLink = (invitationCode: string) => {
    copyLink(import.meta.env.VITE_INVITE_URL + `group/${invitationCode}/groupInvite`);
  };

  const handleInviteBtnClick = () => {
    handleCopyLink(invitationCode?.invitationCode || '');
  };

  useEffect(() => {
    if (moimsData) setMoims(moimsData);
  }, [moimsData]);
  return (
    <>
      <Responsive only="desktop">
        <AuthorizationHeader />
      </Responsive>
      <Responsive only="mobile">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <MobileHeaderButtons>
            <LinkIcon type="button" onClick={handleInviteBtnClick} />
            <HamburgerIcon
              onClick={() => {
                setIsSidebarOpen(true);
              }}
            />
          </MobileHeaderButtons>
        </HeaderWrapper>
        {isSidebarOpen && (
          <MobileAuthorizedSidebar
            onClose={() => {
              setIsSidebarOpen(false);
            }}
            groupCount={moimsData?.length ?? 0}
            groupData={moims ?? []}
          />
        )}
      </Responsive>
    </>
  );
};

const LogInWrapper = styled.div`
  width: 8.1rem;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 5.6rem;
    padding: 0 2rem;
  }
`;

const LinkIcon = styled(LinkIc)`
  cursor: pointer;
`;
const HamburgerIcon = styled(HamburgerIc)`
  cursor: pointer;
`;

const MobileHeaderButtons = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  ${({ theme }) => theme.fonts.mSubtitle4};
`;

const HeaderLayout = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  height: 6.4rem;
`;

const HeaderBtnContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  height: 6.4rem;
`;

const HeaderLogoIcon = styled(HeaderLogoIc)`
  flex-shrink: 0;

  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 7rem;
    height: 1.68rem;
  }
`;

const CreateGroupWrapper = styled.div`
  width: 13.6rem;
`;
