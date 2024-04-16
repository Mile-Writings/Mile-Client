import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import GroupInfo from './components/GroupInfo';
import Title from './components/Title';
import UserInfoInput from './components/UserInfoInput';
import { useGetGroupInfo } from './hooks/queries';

import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupInvite = () => {
  const { groupId } = useParams() as { groupId: string };
  const { moimTitle, imageUrl, leader, foundedDate, memberCount, description } =
    useGetGroupInfo(groupId);

  return (
    <GroupInviteWrapper>
      <DefaultHeader />
      <Spacing marginBottom="11.4" />
      <Title />
      <Spacing marginBottom="4.8" />
      <GroupInfo
        moimTitle={moimTitle}
        imageUrl={imageUrl}
        leader={leader}
        foundedDate={foundedDate}
        memberCount={memberCount}
        description={description}
      />
      <Spacing marginBottom="2.8" />
      <UserInfoInput moimTitle={moimTitle} />
      <Spacing marginBottom="7.7" />
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
