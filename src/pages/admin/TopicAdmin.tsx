import styled from '@emotion/styled';

import EachTopic from './EachTopic';

import Spacing from '../../components/commons/Spacing';
import Pagenation from '../../utils/Pagenation';

interface AdminTopicPropTypes {
  data: {
    topicCount: number;
    topics: {
      topicId: string;
      topicName: string;
      topicTag: string;
      topicDescription: string;
      createdAt: string;
    }[];
  };

  status: number;
  message: string;
}

const TopicAdmin = (data: AdminTopicPropTypes) => {
  console.log(data.data, '데이터입니다');

  return (
    <>
      <TopicListWrapper>
        <TopicAdminCategory>
          <Topic>글감</Topic>
          <TopicTag>글감 태그</TopicTag>
          <TopicDescription>글감 설명</TopicDescription>
        </TopicAdminCategory>
        <TopicList>
          {data &&
            data.data &&
            data.data.topics.map((topic) => <EachTopic key={topic.topicId} data={topic} />)}
        </TopicList>
      </TopicListWrapper>
      <Spacing marginBottom="3.2" />
      <Pagenation count={8} />
    </>
  );
};

export default TopicAdmin;

const TopicListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
  height: 39.2rem;

  border: 1px solid red;
`;

const TopicAdminCategory = styled.ul`
  display: flex;
  gap: 4rem;
  align-items: center;
  width: 78.1rem;
  height: 4.8rem;
  padding: 0 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button3};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 8px 8px 0 0;
`;

const Topic = styled.li`
  width: 20.8rem;
`;

const TopicTag = styled.li`
  width: 7rem;

  text-align: center;
`;

const TopicDescription = styled.li`
  width: 21.3rem;
`;

const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
  padding: 0.4rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 8px 8px;
`;
