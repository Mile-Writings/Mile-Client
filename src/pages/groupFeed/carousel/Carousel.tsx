import styled from '@emotion/styled';
import Slider from 'react-slick';

import './slick-theme.css';
import './slick.css';
import { CAROUSEL_CATEGORY } from '../constants/CAROUSEL_DATA';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
  };
  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {CAROUSEL_CATEGORY.categoryList.map((category) => (
          <CarouselContainer key={category.categoryId}>{category.categoryName}</CarouselContainer>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  width: 72rem;
  height: 6.2rem;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray30};
`;

const CarouselContainer = styled.div`
  width: 12rem;
  height: 6.2rem;
  padding: 2rem 0;

  color: ${({ theme }) => theme.colors.gray60};
  text-align: center;

  ${({ theme }) => theme.fonts.title8};
`;
