import styled from '@emotion/styled';

import Button from './Button';
import LogInOutBtn from './LogInOutBtn';
import { HeaderLogoSvg } from '../../assets/svgs';
import MakeGroupBtn from '../../pages/groupFeed/MakeGroupBtn';
import MyGroupBtn from '../../pages/groupFeed/MyGroupBtn';
import theme from '../../styles/theme';

// 모임 피드 헤더
export const GroupFeedHeader = () => {
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <HeaderBtnLayout>
        <MyGroupBtn />
        <CommonBtnLayout>
          <MakeGroupBtn />
          <LogInOutBtn>로그아웃</LogInOutBtn>
        </CommonBtnLayout>
      </HeaderBtnLayout>
    </HeaderWrapper>
  );
};

//아직 로그인을 하지 않았을 때 헤더
export const LogOutHeader = () => {
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <LogInOutBtn>로그인</LogInOutBtn>
    </HeaderWrapper>
  );
};

//에디터 창에서 글을 수정하고 있을 때 헤더
export const EditorHeader = () => {
  const handleTempSave = () => {
    console.log('임시저장');
  };
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <Button typeName="submitEditType" onClick={handleTempSave}>
        수정 완료하기
      </Button>
    </HeaderWrapper>
  );
};

//에디터 창에서 글을 쓰고 있을 때
export const EditorHeaderTemp = () => {
  const handleTempSave = () => {
    console.log('임시저장');
  };
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      <CommonBtnLayout>
        <Button typeName="deleteTempType" onClick={handleTempSave}>
          임시저장
        </Button>
        <Button typeName="submitEditType" onClick={handleTempSave}>
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

  border-bottom: 1px solid ${theme.colors.gray30};
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
