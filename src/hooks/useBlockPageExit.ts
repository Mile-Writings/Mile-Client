import { useBlocker } from 'react-router-dom';

const useBlockPageExit = () => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname,
  );

  return { blocker };
};

export default useBlockPageExit;
