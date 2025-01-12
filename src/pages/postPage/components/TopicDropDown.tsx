import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { DropDownToggle, DropDownContent } from './DropDown';
import TopicType from './TopicType';

import { Topics } from '../apis/fetchTopic';

import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';
import useClickOutside from '../../../hooks/useClickOutside';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface TopicPropTypes {
  topicList: Topics[];
  // eslint-disable-next-line no-unused-vars
  setTopic: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedTopic: string | undefined;
}

const TopicDropDown = (props: TopicPropTypes) => {
  const { topicList, setTopic, selectedTopic } = props;
  const [topicIsOpen, setTopicIsOpen] = useState(false);

  // 드롭다운 리스트 부분 잡아오기
  const topicListDropDownRef = useRef(null);

  // 주제 드롭다운 버튼 누르면 열림/닫힘
  const handleOnClick = () => {
    setTopicIsOpen(!topicIsOpen);
  };
  // 커스텀 훅 전달 콜백 함수
  const handleOutSideClick = () => {
    setTopicIsOpen(false);
  };
  // 커스텀 훅 사용
  useClickOutside(topicListDropDownRef, handleOutSideClick);

  return (
    <TopicDropDownWrapper ref={topicListDropDownRef}>
      <DropDownToggle onClick={handleOnClick}>
        <DropDownContent $contentWidth={28}>{selectedTopic}</DropDownContent>
        <EditorDropIcnActiveWrapper $isOpen={topicIsOpen}>
          <EditorDropIcnActiveIcon />
        </EditorDropIcnActiveWrapper>
        <EditorDropIcnActiveOpenWrapper $isOpen={topicIsOpen}>
          <EditorDropIcnActiveOpenIcon />
        </EditorDropIcnActiveOpenWrapper>
      </DropDownToggle>
      <TopicListWrapper $isOpen={topicIsOpen}>
        <ScrollDiv>
          {topicList.map((item, idx) => {
            return (
              <TopicType
                key={item.topicId}
                idx={idx}
                topicName={item.topicName}
                setTopic={setTopic}
                selected={selectedTopic === item.topicName}
                setTopicIsOpen={setTopicIsOpen}
              />
            );
          })}
        </ScrollDiv>
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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    width: 100%;
  }
`;

const TopicListWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 4.4rem;
  z-index: 3;

  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  width: 36rem;
  max-height: 37.1rem;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ScrollDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
  overflow-y: auto;

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

const EditorDropIcnActiveOpenWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
`;

const EditorDropIcnActiveOpenIcon = styled(EditorDropIcnActiveOpenIc)`
  width: 2.8rem;
  height: 2.8rem;
`;

const EditorDropIcnActiveWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'inline')};
`;

const EditorDropIcnActiveIcon = styled(EditorDropIcnActiveIc)`
  width: 2.8rem;
  height: 2.8rem;
`;
