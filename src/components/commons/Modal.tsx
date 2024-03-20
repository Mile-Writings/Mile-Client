import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spacing from './Spacing';

interface modalContentPropTypes {
  modalContent: string;
  confirmRoutingTo: string;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonPropTypes {
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  children: string;
  confirmRoutingTo?: string; // '예' 버튼이 라우팅 되는 곳을 나타냄
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
        <LeftBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          예
        </LeftBtn>
        <RightBtn setIsVisible={setIsVisible}>아니오</RightBtn>
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
        <LeftBtn setIsVisible={setIsVisible}>아니오</LeftBtn>
        <RightBtn setIsVisible={setIsVisible} confirmRoutingTo={confirmRoutingTo}>
          예
        </RightBtn>
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

export const RightBtn = (props: ButtonPropTypes) => {
  const { confirmRoutingTo, children } = props;
  const navigate = useNavigate();
  const [, setIsVisible] = useState<boolean>(true);

  const handleOnClick = () => {
    if (confirmRoutingTo) {
      navigate(`${confirmRoutingTo}`);
    } else {
      setIsVisible(false);
    }
  };

  return <RightButton onClick={handleOnClick}>{children}</RightButton>;
};

export const LeftBtn = (props: ButtonPropTypes) => {
  const { confirmRoutingTo, children } = props;
  const [, setIsVisible] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (confirmRoutingTo) {
      navigate(`${confirmRoutingTo}`);
    } else {
      setIsVisible(true);
    }
  };

  return <LeftButton onClick={handleOnClick}>{children}</LeftButton>;
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

const RightButton = styled.button`
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

const LeftButton = styled.button`
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
