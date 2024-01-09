import styled from '@emotion/styled';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import '../style/slick-theme.css';
import GroupContent from './GroupContent';

const Carousel = () => {
  const settings = {
    arrow: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <CarouselBox>
      <GroupCarousel {...settings}>
        <div>
          <GroupContent />
        </div>
        <div>
          <GroupContent />
        </div>
        <div>
          <GroupContent />
        </div>
        <div>
          <GroupContent />
        </div>
      </GroupCarousel>
    </CarouselBox>
  );
};

export default Carousel;

const CarouselBox = styled.div`
  display: flex;
  justify-content: center;
`;

const GroupCarousel = styled(Slider)`
  width: 93rem;
  height: 24rem;
  .slick-slide div {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
