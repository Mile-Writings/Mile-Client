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
import {
  MobileUnAuthorizedSidebar,
  MobileAuthorizedSidebar,
} from '../../pages/groupFeed/components/MyMobileSidebar';

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
  const { data } = useFetchHeaderGroup();
  const handleLogOut = () => {
    logout();
    navigateToHome();
  };
  useEffect(() => {
    if (data?.data?.moims) setMoims(data?.data.moims);
  }, [data?.data?.moims]);

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
                <CreateGroupBtn groupCount={data?.data.moims.length ?? 0} />
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
            groupCount={data?.data.moims.length ?? 0}
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
      <HeaderLogoIcon onClick={navigateToHome}></HeaderLogoIcon>
    </HeaderWrapper>
  );
};

// 관리자 헤더
export const AdminHeader = () => {
  const { navigateToHome } = useNavigateHome();
  return (
    <>
      <Responsive only="desktop">
        <AuthorizationHeader />
      </Responsive>
      <Responsive only="mobile">
        <HeaderWrapper>
          <HeaderLogoIcon onClick={navigateToHome} />
          <MobileHeaderButtons>
            <LinkIcon />
            <HamburgerIcon />
          </MobileHeaderButtons>
        </HeaderWrapper>
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
    padding-right: 2rem;
    padding-left: 2rem;
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
