import { Global, css } from '@emotion/react';
import { ReactNode } from 'react';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { ResponsiveContext } from './context';
interface ResponsiveProviderProps {
  children: ReactNode;
}

const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  const mobileOnlyClassName = `responsive-mobile-only`;
  const desktopOnlyClassName = `responsive-desktop-only`;

  const ResponsiveClassName = css`
    .${mobileOnlyClassName} {
      display: none !important;
    }
    .${desktopOnlyClassName} {
      display: block !important;
    }

    @media ${MOBILE_MEDIA_QUERY} {
      .${mobileOnlyClassName} {
        display: block !important;
      }
      .${desktopOnlyClassName} {
        display: none !important;
      }
    }
  `;
  return (
    <ResponsiveContext.Provider value={{ mobileOnlyClassName, desktopOnlyClassName }}>
      <Global styles={ResponsiveClassName} />
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
