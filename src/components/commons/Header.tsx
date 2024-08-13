import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import LogInOutBtn from './LogInOutBtn';

import { HeaderLogoIc } from '../../assets/svgs';
import useNavigateHome from '../../hooks/useNavigateHome';
import useNavigateLoginWithPath from '../../hooks/useNavigateLoginWithPath';
import { Moim } from '../../pages/groupFeed/apis/fetchHeaderGroup';
import CreateGroupBtn from '../../pages/groupFeed/components/CreateGroupBtn';
import MyGroupDropDown from '../../pages/groupFeed/components/MyGroupDropDown';
import { useFetchHeaderGroup } from '../../pages/groupFeed/hooks/queries';
import logout from '../../utils/logout';

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
  const navigate = useNavigate();

  const { navigateToHome } = useNavigateHome();
  const { data, error } = useFetchHeaderGroup();

  const handleLogOut = () => {
    logout();
    location.reload();
  };

  useEffect(() => {
    if (data?.data?.moims) setMoims(data?.data.moims);
  }, [data?.data?.moims]);

  if (isAxiosError(error)) {
    if (error.response?.data.status === 40103) {
      navigate('/login');
    }
  }

  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <HeaderLayout>
        <MyGroupDropDown groupData={moims ?? []} />
        <HeaderBtnContainer>
          <CreateGroupBtn groupCount={data?.data.moims.length ?? 0} />
          <LogInOutBtn onClick={handleLogOut}>로그아웃</LogInOutBtn>
        </HeaderBtnContainer>
      </HeaderLayout>
    </HeaderWrapper>
  );
};

// 로그아웃된 경우 헤더
export const UnAuthorizationHeader = () => {
  const { navigateToHome } = useNavigateHome();
  const { navigateToLogin } = useNavigateLoginWithPath();

  return (
    <HeaderWrapper>
      <HeaderLogoIcon onClick={navigateToHome} />
      <LogInOutBtn onClick={navigateToLogin}>로그인</LogInOutBtn>
    </HeaderWrapper>
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

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0%;
  z-index: 4;
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
  cursor: pointer;
`;
