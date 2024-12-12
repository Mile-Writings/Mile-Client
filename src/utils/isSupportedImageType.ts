import { SUPPORTED_IMAGE_TYPES } from '../constants/supportedImageType';

export const isSupportedImageType = (fileType: string): boolean =>
  SUPPORTED_IMAGE_TYPES.includes(fileType as (typeof SUPPORTED_IMAGE_TYPES)[number]);
