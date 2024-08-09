import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Carousel from './carousel/Carousel';
import CuriousArticle from './components/CuriousArticle';
import CuriousProfile from './components/CuriousProfile';
import EditProfileModal from './components/EditProfileModal';
import GroupCuriousTitle from './components/GroupCuriousTitle';
import GroupSideHeader from './components/GroupSideHeader';
import GroupTodayWriteStyle from './components/GroupTodayWriteStyle';
import {
  useFetchWriterNameOnly,
  useGroupFeedAuth,
  useGroupFeedPublicStatus,
  useGroupInfo,
} from './hooks/queries';

import Error from '../error/Error';
import Loading from '../loading/Loading';

import { GroupFloatingBtnIc, GroupThumbnailImgIc } from '../../assets/svgs';
import Footer from '../../components/commons/Footer';
import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  const { groupId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const {
    isMember,
    isOwner,
    isLoading: isAuthLoading,
    isError,
    error,
  } = useGroupFeedAuth(groupId || '', accessToken || '');
  const { isPublic, isLoading: isPublicLoading } = useGroupFeedPublicStatus(groupId || '');

  //sessionStorage에 저장된 카테고리 id 값을 가져옴
  const sessionCategoryId = sessionStorage.getItem('activeCategoryId');

  const [activeCategoryId] = useState<number>(Number(sessionCategoryId) || 1);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('activeCategoryId', String(activeCategoryId));
  }, [activeCategoryId]);

  const { groupInfoData } = useGroupInfo(groupId || '');
  const { writerName, writerNameId } = useFetchWriterNameOnly(groupId || '');

  const navigate = useNavigate();

  //접속시 권한확인
  useEffect(() => {
    if (!isAuthLoading && !isPublicLoading) {
      if (accessToken) {
        if (!isPublic && !isMember) {
          alert('해당 모임은 비공개 모임입니다');
          navigate('/');
        }
      }
      if (!accessToken) {
        if (!isPublic) {
          alert('해당 모임은 비공개 모임입니다');
          navigate('/');
        }
      }
    }
  }, [isAuthLoading, isPublicLoading]);

  if (isAuthLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error?.message, 'error');
    return <Error />;
  }

  return (
    <GroupFeedWrapper>
      {accessToken ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <Spacing marginBottom="6.4" />
      <GroupFeedThumnail imageUrl={groupInfoData?.imageUrl} />
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        {groupInfoData && (
          <GroupSideHeader
            groupInfoData={groupInfoData}
            isMember={isMember}
            isOwner={isOwner}
            setShowEditProfileModal={setShowEditProfileModal}
            writerName={writerName}
          />
        )}
        <GroupInfo>
          <GroupTodayWriteStyle isMember={isMember} groupId={groupId} />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle
            mainText="우리 모임에서 궁금한 글쓴이에요"
            subText="매주 월요일마다 업데이트 됩니다"
          />
          <Spacing marginBottom="2" />
          <CuriousProfile groupId={groupId} />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle
            mainText="우리 모임에서 인기 있는 글이에요"
            subText="매주 월요일마다 업데이트 됩니다"
          />
          <Spacing marginBottom="2" />
          <CuriousArticle groupId={groupId} />
          <Spacing marginBottom="6.4" />
          <Carousel />
        </GroupInfo>
      </GroupInfoWrapper>
      <Spacing marginBottom="14" />
      <Footer />
      {isMember !== undefined && isMember && (
        <GroupFloatingBtnIcon onClick={() => navigate(`/post/${groupId}/post`)} />
      )}
      {showEditProfileModal && (
        <EditProfileModal
          setShowEditProfileModal={setShowEditProfileModal}
          writerNameId={writerNameId}
        />
      )}
    </GroupFeedWrapper>
  );
};

export default GroupFeed;

const GroupFeedWrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const GroupFeedThumnail = styled.div<{ imageUrl: string | undefined }>`
  height: 37rem;

  background-image: ${({ imageUrl }) => `url(${imageUrl || GroupThumbnailImgIc})`};
  background-size: cover;
`;
const GroupInfoWrapper = styled.div`
  display: flex;
  gap: 3.9rem;
  justify-content: center;
  padding-right: 16.5rem;
  padding-left: 16.5rem;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 72rem;
`;

const GroupFloatingBtnIcon = styled(GroupFloatingBtnIc)`
  position: fixed;
  right: 6rem;
  bottom: 6rem;

  cursor: pointer;

  &:hover {
    g {
      circle {
        transition-duration: 0.3s;

        fill: #e9e3f8;
      }

      path {
        transition-duration: 0.3s;

        fill: #6139d1;
      }
    }
  }
`;
