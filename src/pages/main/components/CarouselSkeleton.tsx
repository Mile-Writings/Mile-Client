import styled from '@emotion/styled';

import Skeleton from './skeletons/Skeleton';

import Spacing from '../../../components/commons/Spacing';

const CarouselSkeleton = () => {
  return (
    <>
      <Spacing marginBottom="3.6" />
      <Skeleton width={12.2} height={3.6} unit={'rem'} color={'#EDEDF5'} rounded animation />
      <Spacing marginBottom="1.6" />
      <CarouselContainer>
        <CarouselBox>
          <TextContainer>
            <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#D6D6EB'} rounded animation />
            <Spacing marginBottom="0.5" />
            <Skeleton width={59.8} height={3.1} unit={'rem'} color={'#D6D6EB'} rounded animation />
            <Spacing marginBottom="3.2" />
            <Skeleton width={59.8} height={8.4} unit={'rem'} color={'#D6D6EB'} rounded animation />
          </TextContainer>
          <ImageContainer>
            <Skeleton width={22.4} height={16.8} unit={'rem'} color={'#D6D6EB'} rounded animation />
          </ImageContainer>
        </CarouselBox>
      </CarouselContainer>
    </>
  );
};

export default CarouselSkeleton;

const CarouselContainer = styled.div`
  display: flex;
`;

const CarouselBox = styled.section`
  display: flex;
  gap: 3.6rem;
  width: 93rem;
  height: 24rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.grayViolet};
  border-radius: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
`;
