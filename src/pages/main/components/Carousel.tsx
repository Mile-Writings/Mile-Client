import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import GROUP_CONTENT, { groupContentypes } from './../constants/constants';
import GroupContent from './GroupContent';

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
          />
        ))}
      </CarouselContainer>
    </CarouselLayout>
  );
};

export default Carousel;

const CarouselLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselContainer = styled(Slider)`
  width: 93rem;
  height: 24rem;
  border: 1px solid ${({ theme }) => theme.colors.black};

  .slick-slide.slick-active:last-of-type {
    width: 75.4rem !important;
    height: 24rem;
  }
`;
