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
          <Skeleton width={93} height={24} unit={'rem'} color={'#fffefe'} rounded />
        </CarouselBox>
      </CarouselContainer>
      <Spacing marginBottom="3.6" />
      <Skeleton width={10.2} height={3.6} unit={'rem'} color={'#fffefe'} rounded />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <Skeleton width={93} height={24} unit={'rem'} color={'#fffefe'} rounded />
        </CarouselBox>
      </CarouselContainer>
      <Spacing marginBottom="3.6" />
      <Skeleton width={10.2} height={3.6} unit={'rem'} color={'#fffefe'} rounded />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <Skeleton width={93} height={24} unit={'rem'} color={'#fffefe'} rounded />
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
`;
