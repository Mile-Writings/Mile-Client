import React, { useState } from 'react';

import styled from '@emotion/styled';

import { DropDownToggle, DropDownContent, DropDownPropsType } from './DropDown';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';

const WriterDropDown = (props: DropDownPropsType) => {
  const { isOpen, onClickDropDown, onClickListItem, selectedValue } = props;

  const handleListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickListItem('writer', e.currentTarget.innerText);
  };

  const handleOnClick = () => {
    onClickDropDown('writer');
  };

  return (
    <DropDownToggle onClick={handleOnClick}>
      <DropDownContent $contentWidth={14.6}>{selectedValue}</DropDownContent>{' '}
      {/* api로 대체 필요 */}
      {isOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      <WriterDropDownWrapper $isOpen={isOpen}>
        <WriterList onClick={handleListClick}>작자미상</WriterList>
        <WriterList onClick={handleListClick}>필명</WriterList>
      </WriterDropDownWrapper>
    </DropDownToggle>
  );
};

export default WriterDropDown;

const WriterDropDownWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 4.3rem;
  right: 7rem;
  z-index: 3;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: 14.8rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
`;

const WriterList = styled.div`
  width: 10.8rem;
  padding: 0.6rem 0 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.gray90};

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
