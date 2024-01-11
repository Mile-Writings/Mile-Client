import styled from '@emotion/styled';

import CuriousArticle from './CuriousArticle';
import CuriousProfile from './CuriousProfile';
import GroupCuriousTitle from './GroupCuriousTitle';
import GroupSideHeader from './GroupSideHeader';
import GroupTodayWriteStyle from './GroupTodayWriteStyle';
import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  return (
    <GroupFeedWrapper>
      <GroupFeedThumnail />
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        <GroupSideHeader />
        <GroupInfo>
          <GroupTodayWriteStyle />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle
            mainText="궁금해요 버튼이 많은 2명의 프로필"
            subText="부연설명 텍스트"
          />
          <Spacing marginBottom="2" />
          <CuriousProfile />
          <Spacing marginBottom="6.4" />
          <GroupCuriousTitle mainText="궁금해요 버튼이 많은 2개의 글" subText="부연설명 텍스트" />
          <Spacing marginBottom="2" />
          <CuriousArticle />
          <Spacing marginBottom="6.4" />
        </GroupInfo>
      </GroupInfoWrapper>
    </GroupFeedWrapper>
  );
};

export default GroupFeed;

const GroupFeedWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const GroupFeedThumnail = styled.div`
  width: 136.6rem;
  height: 37rem;

  background-image: url('../../src/assets/images/commonThumbnail.png');
`;

const GroupInfoWrapper = styled.div`
  display: flex;
  gap: 3.9rem;
  width: 136.6rem;
  padding-right: 16.5rem;
  padding-left: 16.5rem;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 72rem;
`;
