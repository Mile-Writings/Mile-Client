import styled from '@emotion/styled';
import { ReactNode } from 'react';

type LogInOutPropTypes = {
  children: ReactNode;
  onClick?: () => void;
};
const LogInOutBtn = ({ children, onClick }: LogInOutPropTypes) => {
  return (
    <LogInOutWrapper type="button" onClick={onClick}>
      {children}
    </LogInOutWrapper>
  );
};

export default LogInOutBtn;

const LogInOutWrapper = styled.button`
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  white-space: nowrap;

  cursor: pointer;
  border-radius: 8px;

  ${({ theme }) => theme.fonts.button3};

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.gray10};
    transform: scale(0.95);

    transition: 0.5s;
  }

  :active {
    transform: scale(1.1);

    transition: 0.5s;
  }
`;
