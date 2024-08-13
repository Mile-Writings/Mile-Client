import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';

import EachTopic from './EachTopic';

import Pagenation from '../../components/commons/Pagenation';
import Spacing from '../../components/commons/Spacing';

interface AdminTopicPropTypes {
  topicCount: number;
  topics: {
    topicId: string;
    topicName: string;
    topicTag: string;
    topicDescription: string;
    createdAt: string;
  }[];
}

const TopicAdmin = ({
  data,
  setPageNum,
  pageNum,
}: {
  data?: AdminTopicPropTypes;
  setPageNum: Dispatch<SetStateAction<number>>;
  pageNum: number;
}) => {
  const [activeChunk, setActiveChunk] = useState(1);
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
            data.topics.map((topic) => (
              <EachTopic key={topic.topicId} data={topic} pageNum={pageNum} />
            ))}
        </TopicList>
      </TopicListWrapper>
      <Spacing marginBottom="3.2" />
      {data && data.topicCount && (
        <Pagenation
          count={data.topicCount}
          allocatedCount={4}
          setActivePage={setPageNum}
          activePage={pageNum}
          setActiveChunk={setActiveChunk}
          activeChunk={activeChunk}
        />
      )}
    </>
  );
};

export default TopicAdmin;

const TopicListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
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
