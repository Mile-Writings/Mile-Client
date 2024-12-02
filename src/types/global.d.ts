import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
