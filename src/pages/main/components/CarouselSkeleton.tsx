import styled from '@emotion/styled';

import Skeleton from './Skeleton';

import Spacing from '../../../components/commons/Spacing';

const CarouselSkeleton = () => {
  return (
    <CarouselWithButtonLayout>
      <Spacing marginBottom="3.6" />
      <Skeleton width={10.2} height={3.6} unit={'rem'} color={'#fffefe'} rounded />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <TextContainer>
            <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="0.5" />
            <Skeleton width={59.8} height={3.1} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="3.2" />
            <Skeleton width={59.8} height={8.4} unit={'rem'} color={'#efefef'} rounded />
          </TextContainer>
        </CarouselBox>
      </CarouselContainer>
      <Spacing marginBottom="3.6" />
      <Skeleton width={10.2} height={3.6} unit={'rem'} color={'#fffefe'} rounded />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <TextContainer>
            <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="0.5" />
            <Skeleton width={59.8} height={3.1} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="3.2" />
            <Skeleton width={59.8} height={8.4} unit={'rem'} color={'#efefef'} rounded />
          </TextContainer>
        </CarouselBox>
      </CarouselContainer>
      <Spacing marginBottom="3.6" />
      <Skeleton width={10.2} height={3.6} unit={'rem'} color={'#fffefe'} rounded />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <TextContainer>
            <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="0.5" />
            <Skeleton width={59.8} height={3.1} unit={'rem'} color={'#efefef'} rounded />
            <Spacing marginBottom="3.2" />
            <Skeleton width={59.8} height={8.4} unit={'rem'} color={'#efefef'} rounded />
          </TextContainer>
        </CarouselBox>
      </CarouselContainer>
    </CarouselWithButtonLayout>
  );
};

export default CarouselSkeleton;

const CarouselWithButtonLayout = styled.div`
  margin-bottom: 3.2rem;
`;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselBox = styled.section`
  width: 93rem;
  height: 24rem;
  padding: 3.6rem;

  background-color: #fffefe;
  border-radius: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
