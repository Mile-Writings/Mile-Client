import styled from '@emotion/styled';

import GroupInfo from './components/GroupInfo';
import Title from './components/Title';
import WriterName from './components/WriterName';

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
      <WriterName />
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
