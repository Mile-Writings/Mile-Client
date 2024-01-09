import styled from '@emotion/styled';

import Button from './Button';
import LogInOutBtn from './LogInOutBtn';
import MyGroupBtn from './MyGroupBtn';
import { HeaderLogoSvg, MakeGroupPlusBtn, MakeGroupPlusHoverBtn } from '../../assets/svgs';
import theme from '../../styles/theme';

const Header = () => {
  const token = sessionStorage.getItem('token');
  const handleMakeGroup = () => {
    console.log('makeGroup');
  };
  return (
    <HeaderWrapper>
      <HeaderLogoSvg />
      {token ? (
        <HeaderBtnLayout>
          <LogInOutBtn>로그아웃</LogInOutBtn>
          <Button typeName="submitEditType" onClick={handleMakeGroup}>
            <MakeGroupPlusBtn />
            글모임 만들기
          </Button>
          <MyGroupBtn />
        </HeaderBtnLayout>
      ) : (
        <HeaderBtnLayout>
          <MyGroupBtn />
          <Button typeName="submitEditType" onClick={handleMakeGroup}>
            <ButtonContainer>
              <MakeGroupPlusBtn />
              글모임 만들기
            </ButtonContainer>
          </Button>
          <LogInOutBtn>로그인</LogInOutBtn>
        </HeaderBtnLayout>
      )}
    </HeaderWrapper>
  );
};

export default Header;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;
