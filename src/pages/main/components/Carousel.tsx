import styled from '@emotion/styled';
import Slider from 'react-slick';

import '../style/slick-theme.css';
import '../style/slick.css';
import Spacing from './../../../components/commons/Spacing';
import GROUP_CONTENT, { groupContentypes } from './../constants/constants';
import GroupContent from './GroupContent';
import GroupNameButton from './GroupNameButton';
import Summary from './Summary';

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
    <CarouselContentWithSummaryWrapper>
      <Summary />
      <Spacing marginBottom="3.6" />
      <CarouselWithButtonLayout>
        <GroupNameButton />
        <CarouselContainer>
          <CarouselBox {...settings}>
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
    </CarouselContentWithSummaryWrapper>
  );
};

export default Carousel;

const CarouselContentWithSummaryWrapper = styled.div``;

const CarouselWithButtonLayout = styled.section`
  margin-left: 21.8rem;
  width: 100%;
  margin-right: 21.8rem;
`;

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
