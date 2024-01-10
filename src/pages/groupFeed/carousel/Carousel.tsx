import { useState } from 'react';

import styled from '@emotion/styled';
import Slider from 'react-slick';

import './slick-theme.css';
import './slick.css';
import CarouselContainer from './CarouselContainer';
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

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {CAROUSEL_CATEGORY.categoryList.map((category) => (
          <CarouselContainer
            key={category.categoryId}
            onClick={() => handleCategoryClick(category.categoryId)}
            isActive={category.categoryId === activeCategoryId}
          >
            {category.categoryName}
          </CarouselContainer>
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
