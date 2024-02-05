/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React from 'react';

interface TopicsPropType {
  idx: number;
  topicName: string;
  setTopic: (e: React.MouseEvent<HTMLDivElement>) => void;
  selected: boolean;
  setTopicIsOpen: (state: boolean) => void;
}

const TopicType = (props: TopicsPropType) => {
  const { idx, topicName, setTopic, selected, setTopicIsOpen } = props;

  if (idx === 0) {
    return (
      <>
        <TopicLog>최신 글감</TopicLog>
        <Topic
          onClick={(e) => {
            setTopic(e);
            setTopicIsOpen(false);
          }}
          $selected={selected}
        >
          {topicName}
        </Topic>
      </>
    );
  } else if (idx === 1) {
    return (
      <>
        <Divider />
        <TopicLog>이전 글감</TopicLog>
        <Topic
          onClick={(e) => {
            setTopic(e);
            setTopicIsOpen(false);
          }}
          $selected={selected}
        >
          {topicName}
        </Topic>
      </>
    );
  } else {
    return (
      <Topic
        onClick={(e) => {
          setTopic(e);
          setTopicIsOpen(false);
        }}
        $selected={selected}
      >
        {topicName}
      </Topic>
    );
  }
};

export default TopicType;

// 최신 글감, 이전 글감
const TopicLog = styled.span`
  width: 100%;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body7};
`;

// 글감
const Topic = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.8rem 0 0.8rem 0.8rem;

  color: ${({ $selected, theme }) => ($selected ? theme.colors.mainViolet : theme.colors.gray90)};

  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  ${({ theme }) => theme.fonts.button2};
`;

const Divider = styled.div`
  width: 100%;
  margin-bottom: 0.6rem;

  border: 1px solid ${({ theme }) => theme.colors.gray20};
`;
