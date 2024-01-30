/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TopicPropTypes {
  topicId: string;
  topicName: string;
  onClickHandler: (key: string, value: string) => void;
  selected: boolean;
  onClickClose: (state: boolean) => void;
  selectedTopicId: (topicId: string) => void;
  pageType: string;
}

const ThisWeekTopic = (props: TopicPropTypes) => {
  console.log('최신글감 컴포넌트 실행됨');
  const { topicName, onClickHandler, selected, onClickClose, selectedTopicId, topicId, pageType } =
    props;
  const location = useLocation();

  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);

    onClickClose(false);
    selectedTopicId(topicId);
  };
  useEffect(() => {
    if (pageType == 'edit') {
      onClickHandler('topic', location.state.topic);
    }
  }, [pageType]);

  return (
    <>
      <TopicLog>최신 글감</TopicLog>
      <Topic onClick={handleListClick} $selected={selected}>
        {topicName}
      </Topic>
    </>
  );
};

const PrevFirstTopic = (props: TopicPropTypes) => {
  console.log('이전글감 첫번째 컴포넌트 실행됨');
  const { topicName, onClickHandler, selected, onClickClose, selectedTopicId, topicId, pageType } =
    props;
  const location = useLocation();

  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);

    onClickClose(false);
    selectedTopicId(topicId);
  };

  useEffect(() => {
    if (pageType == 'edit') {
      onClickHandler('topic', location.state.topic);
    }
  }, [pageType]);
  return (
    <>
      <Divider />
      <TopicLog>이전 글감</TopicLog>
      <Topic onClick={handleListClick} $selected={selected}>
        {topicName}
      </Topic>
    </>
  );
};

const PrevTopic = (props: TopicPropTypes) => {
  console.log('이전글감 컴포넌트 실행됨');

  const { topicName, onClickHandler, selected, onClickClose, selectedTopicId, topicId, pageType } =
    props;
  const location = useLocation();

  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);

    onClickClose(false);
    selectedTopicId(topicId);
  };

  useEffect(() => {
    if (pageType == 'edit') {
      onClickHandler('topic', location.state.topic);
    }
  }, [pageType]);
  return (
    <Topic onClick={handleListClick} $selected={selected}>
      {topicName}
    </Topic>
  );
};

export { ThisWeekTopic, PrevFirstTopic, PrevTopic };

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
