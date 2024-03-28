import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import Spacing from './Spacing';

import useClickOutside from '../../hooks/useClickOutside';

interface ModalContentPropTypes {
  modalContent: string;
  onClick: () => void;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

// '아니오'를 유도하는 모달
export const NegativeModal = (props: ModalContentPropTypes) => {
  const { modalContent, onClick } = props;
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const modalRef = useRef(null);
  const closeModalHandler = () => {
    setIsVisible(false);
  };
  useClickOutside(modalRef, closeModalHandler);

  return (
    <ModalWrapper ref={modalRef} $isVisible={isVisible}>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <NegativeButton onClick={onClick}>예</NegativeButton>
        <PositiveButton onClick={closeModalHandler}>아니오</PositiveButton>
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

// '예'를 유도하는 모달
export const PositiveModal = (props: ModalContentPropTypes) => {
  const { modalContent, onClick } = props;
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const modalRef = useRef(null);

  const closeModalHandler = () => {
    setIsVisible(false);
  };

  useClickOutside(modalRef, closeModalHandler);

  return (
    <ModalWrapper ref={modalRef} $isVisible={isVisible}>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <NegativeButton onClick={closeModalHandler}>아니오</NegativeButton>
        <PositiveButton onClick={onClick}>예</PositiveButton>
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.section<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 18.1rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

const ModalContentLayout = styled.div`
  color: ${({ theme }) => theme.colors.gray100};
  white-space: pre-line;
  text-align: center;

  ${({ theme }) => theme.fonts.title8};
`;

const ModalBtnLayout = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const PositiveButton = styled.button`
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;

const NegativeButton = styled.button`
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
