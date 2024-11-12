import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import {
  MAX_TOPIC_DESC_LENGTH,
  MAX_TOPIC_KEYWORD_LENGTH,
  MAX_TOPIC_LENGTH,
} from '../constants/topicLength';

interface GroupTopicModalPropTypes {
  toggleModal: (prev: boolean) => void;
  setTopic: (topic: string) => void;
  setTopicTag: (topicTag: string) => void;
  setTopicDesc: (topicDesc: string) => void;
  setIsGroupTopicEmpty: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupTopicModal = ({
  setTopic,
  setTopicTag,
  setTopicDesc,
  toggleModal,
  setIsGroupTopicEmpty,
}: GroupTopicModalPropTypes) => {
  const [isTopicEmpty, setIsTopicEmpty] = useState(false);
  const [isTopicTagEmpty, setIsTopicTagEmpty] = useState(false);
  const [tempTopic, setTempTopic] = useState('');
  const [tempTopicTag, setTempTopicTag] = useState('');
  const [tempTopicDesc, setTempTopicDesc] = useState('');

  const isTopicDescValid = tempTopicDesc.length <= MAX_TOPIC_DESC_LENGTH;
  const isTopicValid = tempTopic.length <= MAX_TOPIC_LENGTH;
  const isTopicTagValid = tempTopicTag.length <= MAX_TOPIC_KEYWORD_LENGTH;

  const topicDescRef = useRef<HTMLTextAreaElement>(null);
  const createTopic = () => {
    if (tempTopic && tempTopicTag && isTopicDescValid && isTopicValid && isTopicTagValid) {
      setTopic(tempTopic);
      setTopicTag(tempTopicTag);
      setTopicDesc(tempTopicDesc);

      setIsGroupTopicEmpty(false);
      toggleModal(false);
    } else if (!tempTopic || !isTopicValid) {
      setIsTopicEmpty(true);
    } else if (!tempTopicTag || !isTopicTagValid) {
      setIsTopicTagEmpty(true);
    } else if (!isTopicDescValid) {
      if (topicDescRef.current) {
        topicDescRef.current.focus();
      }
    } else {
      console.error('글감 생성시 예기치 못하는 에러');
    }
  };
  const handleTopic = (e: ChangeEvent<HTMLInputElement>) => {
    setTempTopic(e.target.value);
    setIsTopicEmpty(false);
  };

  const handleTopicTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTempTopicTag(e.target.value);
    setIsTopicTagEmpty(false);
  };

  const handleTopicDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTempTopicDesc(e.target.value);
  };
  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <InputWrpper>
        <InputTitle>글감*</InputTitle>
        <TopicInput
          isValid={!isTopicEmpty && isTopicValid}
          value={tempTopic}
          onChange={handleTopic}
          placeholder="가벼운 주제부터 시작해보는 건 어때요? ex) 내가 가장 좋아하는 음식"
          maxLength={MAX_TOPIC_LENGTH + 1}
        />
        <TopicTextLength isValid={isTopicValid}>
          {tempTopic.length}/{MAX_TOPIC_LENGTH}
        </TopicTextLength>
      </InputWrpper>
      <InputWrpper>
        <InputTitle>글감 태그*</InputTitle>
        <TopicInput
          isValid={!isTopicTagEmpty && isTopicTagValid}
          value={tempTopicTag}
          onChange={handleTopicTag}
          placeholder="위에 적은 글감을 한 단어로 요약해주세요. ex)음식"
          maxLength={MAX_TOPIC_KEYWORD_LENGTH + 1}
        />
        <TopicTextLength isValid={isTopicTagValid}>
          {tempTopicTag.length}/{MAX_TOPIC_KEYWORD_LENGTH}
        </TopicTextLength>
      </InputWrpper>

      <InputWrpper>
        <InputTitle>글감 소개</InputTitle>
        <TopicDescTextArea
          isValid={isTopicDescValid}
          onChange={handleTopicDesc}
          placeholder="글감에 대해 자유롭게 소개해주세요. ex) 어떤 음식을 가장 좋아하시나요? 좋아하는 음식에 얽힌 나만의 이야기도 함께 이야기해보는 건 어때요?"
          maxLength={MAX_TOPIC_DESC_LENGTH + 1}
          ref={topicDescRef}
          value={tempTopicDesc}
        />
        <TopicTextLength isValid={isTopicDescValid}>
          {tempTopicDesc.length}/{MAX_TOPIC_DESC_LENGTH}
        </TopicTextLength>
      </InputWrpper>
      <CreateTopicBtn type="button" onClick={createTopic}>
        글감 생성하기
      </CreateTopicBtn>
    </ModalWrapper>
  );
};

const TopicTextLength = styled.span<{ isValid: boolean }>`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};
  ${({ theme }) => theme.fonts.button3};
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  width: 61.6rem;
  height: 51.5rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-50%, -50%);
  border-radius: 8px;
`;

const InputWrpper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;
  width: 100%;
`;

const InputTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.subtitle2};
`;

const TopicInput = styled.input<{ isValid: boolean }>`
  width: 100%;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const TopicDescTextArea = styled.textarea<{ isValid: boolean }>`
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.button2};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;
const CreateTopicBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.button2};
  background: ${({ theme }) => theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: 1px solid ${({ theme }) => theme.colors.mileViolet};
  }
`;

export default CreateGroupTopicModal;
