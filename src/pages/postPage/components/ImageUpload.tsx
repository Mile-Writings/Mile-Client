import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import { EDITOR_DEFAULT_IMG } from '../constants/editorDefaultImg';

import useImageUpload from '../../../hooks/useImageUpload';
import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';
import { BinIcn } from '../../../assets/svgs/editorSVG';
import Responsive from '../../../components/commons/Responsive/Responsive';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface ImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  previewImgUrl: string;
}

export const ImageUpload = (props: ImageUploadPropTypes) => {
  const { previewImgUrl, setPreviewImgUrl, setImageFile } = props;

  const { onImageUpload } = useImageUpload({ setPreviewImgUrl, setImageFile });

  const onClickThumDefault = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setPreviewImgUrl(EDITOR_DEFAULT_IMG);
  };

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={previewImgUrl} $imgExist={previewImgUrl} />
        <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
        <ImageUploadLabel htmlFor="editorImg">
          <ImageIconWrapper>
            {previewImgUrl !== EDITOR_DEFAULT_IMG ? (
              <EditorThuminputIcnActiveIcon />
            ) : (
              <EditorThuminputIcnUnactiveIcon />
            )}
          </ImageIconWrapper>
        </ImageUploadLabel>
        <Responsive only="mobile" asChild>
          <BinIcon onClick={onClickThumDefault} />
        </Responsive>
      </ThumbNailGradient>
    </>
  );
};

export default ImageUpload;

const ThumbNailGradient = styled.div`
  position: relative;
  width: 100%;
  height: 30.7rem;

  background: ${({ theme }) => theme.colors.thumbnailGradient};
  border-radius: 0 0 10px 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 18rem;
  }
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;

  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  border-radius: 0 0 10px 10px;
  ${({ $imgExist }) => $imgExist && $imgExist.length === 0 && 'content: "";'}

  @media ${MOBILE_MEDIA_QUERY} {
    height: 18rem;
  }
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 10px;
`;

const BinIcon = styled(BinIcn)`
  position: absolute;
  right: 2rem;
  bottom: 2.2rem;
  z-index: 3;

  cursor: pointer;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
    }

    rect {
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }
`;

const ImageIconWrapper = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;

  @media ${MOBILE_MEDIA_QUERY} {
    right: 9rem;
  }
`;

const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  cursor: pointer;
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  cursor: pointer;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
    }

    rect {
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;
