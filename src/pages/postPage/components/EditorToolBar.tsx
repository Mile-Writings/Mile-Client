import React from 'react';

import { EditorTextColorIcnBlackSvg } from '../../../assets/svgs/index';

const EditorToolBar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-size" defaultValue="본문 1">
          <option value="제목 1">제목 1</option>
          <option value="제목 2">제목 2</option>
          <option value="본문 1">본문 1</option>
          <option value="본문 2">본문 2</option>
        </select>
      </span>
      <span className="ql-formats">
        <EditorTextColorIcnBlackSvg className="ql-picker-label" />
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-italic" />
        <button className="ql-align" />
        <button className="ql-align" value="center" />
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
        <button className="ql-blockquote" value="ordered" />
      </span>
    </div>
  );
};

export default EditorToolBar;
