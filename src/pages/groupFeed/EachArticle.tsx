import React from 'react';

import styled from '@emotion/styled';

const EachArticle = () => {
  return (
    <ArticleWrapper>
      <ArticleTitle>글제목 부분입니다. 공백포함 최대 29자입니다.</ArticleTitle>
      <ArticleContent>
        글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
        글내용입니다.글내용입니다.글내용입니다.글내용입니다.글내용입니다. 글내용입니다.
        글내용입니다. 글내용입니다.글내용입니다. 글내용입니다.글내용입니다.
        글내용입니다.글내용입니다. 글내용입니다.글내용입니다. 글내용입니다.최대 3줄입니다.
      </ArticleContent>
      <ArticleInfo>23.12.29 11:11</ArticleInfo>
    </ArticleWrapper>
  );
};

export default EachArticle;

const ArticleWrapper = styled.div`
  display: flex;
  padding: 3.2rem;

  border-radius: 8px;
`;

const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
`;

const ArticleContent = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;

const ArticleInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;
