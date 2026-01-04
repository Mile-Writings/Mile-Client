import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';

import CarouselContainer from './CarouselContainer';
import EachArticle from './EachArticle';
import './slick-theme.css';
import './slick.css';

import { useArticleList } from '../hooks/queries';

// import { GroupTabBtnBaseBeforeIc, GroupTabBtnBaseNextIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

import Loading from '../../loading/Loading';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface CategoryDataPropTypes {
  topicId: string;
  topicName: string;
}

const Carousel = ({
  categoryData,
  isLoading,
}: {
  categoryData: CategoryDataPropTypes[];
  isLoading: boolean;
}) => {
  const { groupId } = useParams();

  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,

    beforeChange: (_: number, newIndex: number) => {
      setActiveCategoryId(newIndex + 1);
      categoryData && setSelectedTopicId(categoryData[newIndex]?.topicId);
    },

    responsive: [
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const handleCategoryClick = (categoryId: number, topicId: string) => {
    setActiveCategoryId(categoryId);
    setSelectedTopicId(topicId);
  };

  const { topicInfo, isLoading: articleListLoading } = useArticleList(
    selectedTopicId,
    groupId || '',
  );

  useEffect(() => {
    if (categoryData) {
      setSelectedTopicId(categoryData[0]?.topicId);
    }
  }, [categoryData]);

  return (
    <>
      {(articleListLoading || isLoading) && <Loading />}
      <CarouselWrapper>
        {/* {groupFeedCategoryData !== undefined && groupFeedCategoryData?.length > 6 && (
          <GroupTabBtnBaseBeforeIcon className="groupFeedCarousel slick-prev slick-slider slick-initialized slick-disabled" />
        )} */}
        <Slider {...settings} className="groupFeedCarousel">
          {categoryData?.map((topic, index) => (
            <CarouselContainer
              key={index}
              onClick={() => handleCategoryClick(index + 1, topic.topicId)}
              isActive={index + 1 === activeCategoryId}
            >
              {topic.topicName}
            </CarouselContainer>
          ))}
        </Slider>
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
  width: auto;
  max-width: 72rem;
  height: 6.2rem;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray30};

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 81rem;
    height: 4.4rem;
  }
`;

const Topic = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
  @media ${MOBILE_MEDIA_QUERY} {
    width: auto;
    max-width: 60.4rem;

    ${({ theme }) => theme.fonts.mTitle2};
  }
`;

const TopicDescription = styled.div`
  width: 63.1rem;

  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
  @media ${MOBILE_MEDIA_QUERY} {
    width: auto;
    max-width: 60.4rem;
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;
