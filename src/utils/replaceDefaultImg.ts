import { SyntheticEvent } from 'react';
import { DEFAULT_IMG_URL } from '../constants/defaultImgUrl';

export const replaceDefaultImg = (e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
  e.currentTarget.src = DEFAULT_IMG_URL;
};
