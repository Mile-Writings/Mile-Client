import { useBlocker } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useBlockPageExit = (handleExitAction?: () => void) => {
  const [isPageExitModalOpen, setIsPageExitModalOpen] = useState(false);
  const [ignoreBlocker, setIgnoreBlocker] = useState(false);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    // true 페이지 이동 허용
    if (ignoreBlocker) {
      return false;
    }

    // 그 외 경로 다르면 차단
    return currentLocation.pathname !== nextLocation.pathname;
  });

  // 페이지 이탈 모달 열기
  useEffect(() => {
    !ignoreBlocker && setIsPageExitModalOpen(blocker.state === 'blocked');
  }, [blocker.state, ignoreBlocker]);

  // 페이지 이탈 모달 닫기
  const handleClosePageExitModal = () => {
    setIsPageExitModalOpen(false);
    // block 초기화
    blocker?.reset && blocker.reset();
  };

  // 페이지 나가기 (이탈 모달 확인 누를 경우)
  const handleExitPage = () => {
    blocker?.proceed && blocker.proceed();
    handleExitAction && handleExitAction();
  };

  return {
    isPageExitModalOpen,
    handleClosePageExitModal,
    handleExitPage,
    setIgnoreBlocker,
  };
};

export default useBlockPageExit;
