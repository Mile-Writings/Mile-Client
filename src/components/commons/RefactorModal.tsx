import styled from '@emotion/styled';

import Spacing from './Spacing';

const RefactorModal = () => {
  return (
    <>
      <ModalBackground $showModal={true} />
      <ModalWrapper $type="">
        <ModalTitle>{title}</ModalTitle>
        <Spacing marginBottom="2.4" />
      </ModalWrapper>
    </>
  );
};

export default RefactorModal;

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

const ModalWrapper = styled.div<{ $type: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  padding: 3.2rem 4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const ModalTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray100};
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.fonts.title8};
`;
