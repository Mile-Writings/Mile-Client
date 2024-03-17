import styled from '@emotion/styled';

interface modalPropTypes {
  modalContent: string;
}

interface ButtonPropTypes {
  buttonContent: string;
  isRightButton: boolean;
}

// '아니오'를 유도하는 모달
export const NegativeModal = ({ modalContent }: modalPropTypes) => {
  return (
    <ModalWrapper>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <ModalBtnLayout>
        <ModalButton buttonContent={'예'} isRightButton={false} />
        <ModalButton buttonContent={'아니오'} isRightButton={true} />
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

// '예'를 유도하는 모달
export const PositiveModal = ({ modalContent }: modalPropTypes) => {
  return (
    <ModalWrapper>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <ModalBtnLayout>
        <ModalButton buttonContent={'아니오'} isRightButton={false} />
        <ModalButton buttonContent={'예'} isRightButton={true} />
      </ModalBtnLayout>
    </ModalWrapper>
  );
};

export const ModalButton = ({ buttonContent, isRightButton }: ButtonPropTypes) => {
  return <ModalBtnWrapper $isRightButton={isRightButton}>{buttonContent}</ModalBtnWrapper>;
};

const ModalWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 18.1rem;
`;

const ModalContentLayout = styled.div`
  gap: 1.2rem;
  align-items: center;
`;

const ModalBtnLayout = styled.div`
  display: flex;
`;

const ModalBtnWrapper = styled.button<{ $isRightButton: boolean }>`
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ $isRightButton, theme }) =>
    $isRightButton ? theme.colors.white : theme.colors.mainViolet};

  background-color: ${({ $isRightButton, theme }) =>
    $isRightButton ? theme.colors.mainViolet : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
