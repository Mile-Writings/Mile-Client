import React, { useState } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import './editor.css';
import { EditorTextColorIcnBlackSvg, ditorHorizonIcnUnactiveSvg } from '../../../assets/svgs/index';

// const Divider = () => <EditorHorizonIcnUnactiveSvg />;

// const insertDivider = () => {
//   const range = this.quill.getSelection(true);
//   this.quill.insertText(range.index, '\n');
//   this.quill.insertEmbed(range.index + 1, '----');
//   this.quill.insertText(range.index + 2, Quill.sources.SILENT);
// };

// const BlockEmbed = Quill.import('blots/block/embed');
// class DividerBlot extends BlockEmbed {}
// DividerBlot.blotName = 'divider';
// DividerBlot.tagName = 'hr';

// Quill.register(DividerBlot);

const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-size" defaultValue={'small'}>
          <option value="large">제목 1</option>
          <option value="medium">제목 2</option>
          <option value="small">본문 1</option>
          <option value="extra-small">본문 2</option>
        </select>

        <EditorTextColorIcnBlackSvg className="ql-color" />
        <button className="ql-background" />

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

const Size = Quill.import('formats/size');
Size.whitelist = ['large', 'medium', 'small', 'extra-small'];
Quill.register(Size, true);

const Editor = () => {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {},
    },
  };

  const formats = [
    'size',
    'color',
    // 'background',
    'bold',
    'underline',
    'strike',
    'italic',
    'align',
    'list',
    'bullet',
    'blockquote',
  ];

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        theme="bubble"
        // value={content}
        onChange={setContent}
        placeholder="글을 작성해 주세요"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
