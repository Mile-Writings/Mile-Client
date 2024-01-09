import { ReactNode } from 'react';

import styled from '@emotion/styled';

import theme from '../../styles/theme';

// const LogInOutBtn = (children: React.ReactNode) => {

type LogInOutPropTypes = {
  children: ReactNode;
};
const LogInOutBtn = ({ children }: LogInOutPropTypes) => {
  return <LogInOutWrapper>{children}</LogInOutWrapper>;
};

export default LogInOutBtn;

const LogInOutWrapper = styled.button`
  height: 4rem;
  margin-left: 1.2rem;
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
