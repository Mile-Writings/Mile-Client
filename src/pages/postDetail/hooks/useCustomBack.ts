import { useEffect } from 'react';

//뒤로가기 클릭했을 때 뒤로가기를 막고 customBack 로직 실행시킴
// ex ) 뒤로가기 막고 특정 페이지로 라우팅
const useCustomBack = (customBack: () => void) => {
  const browserPreventEvent = (event: () => void) => {
    event();
  };

  useEffect(() => {
    const handlePopstate = () => {
      // history.pushState(null, '', location.href);
      browserPreventEvent(customBack);
    };
    history.pushState(null, '', location.href);

    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
};

export default useCustomBack;
