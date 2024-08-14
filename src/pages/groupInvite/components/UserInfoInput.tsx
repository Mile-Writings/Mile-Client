import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import React, { useState, useReducer, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetWriterNameConflict, usePostGroupMemberJoin } from '../hooks/queries';

import DefaultModal from '../../../components/commons/modal/DefaultModal';
import DefaultModalBtn from '../../../components/commons/modal/DefaultModalBtn';
import Spacing from '../../../components/commons/Spacing';
import useModal from '../../../hooks/useModal';

interface userInfoStateType {
  writerName?: string;
  writerIntroduce?: string;
}

interface userInfoActionType {
  type: string;
  writerName?: string;
  writerIntroduce?: string;
}

const userInfoState: userInfoStateType = {
  writerName: '',
  writerIntroduce: '',
};

const reducerFn = (state: userInfoStateType, action: userInfoActionType): userInfoStateType => {
  switch (action.type) {
    case 'setWriterName':
      return {
        ...state,
        writerName: action.writerName,
      };
    case 'setWriterIntroduce':
      return {
        ...state,
        writerIntroduce: action.writerIntroduce,
      };
    default:
      return state;
  }
};

interface UserInfoInputPropTypes {
  moimTitle: string | undefined;
}

const UserInfoInput = (props: UserInfoInputPropTypes) => {
  const { moimTitle } = props;
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };

  const [userInfoVal, dispatch] = useReducer(reducerFn, userInfoState);

  // 모달 관리
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();
  // 소개글 글자수 제한
  const [isIntroduceLimit, setIsIntroduceLimit] = useState(false);
  // 필명 글자수 제한
  const [isWriterNamLimit, setIsWriterNameLimit] = useState(false);
  // 중복확인 버튼 눌렸는지 체크
  const [isConflictBtnClicked, setIsConflictBtnClicked] = useState(false);
  // 가입하기 버튼 클릭여부
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);

  const onChangeWriterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setWriterName', writerName: e.target.value });
    isWriterNameConflict ? setIsConflictBtnClicked(true) : setIsConflictBtnClicked(false);
  };

  const onChangeWriterIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setWriterIntroduce', writerIntroduce: e.currentTarget.value });
  };

  // 중복확인 API
  const { isWriterNameConflict } = useGetWriterNameConflict(
    groupId,
    userInfoVal.writerName || '',
    isConflictBtnClicked,
  );

  // 중복확인 버튼 함수
  const onClickConflictBtn = () => {
    setIsConflictBtnClicked(true);
  };

  // 글자수 체크
  useEffect(() => {
    if (userInfoVal.writerIntroduce) {
      userInfoVal.writerIntroduce.length > 100
        ? setIsIntroduceLimit(true)
        : setIsIntroduceLimit(false);
    }
    if (userInfoVal.writerName) {
      userInfoVal.writerName.length > 8 ? setIsWriterNameLimit(true) : setIsWriterNameLimit(false);
    }
    setIsSubmitBtnClicked(false);
  }, [userInfoVal.writerIntroduce, userInfoVal.writerName]);

  // 가입하기 api
  const { mutate: postGroupJoin, error } = usePostGroupMemberJoin({
    groupId: groupId,
    writerName: userInfoVal.writerName || '',
    writerDescription: userInfoVal.writerIntroduce || '',
    moimTitle: moimTitle || '',
  });

  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status) {
        const { status } = error.response;
        if (status === 400) {
          alert('최대 가입 가능 모임 개수(5개)를 초과하였습니다.');
          navigate(`/`);
        } else if (status === 409) {
          alert('이미 가입한 모임입니다!');
          navigate(`/`);
        }
      }
    }
  }, [error, groupId]);

  //가입하기 버튼 함수
  const onClickSignUp = () => {
    setIsSubmitBtnClicked(true);
    if (
      !isWriterNamLimit &&
      !isIntroduceLimit &&
      isConflictBtnClicked &&
      !isWriterNameConflict &&
      userInfoVal.writerName?.length != 0
    ) {
      handleShowModal();
    }
  };

  return (
    <>
      <WriterNameInputWrapper
        $valueNotTyped={isSubmitBtnClicked && userInfoVal.writerName?.trim().length === 0}
        $isConflictChecked={isSubmitBtnClicked && !isConflictBtnClicked}
        $isWriterNamLimit={isWriterNamLimit}
        $isConflictBtnClicked={isConflictBtnClicked}
      >
        <UserInfoTitle>모임에서 사용할 필명*</UserInfoTitle>
        <InputWrapper>
          <WriterNameInput
            placeholder="띄어쓰기 포함 8자 이내로 입력해주세요."
            onChange={onChangeWriterName}
            $isConflict={isWriterNameConflict || false}
            $isValidLength={isWriterNamLimit}
          />
          <WriterExistCheckBtn
            disabled={
              userInfoVal.writerName
                ? userInfoVal.writerName.trim().length === 0 || isWriterNamLimit
                : true
            }
            onClick={onClickConflictBtn}
            $isBtnDisabled={
              userInfoVal.writerName
                ? userInfoVal.writerName.trim().length === 0 || isWriterNamLimit
                : true
            }
          >
            중복확인
          </WriterExistCheckBtn>
        </InputWrapper>
        {/* 중복확인 안 누르고 가입하기 눌렀을 경우 */}
        {isSubmitBtnClicked &&
        userInfoVal.writerName?.trim().length !== 0 &&
        !isWriterNamLimit &&
        !isConflictBtnClicked &&
        !isWriterNameConflict ? (
          <WriterNameLength>중복확인을 해주세요.</WriterNameLength>
        ) : (
          <></>
        )}
        {/* 필명 8자 이상일 경우 */}
        {userInfoVal.writerName && isWriterNamLimit ? (
          <WriterNameLength>8자 이내로 작성해주세요.</WriterNameLength>
        ) : (
          <></>
        )}
        {/* 필명 중복 확인 결과 */}
        {isWriterNameConflict || isConflictBtnClicked ? (
          <WriterNameEnable $isConflict={isWriterNameConflict}>
            {isWriterNameConflict ? '사용 불가능한 필명 입니다.' : '사용 가능한 필명 입니다.'}
          </WriterNameEnable>
        ) : (
          <></>
        )}
      </WriterNameInputWrapper>
      <Spacing marginBottom="2.8" />
      <WriterIntroduceInputWrapper>
        <UserInfoTitle>소개 글</UserInfoTitle>
        <WriterIntroduceInput
          placeholder="모임원들에게 ‘나’에 대해 자유롭게 소개해주세요."
          onChange={onChangeWriterIntroduce}
          $isIntroduceLimit={isIntroduceLimit}
        />
        <CharCount $isIntroduceLimit={isIntroduceLimit}>
          {userInfoVal.writerIntroduce ? userInfoVal.writerIntroduce.length : 0}/100
        </CharCount>
      </WriterIntroduceInputWrapper>
      <Spacing marginBottom="2.8" />
      <SignUpBtn onClick={onClickSignUp}>가입하기</SignUpBtn>

      <DefaultModal
        isModalOpen={isModalOpen}
        handleClickBg={handleCloseModal}
        content={`가입 완료 시 필명 변경이 불가합니다. \n계속 하시겠습니까?`}
        modalImg="POST"
      >
        <DefaultModalBtn isLeft={true} text="아니오" onClickBtn={handleCloseModal} />
        <DefaultModalBtn isLeft={false} text="예" onClickBtn={postGroupJoin} />
      </DefaultModal>
    </>
  );
};

