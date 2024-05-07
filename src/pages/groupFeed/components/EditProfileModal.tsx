import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useRef } from 'react';

import { AniImgProfileIc } from '../../../assets/svgs';

interface editProfilModalPropTypes {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
}

const EditProfileModal = ({ setShowEditProfileModal }: editProfilModalPropTypes) => {
  const modalRef = useRef(null);
  return (
    <>
      <BackgroundWrapper onClick={() => setShowEditProfileModal(false)}>
        <ModalWrapper ref={modalRef}>
          <ProfileWrapper>
            <AniImgProfileIc />
            <p>쾌활한 딸기</p>
          </ProfileWrapper>
          <InputWrapper></InputWrapper>
          <EditButton>프로필 수정</EditButton>
        </ModalWrapper>
      </BackgroundWrapper>
    </>
  );
};

export default EditProfileModal;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background: rgb(0 0 0 / 60%);
`;

const ModalWrapper = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  width: 61.6rem;
  height: 41.1rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title6};
`;
const InputWrapper = styled.input`
  width: 100%;
  height: 11.8rem;
`;
const EditButton = styled.button`
  width: 100%;
  height: 5.1rem;
`;
