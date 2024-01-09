import styled from '@emotion/styled';

import Spacing from '../../components/commons/Spacing';

const GroupFeed = () => {
  return (
    <>
      <GroupFeedThumnail></GroupFeedThumnail>
      <Spacing marginBottom="6" />
      <GroupInfoWrapper>
        <GroupName>그룹명</GroupName>
        <GroupInfo>
          <GroupTodayWritingStyle>글감 카테고리 자리</GroupTodayWritingStyle>
          <GroupCuriousWrapper>
            <MainText>궁금해요 버튼이 많은 2명의 프로필</MainText>
            <Spacing marginBottom="0.8" />
            <SubText>부연설명 텍스트</SubText>
            <Spacing marginBottom="2" />
            프로필명
          </GroupCuriousWrapper>
          <GroupCuriousWrapper>
            <MainText>궁금해요 버튼이 많은 2개의 글</MainText>
            <Spacing marginBottom="0.8" />
            <SubText>부연설명 텍스트</SubText>
            <Spacing marginBottom="2" />
            제목영역입니다
          </GroupCuriousWrapper>
          <GroupFeeds>카테고리 영역</GroupFeeds>
        </GroupInfo>
      </GroupInfoWrapper>
    </>
  );
};

export default GroupFeed;

const GroupFeedThumnail = styled.div`
  width: 136.6rem;
  height: 37rem;

  background-image: url('../../src/assets/images/commonThumbnail.png');
`;

const GroupInfoWrapper = styled.div`
  display: flex;
  gap: 3.9rem;
  width: 136.6rem;
  height: 246.1rem;
  padding-right: 16.5rem;
  padding-left: 16.5rem;

  border: 1px solid yellow;
`;

const GroupName = styled.div`
  width: 27.7rem;

  border: 1px solid red;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  width: 72rem;

  border: 1px solid red;
`;

const GroupTodayWritingStyle = styled.div`
  display: flex;
  height: 12.5rem;
  padding: 3.2rem;

  border: 1px solid purple;
`;

const GroupCuriousWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid purple;
`;

const GroupFeeds = styled.div`
  height: 2rem;

  border: 1px solid purple;
`;

const MainText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body3};
`;
