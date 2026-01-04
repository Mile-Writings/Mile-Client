import { ComponentType, ReactNode } from 'react';

declare module 'react-slick' {
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
    asNavFor?: SliderRef;
    className?: string;
    children?: ReactNode;
  }

  export interface SliderRef {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number, dontAnimate?: boolean): void;
  }

  const Slider: ComponentType<Settings & { ref?: React.Ref<SliderRef> }>;
  export default Slider;
  export type { Settings };
}
