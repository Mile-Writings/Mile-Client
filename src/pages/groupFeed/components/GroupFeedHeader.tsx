import styled from '@emotion/styled';

import MakeGroupBtn from './MakeGroupBtn';
import MyGroupBtn from './MyGroupBtn';

import { HeaderLogoIc } from '../../../assets/svgs';
import Button from '../../../components/commons/Button';
import LogInOutBtn from '../../../components/commons/LogInOutBtn';
import logout from '../../../utils/logout';

interface OnClickProps {
  onClick: () => void;
}

// interface onClickEditProps {
//   onClickEditSave: () => void;
// }

// interface OnClickTwoProps {
//   onClickTempSave: () => void;
//   onClickSubmit: () => void;
// }

// interface OnClickTempExistProps {
//   onClickSubmit: () => void;
// }

// 모임 피드 헤더
export const GroupFeedHeader = () => {
  const logout2 = () => {
    localStorage.removeItem('accessToken');
    console.log('removed');
  };
  return (
    <HeaderWrapper>
      <HeaderLogoIc />
      <HeaderBtnLayout>
        <MyGroupBtn />
        <CommonBtnLayout>
          <MakeGroupBtn />
          <LogInOutBtn onClick={logout2}>로그아웃</LogInOutBtn>
        </CommonBtnLayout>
      </HeaderBtnLayout>
    </HeaderWrapper>
  );
};

//아직 로그인을 하지 않았을 때 헤더
export const LogOutHeader = ({ onClick }: OnClickProps) => {
  return (
    <HeaderWrapper>
      <HeaderLogoIc />
      <LogInOutBtn onClick={onClick}>로그인</LogInOutBtn>
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
