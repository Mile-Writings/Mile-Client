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

            <Responsive only="mobile" asChild>
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
          </CarouselLayout>
        </CarouselWrapper>
      ))}
    </>
  );
};

export default GroupCarousel;

const CarouselWrapper = styled.div`
  flex-direction: column;
  height: 29.4rem;

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
  }
`;

const CarouselLayout = styled.div`
  display: flex;

  cursor: pointer;
`;

const CarouselContainer = styled(Slider)`
  width: 93rem;
  height: 24rem;

  .slick-slide.slick-active:last-child {
    width: 75.4rem !important;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    /* width: 45rem; */

    width: 100%;
    max-width: 65rem;

    .slick-slide.slick-active:last-child {
      width: 42rem !important;
    }
  }
`;
