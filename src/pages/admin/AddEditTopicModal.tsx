import styled from '@emotion/styled';
import React from 'react';

import Spacing from '../../components/commons/Spacing';

const AddEditTopicModal = () => {
  return (
    <ModalWrapper>
      <div>
        글감*
        <Spacing marginBottom="1.2" />
        <TopicInput placeholder="함께 작성하고 싶은 글감을 입력해주세요. ex) 마음이 담긴 선물"></TopicInput>
      </div>
      <div>
        글감 태그*
        <Spacing marginBottom="1.2" />
        <TopicInput placeholder="위에 적은 글감을 한 단어로 요약해주세요. ex) 선물"></TopicInput>
      </div>
      <div>
        글감 소개
        <Spacing marginBottom="1.2" />
        <TopicDescriptionInput
          placeholder={`글감에 대해 자유롭게 소개해주세요\nex) 마음이 담긴 선물을 주거나 받은 기억을 떠올려보세요.\n그 순간이 당신에게 어떤 의미로 남았는지 이야기해주세요.`}
        ></TopicDescriptionInput>
      </div>
      <SubmitForm>글감 수정하기</SubmitForm>
    </ModalWrapper>
  );
};

export default AddEditTopicModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 61.6rem;
  padding: 3.2rem;

  ${({ theme }) => theme.fonts.subtitle2}

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const TopicInput = styled.input`
  width: 55.2rem;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const TopicDescriptionInput = styled.textarea`
  width: 55.2rem;
  height: 11.8rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;

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
