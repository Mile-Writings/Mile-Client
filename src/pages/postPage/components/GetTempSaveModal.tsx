import styled from '@emotion/styled';

interface GetTempSaveModalPropsType {
  onClickTempModal: (modalClose: boolean) => void;
}

// 임시저장 불러오기 여부 모달
const GetTempSaveModal = (props: GetTempSaveModalPropsType) => {
  const { onClickTempModal } = props;
  const onClickModalBtn = () => {
    onClickTempModal(false);
  };

  return (
    <ModalWrapper>
      <ModalInfo>임시 저장된 글을 계속 이어 쓸까요?</ModalInfo>
      <ModalBtnWrapper>
        <ModalBtn onClick={onClickModalBtn}>글 확인하기</ModalBtn>
        <ModalBtn onClick={onClickModalBtn}>아니오</ModalBtn>
      </ModalBtnWrapper>
    </ModalWrapper>
  );
};

export default GetTempSaveModal;

const ModalWrapper = styled.div`
  width: 40rem;
  height: 30rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const ModalInfo = styled.div`
  ${({ theme }) => theme.fonts.title8};
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBtn = styled.button`
  width: 100%;
  height: 3.9rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};

  ${({ theme }) => theme.fonts.button2};
`;
