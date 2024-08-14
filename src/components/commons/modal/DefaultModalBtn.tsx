import styled from '@emotion/styled';

interface defaultModalBtnPropType {
  isLeft: boolean;
  onClickBtn: () => void;
  text: string;
}

const DefaultModalBtn = (props: defaultModalBtnPropType) => {
  const { isLeft, onClickBtn, text } = props;

  return (
    <ModalBtn $isLeft={isLeft} onClick={onClickBtn}>
      {text}
    </ModalBtn>
  );
};

export default DefaultModalBtn;

const ModalBtn = styled.button<{ $isLeft: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.4rem;
  height: 3.9rem;
  padding: 1rem 0;

  white-space: pre-wrap;
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
