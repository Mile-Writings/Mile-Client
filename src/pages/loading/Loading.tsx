import styled from '@emotion/styled';

import spinnerGif from '../../assets/gifs/loadingSpinner.gif';

const Loading = () => {
  return (
    <SpinnerWrapper>
      <img src={spinnerGif} alt="로딩 중" />
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
