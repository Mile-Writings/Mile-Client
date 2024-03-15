import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import CarouselContainer from './CarouselContainer';
import EachArticle from './EachArticle';
import './slick-theme.css';
import './slick.css';

import { useArticleList, useTopicList } from '../hooks/queries';

import { GroupTabBtnBaseBeforeIc, GroupTabBtnBaseNextIc } from '../../../assets/svgs';

import BeforeBtn from '/src/assets/svgs/groupTabBeforeBtnEnable.svg';
import BeforeBtnHover from '/src/assets/svgs/groupTabBeforeBtnHover.svg';
import NextBtn from '/src/assets/svgs/groupTabNextBtnEnable.svg';
import NextBtnHover from '/src/assets/svgs/groupTabNextBtnHover.svg';

import Spacing from '../../../components/commons/Spacing';
import Error from '../../error/Error';
import Loading from '../../loading/Loading';

// interface CategoryIdPropTypes {
//   activeCategoryId: number;
//   setActiveCategoryId: Dispatch<SetStateAction<number>>;
// }

const Carousel = () => {
  // const { activeCategoryId, setActiveCategoryId } = props;
  const { groupId } = useParams();
  const { groupFeedCategoryData, isLoading, isError, error } = useTopicList(groupId || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  const [categoryId] = useState(Number(sessionStorage.getItem('activeCategoryId')) - 1 || 0);

  const sessionCategoryId = window.sessionStorage.getItem('activeCategoryId');

  const [activeCategoryId, setActiveCategoryId] = useState<number>(Number(sessionCategoryId) || 1);

  useEffect(() => {
    window.sessionStorage.setItem('activeCategoryId', String(activeCategoryId));
  }, [activeCategoryId]);

  useEffect(() => {
    if (groupFeedCategoryData && groupFeedCategoryData.length > 0) {
      setSelectedTopicId(groupFeedCategoryData[categoryId].topicId);
    }
  }, [groupFeedCategoryData]);

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
    setActiveCategoryId(categoryId);
    setSelectedTopicId(topicId);
  };

  const { topicInfo, isLoading: articleListLoading } = useArticleList(selectedTopicId || '');

  if (isLoading || articleListLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error?.message, 'error');
    return <Error />;
  }

  return (
    <>
      <CarouselWrapper>
        {groupFeedCategoryData != undefined && groupFeedCategoryData?.length > 6 && (
          <GroupTabBtnBaseBeforeIcon />
        )}
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
        {groupFeedCategoryData != undefined && groupFeedCategoryData?.length > 6 && (
          <GroupTabBtnBaseNextIcon />
        )}
      </CarouselWrapper>
      <Spacing marginBottom="3.2" />
      <Topic>{topicInfo?.topic}</Topic>
      <Spacing marginBottom="0.8" />
      <TopicDescription>{topicInfo?.topicDescription}</TopicDescription>
      <Spacing marginBottom="2" />
      <EachArticle selectedTopicId={selectedTopicId} groupId={groupId || ''} />
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
