import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import GROUP_CONTENT, { groupContentypes } from './../constants/constants';
import GroupContent from './GroupContent';
import GroupNameButton from './GroupNameButton';

const Carousel = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CarouselWithButtonWrapper>
      <GroupNameButton />
      <CarouselLayout>
        <CarouselContainer {...settings}>
          {GROUP_CONTENT.map(({ id, topic, maintext, subtext, image }: groupContentypes) => (
            <GroupContent
              key={id}
              id={id}
              topic={topic}
              maintext={maintext}
              subtext={subtext}
              image={image}
              isLast={id === GROUP_CONTENT.length}
            />
          ))}
        </CarouselContainer>
      </CarouselLayout>
    </CarouselWithButtonWrapper>
  );
};

export default Carousel;

const CarouselWithButtonWrapper = styled.section`
  margin-left: 21.8rem;
  width: 100%;
  margin-right: 21.8rem;
`;

const CarouselLayout = styled.div`
  display: flex;
`;

const CarouselContainer = styled(Slider)`
  width: 93rem;
  height: 24rem;
  .slick-slide.slick-active:last-of-type {
    width: 75.4rem !important;
    height: 24rem;
  }
`;
