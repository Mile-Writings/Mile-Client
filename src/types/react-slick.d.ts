declare module 'react-slick' {
  import * as React from 'react';

  export interface ResponsiveSetting {
    breakpoint: number;
    settings: Partial<Settings>;
  }

  export interface Settings {
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    initialSlide?: number;
    arrows?: boolean;
    dots?: boolean;
    prevArrow?: React.ReactNode;
    nextArrow?: React.ReactNode;
    responsive?: ResponsiveSetting[];
    afterChange?: (currentSlide?: number) => void;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
    asNavFor?: Slider | undefined;
    className?: string;
    children?: React.ReactNode;
  }

  export interface SliderRef {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number, dontAnimate?: boolean): void;
  }

  export default class Slider extends React.Component<Settings> implements SliderRef {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number, dontAnimate?: boolean): void;
  }
}
