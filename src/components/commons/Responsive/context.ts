import { createContext } from 'react';

interface ResponsiveContextValue {
  mobileOnlyClassName: string;
  desktopOnlyClassName: string;
}

export const ResponsiveContext = createContext<ResponsiveContextValue>(
  //ResponsiveProvider로 감싸져있지 않은 컴포넌트에서 값을 접근했을 때 또는 Context가 제대로 초기화되지 않았을 때 에러를 발생시켜 디버깅을 쉽게하기 위함
  new Proxy({} as ResponsiveContextValue, {
    get() {
      throw new Error('ResponsiveProvider가 필요합니다.');
    },
  }),
);
