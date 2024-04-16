import styled from '@emotion/styled';
import React, { useState, useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetWriterNameConflict, usePostGroupMemberJoin } from '../hooks/queries';

import Spacing from '../../../components/commons/Spacing';

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

const UserInfoInput = () => {
  const { groupId } = useParams() as { groupId: string };
  // 소개글 글자수 제한
  const [introduceLimit, setIntroduceLimit] = useState(false);
  // 필명 글자수 제한
  const [writerNameLimit, setWriterNameLimit] = useState(false);
  // 필명 중복 확인
  const [isConflictBtnClicked, setIsConflictBtnClicked] = useState(false);
  // 입력 폼 validation
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);
  const [userInfoVal, dispatch] = useReducer(reducerFn, userInfoState);

  const onChangeWriterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setWriterName', writerName: e.target.value });
    setIsConflictBtnClicked(false);
  };

  const onChangeWriterIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setWriterIntroduce', writerIntroduce: e.currentTarget.value });
  };

  // 중복확인 버튼 함수
  const onClickConflictBtn = () => {
    setIsConflictBtnClicked(true);
  };
  const { isConflict } = useGetWriterNameConflict(
    groupId,
    userInfoVal.writerName || '',
    isConflictBtnClicked,
  );

  // 글자수 체크
  useEffect(() => {
    if (userInfoVal.writerIntroduce) {
      userInfoVal.writerIntroduce.length > 100 ? setIntroduceLimit(true) : setIntroduceLimit(false);
    }
    if (userInfoVal.writerName) {
      userInfoVal.writerName.length > 8 ? setWriterNameLimit(true) : setWriterNameLimit(false);
    }
  }, [userInfoVal.writerIntroduce, userInfoVal.writerName]);

  //가입하기 버튼 함수
  const onClickSubmitBtn = () => {
    setIsConflictBtnClicked(true);
  };

  // useEffect(() => {

  // })

  return (
    <>
      <UserInfoInputWrapper>
        <UserInfoTitle>모임에서 사용할 필명*</UserInfoTitle>
        <InputWrapper>
          <WriterNameInput
            placeholder="띄어쓰기 포함 8자 이내로 입력해주세요."
            onChange={onChangeWriterName}
            $isConflict={isConflict || false}
            $isValidLength={writerNameLimit}
          />
          <WriterExistCheckBtn
            disabled={
              userInfoVal.writerName
                ? userInfoVal.writerName.trim().length === 0 || writerNameLimit
                : true
            }
            onClick={onClickConflictBtn}
            $isBtnDisabled={
              userInfoVal.writerName
                ? userInfoVal.writerName.trim().length === 0 || writerNameLimit
                : true
            }
          >
            중복확인
          </WriterExistCheckBtn>
        </InputWrapper>
        {userInfoVal.writerName && writerNameLimit ? (
          <WriterNameLength>8자 이내로 작성해주세요.</WriterNameLength>
        ) : (
          <></>
        )}
        {isConflictBtnClicked ? (
          <WriterNameEnable $isConflict={isConflict || false}>
            {isConflict ? '사용 불가능한 필명 입니다.' : '사용 가능한 필명 입니다.'}
          </WriterNameEnable>
        ) : (
          <></>
        )}
      </UserInfoInputWrapper>
      <Spacing marginBottom="2.8" />
      <UserInfoInputWrapper>
        <UserInfoTitle>소개 글</UserInfoTitle>
        <WriterIntroduceInput
          placeholder="모임원들에게 ‘나’에 대해 자유롭게 소개해주세요."
          onChange={onChangeWriterIntroduce}
          $charLimit={introduceLimit}
        />
        <CharCount $charLimit={introduceLimit}>
          {userInfoVal.writerIntroduce ? userInfoVal.writerIntroduce.length : 0}/100
        </CharCount>
      </UserInfoInputWrapper>
    </>
  );
};

export default UserInfoInput;

const UserInfoInputWrapper = styled.section`
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

const WriterNameEnable = styled.div<{ $isConflict: boolean }>`
  color: ${({ $isConflict, theme }) => ($isConflict ? theme.colors.mileRed : theme.colors.gray70)};

  ${({ theme }) => theme.fonts.body4};
`;

const WriterNameLength = styled.div`
  color: ${({ theme }) => theme.colors.mileRed};

  ${({ theme }) => theme.fonts.body4};
`;

const WriterIntroduceInput = styled.textarea<{ $charLimit: boolean }>`
  position: relative;
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem 3rem;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray20};
  ${({ theme }) => theme.fonts.button2};
  border-radius: 6px;

  resize: none;

  &:focus {
    outline-color: ${({ $charLimit, theme }) =>
      $charLimit ? theme.colors.mileRed : theme.colors.gray50};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const CharCount = styled.span<{ $charLimit: boolean }>`
  position: absolute;
  right: 4rem;
  bottom: 3.8rem;

  color: ${({ $charLimit, theme }) => ($charLimit ? theme.colors.mileRed : theme.colors.gray70)};
  ${({ theme }) => theme.fonts.button3};
`;
