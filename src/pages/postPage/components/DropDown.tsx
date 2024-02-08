/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React from 'react';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

import { Topics } from '../apis/fetchTopic';

interface DropDownDataPropsType {
  topicList: Topics[];
  setTopic: (e: React.MouseEvent<HTMLDivElement>) => void;
  setWriter: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedTopic: string;
  selectedWriter: string;
}

const DropDown = (props: DropDownDataPropsType) => {
  const { topicList, setTopic, setWriter, selectedTopic, selectedWriter } = props;

  return (
    <DropDownWrapper>
      <TopicDropDown setTopic={setTopic} selectedTopic={selectedTopic} topicList={topicList} />
      <WriterDropDown setWriter={setWriter} selectedWriter={selectedWriter} />
    </DropDownWrapper>
  );
};

export default DropDown;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
  justify-content: flex-start;
  width: 82.6rem;
`;

export const DropDownToggle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.4rem;
  padding: 0.8rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  }
`;

export const DropDownContent = styled.span<{ $contentWidth: number }>`
  width: ${({ $contentWidth }) => `${$contentWidth}rem`};
  margin-right: 1rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button2};
`;
