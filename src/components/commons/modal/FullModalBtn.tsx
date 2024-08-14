import styled from '@emotion/styled';

interface FullModalBtnPropType {
  isTop: boolean;
  onClick: () => void;
  content: string;
}

const FullModalBtn = (props: FullModalBtnPropType) => {
  const { isTop, onClick, content } = props;

  return (
    <ModalBtn $isTop={isTop} onClick={onClick}>
      {content}
    </ModalBtn>
  );
};

export default FullModalBtn;

const ModalBtn = styled.button<{ $isTop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32rem;
  height: 3.9rem;

  color: ${({ $isTop, theme }) => ($isTop ? theme.colors.mainViolet : theme.colors.white)};

  background-color: ${({ $isTop, theme }) =>
    $isTop ? theme.colors.white : theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: ${({ $isTop }) => ($isTop ? '1px solid theme.colors.mainViolet' : 'none')};
  }
`;
