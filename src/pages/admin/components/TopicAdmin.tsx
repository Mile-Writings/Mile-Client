import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';

import EachTopic from './EachTopic';

import Pagenation from '../../../components/commons/Pagenation';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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
          <Responsive only="desktop">
            <TopicDescription>글감 설명</TopicDescription>
          </Responsive>
          <div style={{ marginLeft: 'auto' }}>
            <Responsive only="mobile">
              <TopicDescription>수정/삭제</TopicDescription>
            </Responsive>
          </div>
        </TopicAdminCategory>
        <TopicList>
          {data &&
            data.topics.map((topic) => (
              <EachTopic key={topic.topicId} data={topic} pageNum={pageNum} />
            ))}
        </TopicList>
      </TopicListWrapper>

      <Responsive only="desktop">
        <Spacing marginBottom="3.2" />
      </Responsive>
      <Responsive only="mobile">
        <Spacing marginBottom="1.6" />
      </Responsive>

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
  width: 100%;
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

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 1.6rem;
    width: 100%;
    min-width: 33.5rem;
    height: 4rem;
  }
`;

const Topic = styled.li`
  width: 20.8rem;

  white-space: nowrap;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 13rem;

    ${({ theme }) => theme.fonts.editor}
  }
`;

const TopicTag = styled.li`
  width: 7rem;

  white-space: nowrap;
  text-align: center;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 6.1rem;
    ${({ theme }) => theme.fonts.editor};
  }
`;

const TopicDescription = styled.li`
  display: flex;
  width: 21.3rem;
  margin-left: auto;

  white-space: nowrap;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    margin-right: 2rem;
    ${({ theme }) => theme.fonts.editor}
  }
`;

const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.1rem;
  padding: 0.4rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 8px 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    min-width: 33.5rem;
    ${({ theme }) => theme.fonts.editor};
  }
`;
