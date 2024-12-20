import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Responsive from '../../../components/commons/Responsive/Responsive';
import '../styles/slick-theme.css';
import '../styles/slick.css';
import CarouselContent from './CarouselContent';

import { groupPropTypes } from '../types/groupContent';

import {
  MainGroupRoutingBtn,
  MainIcnArrowBlack as MainIcnArrowBlackIcon,
  MainIcnArrowPurple as MainIcnArrowPurpleIcon,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {data?.map((moim) => (
        <CarouselWrapper key={moim.moimId}>
          <Spacing marginBottom="3.6" />
          <GroupButton
            type="button"
            onClick={() => handleButtonOnClick(moim.moimId)}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {moim.moimName}
            {isHovered ? <MainIcnArrowPurpleIcon /> : <MainIcnArrowBlackIcon />}
          </GroupButton>
          <Spacing marginBottom="1.6" />

          <CarouselLayout>
            <Responsive only="desktop">
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
                    index < 2 && (
                      <PostCard onClick={() => handleRoutingDetail(moim.moimId, post.postId)}>
                        <PostCardInfoWrapper>
                          <Topic>{post.topicName}</Topic>
                          <Title> {post.postTitle}</Title>
                          <Contents>{post.postContent}</Contents>
                        </PostCardInfoWrapper>
                        <PostCardImg src={post.imageUrl} alt="썸네일 이미지"></PostCardImg>
                      </PostCard>
                    ),
                )}
                <GroupRoutingWrapper>
                  <GroupRoutingTitle>
                    이 모임에 대해서 <br></br>더 궁금하신 가요?
                  </GroupRoutingTitle>

                  <MainGroupRoutingBtn></MainGroupRoutingBtn>
                </GroupRoutingWrapper>
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

const Contents = styled.span`
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

const Topic = styled.h1`
  margin-bottom: 0.6rem;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.mSubtitle1};
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.mTitle1};
  line-height: 120%;
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

  @media ${MOBILE_MEDIA_QUERY} {
    height: 34.4rem;
    padding: 0 2rem;
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
  }
`;

const CarouselLayout = styled.div`
  display: flex;
`;

const CarouselContainer = styled(Slider)`
  width: 93rem;
  height: 24rem;

  .slick-slide.slick-active:last-child {
    width: 75.4rem !important;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    /* width: 45rem; */

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
  max-width: 81rem;
  height: 29rem;
`;
