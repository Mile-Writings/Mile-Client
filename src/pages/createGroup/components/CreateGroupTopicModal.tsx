import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface GroupTopicModalPropTypes {
  topic: string;
  topicTag: string;
  toggleModal: (prev: boolean) => void;
  setTopic: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicTag: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setIsGroupTopicEmpty: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupTopicModal = ({
  topic,
  topicTag,
  setTopic,
  setTopicTag,
  setTopicDesc,
  toggleModal,
  setIsGroupTopicEmpty,
}: GroupTopicModalPropTypes) => {
  const [isTopicEmpty, setIsTopicEmpty] = useState(false);
  const [isTopicTagEmpty, setIsTopicTagEmpty] = useState(false);

  const createTopic = () => {
    if (topic && topicTag) {
      setIsGroupTopicEmpty(false);
      toggleModal(false);
    } else if (!topic) {
      setIsTopicEmpty(true);
    } else if (!topicTag) {
      setIsTopicTagEmpty(true);
    } else {
      throw new Error('topic modal Error');
    }
  };
  const handleTopic = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e);
    setIsTopicEmpty(false);
  };

  const handleTopicTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTopicTag(e);
    setIsTopicTagEmpty(false);
  };
  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <InputWrpper>
        <InputTitle>글감*</InputTitle>
        <TopicInput
          isValid={!isTopicEmpty}
          value={topic}
          onChange={handleTopic}
          placeholder="가벼운 주제부터 시작해보는 건 어때요? ex) 내가 가장 좋아하는 음식"
        />
      </InputWrpper>
      <InputWrpper>
        <InputTitle>글감 태그*</InputTitle>
        <TopicInput
          isValid={!isTopicTagEmpty}
          value={topicTag}
          onChange={handleTopicTag}
          placeholder="위에 적은 글감을 한 단어로 요약해주세요. ex)음식"
        />
      </InputWrpper>
      <InputWrpper>
        <InputTitle>글감 소개</InputTitle>
        <TopicDescTextArea
          isValid={true}
          onChange={setTopicDesc}
          placeholder="글감에 대해 자유롭게 소개해주세요. ex) 어떤 음식을 가장 좋아하시나요? 좋아하는 음식에 얽힌 나만의 이야기도 함께 이야기해보는 건 어때요?"
        />
      </InputWrpper>
      <CreateTopicBtn type="button" onClick={createTopic}>
        글감 생성하기
      </CreateTopicBtn>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%; /* 상단에서 50%의 위치 */
  left: 50%; /* 왼쪽에서 50%의 위치 */
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

  /* border: 1px solid ${({ theme }) => theme.colors.gray20}; */
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
