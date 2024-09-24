import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import spinnerGif from '../../assets/gifs/loadingSpinner.gif';
import { LoadingIc } from '../../assets/svgs';
const Loading = () => {
  return (
    <SpinnerWrapper>
      <img src={spinnerGif} alt="로딩 중" />
      {/* <LoadingIcon /> */}
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
const LoadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
  `;
const LoadingIcon = styled(LoadingIc)`
  width: 8.4rem;
  height: 8.4rem;

  animation: ${LoadingSpinner} 1s linear infinite;
`;
