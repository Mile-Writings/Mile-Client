import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  typeName: string;
}

const Button = ({ children, onClick, typeName }: ButtonProps) => {
  switch (typeName) {
    case 'deleteTempType':
      return <DeleteTempType onClick={onClick}>{children}</DeleteTempType>;
    case 'submitEditType':
      return <SubmitEditType onClick={onClick}>{children}</SubmitEditType>;
    case 'disableCommentType':
      return <DisableCommentType onClick={onClick}>{children}</DisableCommentType>;
    case 'enableCommentType':
      return <EnableCommentType onClick={onClick}>{children}</EnableCommentType>;
    default:
      return '';
  }
};

export default Button;

const basicCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.6rem;

  cursor: pointer;
  border-radius: 0.8rem;
`;

/* 삭제하기, 임시저장 버튼 */
const DeleteTempType = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button3};
  border: 1px solid ${({ theme }) => theme.colors.gray70};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
    ${({ theme }) => theme.fonts.button3};
  }
`;

// 글 제출하기, 수정 완료하기, 글 수정하기
const SubmitEditType = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.mileViolet};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button3};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;

// 댓글 등록하기 비활성화
const DisableCommentType = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.gray20};
  ${({ theme }) => theme.fonts.button3};
  cursor: default;

  pointer-events: none;
`;

// 댓글 등록하기 활성화
const EnableCommentType = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button3};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
