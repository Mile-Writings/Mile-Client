import styled from '@emotion/styled';

import { useCuriousPost } from '../hooks/queries';

import { GroupNoDataImgIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface ArticlePropTypes {
  topic: string;
  title: string;
  content: string;
}

interface CuriousArticlePropTypes {
  groupId: string | undefined;
}

const CuriousArticle = (props: CuriousArticlePropTypes) => {
  const { groupId } = props;
  const { curiousPostData } = useCuriousPost(groupId || '');
  return (
    <CuriousArticleWrapper>
      {curiousPostData?.length == 0 ? (
        <NoCuriousArticleWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직은 굼금해요를 많이 받은 작가가 없어요
          <Spacing marginBottom="4" />
        </NoCuriousArticleWrapper>
      ) : (
        curiousPostData?.map((article: ArticlePropTypes, index: number) => (
          <CuriousArticleLayout key={index}>
            <ArticleThumbnail />
            <Spacing marginBottom="1.6" />
            <ArticleWritingStyle>{article.topic}</ArticleWritingStyle>
            <Spacing marginBottom="0.4" />
            <ArticleTitle>{article.title}</ArticleTitle>
            <Spacing marginBottom="1.2" />
            <ArticlePreview>{article.content}</ArticlePreview>
          </CuriousArticleLayout>
        ))
      )}
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

  background-image: url('../../src/assets/images/image_area.png');
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
  display: -webkit-box;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title7};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ArticlePreview = styled.div`
  display: -webkit-box;
  width: 28.8rem;
  height: 6.6rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  white-space: wrap;
  text-overflow: ellipsis;
  ${({ theme }) => theme.fonts.body3};
`;

const NoCuriousArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 22rem;

  color: ${({ theme }) => theme.colors.gray40};

  ${({ theme }) => theme.fonts.subtitle3};
`;
