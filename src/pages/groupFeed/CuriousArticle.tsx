import styled from '@emotion/styled';

import Spacing from '../../components/commons/Spacing';

const CuriousArticle = () => {
  return (
    <CuriousArticleWrapper>
      <CuriousArticleLayout>
        <ArticleThumbnail />
        <Spacing marginBottom="1.6" />
        <ArticleWritingStyle>글감자리입니다. 최대 공백포함 15자</ArticleWritingStyle>
        <Spacing marginBottom="0.4" />
        <ArticleTitle>제목영역입니다</ArticleTitle>
        <Spacing marginBottom="1.2" />
        <ArticlePreview>
          {' '}
          글이 보여지는 자리입니다. 최대 세줄입니다. 글이 보여지는 자리입니다. 최대 세줄입니다. 글이
          보여지는 자리입니다. 최대 세줄입니다{' '}
        </ArticlePreview>
      </CuriousArticleLayout>
    </CuriousArticleWrapper>
  );
};

export default CuriousArticle;

const CuriousArticleWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ArticleThumbnail = styled.div`
  width: 28.8rem;
  height: 14rem;

  background-image: url('../../src/assets/images/image area.png');
  border-radius: 8px;
`;

const CuriousArticleLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 35.2rem;
  height: 34.7rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const ArticleWritingStyle = styled.div`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.body4};
`;

const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title7};
`;

const ArticlePreview = styled.div`
  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;
