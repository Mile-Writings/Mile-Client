import styled from '@emotion/styled';

import GroupInfo from './components/GroupInfo';
import GroupJoinCongrats from './components/GroupJoinCongrats';
import Title from './components/Title';
import UserInfoInput from './components/UserInfoInput';

import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupInvite = () => {
  return (
    <GroupInviteWrapper>
      <DefaultHeader />
      <Spacing marginBottom="11.4" />
      <Title />
      <Spacing marginBottom="4.8" />
      <GroupInfo />
      <Spacing marginBottom="2.8" />
      <UserInfoInput />
      <Spacing marginBottom="2.8" />
      <SignUpBtn>가입하기</SignUpBtn>
      <Spacing marginBottom="7.7" />
      {/* <GroupJoinCongrats /> */}
    </GroupInviteWrapper>
  );
};

export default GroupInvite;

const GroupInviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82.6rem;
`;

const SignUpBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem 2rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
