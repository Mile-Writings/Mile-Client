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
import alertCautionPng from '/src/assets/images/alertCaution.png';
import alertStoragePng from '/src/assets/images/alertStorage.png';
import alertUploadPng from '/src/assets/images/alertUpload.png';
// 얘네 둘 import해와야함
// import alertModifyPng from '/src/assets/images/alertModify.png';
// import alertDeletePng from '/src/assets/images/alertDelete.png';

import React from 'react';
import { MODAL_SIZES } from './constants';

interface ModalPropType {
  isModalOpen: boolean;
  sizeType?: 'DEFAULT' | 'SMALL' | 'MEDIUM' | 'LARGE';
  modalImg?: 'DELETE' | 'POST' | 'EDIT' | 'SAVE' | 'CAUTION' | '';
  children: React.ReactNode;
  content: string;
  onClickBg?: () => void;
}

interface ModalBtnType {
  btnText: string[];
  onClickLeft: () => void;
  onClickRight: () => void;
}

const portalElement = document.getElementById('modal') as HTMLElement;

export const DefaultModalBtn = (props: ModalBtnType) => {
  const { btnText, onClickLeft, onClickRight } = props;

  return (
    <>
      <ModalBtn type="button" $isLeft={true} onClick={onClickLeft}>
        {btnText[0]}
      </ModalBtn>
      <ModalBtn type="button" $isLeft={false} onClick={onClickRight}>
        {btnText[1]}
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
    onClickBg = () => {},
    children,
  } = props;

  // const getModalImg = () => {
  //   switch (modalImg) {
  //     case 'POST':
  //       return <AlertUploadIcn />;
  //     case 'SAVE':
  //       return <AlertStorageIcn />;
  //     case 'CAUTION':
  //       return <AlertCautionIcn />;
  //     case 'EDIT':
  //       return <AlertModifyIcn />;
  //     case 'DELETE':
  //       return <AlertDeleteIcn />;
  //   }
  // };

  const getModalImg = () => {
    switch (modalImg) {
      case 'POST':
        return <img src={alertUploadPng} />;
      case 'SAVE':
        return <img src={alertStoragePng} />;
      case 'CAUTION':
        return <img src={alertCautionPng} />;
      // case 'EDIT':
      //   return <AlertModifyIcn />;
      // case 'DELETE':
      //   return <AlertDeleteIcn />;
    }
  };

  return (
    <>
      {isModalOpen &&
        createPortal(
          <Wrapper>
            <ModalBackground onClick={onClickBg} />
            <ModalWrapper $sizeType={sizeType}>
              <Content>{content}</Content>
              <Spacing marginBottom="2.4" />
              {modalImg && getModalImg()}
              {modalImg && <Spacing marginBottom="2.4" />}
              <BtnWrapper>{children}</BtnWrapper>
            </ModalWrapper>
          </Wrapper>,
          portalElement,
        )}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  z-index: 4;
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
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $sizeType }) => {
    switch ($sizeType) {
      case 'SMALL':
        return MODAL_SIZES.SMALL;
      case 'MEDIUM':
        return MODAL_SIZES.MEDIUM;
      case 'LARGE':
        return MODAL_SIZES.LARGE;
      case 'DEFAULT':
      default:
        return MODAL_SIZES.DEFAULT;
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
