import { ReactNode } from 'react';

import styled from '@emotion/styled';

import theme from '../../styles/theme';

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
  border: 1px solid ${theme.colors.gray70};
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    border: 1px solid ${theme.colors.mainViolet};
  }

  ${({ theme }) => theme.fonts.button3}
`;
