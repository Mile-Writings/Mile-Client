import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import Spacing from './../../../components/commons/Spacing';
import { getGroupContent } from './../apis/getGroupContent';
import { MoimPropTypes } from './../constants/constants';
import GroupContent from './GroupContent';
import GroupNameButton from './GroupNameButton';

const Carousel = () => {
  const [groupData, setGroupData] = useState<MoimPropTypes[]>([]);

  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getGroupContent();
        typeof response?.data === 'object' && setGroupData(response?.data.moim);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <CarouselWrapper>
      <Spacing marginBottom="3.6" />
      <CarouselWithButtonLayout>
        <GroupNameButton />
        <Spacing marginBottom="1.6" />
        <CarouselContainer>
          <CarouselBox {...settings}>
            {groupData.map(({ moimId, moimPosts }: MoimPropTypes) => (
              <div key={moimId}>
                {moimPosts.map((post, index) => (
                  <GroupContent
                    key={index}
                    topicName={post.topicName}
                    imageUrl={post.imageUrl}
                    postTitle={post.postTitle}
                    postContent={post.postContent}
                    isLast={index === moimPosts.length - 1}
                  />
                ))}
              </div>
            ))}
          </CarouselBox>
        </CarouselContainer>
      </CarouselWithButtonLayout>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CarouselWithButtonLayout = styled.section``;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselBox = styled(Slider)`
  width: 93rem;
  height: 24rem;

  .slick-slide.slick-active:last-of-type {
    width: 75.4rem !important;
    height: 24rem;
  }
`;
