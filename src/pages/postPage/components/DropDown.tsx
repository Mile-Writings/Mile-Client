import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

type DropdownType = 'topic' | 'writer';

export interface DropDownPropsType {
  isOpen: boolean;
  onClickDropDown: (dropDownType: DropdownType) => void;
  onClickListItem: (key: string, value: string) => void;
  selectedValue: string;
}

interface selectedValueType {
  topic: string;
  writer: string;
}

const DropDown = () => {
  // 현재 열린 드롭다운 저장
  const [activeDropdown, setActiveDropDown] = useState<DropdownType | null>(null);
  // 드롭다운에서 선택된 값 저장
  // 글감ID, 익명여부 저장 필요
  // 가장 최신값으로 초기값 업데이트 해두어야 함
  const [selectedValues, setSelectedValues] = useState({
    topic: '웹잼에 대하여',
    writer: '작자미상',
  });

  // 열고 닫힘만 관여
  const handleDropDownClick = (dropdownType: DropdownType) => {
    setActiveDropDown(activeDropdown === dropdownType ? null : dropdownType);
  };

  // 드롭다운 리스트 중 선택된 값 저장
  const handleListItem = (key: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DropDownWrapper>
      <TopicDropDown
        isOpen={activeDropdown === 'topic'}
        onClickDropDown={handleDropDownClick}
        onClickListItem={handleListItem}
        selectedValue={selectedValues.topic}
      />
      <WriterDropDown
        isOpen={activeDropdown === 'writer'}
        onClickDropDown={handleDropDownClick}
        onClickListItem={handleListItem}
        selectedValue={selectedValues.writer}
      />
    </DropDownWrapper>
  );
};

export default DropDown;

// 드롭다운 리스트 공통 스타일 재사용
export const basicDropDownListCSS = css`
  position: absolute;
  top: 5rem;
  z-index: 3;

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;

  border-radius: 10px;
`;

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
