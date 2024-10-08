import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import LoadingLottie from '../../assets/gifs/loading.json';

const Loading = () => {
  return (
    <SpinnerWrapper>
      <Lottie animationData={LoadingLottie} />
    </SpinnerWrapper>
  );
};

export default Loading;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
