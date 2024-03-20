import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spacing from './Spacing';

interface modalContentPropTypes {
  modalContent: string;
  confirmRoutingTo: string; // '예' 버튼이 라우팅 되는 곳을 나타냄
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonPropTypes {
  confirmRoutingTo: string;
  children: string;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// '아니오'를 유도하는 모달
export const NegativeModal = (props: modalContentPropTypes) => {
  const { confirmRoutingTo, modalContent } = props;
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <ModalWrapper $isVisible={isVisible}>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <NegativeBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          예
        </NegativeBtn>
        <PositiveBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          아니오
        </PositiveBtn>
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

// '예'를 유도하는 모달
export const PositiveModal = (props: modalContentPropTypes) => {
  const { confirmRoutingTo, modalContent } = props;
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <ModalWrapper $isVisible={isVisible}>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <NegativeBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          아니오
        </NegativeBtn>
        <PositiveBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          예
        </PositiveBtn>
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

export const PositiveBtn = (props: ButtonPropTypes) => {
  const { children, confirmRoutingTo } = props;
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (children === '아니오') {
      props.setIsVisible(false);
    } else {
      navigate(`${confirmRoutingTo}`);
    }
  };

  return <PositiveButton onClick={handleOnClick}>{children}</PositiveButton>;
};

export const NegativeBtn = (props: ButtonPropTypes) => {
  const { children, confirmRoutingTo } = props;
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (children === '아니오') {
      props.setIsVisible(false);
    } else {
      navigate(`${confirmRoutingTo}`);
    }
  };

  return <NegativeButton onClick={handleOnClick}>{children}</NegativeButton>;
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
