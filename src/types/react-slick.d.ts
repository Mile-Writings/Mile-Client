declare module 'react-slick' {
  import { Component, ReactNode } from 'react';

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
    prevArrow?: ReactNode;
    nextArrow?: ReactNode;
    responsive?: ResponsiveSetting[];
    afterChange?: (currentSlide?: number) => void;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
    asNavFor?: Slider;
    className?: string;
    children?: ReactNode;
  }

  export default class Slider extends Component<Settings> {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number, dontAnimate?: boolean): void;
  }
}
