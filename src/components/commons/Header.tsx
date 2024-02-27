import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import LogInOutBtn from './LogInOutBtn';

import { HeaderLogoIc } from '../../assets/svgs';
import useNavigateHome from '../../hooks/useNavigateHome';
import MakeGroupBtn from '../../pages/groupFeed/components/MakeGroupBtn';
import MyGroupBtn from '../../pages/groupFeed/components/MyGroupBtn';
import logout from '../../utils/logout';

interface OnClickProps {
  onClick: () => void;
}

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
// main 페이지, group 페이지, postDetail 페이지 로그인 상태일때 헤더
export const GroupFeedHeader = () => {
  const navigate = useNavigate();
  const handleMainRouting = () => {
    navigate('/');
  };
  const handleLogOut = () => {
    logout();
    location.reload();
  };
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={handleMainRouting} />
      <HeaderBtnLayout>
        <MyGroupBtn />
        <CommonBtnLayout>
          <MakeGroupBtn />
          <LogInOutBtn onClick={handleLogOut}>로그아웃</LogInOutBtn>
        </CommonBtnLayout>
      </HeaderBtnLayout>
    </HeaderWrapper>
  );
};

//아직 로그인을 하지 않았을 때 헤더
export const LogOutHeader = ({ onClick }: OnClickProps) => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <LogInOutBtn onClick={onClick}>로그인</LogInOutBtn>
    </HeaderWrapper>
  );
};

//에디터 창에서 글을 수정하고 있을 때 헤더
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
      <CommonBtnLayout>
        <Button typeName="deleteTempType" onClick={onClickTempSave}>
          임시저장
        </Button>
        <Button typeName="submitEditType" onClick={onClickSubmit}>
          글 제출하기
        </Button>
      </CommonBtnLayout>
    </HeaderWrapper>
  );
};

// 임시저장 글 존재 O -> 에디터 창에서 글을 쓰고 있을 때
export const EditorTempExistHeader = ({ onClickSubmit }: OnClickTempExistProps) => {
  const { navigateToHome } = useNavigateHome();
  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <CommonBtnLayout>
        <Button typeName="submitEditType" onClick={onClickSubmit}>
          글 제출하기
        </Button>
      </CommonBtnLayout>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding-right: 6rem;
  padding-left: 6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
`;

const HeaderBtnLayout = styled.div`
  display: flex;
  align-items: center;
  height: 6.4rem;
`;

const CommonBtnLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  height: 6.4rem;
`;

const HeaderLogoIcon = styled(HeaderLogoIc)`
  cursor: pointer;
`;
