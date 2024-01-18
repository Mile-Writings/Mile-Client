import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Carousel from './carousel/Carousel';
import CuriousArticle from './components/CuriousArticle';
import CuriousProfile from './components/CuriousProfile';
import GroupCuriousTitle from './components/GroupCuriousTitle';
import { GroupFeedHeader, LogOutHeader } from './components/GroupFeedHeader';
import GroupSideHeader from './components/GroupSideHeader';
import GroupTodayWriteStyle from './components/GroupTodayWriteStyle';
import { useGroupFeedAuth, useGroupInfo } from './hooks/queries';

import GroupFloatingBtn from '../../assets/svgs/groupFloatingBtn.svg';
import GroupFloatingBtnHover from '../../assets/svgs/groupFloatingBtnHover.svg';
import GroupThumbnailImg from '../../assets/svgs/groupThumnailImg.svg';
import Footer from '../../components/commons/Footer';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  const { groupId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const { isMember, isLoading, isError, error } = useGroupFeedAuth(
    groupId || '',
    accessToken || '',
  );
  const { groupInfoData } = useGroupInfo(groupId || '');

  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data..{error?.message}</div>;
  }

  return (
    <GroupFeedWrapper>
      {accessToken ? <GroupFeedHeader /> : <LogOutHeader onClick={handleLogin} />}
      <GroupFeedThumnail imageUrl={groupInfoData?.imageUrl} />
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        {groupInfoData && <GroupSideHeader groupInfoData={groupInfoData} />}
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
          <Carousel
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
            groupId={groupId}
          />
        </GroupInfo>
      </GroupInfoWrapper>
      <Spacing marginBottom="14" />
      <Footer />
      {isMember !== undefined && isMember && <FloatingBtn />}
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

  background-image: ${({ imageUrl }) => `url(${imageUrl || GroupThumbnailImg})`};
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

  background-image: url(${GroupFloatingBtn});
  cursor: pointer;

  :hover {
    background-image: url(${GroupFloatingBtnHover});
    cursor: pointer;
  }
`;