export default UserInfoInput;

const WriterNameInputWrapper = styled.section<{
  $valueNotTyped: boolean;
  $isConflictChecked: boolean;
  $isWriterNamLimit: boolean;
  $isConflictBtnClicked: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: ${({
    $valueNotTyped,
    $isConflictChecked,
    $isWriterNamLimit,
    $isConflictBtnClicked,
    theme,
  }) =>
    $valueNotTyped || $isConflictChecked || ($isWriterNamLimit && $isConflictBtnClicked)
      ? `1px solid ${theme.colors.mileRed}`
      : `1px solid transparent`};
  border-radius: 8px;
`;

const WriterIntroduceInputWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const UserInfoTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.subtitle2};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
`;

const WriterNameInput = styled.input<{ $isConflict: boolean; $isValidLength: boolean }>`
  width: 67.7rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: ${({ $isConflict, $isValidLength, theme }) =>
    $isConflict || $isValidLength
      ? `1px solid ${theme.colors.mileRed}`
      : `1px solid ${theme.colors.gray50}`};
  ${({ theme }) => theme.fonts.button2};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }

  &:focus {
    ${({ $isValidLength, theme }) => ($isValidLength ? theme.colors.mileRed : theme.colors.gray50)};
  }
`;

const WriterExistCheckBtn = styled.button<{ $isBtnDisabled: boolean }>`
  width: 8.1rem;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ $isBtnDisabled, theme }) =>
    $isBtnDisabled ? theme.colors.gray70 : theme.colors.white};

  background-color: ${({ $isBtnDisabled, theme }) =>
    $isBtnDisabled ? theme.colors.gray10 : theme.colors.mainViolet};
  cursor: ${({ $isBtnDisabled }) => ($isBtnDisabled ? 'default' : 'cursor')};
  border-radius: 8px;
  ${({ theme }) => theme.fonts.button3};
`;

const WriterNameEnable = styled.div<{ $isConflict: boolean | undefined }>`
  display: ${({ $isConflict }) => ($isConflict === undefined ? 'none' : 'flex')};

  color: ${({ $isConflict, theme }) =>
    $isConflict ? theme.colors.mileRed : theme.colors.mainGreen};

  ${({ theme }) => theme.fonts.body4};
`;

const WriterNameLength = styled.div`
  color: ${({ theme }) => theme.colors.mileRed};

  ${({ theme }) => theme.fonts.body4};
`;

const WriterIntroduceInput = styled.textarea<{ $isIntroduceLimit: boolean }>`
  position: relative;
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem 3rem;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: ${({ $isIntroduceLimit, theme }) =>
    $isIntroduceLimit ? `1px solid ${theme.colors.mileRed}` : `1px solid ${theme.colors.gray50}`};
  ${({ theme }) => theme.fonts.button2};
  border-radius: 6px;

  resize: none;

  &:focus {
    outline-color: ${({ $isIntroduceLimit, theme }) =>
      $isIntroduceLimit ? theme.colors.mileRed : theme.colors.gray50};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const CharCount = styled.span<{ $isIntroduceLimit: boolean }>`
  position: absolute;
  right: 4rem;
  bottom: 3.8rem;

  color: ${({ $isIntroduceLimit, theme }) =>
    $isIntroduceLimit ? theme.colors.mileRed : theme.colors.gray70};
  ${({ theme }) => theme.fonts.button3};
`;

const SignUpBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem 2rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
