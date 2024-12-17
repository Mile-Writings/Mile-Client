import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { GroupNoDataImgIc } from '../../../assets/svgs';
import GroupThumbnailImg from '/src/assets/svgs/groupCardThumnailImg.svg';
import PopularMobileIc from '/src/assets/svgs/popularMobile.svg';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import Responsive from '../../../components/commons/Responsive/Responsive';

interface ArticlePropTypes {
  topic: string;
  title: string;
  content: string;
  imageUrl: string;
  postId: string;
  isContainPhoto: boolean;
}

interface CuriousArticlePropTypes {
  groupId: string | undefined;
  mostCuriousPost?: ArticlePropTypes[];
}

const CuriousArticle = (props: CuriousArticlePropTypes) => {
  const { groupId, mostCuriousPost } = props;

  const navigate = useNavigate();
  const handleGoPostDetail = (postId: string) => {
    navigate(`/detail/${groupId}/${postId}`);
  };

  return (
    <CuriousArticleWrapper>
      {/* 여기도 디자인 가이드 필요 */}
      {mostCuriousPost?.length == 0 ? (
        <NoCuriousArticleWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직은 궁금해요를 많이 받은 작가가 없어요
          <Spacing marginBottom="4" />
        </NoCuriousArticleWrapper>
      ) : (
        mostCuriousPost?.map((article: ArticlePropTypes, index: number) => (
          <CuriousArticleLayout key={index} onClick={() => handleGoPostDetail(article.postId)}>
            <Responsive only="desktop">
              <ArticleThumbnail
                src={article.isContainPhoto ? article.imageUrl : GroupThumbnailImg}
              />
            </Responsive>
            <Responsive only="mobile">
              <ArticleThumbnail src={article.isContainPhoto ? article.imageUrl : PopularMobileIc} />
            </Responsive>

            <ArticleWrapper>
              <ArticleWritingStyle>{article.topic}</ArticleWritingStyle>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticlePreview>{article.content}</ArticlePreview>
            </ArticleWrapper>
          </CuriousArticleLayout>
        ))
      )}
    </CuriousArticleWrapper>
  );
};

export default CuriousArticle;

const ArticleWrapper = styled.div`
  width: 100%;

  &:only-child {
    width: 100vw;
    max-width: none;
  }

  &:nth-child(1):nth-last-child(2),
  &:nth-child(2):nth-last-child(1) {
    max-width: 37.5rem;
  }
`;

const CuriousArticleWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 6.4rem;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 3.2rem;
  }

  @media screen and (width <= 540px) {
    flex-direction: column;
  }
`;

const ArticleThumbnail = styled.img`
  width: 28.8rem;
  height: 14rem;

  background-size: cover;
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 11.4rem;
    height: 100%;
  }
`;

const CuriousArticleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 35.2rem;
  height: 34.7rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    gap: 1.4rem;
    height: 13rem;
    padding: 1.6rem;

    &:only-child {
      width: 100vw;
    }

    &:nth-child(1):nth-last-child(2),
    &:nth-child(2):nth-last-child(1) {
      width: 50vw;
    }
  }

  @media screen and (width <= 540px) {
    width: 100%;
  }
`;

const ArticleWritingStyle = styled.div`
  margin-bottom: 0.4rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.body4};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
    margin-bottom: 0.2rem;
  }
`;

const ArticleTitle = styled.div`
  display: -webkit-box;
  margin-bottom: 1.2rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title7};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 0.6rem;
    ${({ theme }) => theme.fonts.mTitle1};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 5.1rem;

    ${({ theme }) => theme.fonts.mSubtitle1};
  }
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
