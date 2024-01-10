import React from 'react';

import styled from '@emotion/styled';
import Slider from 'react-slick';

import './slick-theme.css';
import './slick.css';
import CarouselContainer from './CarouselContainer';
import { GroupTabBtnBaseBeforeIcn, GroupTabBtnBaseNextIcn } from '../../../assets/svgs';
import BeforeBtn from '../../../assets/svgs/groupTabBeforeBtnEnable.svg';
import BeforeBtnHover from '../../../assets/svgs/groupTabBeforeBtnHover.svg';
import NextBtn from '../../../assets/svgs/groupTabNextBtnEnable.svg';
import NextBtnHover from '../../../assets/svgs/groupTabNextBtnHover.svg';
import { CAROUSEL_CATEGORY } from '../constants/CAROUSEL_DATA';

interface CategoryIdPropTypes {
  activeCategoryId: number;
  setActiveCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel = (props: CategoryIdPropTypes) => {
  const { activeCategoryId, setActiveCategoryId } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: <Next />,
    prevArrow: <Prev />,
  };

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <CarouselWrapper>
      <GroupTabBtnBaseBeforeIc />
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
      <GroupTabBtnBaseNextIc />
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  position: relative;
  width: 72rem;
  height: 6.2rem;
  margin-left: 5rem;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray30};
`;

const Next = styled.div`
  z-index: 2;
  width: 3.6rem;
  height: 3.6rem;

  background-image: url(${NextBtn});

  :hover {
    background-image: url(${NextBtnHover});
  }
`;

const Prev = styled.div`
  z-index: 2;
  width: 3.6rem;
  height: 3.6rem;

  background-image: url(${BeforeBtn});

  :hover {
    background-image: url(${BeforeBtnHover});
  }
`;

const GroupTabBtnBaseBeforeIc = styled(GroupTabBtnBaseBeforeIcn)`
  position: absolute;
  top: 0;
`;

const GroupTabBtnBaseNextIc = styled(GroupTabBtnBaseNextIcn)`
  position: absolute;
  top: 0;
  right: 0;
`;
