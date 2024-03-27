import styled from '@emotion/styled';

const WriterName = () => {
  return (
    <WriterNameInputWrapper>
      <WriterNameTitle>모임에서 사용할 필명*</WriterNameTitle>
      <InputWrapper>
        <WriterNameInput placeholder="띄어쓰기 포함 8자 이내로 입력해주세요." />
        <WriterExistCheckBtn>중복확인</WriterExistCheckBtn>
      </InputWrapper>
    </WriterNameInputWrapper>
  );
};

export default WriterName;

const WriterNameInputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const WriterNameTitle = styled.p`
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

  border: 1px solid ${({ theme }) => theme.colors.gray20};
  ${({ theme }) => theme.fonts.button2};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
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
