import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useArticleList } from '../hooks/queries';

import {
  GroupListProfileIc,
  GroupNoDataImgIc,
  GroupViewIc,
  GroupCuriousIc,
  GroupChatIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface EachProfilePropTypes {
  groupId: string;
  selectedTopicId: string;
}

const EachArticle = (props: EachProfilePropTypes) => {
  const { groupId, selectedTopicId } = props;
  const { postListData, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticleList(
    selectedTopicId || '',
  );
  const navigate = useNavigate();
  const handleGoPostDetail = (postId: string) => {
    navigate(`/detail/${groupId}/${postId}`, { state: { topicId: selectedTopicId } });
  };
  const bottomOfListRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (bottomOfListRef.current) {
      const isBottom = bottomOfListRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      isBottom && hasNextPage && fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  interface ProfilePropTypes {
    postId: string;
    postTitle: string;
    postContent: string;
    writerName: string;
    createdAt: string;
    curiousCount: number;
    hitsCount: number;
    commentCount: number;
    imageUrl: string;
    isImageContained: boolean;
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ArticlePostWrapper>
      {postListData?.length === 0 ? (
        <NoPostWrapper>
          <Spacing marginBottom="4" />
          <GroupNoDataImgIc />
          <Spacing marginBottom="1.6" />
          아직 글이 없어요
          <Spacing marginBottom="4" />
        </NoPostWrapper>
      ) : (
        <>
          {postListData?.map(
            (postData, dataIndex) =>
              postData?.data?.postList?.map((list: ProfilePropTypes, index: number) => (
                <div key={`${dataIndex}-${index}`} ref={bottomOfListRef}>
                  <ArticleWrapper onClick={() => handleGoPostDetail(list.postId)}>
                    <ArticleContainer isImageContained={list.isImageContained}>
                      <ArticleTitle>{list.postTitle}</ArticleTitle>
                      <Spacing marginBottom="1.6" />
                      <ArticleContent>{list.postContent}</ArticleContent>
                      <Spacing marginBottom="1.2" />
                      <ArticleInfo>
                        <GroupListProfileIc />
                        <ProfileName>{list.writerName}</ProfileName>
                        <ArticleDetail>{list.createdAt}</ArticleDetail>
                        <ArticleDetail>·</ArticleDetail>
                        <ArticleDetail>
                          <GroupCuriousIc />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.curiousCount}</ArticleDetailBold>
                        <ArticleDetail>
                          <GroupViewIc />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.hitsCount}</ArticleDetailBold>
                        <ArticleDetail>
                          <GroupChatIc />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.commentCount}</ArticleDetailBold>
                      </ArticleInfo>
                    </ArticleContainer>
                    {list.isImageContained && <ArticleThumbnail imageUrl={list.imageUrl} />}
                  </ArticleWrapper>
                </div>
              )),
          )}
          {isFetchingNextPage && (
            <LoadingWrapper src="/src/assets/gifs/loadingSpinner.gif" alt="로딩" />
          )}
        </>
      )}
    </ArticlePostWrapper>
  );
};

export default EachArticle;

const LoadingWrapper = styled.img`
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
`;

const ArticlePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const NoPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72rem;
  height: 22rem;

  color: ${({ theme }) => theme.colors.gray40};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const ArticleThumbnail = styled.div<{ imageUrl: string }>`
  width: 20rem;
  height: 14.9rem;

  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  border-radius: 8px;
`;

const ArticleContainer = styled.div<{ isImageContained: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isImageContained }) => (isImageContained ? '42.4rem' : 'auto')};
`;

const ArticleWrapper = styled.button`
  display: flex;
  gap: 3.2rem;
  width: 72rem;
  padding: 3.2rem;

  text-align: left;

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
  display: flex;
  align-items: center;
  margin-right: 0.4rem;

  color: ${({ theme }) => theme.colors.gray60};

  ${({ theme }) => theme.fonts.body6};
`;

const ArticleDetailBold = styled.div`
  margin-right: 0.8rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body5};
`;

const ProfileName = styled.div`
  margin-right: 1.2rem;
  margin-left: 0.8rem;

  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.subtitle6};
`;
