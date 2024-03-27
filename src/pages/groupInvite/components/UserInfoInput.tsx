import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';

const UserInfoInput = () => {
  return (
    <>
      <UserInfoInputWrapper>
        <UserInfoTitle>모임에서 사용할 필명*</UserInfoTitle>
        <InputWrapper>
          <WriterNameInput placeholder="띄어쓰기 포함 8자 이내로 입력해주세요." />
          <WriterExistCheckBtn>중복확인</WriterExistCheckBtn>
        </InputWrapper>
      </UserInfoInputWrapper>
      <Spacing marginBottom="2.8" />
      <UserInfoInputWrapper>
        <UserInfoTitle>소개 글</UserInfoTitle>
        <WriterIntroduceInput placeholder="모임원들에게 ‘나’에 대해 자유롭게 소개해주세요." />
        <CharCount>7/100</CharCount>
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

const WriterNameInput = styled.input`
  width: 67.7rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray20};
  ${({ theme }) => theme.fonts.button2};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.gray50};
  }
`;

const WriterExistCheckBtn = styled.button`
  width: 8.1rem;
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 8px;
  ${({ theme }) => theme.fonts.button3};
`;

const WriterIntroduceInput = styled.textarea`
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
    outline-color: ${({ theme }) => theme.colors.gray50};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 4rem;
  bottom: 3.8rem;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.button3};
`;
