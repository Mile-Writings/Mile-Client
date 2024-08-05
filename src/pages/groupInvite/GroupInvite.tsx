import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import GroupInfo from './components/GroupInfo';
import Title from './components/Title';
import UserInfoInput from './components/UserInfoInput';
import { useGetGroupInfo } from './hooks/queries';

import Loading from '../loading/Loading';

import { DefaultHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';
import useNavigateLoginWithPath from '../../hooks/useNavigateLoginWithPath';

const GroupInvite = () => {
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };
  const [errorLoading, setErrorLoading] = useState(false);
  const { moimTitle, imageUrl, leader, foundedDate, memberCount, description, error } =
    useGetGroupInfo(groupId);
  const { navigateToLogin } = useNavigateLoginWithPath();

  useEffect(() => {
    moimTitle === undefined ? setErrorLoading(true) : setErrorLoading(false);
  }, [moimTitle]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status) {
        const { status } = error.response;
        if (status === 400) {
          alert('이미 가입한 모임입니다!');
          navigate(`/group/${groupId}`);
        } else if (status === 404) {
          alert('해당 모임은 존재하지 않습니다!');
          navigate(`/`);
        } else if (status === 401) {
          navigateToLogin();
        }
      }
    }
  }, [error, groupId]);

  if (errorLoading) {
    return <Loading />;
  } else {
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
  }
};

export default GroupInvite;

const GroupInviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82.6rem;
`;
