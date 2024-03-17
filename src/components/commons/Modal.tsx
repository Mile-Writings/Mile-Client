import styled from '@emotion/styled';

import { NegativeBtn, PositiveBtn } from './ModalBtn';

interface modalPropTypes {
  modalContent: string;
}

// '아니오'를 유도하는 모달
export const NegativeModal = ({ modalContent }: modalPropTypes) => {
  return (
    <ModalWrapper>
      <ModalContentLayout>{modalContent}</ModalContentLayout>
      <ModalBtnLayout>
        <PositiveBtn />
        <NegativeBtn />
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
        <NegativeBtn >
        <PositiveBtn />
      </ModalBtnLayout>
    </ModalWrapper>
  );
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
