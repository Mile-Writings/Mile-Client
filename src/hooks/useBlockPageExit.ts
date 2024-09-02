import { useBlocker } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useBlockPageExit = () => {
  const [isPageExitModalOpen, setIsPageExitModalOpen] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    setIsPageExitModalOpen(blocker.state === 'blocked');
  }, [blocker.state]);

  const handleClosePageExitModal = () => {
    setIsPageExitModalOpen(false);
    blocker?.reset && blocker.reset();
  };

  const handleExitPage = () => {
    blocker?.proceed && blocker.proceed();
  };

  return { isPageExitModalOpen, handleClosePageExitModal, handleExitPage };
};

export default useBlockPageExit;
