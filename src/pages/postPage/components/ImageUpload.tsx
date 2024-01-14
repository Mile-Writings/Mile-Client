import styled from '@emotion/styled';

import { useState } from 'react';

import {
  EditorThuminputIcnUnactive,
  EditorThuminputIcnHover,
  EditorThuminputIcnActive,
} from './../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const ImageUpload = () => {
  const [editorThumImg, setEditorThumImg] = useState('');
  const onImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setEditorThumImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <ThumbNailImg src={editorThumImg} />
      <ImageInput type="file" accept="image/*" id="editorImg" onChange={onImageUpload} />
      <ImageLabel htmlFor="editorImg">
        <EditorThuminputIcnUnactive />
      </ImageLabel>
      <Spacing marginBottom="3.4" />
    </>
  );
};

export default ImageUpload;

const ThumbNailImg = styled.img`
  position: relative;
  width: 100%;
  height: 30.7rem;
  object-fit: cover;
`;

const ImageLabel = styled.label`
  position: absolute;
  right: 27.495rem;
  bottom: 2.225rem;
  z-index: 3;

  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;
