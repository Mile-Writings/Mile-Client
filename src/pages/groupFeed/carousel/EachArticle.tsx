import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading';
import {
  GroupChatIc,
  GroupCuriousIc,
  GroupListProfileIc,
  GroupNoDataImgIc,
  GroupViewIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { useArticleList } from '../hooks/queries';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import Responsive from '../../../components/commons/Responsive/Responsive';

interface EachProfilePropTypes {
  groupId: string;
  selectedTopicId: string;
}

const EachArticle = (props: EachProfilePropTypes) => {
  const { groupId, selectedTopicId } = props;
  const { postListData, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticleList(
    selectedTopicId || '',
    groupId,
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
                      <Responsive only="desktop">
                        <ArticleTitle>{list.postTitle}</ArticleTitle>
                        <Spacing marginBottom="1.6" />
                        <ArticleContent isImageContained={list.isImageContained}>
                          {list.postContent}
                        </ArticleContent>
                        <Spacing marginBottom="1.2" />
                      </Responsive>
                      <Responsive only="mobile">
                        <MobileListWrapper>
                          <div>
                            <ArticleTitle>{list.postTitle}</ArticleTitle>
                            <Spacing marginBottom="0.8" />
                            <ArticleContent isImageContained={list.isImageContained}>
                              {list.postContent}
                            </ArticleContent>
                            <Spacing marginBottom="1.2" />
                          </div>
                          {list.isImageContained && <ArticleThumbnail imageUrl={list.imageUrl} />}
                        </MobileListWrapper>
                      </Responsive>
                      <ArticleInfo>
                        <GroupListProfileIcon />
                        <ProfileName>{list.writerName}</ProfileName>
                        <ArticleDetail>{list.createdAt} </ArticleDetail>
                        <ArticleDetail>
                          <DividingLine />
                        </ArticleDetail>
                        <ArticleDetail>
                          <GroupCuriousIcon />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.curiousCount}</ArticleDetailBold>
                        <ArticleDetail>
                          <GroupViewIcon />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.hitsCount}</ArticleDetailBold>
                        <ArticleDetail>
                          <GroupChatIcon />
                        </ArticleDetail>
                        <ArticleDetailBold>{list.commentCount}</ArticleDetailBold>
                      </ArticleInfo>
                    </ArticleContainer>
                    <Responsive only="desktop">
                      {list.isImageContained && <ArticleThumbnail imageUrl={list.imageUrl} />}
                    </Responsive>
                  </ArticleWrapper>
                </div>
              )),
          )}
          {isFetchingNextPage && <Loading />}
        </>
      )}
    </ArticlePostWrapper>
  );
};

export default EachArticle;

const GroupListProfileIcon = styled(GroupListProfileIc)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 2rem;
    height: 2rem;
  }
`;

const GroupCuriousIcon = styled(GroupCuriousIc)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
const GroupViewIcon = styled(GroupViewIc)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
const GroupChatIcon = styled(GroupChatIc)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const MobileListWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  width: 100%;
`;
const DividingLine = styled.div`
  width: 0.1rem;
  height: 1.4rem;
  margin: 0 0.6rem;

  background-color: ${({ theme }) => theme.colors.gray30};
  border-radius: 2px;
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
  flex-shrink: 0;
  width: 20rem;
  height: 14.9rem;

  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 14.6rem;
    height: 11rem;
  }
`;

const ArticleContainer = styled.div<{ isImageContained: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isImageContained }) => (isImageContained ? '100%' : 'auto')};
`;

const ArticleWrapper = styled.button`
  display: flex;
  gap: 3.2rem;
  justify-content: space-between;
  width: 72rem;
  padding: 3.2rem;

  text-align: left;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    padding: 1.6rem;
  }
`;

const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle1};
  }
`;

const ArticleContent = styled.div<{ isImageContained: boolean }>`
  display: -webkit-boen;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 6.8rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body3};
  word-break: break-all;

  @media ${MOBILE_MEDIA_QUERY} {
    width: auto;
    max-width: ${({ isImageContained }) => (isImageContained ? '62rem' : '100%')};
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 1.2rem;
  }
`;

const ArticleDetail = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.4rem;

  color: ${({ theme }) => theme.colors.gray60};

  ${({ theme }) => theme.fonts.body6};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 0.2rem;
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;

const ArticleDetailBold = styled.div`
  margin-right: 0.8rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body5};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 0.4rem;
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;

const ProfileName = styled.div`
  margin-right: 1.2rem;
  margin-left: 0.8rem;

  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.subtitle6};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 1rem;
    margin-left: 0.6rem;
    ${({ theme }) => theme.fonts.mBody1};
  }
`;
