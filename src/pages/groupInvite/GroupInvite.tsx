import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DefaultHeader } from '../../components/commons/Header';
import { FullModal, FullModalBtn } from '../../components/commons/modal/FullModal';
import Spacing from '../../components/commons/Spacing';
import useModal from '../../hooks/useModal';
import { useFetchHeaderGroup } from '../groupFeed/hooks/queries';
import GroupInfo from './components/GroupInfo';
import Title from './components/Title';
import UserInfoInput from './components/UserInfoInput';
import { MODAL } from './constants/modalContent';
import { useGetGroupInfo } from './hooks/queries';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import Responsive from '../../components/commons/Responsive/Responsive';

const GroupInvite = () => {
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };

  // modal 열고닫음
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  const { moimTitle, imageUrl, leader, foundedDate, memberCount, description, error, isError } =
    useGetGroupInfo(groupId);

  // 글모임 5개 가입 제한
  const { moimsData } = useFetchHeaderGroup();

  useEffect(() => {
    if (isError && isAxiosError(error)) {
      if (error.response && error.response.status) {
        const { status } = error.response;
        if (status === 400) {
          if (error.response.data.status === 40010 || error.response.data.status === 40014) {
            alert('존재하지 않는 글모임입니다.');
            navigate('/');
          } else if (error.response.data.status === 40016) {
            alert('이미 가입한 모임입니다.');
            navigate(`/group/${groupId}`);
          }
        } else if (status === 404) {
          alert('존재하지 않는 글모임입니다.');
          navigate('/');
        } else if (status === 500) {
          alert('예상치 못한 에러입니다. 다시 시도해주세요.');
          navigate('/error');
        } else {
          console.error('groupInvite' + status, error.response.data.status);
        }
      }
    }
  }, [error, isError, groupId]);

  useEffect(() => {
    if (moimsData && moimsData?.length >= 5) {
      handleShowModal();
    }
  }, [moimsData?.length]);

  return (
    <>
      <DefaultHeader />
      <GroupInviteWrapper>
        <Responsive only="desktop">
          <Spacing marginBottom="11.4" />
        </Responsive>
        <Responsive only="mobile">
          <Spacing marginBottom="9.9" />
        </Responsive>
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
        <Responsive only="desktop">
          <Spacing marginBottom="2.8" />
        </Responsive>
        <Responsive only="mobile">
          <Spacing marginBottom="3" />
        </Responsive>
        <UserInfoInput moimTitle={moimTitle} />

        <Spacing marginBottom="7.7" />
      </GroupInviteWrapper>
      <FullModal isModalOpen={isModalOpen} content={MODAL.ALERT_GROUP_LIMIT}>
        <FullModalBtn
          isPrimary={false}
          content="확인"
          onClick={() => {
            handleCloseModal();
            navigate('/');
          }}
        />
      </FullModal>
    </>
  );
};

export default GroupInvite;

const GroupInviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82.6rem;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 100%;
    padding: 0 2rem;
  }
`;
