import { Slot } from '@radix-ui/react-slot';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { ResponsiveContext } from './context';
interface ResponsivePropTypes {
  children: ReactNode;
  only: AvailableSize;
  asChild?: boolean;
}

type AvailableSize = 'mobile' | 'desktop' | 'editor';

const Responsive = ({ children, only, asChild }: ResponsivePropTypes) => {
  const [current, setCurrent] = useState<AvailableSize | null>(null);

  const Comp = asChild ? Slot : 'div';

  const { mobileOnlyClassName, desktopOnlyClassName } = useContext(ResponsiveContext);

  const selectedClassName = () => {
    if (only === 'desktop') {
      return desktopOnlyClassName;
    } else if (only === 'mobile') {
      return mobileOnlyClassName;
    } else {
      throw new Error(`잘못된 타입의 only값 : ${only}`);
    }
  };

  useEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleCurrentChange = (e: MediaQueryListEvent) => {
      setCurrent(e.matches ? 'mobile' : 'desktop');
    };
    mobileMedia.addEventListener('change', handleCurrentChange);

    return () => {
      mobileMedia.removeEventListener('change', handleCurrentChange);
    };
  }, []);
  return current === null || only === current ? (
    <Comp className={`${selectedClassName()}`}>{children}</Comp>
  ) : (
    <></>
  );
};

export default Responsive;
