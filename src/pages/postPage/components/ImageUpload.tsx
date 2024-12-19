import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { EDITOR_DEFAULT_IMG } from '../constants/editorDefaultImg';

import useImageUpload from '../../../hooks/useImageUpload';
import { FileType } from '../../../types/imageUploadType';
import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';
import { BinIcn } from '../../../assets/svgs/editorSVG';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';

interface ImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<FileType>>;
  previewImgUrl: string;
}

export const ImageUpload = (props: ImageUploadPropTypes) => {
  const { previewImgUrl, setPreviewImgUrl, setImageFile } = props;

  const { onImageUpload } = useImageUpload({ setPreviewImgUrl, setImageFile });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isInputDisabled, setInputDisabled] = useState(false);

  const onClickThumDefault = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setInputDisabled(true);
    setPreviewImgUrl(EDITOR_DEFAULT_IMG);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDisabled(false);
    if (e.target.files) {
      onImageUpload(e);
    }
  };

  useEffect(() => {
    isInputDisabled && setInputDisabled(false);
  }, [isInputDisabled]);

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={previewImgUrl} $imgExist={previewImgUrl} />
        <ImageInput
          type="file"
          accept="image/*"
          id="editorImg"
          ref={imageInputRef}
          onChange={handleImageInputChange}
          disabled={isInputDisabled}
        />
        <ImageUploadLabel htmlFor="editorImg">
          <ImageIconWrapper>
            {previewImgUrl !== EDITOR_DEFAULT_IMG ? (
              <EditorThuminputIcnActiveIcon />
            ) : (
              <EditorThuminputIcnUnactiveIcon />
            )}
            <BinIcon
              onClick={(e) => {
                onClickThumDefault(e);
              }}
            />
          </ImageIconWrapper>
        </ImageUploadLabel>
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
  right: 0.5rem;
  bottom: 2.2rem;
  z-index: 2;

  cursor: pointer;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
    }

    rect {
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    right: 2rem;
  }
`;

const ImageIconWrapper = styled.div`
  position: relative;
  width: 82.8rem;
  height: 100%;
`;

const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  position: absolute;
  right: 7rem;
  bottom: 2.25rem;

  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    right: 9rem;
  }
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  position: absolute;
  right: 7rem;
  bottom: 2.25rem;

  cursor: pointer;

  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
    }

    rect {
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    right: 9rem;
  }
`;

const ImageInput = styled.input`
  display: none;
`;
