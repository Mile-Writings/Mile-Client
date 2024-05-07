import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useRef, useState, ChangeEvent } from 'react';

import { useFetchWriterInfo } from '../hooks/queries';

import { AniImgProfileIc } from '../../../assets/svgs';

interface editProfilModalPropTypes {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
  writerNameId: number | undefined;
}

const EditProfileModal = ({ setShowEditProfileModal, writerNameId }: editProfilModalPropTypes) => {
  const { name, description } = useFetchWriterInfo(writerNameId);
  const modalRef = useRef(null);
  const [countLength, setCountLength] = useState(0);
  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCountLength(e.target.value.length);
  };
  return (
    <>
      <BackgroundWrapper onClick={() => setShowEditProfileModal(false)} />
      <ModalWrapper ref={modalRef}>
        <ProfileWrapper>
          <AniImgProfileIc />
          <p>{name}</p>
        </ProfileWrapper>
        <ContentWrapper isError={countLength > 100}>
          <InputWrapper placeholder="소개글을 입력해주세요" onChange={onInputHandler}>
            {description}
          </InputWrapper>
          <div>{countLength}/100</div>
        </ContentWrapper>
        <EditButton>프로필 수정</EditButton>
      </ModalWrapper>
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
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  width: 61.6rem;
  height: 41.1rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-50%, -50%);
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

const ContentWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  height: 11.8rem;
  padding: 1rem 1.2rem;

  color: ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray70)};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.colors.mileRed : theme.colors.gray20)};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.button3};
`;

const InputWrapper = styled.textarea`
  width: 52.8rem;
  height: 7.8rem;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: none;

  resize: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }

  ${({ theme }) => theme.fonts.button2}
`;

const EditButton = styled.button`
  width: 100%;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  ${({ theme }) => theme.fonts.button2};
`;
