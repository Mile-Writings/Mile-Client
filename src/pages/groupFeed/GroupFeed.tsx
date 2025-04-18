import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Error from '../error/Error';
import Loading from '../loading/Loading';

import { GroupFloatingBtnIc, GroupThumbnailImgIc } from '../../assets/svgs';
import Footer from '../../components/commons/Footer';
import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

import Carousel from './carousel/Carousel';
import CuriousArticle from './components/CuriousArticle';
import CuriousProfile from './components/CuriousProfile';
import EditProfileModal from './components/EditProfileModal';
import GroupCuriousTitle from './components/GroupCuriousTitle';
import GroupSideHeader from './components/GroupSideHeader';
import GroupTodayWriteStyle from './components/GroupTodayWriteStyle';
import {
  useFetchWriterInfo,
  useGroupFeedAuth,
  useGroupFeedPublicStatus,
  useGroupInfo,
  useTopicList,
} from './hooks/queries';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';
import Responsive from '../../components/commons/Responsive/Responsive';
import GroupMobileInfo from './components/GroupMobileInfo';

const GroupFeed = () => {
  const { groupId } = useParams();
  const accessToken = localStorage.getItem('accessToken');

  const { isMember, isOwner, isLoading: isAuthLoading, isError } = useGroupFeedAuth(groupId || '');

  const { isPublic, isLoading: isPublicLoading } = useGroupFeedPublicStatus(groupId || '');

  //sessionStorage에 저장된 카테고리 id 값을 가져옴
  const sessionCategoryId = sessionStorage.getItem('activeCategoryId');

  const [activeCategoryId] = useState<number>(Number(sessionCategoryId) || 1);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('activeCategoryId', String(activeCategoryId));
  }, [activeCategoryId]);

  const { infoResponse, mostCuriousPost, mostCuriousWriter } = useGroupInfo(groupId || '');
  const { writerName, writerNameId, writerDescription } = useFetchWriterInfo(
    groupId || '',
    isMember,
    isOwner,
  );
  const { groupFeedCategoryData, isLoading } = useTopicList(groupId || '');

  const navigate = useNavigate();

  const todayInfo = groupFeedCategoryData && groupFeedCategoryData[0];

  //접속시 권한확인
  useEffect(() => {
    if (!isPublicLoading && !isAuthLoading) {
      if (accessToken) {
        if (!isPublic && !isMember && !isOwner) {
          alert('해당 글모임은 비공개 모임입니다');
          navigate('/');
        }
      } else {
        if (!isPublic) {
          alert('해당 글모임은 비공개 모임입니다.');
          navigate('/');
        }
      }
    }
  }, [isPublic, isMember, isOwner]);

  if (isAuthLoading || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }
  return (
    <GroupFeedWrapper>
      {accessToken ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <GroupFeedThumnail imageUrl={infoResponse?.imageUrl} />
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        <Responsive only="desktop">
          {infoResponse && (
            <GroupSideHeader
              groupInfoData={infoResponse}
              isMember={isMember}
              isOwner={isOwner}
              setShowEditProfileModal={setShowEditProfileModal}
              writerName={writerName}
            />
          )}
          <Spacing marginBottom="6.4" />
        </Responsive>
        <GroupInfo>
          <GroupTodayWriteStyle todayInfo={todayInfo} isMember={isMember} groupId={groupId} />
          <Responsive only="mobile">
            {infoResponse && (
              <GroupMobileInfo
                groupInfoData={infoResponse}
                isMember={isMember}
                isOwner={isOwner}
                setShowEditProfileModal={setShowEditProfileModal}
                writerName={writerName}
              />
            )}
            <Spacing marginBottom="3.2" />
          </Responsive>

          <GroupCuriousTitle
            mainText="우리 모임에서 궁금한 글쓴이에요"
            subText="매주 월요일마다 업데이트 됩니다"
          />
          <Spacing marginBottom="2" />
          <CuriousProfile mostCuriousWriter={mostCuriousWriter} />

          <GroupCuriousTitle
            mainText="우리 모임에서 인기 있는 글이에요"
            subText="매주 월요일마다 업데이트 됩니다"
          />
          <Spacing marginBottom="2" />
          <CuriousArticle groupId={groupId} mostCuriousPost={mostCuriousPost} />
          <Carousel categoryData={groupFeedCategoryData || []} isLoading={isLoading} />
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
          name={writerName || ''}
          description={writerDescription || ''}
        />
      )}
    </GroupFeedWrapper>
  );
};

export default GroupFeed;

const GroupFeedWrapper = styled.div`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const GroupFeedThumnail = styled.div<{ imageUrl: string | undefined }>`
  width: 100%;
  height: 38.6rem;
  margin-top: 6.4rem;
  object-fit: cover;

  background-image: ${({ imageUrl }) => `url(${imageUrl || GroupThumbnailImgIc})`};
  background-size: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 22.4rem;
    margin-top: 5.5rem;
  }
`;
const GroupInfoWrapper = styled.div`
  display: flex;
  gap: 3.9rem;
  justify-content: center;
  padding: 0 16.5rem;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 2rem;
  }
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
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
