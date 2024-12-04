import styled from '@emotion/styled';
import { css } from '@emotion/react';

const basicCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 1rem 1.6rem;

  white-space: nowrap;

  cursor: pointer;
  border-radius: 0.8rem;

  transition:
    transform 0.5s,
    background-color 0.5s,
    color 0.5s;
`;

// 글모임 만들기 버튼
export const CreateGroupBtnWrapper = styled.div`
  ${basicCSS};
  gap: 0.6rem;
  width: 100%;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.button3};

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 16%);
    transform: scale(0.95);
  }

  :active {
    transform: scale(1.1);
  }
`;

// 로그인/로그아웃 버튼
export const LogInOutBtn = styled.button`
  ${basicCSS};
  width: 100%;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.button3};

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.gray10};
    transform: scale(0.95);
  }

  :active {
    transform: scale(1.1);
  }
`;

// 내 글 모임 버튼
export const MyGroupBtn = styled.button`
  ${basicCSS};
  width: 9.5rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.subtitle6};

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.gray10};
    transform: scale(0.95);
    border-radius: 0.8rem;
  }

  :active {
    transform: scale(1.1);
  }
`;
