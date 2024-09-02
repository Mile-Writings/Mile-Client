import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

import Spacing from '../Spacing';

// import {
//   AlertStorageIcn,
//   AlertUploadIcn,
//   AlertCautionIcn,
//   AlertModifyIcn,
//   AlertDeleteIcn,
// } from '../../../assets/svgs/modal/modalSVG';
// import React from 'react';

interface ModalPropType {
  isModalOpen: boolean;
  sizeType?: 'DEFAULT' | 'SMALL' | 'MEDIUM' | 'LARGE';
  modalImg?: 'DELETE' | 'POST' | 'EDIT' | 'SAVE' | 'CAUTION' | '';
  children: React.ReactNode;
  content: string;
  handleClickBg?: () => void;
}

interface ModalBtnType {
  type: 'POSITIVE' | 'NEGATIVE' | 'CUSTOM';
  onClickLeft: () => void;
  onClickRight: () => void;
  customBtnText?: string[];
}

const portalElement = document.getElementById('modal') as HTMLElement;

export const DefaultModalBtn = (props: ModalBtnType) => {
  const { type, customBtnText, onClickLeft, onClickRight } = props;

  const getModalBtn = () => {
    switch (type) {
      case 'CUSTOM':
        return customBtnText || ['', ''];
      case 'NEGATIVE':
        return ['예', '아니요'];
      case 'POSITIVE':
        return ['아니요', '예'];
      default:
        return ['', ''];
    }
  };

  return (
    <>
      <ModalBtn type="button" $isLeft={true} onClick={onClickLeft}>
        {getModalBtn()[0]}
      </ModalBtn>
      <ModalBtn type="button" $isLeft={false} onClick={onClickRight}>
        {getModalBtn()[1]}
      </ModalBtn>
    </>
  );
};

export const DefaultModal = (props: ModalPropType) => {
  const {
    isModalOpen,
    sizeType = 'DEFAULT',
    modalImg,
    content,
    handleClickBg = () => {},
    children,
  } = props;

  //   const getModalImg = () => {
  //     switch (modalImg) {
  //       case 'POST':
  //         return <AlertUploadIcn />;
  //       case 'SAVE':
  //         return <AlertStorageIcn />;
  //       case 'CAUTION':
  //         return <AlertCautionIcn />;
  //       case 'EDIT':
  //         return <AlertModifyIcn />;
  //       case 'DELETE':
  //         return <AlertDeleteIcn />;
  //     }
  //   };

  return (
    <>
      {createPortal(
        <Wrapper $showModal={isModalOpen}>
          <ModalBackground onClick={handleClickBg} />
          <ModalWrapper $sizeType={sizeType}>
            <Content>{content}</Content>
            <Spacing marginBottom="2.4" />
            {/* {modalImg && getModalImg()} */}
            {modalImg && <Spacing marginBottom="2.4" />}
            <BtnWrapper>{children}</BtnWrapper>
          </ModalWrapper>
        </Wrapper>,
        portalElement,
      )}
    </>
  );
};

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

const ModalBtn = styled.button<{ $isLeft: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ $isLeft, theme }) => ($isLeft ? theme.colors.mainViolet : theme.colors.white)};
  white-space: pre-wrap;

  background-color: ${({ $isLeft, theme }) =>
    $isLeft ? theme.colors.white : theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button2};
  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: ${({ $isLeft }) => ($isLeft ? '1px solid theme.colors.mainViolet' : 'none')};
  }
`;

const ModalWrapper = styled.div<{ $sizeType: string }>`
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $sizeType }) => {
    switch ($sizeType) {
      case 'SMALL':
        return '42.7rem';
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
