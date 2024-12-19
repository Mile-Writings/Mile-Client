import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  typeName: string;
}

const Button = ({ children, onClick, typeName }: ButtonProps) => {
  switch (typeName) {
    case 'deleteTempType':
      return (
        <DeleteTempStoreBtn onClick={onClick} type="button">
          {children}
        </DeleteTempStoreBtn>
      );
    case 'submitEditType':
      return (
        <SubmitEditBtn onClick={onClick} type="button">
          {children}
        </SubmitEditBtn>
      );
    case 'disableCommentType':
      return (
        <DisableCommentBtn onClick={onClick} type="button">
          {children}
        </DisableCommentBtn>
      );
    case 'enableCommentType':
      return (
        <EnableCommentBtn onClick={onClick} type="button">
          {children}
        </EnableCommentBtn>
      );
    case 'writingFlowType':
      return <WritingFlowBtn onClick={onClick}>{children}</WritingFlowBtn>;
    default:
      return <button />;
  }
};

export default Button;

const basicCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.6rem;

  white-space: nowrap;
  text-align: center;

  cursor: pointer;
  border-radius: 0.8rem;
`;

/* 삭제하기, 임시저장 버튼 */
const DeleteTempStoreBtn = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray70};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
    ${({ theme }) => theme.fonts.button3};
  }
  ${({ theme }) => theme.fonts.button3};
`;

// 글 제출하기, 수정 완료하기, 글 수정하기
const SubmitEditBtn = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.mileViolet};

  background-color: ${({ theme }) => theme.colors.mainViolet};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
  ${({ theme }) => theme.fonts.button3};
`;

// 댓글 등록하기 비활성화
const DisableCommentBtn = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.gray70};

  background-color: ${({ theme }) => theme.colors.gray20};
  cursor: default;

  pointer-events: none;
  ${({ theme }) => theme.fonts.button3};
`;

// 댓글 등록하기 활성화
const EnableCommentBtn = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
  ${({ theme }) => theme.fonts.button3};
`;

// 글 작성하러가기
const WritingFlowBtn = styled.button`
  ${basicCSS};
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.middleViolet};
  }
  ${({ theme }) => theme.fonts.button1};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mButton1};
  }
`;
