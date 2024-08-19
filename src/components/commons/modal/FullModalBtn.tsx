import styled from '@emotion/styled';

interface FullModalBtnPropType {
  isPrimary: boolean;
  onClick: () => void;
  content: string;
}

const FullModalBtn = (props: FullModalBtnPropType) => {
  const { isPrimary, onClick, content } = props;

  return (
    <ModalBtn $isPrimary={isPrimary} onClick={onClick}>
      {content}
    </ModalBtn>
  );
};

export default FullModalBtn;

const ModalBtn = styled.button<{ $isPrimary: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32rem;
  height: 3.9rem;

  color: ${({ $isPrimary, theme }) => ($isPrimary ? theme.colors.mainViolet : theme.colors.white)};

  background-color: ${({ $isPrimary, theme }) =>
    $isPrimary ? theme.colors.white : theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: ${({ $isPrimary }) => ($isPrimary ? '1px solid theme.colors.mainViolet' : 'none')};
  }
`;
