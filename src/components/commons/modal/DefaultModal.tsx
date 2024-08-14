import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import Spacing from '../Spacing';

import {
  AlertStorageIcn,
  AlertUploadIcn,
  AlertCautionIcn,
  AlertModifyIcn,
  AlertDeleteIcn,
} from '../../../assets/svgs/modal/modalSVG';

interface ModalPropType {
  isModalOpen: boolean;
  handleClickBg?: () => void;
  type?: 'DEFAULT' | 'MEDIUM' | 'LARGE';
  content: string;
  modalImg?: 'DELETE' | 'POST' | 'EDIT' | 'SAVE' | 'CAUTION' | '';
  children: React.ReactNode;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const DefaultModal = (props: ModalPropType) => {
  const {
    isModalOpen,
    handleClickBg = () => {},
    type = 'DEFAULT',
    content,
    children,
    modalImg,
  } = props;

  const getModalImg = () => {
    switch (modalImg) {
      case 'POST':
        return <AlertUploadIcn />;
      case 'SAVE':
        return <AlertStorageIcn />;
      case 'CAUTION':
        return <AlertCautionIcn />;
      case 'EDIT':
        return <AlertModifyIcn />;
      case 'DELETE':
        return <AlertDeleteIcn />;
    }
  };

  return (
    <>
      {createPortal(
        <Wrapper $showModal={isModalOpen}>
          <ModalBackground onClick={handleClickBg} />
          <ModalWrapper $type={type}>
            <Content>{content}</Content>
            <Spacing marginBottom="2.4" />
            {modalImg && getModalImg()}
            <Spacing marginBottom="2.4" />
            <BtnWrapper>{children}</BtnWrapper>
          </ModalWrapper>
        </Wrapper>,
        portalElement,
      )}
    </>
  );
};

export default DefaultModal;

const Wrapper = styled.div<{ $showModal: boolean }>`
  position: fixed;
  top: 0;
  z-index: 5;
  display: ${({ $showModal }) => ($showModal ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100vw;
  height: 100%;

  background-color: #0009;
`;

const ModalWrapper = styled.div<{ $type: string }>`
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $type }) => {
    switch ($type) {
      case 'MEDIUM':
        return '43.1rem';
      case 'LARGE':
        return '44.2rem';
      case 'DEFAULT':
      default:
        return '40rem';
    }
  }};
  padding: 3.2rem 4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.colors.gray100};
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.fonts.title8};
`;
