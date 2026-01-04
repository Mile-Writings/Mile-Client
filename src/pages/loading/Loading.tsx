import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import * as lottie from 'lottie-web/build/player/lottie_light';
import LoadingLottie from '../../assets/gifs/loading.json';
type LettiePlayer = typeof lottie.default;
const lottiePlayer = lottie as unknown as LettiePlayer;

const Loading = () => {
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animation = lottiePlayer.loadAnimation({
      container: spinnerRef.current as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoadingLottie,
    });

    return () => animation.destroy();
  }, []);

  return (
    <SpinnerWrapper>
      <Spinner ref={spinnerRef} />
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

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8.4rem;
  height: 8.4rem;
`;
