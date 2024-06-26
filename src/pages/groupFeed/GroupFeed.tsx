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
import { useGroupFeedAuth, useGroupInfo, useFetchWriterNameOnly } from './hooks/queries';

import Error from '../error/Error';
import Loading from '../loading/Loading';

import { GroupThumbnailImgIc } from '../../assets/svgs';
import Footer from '../../components/commons/Footer';
import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  const { groupId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const { isMember, isOwner, isLoading, isError, error } = useGroupFeedAuth(
    groupId || '',
    accessToken || '',
  );

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

  //라우팅 했을 때 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
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
        <FloatingBtn onClick={() => navigate(`/post/${groupId}/post`)} />
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
const FloatingBtn = styled.div`
  position: fixed;
  right: calc((100vw - 136.6rem) / 2 + 6rem);
  bottom: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;

  background-image: url("data:image/svg+xml,%3Csvg width='76' height='76' viewBox='0 0 76 76' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_708_83805)'%3E%3Crect x='8' y='4' width='60' height='60' rx='30' fill='%236139D1' shape-rendering='crispEdges'/%3E%3Cg clip-path='url(%23clip0_708_83805)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.1305 25.1586C45.568 24.5962 44.805 24.2803 44.0095 24.2803C43.214 24.2803 42.4511 24.5962 41.8885 25.1586L41.1815 25.8666L46.1315 30.8166L46.8375 30.1096C47.1162 29.8311 47.3372 29.5003 47.488 29.1363C47.6388 28.7723 47.7164 28.3821 47.7164 27.9881C47.7164 27.5941 47.6388 27.204 47.488 26.84C47.3372 26.476 47.1162 26.1452 46.8375 25.8666L46.1305 25.1586ZM44.7165 32.2306L39.7665 27.2806L30.6765 36.3716C30.4776 36.5706 30.3387 36.8215 30.2755 37.0956L29.2465 41.5506C29.2082 41.716 29.2126 41.8884 29.2593 42.0517C29.306 42.2149 29.3935 42.3635 29.5136 42.4836C29.6336 42.6036 29.7823 42.6911 29.9455 42.7379C30.1087 42.7846 30.2811 42.789 30.4465 42.7506L34.9025 41.7226C35.1763 41.6593 35.4269 41.5204 35.6255 41.3216L44.7165 32.2306Z' fill='%23F5F5F7'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_708_83805' x='0' y='0' width='76' height='76' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_708_83805'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_708_83805' result='shape'/%3E%3C/filter%3E%3CclipPath id='clip0_708_83805'%3E%3Crect width='24' height='24' fill='white' transform='translate(26 22)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  cursor: pointer;

  :hover {
    background-image: url("data:image/svg+xml,%3Csvg width='76' height='76' viewBox='0 0 76 76' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_708_83806)'%3E%3Crect x='8' y='4' width='60' height='60' rx='30' fill='%23E9E3F8' shape-rendering='crispEdges'/%3E%3Cg clip-path='url(%23clip0_708_83806)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.1305 25.1586C45.568 24.5962 44.805 24.2803 44.0095 24.2803C43.214 24.2803 42.4511 24.5962 41.8885 25.1586L41.1815 25.8666L46.1315 30.8166L46.8375 30.1096C47.1162 29.8311 47.3372 29.5003 47.488 29.1363C47.6388 28.7723 47.7164 28.3821 47.7164 27.9881C47.7164 27.5941 47.6388 27.204 47.488 26.84C47.3372 26.476 47.1162 26.1452 46.8375 25.8666L46.1305 25.1586ZM44.7165 32.2306L39.7665 27.2806L30.6765 36.3716C30.4776 36.5706 30.3387 36.8215 30.2755 37.0956L29.2465 41.5506C29.2082 41.716 29.2126 41.8884 29.2593 42.0517C29.306 42.2149 29.3935 42.3635 29.5136 42.4836C29.6336 42.6036 29.7823 42.6911 29.9455 42.7379C30.1087 42.7846 30.2811 42.789 30.4465 42.7506L34.9025 41.7226C35.1763 41.6593 35.4269 41.5204 35.6255 41.3216L44.7165 32.2306Z' fill='%236139D1'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_708_83806' x='0' y='0' width='76' height='76' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_708_83806'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_708_83806' result='shape'/%3E%3C/filter%3E%3CclipPath id='clip0_708_83806'%3E%3Crect width='24' height='24' fill='white' transform='translate(26 22)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    cursor: pointer;
  }
`;
