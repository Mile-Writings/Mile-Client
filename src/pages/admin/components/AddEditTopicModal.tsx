import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEditAdminTopic, usePostAdminTopic } from '../hooks/queries';

import Spacing from '../../../components/commons/Spacing';

interface topicPropTypes {
  topicStored?: string;
  topicTagStored?: string;
  topicDescriptionStored?: string;
  topicId?: string;
  pageNum: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const AddEditTopicModal = ({
  topicStored,
  topicTagStored,
  topicDescriptionStored,
  topicId,
  pageNum,
  setShowModal,
}: topicPropTypes) => {
  useEffect(() => {
    setTopic(topicStored || '');
    setTopicTag(topicTagStored || '');
    setTopicDescription(topicDescriptionStored || '');
  }, []);

  const [topic, setTopic] = useState('');
  const [topicTag, setTopicTag] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topicNameError, setTopicNameError] = useState(false);
  const [topicTagError, setTopicTagError] = useState(false);
  const [topicDescriptionError, setTopicDescriptionError] = useState(false);

  const { groupId } = useParams();

  const { postMutateAdminTopic } = usePostAdminTopic(groupId, pageNum);
  const { editMutateAdminTopic } = useEditAdminTopic(topicId, groupId, pageNum);

  const handleTopicNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
    setTopicNameError(false); //다시 입력할때의 초기화
  };

  const handleTopicTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicTag(e.target.value);
    setTopicTagError(false);
  };

  const handleTopicDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setTopicDescription(newDescription);
    setTopicDescriptionError(false);
  };

  const handleSubmit = (topicStored: string) => {
    const isTopicNameError = topic.trim() === '' || topic.length > 15;
    const isTopicTagError = topicTag.trim() === '' || topicTag.length > 5;
    const isTopicDescriptionError = topicDescription.length > 90;

    setTopicNameError(isTopicNameError);
    setTopicTagError(isTopicTagError);
    setTopicDescriptionError(isTopicDescriptionError);

    if (!isTopicNameError && !isTopicTagError && !isTopicDescriptionError) {
      topicStored
        ? editMutateAdminTopic({ topic, topicTag, topicDescription, topicId })
        : postMutateAdminTopic({ topic, topicTag, topicDescription, groupId });
      setShowModal(false);
    }
  };

  return (
    <ModalWrapper>
      <div>
        글감*
        <Spacing marginBottom="1.2" />
        <InputWrapper isError={topic.length > 15 || topicNameError}>
          <TopicInput
            placeholder="함께 작성하고 싶은 글감을 입력해주세요. ex) 마음이 담긴 선물"
            value={topic}
            onChange={handleTopicNameChange}
            maxLength={16}
          />
          <TextCount isError={topic.length > 15 || topicNameError}>{topic.length}/15</TextCount>
        </InputWrapper>
      </div>
      <div>
        글감 태그*
        <Spacing marginBottom="1.2" />
        <InputWrapper isError={topicTag.length > 5 || topicTagError}>
          <TopicInput
            placeholder="위에 적은 글감을 한 단어로 요약해주세요. ex) 선물"
            value={topicTag}
            onChange={handleTopicTagChange}
            maxLength={6}
          />
          <TextCount isError={topicTag.length > 5 || topicTagError}>{topicTag.length}/5</TextCount>
        </InputWrapper>
      </div>
      <div>
        글감 소개
        <Spacing marginBottom="1.2" />
        <TextAreaWrapper isError={topicDescription.length > 90 || topicDescriptionError}>
          <TopicDescriptionInput
            placeholder={`글감에 대해 자유롭게 소개해주세요\nex) 마음이 담긴 선물을 주거나 받은 기억을 떠올려보세요.\n그 순간이 당신에게 어떤 의미로 남았는지 이야기해주세요.`}
            onChange={handleTopicDescriptionChange}
            value={topicDescription}
            maxLength={91}
            isError={topicDescriptionError}
          />
          <TextCount isError={topicDescription.length > 90 || topicDescriptionError}>
            {topicDescription.length}/90
          </TextCount>
        </TextAreaWrapper>
      </div>
      <SubmitForm onClick={() => handleSubmit(topicStored || '')}>
        {topicStored ? '글감 수정하기' : '글감 생성하기'}
      </SubmitForm>
    </ModalWrapper>
  );
};

export default AddEditTopicModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 6;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 61.6rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.fonts.subtitle2}
  border-radius: 8px;
`;

const InputWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55.2rem;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray50)};
  border-radius: 6px;
`;

const TopicInput = styled.input`
  width: 46.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const SubmitForm = styled.button`
  width: 55.2rem;
  height: 5.1rem;
  padding: 1.6rem 2rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button2}
  border-radius: 10px;
`;

const TopicDescriptionInput = styled.textarea<{ isError: boolean }>`
  width: 52.8rem;
  height: 7.8rem;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray50)};
  border: none;
  border-radius: 6px;

  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }

  :focus {
    outline: none;
  }
`;

const TextAreaWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 55.2rem;
  height: 11.8rem;
  padding: 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray50)};
  border-radius: 6px;
`;

const TextCount = styled.div<{ isError: boolean }>`
  ${({ theme }) => theme.fonts.button3}
  color: ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray70)};
`;
