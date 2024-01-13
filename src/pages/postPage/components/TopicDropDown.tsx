import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  //   basicDropDownListCSS,
  DropDownToggle,
  DropDownContent,
  DropDownPropsType,
} from './DropDown';
import { ThisWeekTopic, PrevFirstTopic, PrevTopic } from './Topic';
import { EditorDropIcnActiveIc, EditorDropIcnActiveOpenIc } from '../../../assets/svgs';
import { TOPIC_DUMMY_DATA } from '../constants/topicConstants';

const TopicDropDown = (props: DropDownPropsType) => {
  const { isOpen, onClickDropDown, onClickListItem, selectedValue } = props;

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
        {TOPIC_DUMMY_DATA.map((item, idx) => {
          if (idx === 0) {
            return (
              <ThisWeekTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
              />
            );
          } else if (idx === 1) {
            return (
              <PrevFirstTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
              />
            );
          } else {
            return (
              <PrevTopic
                key={item.topicId}
                topicId={item.topicId}
                topicName={item.topicName}
                onClickHandler={onClickListItem}
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
  ${basicDropDownListCSS}
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  gap: 0.6rem;
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

const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 0.6rem;
`;
