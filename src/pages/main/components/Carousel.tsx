import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../style/slick-theme.css';

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
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
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
    width: 93rem;
    height: 24rem;
    background-color: ${({ theme }) => theme.colors.darkViolet};
  }
`;
