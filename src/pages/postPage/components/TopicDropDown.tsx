import { useRef } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DropDownToggle, DropDownContent, DropDownPropsType } from './DropDown';
import { ThisWeekTopic, PrevFirstTopic, PrevTopic } from './Topic';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';
import useClickOutside from '../../../hooks/useClickOutside';
import { TOPIC_DUMMY_DATA } from '../constants/topicConstants';

const TopicDropDown = (props: DropDownPropsType) => {
  // const { isOpen, onClickDropDown, onClickListItem, selectedValue, clickOutside } = props;
  const { isOpen, onClickDropDown, onClickListItem, selectedValue } = props;

  // 드롭다운 리스트 부분 잡아오기
  // const dropDownRef = useRef(null);

  // 토글 열림 닫힘만 핸들링하는 함수
  const handleOnClick = () => {
    onClickDropDown('topic');
  };

  // 커스텀훅 사용
  // useClickOutside(dropDownRef, clickOutside);

  return (
    <TopicDropDownWrapper onClick={handleOnClick} >
      <DropDownToggle>
        <DropDownContent $contentWidth={29}>{selectedValue}</DropDownContent>
        {isOpen ? <EditorDropIcnActiveOpenIc /> : <EditorDropIcnActiveIc />}
      </DropDownToggle>
      <TopicListWrapper $isOpen={isOpen}>
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

const TopicDropDownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TopicListWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};

  /* display: flex; */
  gap: 0.6rem;
  width: 36rem;
  max-height: 37.1rem;
  overflow: hidden scroll;

  background-color: ${({ theme }) => theme.colors.white};

  /* visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')}; */
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
  ${basicDropDownListCSS}
`;
