import { useRef, useState } from 'react';

import styled from '@emotion/styled';

import { DropDownToggle, DropDownContent, DropDownPropsType } from './DropDown';
import { ThisWeekTopic, PrevFirstTopic, PrevTopic } from './Topic';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';
import useClickOutside from '../../../hooks/useClickOutside';
import { TOPIC_DUMMY_DATA } from '../constants/topicConstants';

const TopicDropDown = (props: DropDownPropsType) => {
  const { onClickListItem, selectedValue } = props;

  const [topicIsOpen, setTopicIsOpen] = useState(false);

  // 드롭다운 리스트 부분 잡아오기
  const dropDownRef = useRef(null);

  // 토글 열림 닫힘만 핸들링하는 함수
  const handleOnClick = () => {
    setTopicIsOpen(!topicIsOpen);
  };
  // 커스텀 훅 전달 콜백 함수
  const handleOutSideClick = () => {
    setTopicIsOpen(false);
  };
  //커스텀 훅 사용
  useClickOutside(dropDownRef, handleOutSideClick);

  return (
    <TopicDropDownWrapper onClick={handleOnClick} ref={dropDownRef}>
      <DropDownToggle>
        <DropDownContent $contentWidth={29}>{selectedValue}</DropDownContent>
        {topicIsOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      </DropDownToggle>
      <TopicListWrapper $isOpen={topicIsOpen}>
        {TOPIC_DUMMY_DATA.map((item, idx) => {
          if (idx === 0) {
            return (
              <ThisWeekTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
                selected={selectedValue === item.topicName}
              />
            );
          } else if (idx === 1) {
            return (
              <PrevFirstTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
                selected={selectedValue === item.topicName}
              />
            );
          } else {
            return (
              <PrevTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
                selected={selectedValue === item.topicName}
              />
            );
          }
        })}
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

const TopicListWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 4.4rem;
  z-index: 3;

  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 36rem;
  max-height: 37.1rem;
  padding: 2rem;
  overflow: hidden scroll;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;

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
