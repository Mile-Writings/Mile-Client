import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import '../styles/slick-theme.css';
import '../styles/slick.css';
import { groupPropTypes } from '../types/groupContent';

import {
  MainGroupRoutingBtn,
  MainIcnArrowBlack as MainIcnArrowBlackIcon,
} from '../../../assets/svgs';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

import CarouselContent from './CarouselContent';

export interface carouselItemPropTypes {
  moimId?: string;
  data?: groupPropTypes[];
  groupLength?: number;
}

const GroupCarousel = ({ data }: carouselItemPropTypes) => {
  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();
  const handleButtonOnClick = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };
  const handleRoutingDetail = (groupId: string, postId: string) => {
    navigate(`/detail/${groupId}/${postId}`);
  };

  return (
    <>
      {data?.map((moim) => (
        <CarouselWrapper key={moim.moimId}>
          <Spacing marginBottom="3.6" />
          <GroupButton type="button" onClick={() => handleButtonOnClick(moim.moimId)}>
            {moim.moimName}
            <MainIcnArrowBlackIcon />
          </GroupButton>
          <Spacing marginBottom="1.6" />

          <CarouselLayout>
            <Responsive only="desktop" asChild>
              <CarouselContainer {...settings} className="main">
                {moim.moimPosts.map((post, index) => (
                  <CarouselContent
                    key={index}
                    topicName={post.topicName}
                    imageUrl={post.imageUrl}
                    postTitle={post.postTitle}
                    postContent={post.postContent}
                    postId={post.postId}
                    isContainPhoto={post.isContainPhoto}
                    groupId={moim.moimId}
                    isLast={index === moim.moimPosts.length - 1}
                  />
                ))}
              </CarouselContainer>
            </Responsive>

            <Responsive only="mobile">
              <PostContainer>
                {moim.moimPosts.map(
                  (post, index) =>
                    index < 3 && (
                      <PostCard
                        key={post.postId}
                        onClick={() => handleRoutingDetail(moim.moimId, post.postId)}
                      >
                        <PostCardInfoWrapper>
                          <Topic>{post.topicName}</Topic>
                          <Title> {post.postTitle}</Title>

                          {post.isContainPhoto ? (
                            <NoImageContents>{post.postContent}</NoImageContents>
                          ) : (
                            <Contents>{post.postContent}</Contents>
                          )}
                        </PostCardInfoWrapper>
                        {post.isContainPhoto && (
                          <PostCardImg src={post.imageUrl} alt="썸네일 이미지" />
                        )}
                      </PostCard>
                    ),
                )}
                {moim.moimPosts.length < 3 && (
                  <GroupRoutingWrapper onClick={() => handleButtonOnClick(moim.moimId)}>
                    <GroupRoutingTitle>
                      이 모임에 대해서 <br />더 궁금하신 가요?
                    </GroupRoutingTitle>

                    <MainGroupRoutingBtn />
                  </GroupRoutingWrapper>
                )}
              </PostContainer>
            </Responsive>
          </CarouselLayout>
        </CarouselWrapper>
      ))}
    </>
  );
};

export default GroupCarousel;

const GroupRoutingTitle = styled.p`
  ${({ theme }) => theme.fonts.title8};
`;
const GroupRoutingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 26.2rem;

  background-color: transparent;
  cursor: pointer;
`;

const PostCardInfoWrapper = styled.div`
  width: 100%;
`;

const PostCardImg = styled.img`
  width: 100%;
  height: 10.9rem;
  margin-top: 1.4rem;
  object-fit: cover;

  border-radius: 6px;
`;

const NoImageContents = styled.span`
  display: -webkit-box;
  width: 100%;
  height: 5.4rem;
  margin-top: 1rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  text-align: left;
  text-overflow: ellipsis;
  word-wrap: break-word;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.fonts.mBody2};
`;

const Contents = styled.span`
  display: -webkit-box;
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  text-align: left;
  text-overflow: ellipsis;
  word-wrap: break-word;

  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.fonts.mBody2}
`;

const Topic = styled.h2`
  margin-bottom: 0.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.mSubtitle1};
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.mTitle2};
  line-height: 120%;
  word-break: break-all;
`;

const PostCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 26.2rem;
  height: 100%;
  padding: 1.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 8px;
`;

const CarouselWrapper = styled.div`
  flex-direction: column;
  height: 29.4rem;

  cursor: default;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 34.4rem;
  }
`;

const GroupButton = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.black};

  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.subtitle2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.white};

    svg path {
      stroke: #6139d1;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 2rem;
  }
`;

const CarouselLayout = styled.div`
  display: flex;
  width: 100%;

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 2rem;
    overflow: scroll;
  }
`;

const CarouselContainer = styled(Slider)`
  width: 93rem !important;
  height: 24rem;

  .slick-list {
    width: 100%;
  }

  .slick-slide.slick-active:last-child {
    width: 75.4rem !important;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 2rem;
    width: 100%;
    max-width: 81rem;
    height: 29rem;

    .slick-slide.slick-active:last-child {
      width: 42rem !important;
    }
  }
`;

const PostContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  height: 29rem;
  overflow: hidden;
`;
