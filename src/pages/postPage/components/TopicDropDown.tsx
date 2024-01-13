import React from 'react';

import styled from '@emotion/styled';

import { DropDownToggle, DropDownContent, DropDownPropsType } from './DropDown';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';

const PR_DUMMY_DATA_SMALL: string[] = ['웹잼에 대하여'];

const PR_DUMMY_DATA_MEDIUM: string[] = [
  '웹잼에 대하여',
  '웹잼에 대하여',
  '공백 포함 22자로 글자수 제한 합니다',
];

const PR_DUMMY_DATA_LONG: string[] = [
  '웹잼에 대하여',
  '웹잼에 대하여',
  '공백 포함 22자로 글자수 제한 합니다',
  '웹잼에 대하여',
  '웹잼에 대하여',
  '웹잼에 대하여',
  '웹잼에 대하여',
];

const TopicDropDown = (props: DropDownPropsType) => {
  const { isOpen, activeDropDown } = props;

  const handleOnClick = () => {
    activeDropDown('topic');
  };
  return (
    <>
      <DropDownToggle>
        <DropDownContent $contentWidth={29} onClick={handleOnClick}>
          웹잼에 대하여
        </DropDownContent>
        {isOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      </DropDownToggle>
      <TopicListWrapper>
        <TopicContainer>
          <TopicLog>최신 글감</TopicLog>
          <Topic>웹잼에 대하여</Topic>
        </TopicContainer>
        <Divider />
        <TopicContainer>
          <TopicLog>이전 글감</TopicLog>
          <Topic>공백 포함 22자로 글자수 제한 합니다</Topic>
          <Topic>웹잼에 대하여</Topic>
          <Topic>웹잼에 대하여</Topic>
          <Topic>웹잼에 대하여</Topic>
          <Topic>웹잼에 대하여</Topic>
        </TopicContainer>
      </TopicListWrapper>
    </>
  );
};

export default TopicDropDown;

const TopicListWrapper = styled.div`
  position: absolute;
  top: 5rem;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 36rem;
  max-height: 37.1rem;
  padding: 2rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 1rem;
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
  border-radius: 0.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  ${({ theme }) => theme.fonts.button2};
`;
