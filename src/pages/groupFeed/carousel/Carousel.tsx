import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import Slider from 'react-slick';

import './slick-theme.css';
import './slick.css';
import CarouselContainer from './CarouselContainer';
import EachArticle from './EachArticle';

import { useTopicList } from '../hooks/queries';

import { GroupTabBtnBaseBeforeIc, GroupTabBtnBaseNextIc } from '../../../assets/svgs';
import BeforeBtn from '../../../assets/svgs/groupTabBeforeBtnEnable.svg';
import BeforeBtnHover from '../../../assets/svgs/groupTabBeforeBtnHover.svg';
import NextBtn from '../../../assets/svgs/groupTabNextBtnEnable.svg';
import NextBtnHover from '../../../assets/svgs/groupTabNextBtnHover.svg';
import Spacing from '../../../components/commons/Spacing';

interface CategoryIdPropTypes {
  activeCategoryId: number;
  setActiveCategoryId: Dispatch<SetStateAction<number>>;
  groupId: string | undefined;
}

const Carousel = (props: CategoryIdPropTypes) => {
  const { activeCategoryId, setActiveCategoryId, groupId } = props;
  const [selectedTopicId, setSelectedTopicId] = useState<string>();
  console.log(activeCategoryId, '활동Id');
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

  const handleCategoryClick = (categoryId: number, topicId: string) => {
    console.log(topicId);
    setActiveCategoryId(categoryId);
    setSelectedTopicId(topicId);
  };

  const { groupFeedCategoryData, isLoading, isError, error } = useTopicList(groupId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data..{error?.message}</div>;
  }

  return (
    <>
      <CarouselWrapper>
        <GroupTabBtnBaseBeforeIcon />
        <Slider {...settings} className="groupFeedCarousel">
          {groupFeedCategoryData?.map((topic, index) => (
            <CarouselContainer
              key={index}
              onClick={() => handleCategoryClick(index + 1, topic.topicId)}
              isActive={index + 1 === activeCategoryId}
            >
              {topic.topicName}
            </CarouselContainer>
          ))}
        </Slider>
        <GroupTabBtnBaseNextIcon />
      </CarouselWrapper>
      <Spacing marginBottom="3.2" />
      <Topic>글감자리입니다.최대 공백포함 15자입니다.</Topic>
      <Spacing marginBottom="0.8" />
      <TopicDescription>
        글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다. 최대
        공백포함90자입니다. 글감 소개 자리입니다. 최대 공백포함90자입니다. 글감 소개 자리입니다.
        최대 공백포함90자입니다.
      </TopicDescription>
      <Spacing marginBottom="2" />
      <EachArticle activeCategoryId={activeCategoryId} />
    </>
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

const Topic = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title5};
`;

const TopicDescription = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;
