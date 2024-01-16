import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import Slider from 'react-slick';

import CarouselContainer from './CarouselContainer';
import './slick-theme.css';
import './slick.css';

import { useTopicList } from '../hooks/queries';

import { GroupTabBtnBaseBeforeIc, GroupTabBtnBaseNextIc } from '../../../assets/svgs';
import BeforeBtn from '../../../assets/svgs/groupTabBeforeBtnEnable.svg';
import BeforeBtnHover from '../../../assets/svgs/groupTabBeforeBtnHover.svg';
import NextBtn from '../../../assets/svgs/groupTabNextBtnEnable.svg';
import NextBtnHover from '../../../assets/svgs/groupTabNextBtnHover.svg';

interface CategoryIdPropTypes {
  activeCategoryId: number;
  setActiveCategoryId: Dispatch<SetStateAction<number>>;
  groupId: string | undefined;
}

const Carousel = (props: CategoryIdPropTypes) => {
  const { activeCategoryId, setActiveCategoryId, groupId } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    beforeChange: (_: number, newIndex: number) => {
      setActiveCategoryId(newIndex + 1);
    },
  };

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategoryId(categoryId);
  };

  const { groupFeedCategoryData, isLoading, isError, error } = useTopicList(groupId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data..{error?.message}</div>;
  }

  return (
    <CarouselWrapper>
      <GroupTabBtnBaseBeforeIcon />
      <Slider {...settings} className="groupFeedCarousel">
        {CAROUSEL_CATEGORY.categoryList.map((category, index) => (
          <CarouselContainer
            key={index}
            onClick={() => handleCategoryClick(category.categoryId)}
            isActive={category.categoryId === activeCategoryId}
          >
            {topic.topicName}
          </CarouselContainer>
        ))}
      </Slider>
      <GroupTabBtnBaseNextIcon />
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  position: relative;
  width: 72rem;
  height: 6.2rem;

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

const GroupTabBtnBaseBeforeIcon = styled(GroupTabBtnBaseBeforeIc)`
  position: absolute;
  top: 0;
  z-index: 1;

  pointer-events: none;
`;

const GroupTabBtnBaseNextIcon = styled(GroupTabBtnBaseNextIc)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  pointer-events: none;
`;
