/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { useState } from 'react';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

import { Topics } from '../apis/fetchEditorContent';

export interface DropDownPropsType {
  onClickListItem: (key: string, value: string) => void;
  selectedValue: string;
  topicList: Topics[];
}

interface DropDownDataPropsType {
  topicList: Topics[];
}

const DropDown = (props: DropDownDataPropsType) => {
  const { topicList } = props;
  // 드롭다운에서 선택된 값 저장 state
  // 글감ID, 익명여부 저장 필요
  // 가장 최신값으로 초기값 업데이트
  const [selectedValues, setSelectedValues] = useState({
    topic: '필명에 대하여',
    writer: '작자미상',
  });

  // 드롭다운 리스트 중 선택된 값 저장 이벤트 핸들러
  const handleListItem = (key: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DropDownWrapper>
      <TopicDropDown
        onClickListItem={handleListItem}
        selectedValue={selectedValues.topic}
        topicList={topicList}
      />
      <WriterDropDown
        onClickListItem={handleListItem}
        selectedValue={selectedValues.writer}
        topicList={topicList}
      />
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
