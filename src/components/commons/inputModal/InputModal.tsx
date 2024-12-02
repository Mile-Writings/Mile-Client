import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spacing from '../../../components/commons/Spacing';
import { useEditAdminTopic, usePostAdminTopic } from '../../../pages/admin/hooks/queries';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface topicPropTypes {
  topicStored?: string;
  topicTagStored?: string;
  topicDescriptionStored?: string;
  topicId?: string;
  pageNum: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  topicPlaceholder: string;
  tagPlaceholder: string;
  descPlaceholder: string;
}

const InputModal = ({
  topicStored,
  topicTagStored,
  topicDescriptionStored,
  topicId,
  pageNum,
  setShowModal,
  topicPlaceholder,
  tagPlaceholder,
  descPlaceholder,
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

  const handleTopicNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
    setTopicNameError(false); //다시 입력할때의 초기화
  };

  const handleTopicTagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            placeholder={topicPlaceholder}
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
            placeholder={tagPlaceholder}
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
            placeholder={descPlaceholder}
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

export default InputModal;

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
  border-radius: 8px;

  ${({ theme }) => theme.fonts.subtitle2}

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 1.8rem;
    max-width: 33.5rem;
    padding: 1.8rem;

    ${({ theme }) => theme.fonts.mTitle1};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: end;
    justify-content: baseline;
    width: 100%;
    min-height: 6rem;
    padding: 1rem 1.3rem;
  }
`;

const TopicInput = styled.textarea`
  width: 46.4rem;
  height: 100%;
  padding: 0;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
    white-space: pre-line;

    @media ${MOBILE_MEDIA_QUERY} {
      min-height: 4rem;

      ${({ theme }) => theme.fonts.mSubtitle2};
    }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 4.4rem;
    padding: 1rem 2rem;
    ${({ theme }) => theme.fonts.mButton1};
  }
`;

const TopicDescriptionInput = styled.textarea<{ isError: boolean }>`
  width: 52.8rem;
  height: 7.8rem;
  overflow: scroll;

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;
  border-radius: 6px;

  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};

    @media ${MOBILE_MEDIA_QUERY} {
      ${({ theme }) => theme.fonts.mSubtitle2};
    }
  }

  :focus {
    outline: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const TextCount = styled.div<{ isError: boolean }>`
  ${({ theme }) => theme.fonts.button3}
  color: ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray70)};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mButton1};
  }
`;
