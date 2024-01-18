import styled from '@emotion/styled';

import Skeleton from './Skeleton';

import Spacing from '../../../components/commons/Spacing';

const GroupContentSkeleton = () => {
  return (
    <>
      <TextContainer>
        <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#dcdcdc'} rounded />
        <Skeleton width={59.8} height={3.1} unit={'rem'} color={'#dcdcdc'} rounded />
        <Spacing marginBottom="2" />
        <Skeleton width={59.8} height={8.4} unit={'rem'} color={'#dcdcdc'} rounded />
      </TextContainer>
      <Skeleton width={59.8} height={1.7} unit={'rem'} color={'#dcdcdc'} circle rounded />
    </>
  );
};

export default GroupContentSkeleton;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
