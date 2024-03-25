import styled from '@emotion/styled';
import { useRef, Dispatch, SetStateAction, useState } from 'react';

import { EditorCatIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import useClickOutside from '../../../hooks/useClickOutside';

interface EditorFlowModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  editorFlowModalType: string;
}

const EditorFlowModal = (props: EditorFlowModalProps) => {
  const modalRef = useRef(null);
  const { showModal, setShowModal, editorFlowModalType } = props;
  // custom hook handle용 state
  const [modalBgClickActive, setModalBgClickActive] = useState(showModal);

  const onClickModalBtn = () => {
    setShowModal(false);
  };

  const handleOutSideClick = () => {
    if (showModal) {
      setModalBgClickActive(true);
    }
    if (modalBgClickActive) {
      setShowModal(false);
      setModalBgClickActive(!modalBgClickActive);
    }
  };

  useClickOutside(modalRef, handleOutSideClick);
  return (
    <ModalBackground $showModal={showModal}>
      <ModalWrapper ref={modalRef}>
        <ModalTitle>임시저장 하시겠습니까?</ModalTitle>
        <Spacing marginBottom="3.2" />
        <EditorCatIc />
        <Spacing marginBottom="3.2" />
        <BtnWrapper>
          <ModalBtn $isLeft={true} onClick={onClickModalBtn}>
            아니오
          </ModalBtn>
          <ModalBtn $isLeft={false} onClick={onClickModalBtn}>
            예
          </ModalBtn>
        </BtnWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default EditorFlowModal;

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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 30.8rem;
  padding: 3.2rem 4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const ModalTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.title8};
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;

const ModalBtn = styled.button<{ $isLeft: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  color: ${({ $isLeft, theme }) => ($isLeft ? theme.colors.mainViolet : theme.colors.white)};

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
