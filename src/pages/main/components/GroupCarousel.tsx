import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import '../styles/slick-theme.css';
import '../styles/slick.css';

import CarouselContent from './CarouselContent';

import { groupPropTypes } from '../types/groupContent';

import { MainIcnArrowPurple as MainIcnArrowPurpleIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

export interface carouselItemPropTypes {
  moimId?: string;
  data: groupPropTypes[] | undefined;
  groupLength: number | undefined;
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

  return (
    <>
      {data?.map((moim) => (
        <CarouselWrapper key={moim.moimId}>
          <Spacing marginBottom="3.6" />
          <CarouselWithButtonLayout key={moim.moimId}>
            <GroupButtonContainer onClick={() => handleButtonOnClick(moim.moimId)}>
              {moim.moimName}
              <MainIcnArrowPurpleIcon />
            </GroupButtonContainer>
            <Spacing marginBottom="1.6" />
            <CarouselContainer>
              <CarouselBox {...settings} className="main">
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
              </CarouselBox>
            </CarouselContainer>
          </CarouselWithButtonLayout>
        </CarouselWrapper>
      ))}
    </>
  );
};

export default GroupCarousel;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarouselWithButtonLayout = styled.div`
  margin-bottom: 3.2rem;
`;

const GroupButtonContainer = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0.6rem 1rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.subtitle2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselBox = styled(Slider)`
  width: 93rem;
  height: 24rem;

  .slick-slide.slick-active:last-child {
    width: 75.4rem !important;
  }
`;
