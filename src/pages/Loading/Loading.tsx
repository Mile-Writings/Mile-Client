import styled from '@emotion/styled';

import spinnerGif from '../../assets/gifs/loadingSpinner.gif';

const Loading = () => {
  // PR 용 주석
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
  height: 100vh;
`;
