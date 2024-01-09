import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import GroupContent from './GroupContent';

const Carousel = () => {
  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <CarouselLayout>
      <CarouselContainer {...settings}>
        <CarouselBox>
          <GroupContent />
        </CarouselBox>
        <CarouselBox>
          <GroupContent />
        </CarouselBox>
        <CarouselBox>
          <GroupContent />
        </CarouselBox>
        <CarouselBox>
          <GroupContent />
        </CarouselBox>
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
`;

const CarouselBox = styled.div``;
