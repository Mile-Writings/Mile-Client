import styled from '@emotion/styled';

import theme from '../../styles/theme';

const LogInOutBtn = () => {
  const token = sessionStorage.getItem('token');

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
  };

  return (
    <LogInOutWrapper onClick={token ? handleLogOut : undefined}>
      {token ? '로그아웃' : '로그인'}
    </LogInOutWrapper>
  );
};

export default LogInOutBtn;

const LogInOutWrapper = styled.div`
  height: 4rem;
  padding: 1rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray70};

  border: 1px solid ${theme.colors.gray70};
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    border: 1px solid ${theme.colors.mainViolet};
  }

  ${({ theme }) => theme.fonts.button3}
`;
