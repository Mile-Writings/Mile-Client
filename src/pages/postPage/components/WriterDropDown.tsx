/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { DropDownToggle, DropDownContent } from './DropDown';

import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';
import useClickOutside from '../../../hooks/useClickOutside';

interface WriterPropType {
  setWriter: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedWriter: string | undefined;
}

const WriterDropDown = (props: WriterPropType) => {
  const { setWriter, selectedWriter } = props;
  const [writerIsOpen, setWriterIsOpen] = useState(false);

  // 드롭다운 리스트 부분 잡아오기
  const dropDownRef = useRef(null);

  // 필명 드롭다운 버튼 누르면 열림/닫힘
  const handleOnClick = () => {
    setWriterIsOpen(!writerIsOpen);
  };
  // 커스텀 훅 전달 함수
  const handleOutSideClick = () => {
    setWriterIsOpen(false);
  };
  // 커스텀 훅 사용
  useClickOutside(dropDownRef, handleOutSideClick);

  const onClickWriter = (e: React.MouseEvent<HTMLDivElement>) => {
    setWriter(e);
    setWriterIsOpen(false);
  };

  return (
    <WriterDropDownWrapper ref={dropDownRef}>
      <DropDownToggle onClick={handleOnClick}>
        <DropDownContent $contentWidth={14.6}>{selectedWriter}</DropDownContent>
        {writerIsOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      </DropDownToggle>
      <WriterListWrapper $isOpen={writerIsOpen}>
        <WriterList onClick={onClickWriter} $selected={selectedWriter == '작자미상'}>
          작자미상
        </WriterList>
        <WriterList onClick={onClickWriter} $selected={selectedWriter == '필명'}>
          필명
        </WriterList>
      </WriterListWrapper>
    </WriterDropDownWrapper>
  );
};

export default WriterDropDown;

const WriterDropDownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const WriterListWrapper = styled.div<{ $isOpen: boolean }>`
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

const WriterList = styled.div<{ $selected: boolean }>`
  width: 10.8rem;
  padding: 0.6rem 0 0.6rem 1rem;

  color: ${({ $selected, theme }) => ($selected ? theme.colors.mainViolet : theme.colors.gray90)};

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }
`;
