/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';
import useClickOutside from '../../../hooks/useClickOutside';

type DropdownType = 'topic' | 'writer';

export interface DropDownPropsType {
  isOpen: boolean;
  onClickDropDown: (dropDownType: DropdownType) => void;
  onClickListItem: (key: string, value: string) => void;
  selectedValue: string;
  clickOutside: () => void;
}

const DropDown = () => {
  // 현재 열린 드롭다운 저장
  const [activeDropdown, setActiveDropDown] = useState<DropdownType | null>(null);

  // 드롭다운에서 선택된 값 저장 state
  // 글감ID, 익명여부 저장 필요
  // 가장 최신값으로 초기값 업데이트
  const [selectedValues, setSelectedValues] = useState({
    topic: '필명에 대하여',
    writer: '작자미상',
  });

  const dropDownRef = useRef(null);

  // 열고 닫힘만 담당하는 이벤트 핸들러
  const handleDropDownClick = (dropdownType: DropdownType) => {
    setActiveDropDown(activeDropdown === dropdownType ? null : dropdownType);
  };

  // 드롭다운 리스트 중 선택된 값 저장 이벤트 핸들러
  const handleListItem = (key: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  // 외부영역 클릭시 커스텀훅에 전달할 함수
  const clickOutsideCloseDropDown = () => {
    setActiveDropDown(null);
  };

  useClickOutside(dropDownRef, clickOutsideCloseDropDown);

  return (
    <DropDownWrapper ref={dropDownRef}>
      <TopicDropDown
        isOpen={activeDropdown === 'topic'}
        onClickDropDown={handleDropDownClick}
        onClickListItem={handleListItem}
        selectedValue={selectedValues.topic}
        clickOutside={clickOutsideCloseDropDown}
      />
      <WriterDropDown
        isOpen={activeDropdown === 'writer'}
        onClickDropDown={handleDropDownClick}
        onClickListItem={handleListItem}
        selectedValue={selectedValues.writer}
        clickOutside={clickOutsideCloseDropDown}
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
