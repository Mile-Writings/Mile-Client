/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';

import React from 'react';

interface TopicPropTypes {
  topicId: number;
  topicName: string;
  onClickHandler: (key: string, value: string) => void;
  selected: boolean;
  onClickClose: (state: boolean) => void;
}

const ThisWeekTopic = (props: TopicPropTypes) => {
  const { topicName, onClickHandler, selected, onClickClose } = props;
  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);
    onClickClose(false);
  };
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
  const { topicName, onClickHandler, selected, onClickClose } = props;
  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);
    onClickClose(false);
  };
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
  const { topicName, onClickHandler, selected, onClickClose } = props;
  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickHandler('topic', e.currentTarget.innerText);
    onClickClose(false);
  };
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
