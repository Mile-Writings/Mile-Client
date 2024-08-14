import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import Spacing from '../Spacing';

interface FullModalPropType {
  isModalOpen: boolean;
  handleClickBg?: () => void;
  children: React.ReactNode;
  content: string;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const FullModal = (props: FullModalPropType) => {
  const { isModalOpen, handleClickBg, children, content } = props;

  return (
    <>
      {createPortal(
        <Wrapper $showModal={isModalOpen}>
          <ModalBackground onClick={handleClickBg} />
          <ModalWrapper>
            <Content>{content}</Content>
            <Spacing marginBottom="2.8" />
            <BtnWrapper>{children}</BtnWrapper>
          </ModalWrapper>
        </Wrapper>,
        portalElement,
      )}
    </>
  );
};

export default FullModal;

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

const ModalWrapper = styled.div`
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
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

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;
