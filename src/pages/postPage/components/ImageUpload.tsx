import styled from '@emotion/styled';
import React, { useState } from 'react';

import { EditorThuminputIcnUnactiveIc, EditorThuminputIcnActiveIc } from './../../../assets/svgs';

const ImageUpload = () => {
  const [editorThumImg, setEditorThumImg] = useState('');
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target) {
        setEditorThumImg(target.result as string);
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <ThumbNailGradient>
        <ThumbNailImg src={editorThumImg} $imgExist={editorThumImg} />
      </ThumbNailGradient>
      <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
      <ImageUploadLabel htmlFor="editorImg">
        {editorThumImg.length > 0 ? (
          <EditorThuminputIcnActiveIcon />
        ) : (
          <EditorThuminputIcnUnactiveIcon />
        )}
      </ImageUploadLabel>
    </>
  );
};

export default ImageUpload;

const ThumbNailGradient = styled.div`
  background: ${({ theme }) => theme.colors.thumbnailGradient};
`;

const ThumbNailImg = styled.img<{ $imgExist: string }>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 30.7rem;
  object-fit: cover; //픽스
  background-color: #e4f4b5;

  ${({ $imgExist }) => $imgExist.length === 0 && 'content: "";'}
`;

const ImageUploadLabel = styled.label`
  position: relative;
  top: -7.1rem;
  right: 0;
  z-index: 3;

  cursor: pointer;
`;

const EditorThuminputIcnActiveIcon = styled(EditorThuminputIcnActiveIc)`
  margin-left: 69%;
`;

const EditorThuminputIcnUnactiveIcon = styled(EditorThuminputIcnUnactiveIc)`
  margin-left: 69%;
  :hover {
    path {
      fill: ${({ theme }) => theme.colors.mainViolet};
      stroke: ${({ theme }) => theme.colors.mainViolet};
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;
