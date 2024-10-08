import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

import postDirectlyS3 from '../apis/postDirectlyS3';
import { EDITOR_DEFAULT_IMG } from '../constants/editorDefaultImg';

import { s3UrlParsing } from '../../../utils/s3UrlParsing';
import { EditorThuminputIcnActiveIc, EditorThuminputIcnUnactiveIc } from './../../../assets/svgs';

interface ImageUploadPropTypes {
  setPreviewImgUrl: Dispatch<SetStateAction<string>>;
  url: string;
  setImageToServer: (imageUrl: string) => void;
  fileName: string;
  previewImgUrl: string;
}

const ImageUpload = (props: ImageUploadPropTypes) => {
  const { previewImgUrl, setPreviewImgUrl, url, setImageToServer, fileName } = props;
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target) {
        setPreviewImgUrl(target.result as string);
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      postDirectlyS3Func(url, e.target.files[0]); //url 파싱해서 넣기
    }
  };

  const postDirectlyS3Func = async (url: string, imageFile: File) => {
    try {
      const data = await postDirectlyS3(url, imageFile);
      const s3url = s3UrlParsing(url);
      const urlToServer = `${s3url + fileName}`;
      setImageToServer(urlToServer);
      return data;
    } catch (err) {
      console.log(err);
    }
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
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;

  width: 100%;
  height: 30.7rem;
  object-fit: cover;

  border-radius: 0 0 10px 10px;
  ${({ $imgExist }) => $imgExist && $imgExist.length === 0 && 'content: "";'}
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

const ImageIconWrapper = styled.div`
  position: relative;
  width: 82.8rem;
  height: 100%;
`;
const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  position: absolute;
  right: 0.5rem;
  bottom: 2.25rem;
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  position: absolute;
  right: 0.5rem;
  bottom: 2.25rem;

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
