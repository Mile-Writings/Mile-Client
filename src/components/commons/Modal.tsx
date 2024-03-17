import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Spacing from './Spacing';

interface modalContentPropTypes {
  modalContent: string;
  confirmRoutingTo: string; // '예' 버튼이 라우팅 되는 곳을 나타냄
  cancelRoutingTo: string;
}

interface ButtonPropTypes {
  buttonContent: string;
  isRightButton: boolean; // 어느 버튼이 오른쪽에 있는지 나타냄
  confirmRoutingTo?: string; // '예' 버튼이 라우팅 되는 곳을 나타냄
  cancelRoutingTo?: string; // '아니오' 버튼이 라우팅 되는 곳을 나타냄
}

// '아니오'를 유도하는 모달
export const NegativeModal = (props: modalContentPropTypes) => {
  const { confirmRoutingTo, cancelRoutingTo, modalContent } = props;

  return (
    <ModalWrapper>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <ModalButton
          confirmRoutingTo={confirmRoutingTo}
          buttonContent={'예'}
          isRightButton={false}
        />
        <ModalButton
          cancelRoutingTo={cancelRoutingTo}
          buttonContent={'아니오'}
          isRightButton={true}
        />
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

// '예'를 유도하는 모달
export const PositiveModal = (props: modalContentPropTypes) => {
  const { confirmRoutingTo, cancelRoutingTo, modalContent } = props;

  return (
    <ModalWrapper>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <Spacing marginBottom="3.2" />
      <ModalBtnLayout>
        <ModalButton
          cancelRoutingTo={cancelRoutingTo}
          buttonContent={'아니오'}
          isRightButton={false}
        />
        <ModalButton
          confirmRoutingTo={confirmRoutingTo}
          buttonContent={'예'}
          isRightButton={true}
        />
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

export const ModalButton = ({ buttonContent, isRightButton }: ButtonPropTypes) => {
  const navigate = useNavigate();
  const handleOnClick = ({ confirmRoutingTo, cancelRoutingTo }: ButtonPropTypes) => {
    if (confirmRoutingTo) {
      navigate(`${confirmRoutingTo}`);
    } else if (cancelRoutingTo) {
      navigate(`${cancelRoutingTo}`);
    }
  };

  return (
    <ModalBtnWrapper onClick={() => handleOnClick} $isRightButton={isRightButton}>
      {buttonContent}
    </ModalBtnWrapper>
  );
};

const ModalWrapper = styled.section`
  display: flex;
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

const ModalBtnWrapper = styled.button<{ $isRightButton: boolean }>`
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ $isRightButton, theme }) =>
    $isRightButton ? theme.colors.white : theme.colors.mainViolet};

  background-color: ${({ $isRightButton, theme }) =>
    $isRightButton ? theme.colors.mainViolet : theme.colors.white};
  border: 1px solid
    ${({ $isRightButton, theme }) =>
      $isRightButton ? theme.colors.mileViolet : theme.colors.mainViolet};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
