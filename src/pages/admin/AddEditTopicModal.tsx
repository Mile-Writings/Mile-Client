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
        <TopicInput placeholder="위에 적은 글감을 한 단어로 요약해주세요. ex) 선물"></TopicInput>
      </div>
    </ModalWrapper>
  );
};

export default AddEditTopicModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem;

  ${({ theme }) => theme.fonts.subtitle2}

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const TopicInput = styled.input`
  width: 55.2rem;
  height: 3.9rem;
  padding: 1.2rem 1rem;

  color: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.fonts.button2}

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 6px;
`;
