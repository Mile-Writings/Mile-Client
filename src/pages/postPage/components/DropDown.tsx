import React, { useState } from 'react';

import styled from '@emotion/styled';

import TopicDropDown from './TopicDropDown';
import WriterDropDown from './WriterDropDown';

type DropdownType = 'topic' | 'writer';

export interface DropDownPropsType {
  isOpen: boolean;
  onClickDropDown: (dropDownType: DropdownType) => void;
}

const DropDown = () => {
  const [activeDropdown, setActiveDropDown] = useState<DropdownType | null>(null);

  // 열고 닫힘만 관여
  const handleDropDownClick = (dropdownType: DropdownType) => {
    setActiveDropDown(activeDropdown === dropdownType ? null : dropdownType);
  };

  return (
    <DropDownWrapper>
      <TopicDropDown isOpen={activeDropdown === 'topic'} onClickDropDown={handleDropDownClick} />
      <WriterDropDown isOpen={activeDropdown === 'writer'} onClickDropDown={handleDropDownClick} />
    </DropDownWrapper>
  );
};

export default DropDown;

const DropDownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
  justify-content: flex-start;
  width: 82.6rem;
`;

export const DropDownToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.4rem;
  padding: 0.8rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.8rem;

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
