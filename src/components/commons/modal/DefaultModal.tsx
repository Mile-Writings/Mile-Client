import styled from '@emotion/styled';
import React from 'react';

import Spacing from '../Spacing';

import {
  AlertStorageIcn,
  AlertUploadIcn,
  AlertCautionIcn,
  AlertModifyIcn,
  AlertDeleteIcn,
} from '../../../assets/svgs/modal/modalSVG';

interface ModalPropType {
  type: 'DEFAULT' | 'MEDIUM' | 'LARGE';
  content: string;
  modalImg?: 'DELETE' | 'POST' | 'EDIT' | 'SAVE' | 'CAUTION';
  children: React.ReactNode;
}

const Modal = (props: ModalPropType) => {
  const { type, content, children, modalImg } = props;

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
      <ModalBackground $showModal={true} />
      <Wrapper $type={type}>
        <Content>{content}</Content>
        {modalImg && getModalImg()}
        <Spacing marginBottom="2.4" />
        {children}
      </Wrapper>
    </>
  );
};

export default Modal;

const ModalBackground = styled.div<{ $showModal: boolean }>`
  position: fixed;
  top: 0;
  z-index: 5;
  display: ${({ $showModal }) => ($showModal ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;

  background-color: #0009;
`;

const Wrapper = styled.div<{ $type: string }>`
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

const Content = styled.p`
  color: ${({ theme }) => theme.colors.gray100};
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.fonts.title8};
`;
