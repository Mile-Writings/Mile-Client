import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import GroupContent from './GroupContent';
import GroupNameButton from './GroupNameButton';

import Spacing from './../../../components/commons/Spacing';
import GROUP_CONTENT, { groupContentypes } from './../constants/constants';

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
    <CarouselWrapper>
      <Spacing marginBottom="3.6" />
      <CarouselWithButtonLayout>
        <GroupNameButton />
        <Spacing marginBottom="1.6" />
        <CarouselContainer>
          <CarouselBox {...settings} className="main">
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
