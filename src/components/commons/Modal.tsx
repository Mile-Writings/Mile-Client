import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import Spacing from './Spacing';

import useClickOutside from '../../hooks/useClickOutside';

interface ModalContentPropTypes {
  modalContent: string;
  isModalOpen: boolean;
  modalHandler: () => void;
  closeModalHandler: () => void;
}

// '아니오'를 유도하는 모달
export const NegativeModal = (props: ModalContentPropTypes) => {
  const { modalContent, modalHandler, closeModalHandler, isModalOpen } = props;
  const [modalBgClickActive, setModalBgClickActive] = useState(isModalOpen);
  const modalRef = useRef(null);

  const handleOutSideClick = () => {
    if (isModalOpen) {
      setModalBgClickActive(true);
    }
    if (modalBgClickActive) {
      closeModalHandler();
      setModalBgClickActive(false);
    }
  };

  /* 모달이 닫힐 때마다 배경 클릭 여부도 함께 초기화 */
  useEffect(() => {
    if (!isModalOpen) {
      setModalBgClickActive(false);
    }
  }, [isModalOpen]);

  /* 모달이 닫힐 때마다 배경 클릭 여부도 함께 초기화 */
  useEffect(() => {
    if (!isModalOpen) {
      setModalBgClickActive(false);
    }
  }, [isModalOpen]);
  useClickOutside(modalRef, handleOutSideClick);

  return (
    <ModalBackgroundWrapper $isModalOpen={isModalOpen}>
      <ModalWrapper ref={modalRef} $isModalOpen={isModalOpen}>
        <ModalContentLayout>{modalContent}</ModalContentLayout>
        <Spacing marginBottom="3.2" />
        <ModalBtnLayout>
          <NegativeButton onClick={modalHandler}>예</NegativeButton>
          <PositiveButton onClick={closeModalHandler}>아니오</PositiveButton>
        </ModalBtnLayout>
      </ModalWrapper>
    </ModalBackgroundWrapper>
  );
};

// '예'를 유도하는 모달
export const PositiveModal = (props: ModalContentPropTypes) => {
  const { modalContent, modalHandler, closeModalHandler, isModalOpen } = props;
  const [modalBgClickActive, setModalBgClickActive] = useState(isModalOpen);
  const modalRef = useRef(null);

  const handleOutSideClick = () => {
    if (isModalOpen) {
      setModalBgClickActive(true);
    }
    if (modalBgClickActive) {
      closeModalHandler();
      setModalBgClickActive(false);
    }
  };
  /* 모달이 닫힐 때마다 배경 클릭 여부도 함께 초기화 */
  useEffect(() => {
    if (!isModalOpen) {
      setModalBgClickActive(false);
    }
  }, [isModalOpen]);

  useClickOutside(modalRef, handleOutSideClick);

  return (
    <ModalBackgroundWrapper $isModalOpen={isModalOpen}>
      <ModalWrapper ref={modalRef} $isModalOpen={isModalOpen}>
        <ModalContentLayout>{modalContent}</ModalContentLayout>
        <Spacing marginBottom="3.2" />
        <ModalBtnLayout>
          <NegativeButton onClick={closeModalHandler}>아니오</NegativeButton>
          <PositiveButton onClick={modalHandler}>예</PositiveButton>
        </ModalBtnLayout>
      </ModalWrapper>
    </ModalBackgroundWrapper>
  );
};

const ModalBackgroundWrapper = styled.div<{ $isModalOpen: boolean }>`
  position: fixed;
  top: 0;
  z-index: 1;
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 60%);
`;

const ModalWrapper = styled.section<{ $isModalOpen: boolean }>`
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'flex' : 'none')};
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
