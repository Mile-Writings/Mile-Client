import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  //   basicDropDownListCSS,
  DropDownToggle,
  DropDownContent,
  DropDownPropsType,
} from './DropDown';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';

// const PR_DUMMY_DATA_SMALL: string[] = ['웹잼에 대하여'];

// const PR_DUMMY_DATA_MEDIUM: string[] = [
//   '서진이에 대하여',
//   '재훈이에 대하여',
//   '공백 포함 22자로 글자수 제한 합니다',
// ];

// const PR_DUMMY_DATA_LONG: string[] = [
//   '다현이에 대하여',
//   '동헌이에 대하여',
//   '공백 포함 22자로 글자수 제한 합니다',
//   '다은이에 대하여',
//   '희정이에 대하여',
//   '소현이에 대하여',
//   '지원이에 대하여',
// ];

const TopicDropDown = (props: DropDownPropsType) => {
  const { isOpen, onClickDropDown, onClickListItem, selectedValue } = props;

  const handleListClick = (e) => {
    onClickListItem('topic', e.target.innerText);
  };

  const handleOnClick = () => {
    onClickDropDown('topic');
  };

  return (
    <TopicDropDownWrapper onClick={handleOnClick}>
      <DropDownToggle>
        <DropDownContent $contentWidth={29}>{selectedValue}</DropDownContent>
        {isOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      </DropDownToggle>
      <TopicListWrapper $isOpen={isOpen}>
        <TopicContainer>
          <TopicLog>최신 글감</TopicLog>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
        </TopicContainer>
        <Divider />
        <TopicContainer>
          <TopicLog>이전 글감</TopicLog>
          <Topic onClick={handleListClick}>공백 포함 22자로 글자수 제한 합니다</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
          <Topic onClick={handleListClick}>웹잼에 대하여</Topic>
        </TopicContainer>
      </TopicListWrapper>
    </TopicDropDownWrapper>
  );
};

export default TopicDropDown;

const TopicDropDownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const basicDropDownListCSS = css`
  position: absolute;
  top: 4.4rem;
  z-index: 3;

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;

  border-radius: 10px;
`;

const TopicListWrapper = styled.div<{ $isOpen: boolean }>`
  ${basicDropDownListCSS}
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  width: 36rem;
  max-height: 37.1rem;
  overflow: hidden scroll;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray20};
    background-clip: padding-box;
    border: 20px solid ${({ theme }) => theme.colors.gray20};
    border-radius: 4px;
  }
`;

const TopicLog = styled.span`
  width: 100%;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body7};
`;

const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 0.6rem;
`;

const Divider = styled.div`
  width: 100%;
  margin-top: 0.6rem;

  border: 1px solid ${({ theme }) => theme.colors.gray20};
`;

const Topic = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.8rem 0 0.8rem 0.8rem;

  color: ${({ theme }) => theme.colors.gray90};

  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  ${({ theme }) => theme.fonts.button2};
`;
