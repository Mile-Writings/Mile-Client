import styled from '@emotion/styled';

import { useArticleList } from '../hooks/queries';

import { GroupListProfileIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface EachProfilePropTypes {
  selectedTopicId: string;
}
const EachArticle = (props: EachProfilePropTypes) => {
  const { selectedTopicId } = props;
  const { postListData } = useArticleList(selectedTopicId || '');

  interface ProfilePropTypes {
    postId: string;
    postTitle: string;
    postContent: string;
    writerName: string;
    createdAt: string;
    curiousCount: number;
    imageUrl: string;
  }

  return (
    <ArticlePostWrapper>
      {postListData?.length === 0 ? (
        <div>아무것도 없어요</div>
      ) : (
        postListData?.map((list: ProfilePropTypes, index: number) => (
          <div key={index}>
            <ArticleWrapper>
              <ArticleTitle>{list.postTitle}</ArticleTitle>
              <Spacing marginBottom="1.6" />
              <ArticleContent>{list.postContent}</ArticleContent>
              <Spacing marginBottom="1.2" />
              <ArticleInfo>
                <GroupListProfileIc />
                <ProfileName>{list.writerName}</ProfileName>
                <ArticleDetail>{list.createdAt}</ArticleDetail>
                <ArticleDetail>·</ArticleDetail>
                <ArticleDetail>궁금해요</ArticleDetail>
                <ArticleDetailBold>{list.curiousCount}</ArticleDetailBold>
              </ArticleInfo>
            </ArticleWrapper>
          </div>
        ))
      )}
    </ArticlePostWrapper>
  );
};

export default EachArticle;

const ArticlePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 72rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
`;

const ArticleContent = styled.div`
  display: -webkit-boen;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 6.8rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const ArticleDetail = styled.div`
  margin-right: 0.4rem;

  color: ${({ theme }) => theme.colors.gray60};

  ${({ theme }) => theme.fonts.body6};
`;

const ArticleDetailBold = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body5};
`;

const ProfileName = styled.div`
  margin-right: 1.2rem;
  margin-left: 0.8rem;

  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.subtitle6};
`;
