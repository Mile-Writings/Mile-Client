import styled from '@emotion/styled';
import { useState } from 'react';
import Slider from 'react-slick';

import '../styles/slick-theme.css';
import '../styles/slick.css';

import GroupContent from './GroupContent';
import GroupNameButton from './GroupNameButton';
import { SkeletonComponent } from './skeletons/length';

import { groupPropTypes } from '../types/groupContent';

import Spacing from './../../../components/commons/Spacing';
import getGroupContentApi from './../../../utils/apis/getGroupContentApi';

const Carousel = () => {
  const [groupData, setGroupData] = useState<groupPropTypes[]>();
  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getData = async () => {
    try {
      const data = await getGroupContentApi();
      setGroupData(data);
    } catch (error) {
      console.error(error);
    }
  };
  getData();

  return (
    <>
      {groupData ? (
        groupData.map((moim) => (
          <CarouselWrapper key={moim.moimId}>
            <Spacing marginBottom="3.6" />
            <CarouselWithButtonLayout key={moim.moimId}>
              <GroupNameButton groupName={moim.moimName} groupId={moim.moimId} />
              <Spacing marginBottom="1.6" />
              <CarouselContainer>
                <CarouselBox {...settings} className="main">
                  {moim.moimPosts.map((post, index) => (
                    <GroupContent
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
        ))
      ) : (
        <SkeletonComponent />
      )}
    </>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarouselWithButtonLayout = styled.div`
  margin-bottom: 3.2rem;
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
