import styled from '@emotion/styled';
import { ReactNode } from 'react';

type LogInOutPropTypes = {
  children: ReactNode;
  onClick?: () => void;
};
const LogInOutBtn = ({ children, onClick }: LogInOutPropTypes) => {
  return <LogInOutWrapper onClick={onClick}>{children}</LogInOutWrapper>;
};

export default LogInOutBtn;

const LogInOutWrapper = styled.button`
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};

  cursor: pointer;
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.gray10};
  }

  ${({ theme }) => theme.fonts.button3}
`;
