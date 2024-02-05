/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

import { Topics } from '../apis/fetchTopic';

export interface DropDownPropsType {
  onClickListItem: (key: string, value: string) => void;
  selectedValue: string;
  topicList: Topics[];
  selectedTopicId: (topicId: string) => void;
  pageType: string;
}

interface DropDownTempPropsType {
  topicId: string;
  topicName: string;
  isSelected: boolean;
}

interface DropDownDataPropsType {
  topicList: Topics[];
  tempTopicList: DropDownTempPropsType[];
  setTopic: (e: React.MouseEvent<HTMLDivElement>) => void;
  setWriter: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedTopic: string;
  selectedWriter: string;
  pageType: string;
}

const DropDown = (props: DropDownDataPropsType) => {
  const { topicList, tempTopicList, setTopic, setWriter, selectedTopic, selectedWriter, pageType } =
    props;

  // 불러온 글감 중 가장 초기값 보여주기 위함
  // useEffect(() => {

  //     if (tempTopicList && tempTopicList.length > 0) {
  //         setSelectedValues({
  //           topic: tempTopicList?.find((topic) => topic.isSelected)?.topicName || '',
  //           writer: tempAnonymous ? '작자미상' : '필명',
  //         });
  //     }

  //     if (pageType != 'edit') {
  //       if (topicList && topicList.length > 0) {
  //         setSelectedValues({
  //           topic: topicList[0]?.topicName,
  //           writer: selectedValues.writer,
  //         });
  //       }
  //     }
  //   }
  // }, [tempTopicList, topicList, isTemp]);

  return (
    <DropDownWrapper>
      {/* <TopicDropDown
        onClickListItem={handleListItem}
        selectedValue={selectedValues.topic}
        topicList={topicList}
        selectedTopicId={selectedTopicId}
        pageType={pageType}
      /> */}
      <WriterDropDown setWriter={setWriter} selectedWriter={selectedWriter} pageType={pageType} />
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
