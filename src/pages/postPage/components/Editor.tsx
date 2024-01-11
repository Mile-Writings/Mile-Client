import { useRef, useCallback } from 'react';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import './editor.css';

// 글자 크기 커스텀
const Size = Quill.import('formats/size');
Size.whitelist = ['large', 'medium', 'small', 'extra-small'];
Quill.register(Size, true);

// 글자 색상 커스텀
const Color = Quill.import('formats/color');
Color.whitelist = [
  '#010101',
  '#505050',
  '#B81616',
  '#DA5B24',
  '#C5B525',
  '#2F7417',
  '#172B74',
  '#6139D1',
  '#951479',
];
Quill.register(Color, true);

// 글자 배경색 커스텀
const BackgroundColor = Quill.import('formats/background');
BackgroundColor.whitelist = [
  '#FFFFFF', // white
  '#EAEAEA', // Gray
  '#F6E2E2', // red
  '#F6E7E2', // orange
  '#F6F4E2', // yellow
  '#F1F6E2', // green
  '#E2EAF6', // blue
  '#E9E3F8', // violet
  '#F6E2F3', // pink
];
Quill.register(BackgroundColor, true);

// 구분선 커스텀
const BlockEmbed = Quill.import('blots/embed');

class Divider extends BlockEmbed {
  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('style', 'height:0px; margin-top:10px; margin-bottom:10px;');
    return node;
  }

  static blotName = 'divider';
  static tagName = 'hr';
}

Quill.register({ 'formats/hr': Divider });

const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-size ql-custom-size" defaultValue={'small'}>
          <option value="large">제목 1</option>
          <option value="medium">제목 2</option>
          <option value="small">본문 1</option>
          <option value="extra-small">본문 2</option>
        </select>

        <select className="ql-color ql-custom-color">
          <option value="#010101" className="ql-testest"></option>
          <option value="#505050"></option>
          <option value="#B81616"></option>
          <option value="#DA5B24"></option>
          <option value="#C5B525"></option>
          <option value="#2F7417"></option>
          <option value="#172B74"></option>
          <option value="#6139D1"></option>
          <option value="#951479"></option>
        </select>

        <select className="ql-background ql-custom-background">
          <option value="#FFFFFF"></option>
          <option value="#EAEAEA"></option>
          <option value="#F6E2E2"></option>
          <option value="#F6E7E2"></option>
          <option value="#F6F4E2"></option>
          <option value="#F1F6E2"></option>
          <option value="#E2EAF6"></option>
          <option value="#E9E3F8"></option>
          <option value="#F6E2F3"></option>
        </select>

        <button className="ql-bold" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-italic" />
        <button className="ql-align ql-left" value="justify" />
        <button className="ql-align ql-center" value="center" />
        <button className="ql-list ql-bullet" value="bullet" />
        <button className="ql-list ql-ordered" value="ordered" />
        <button className="ql-blockquote" />
        <span className="ql-formats">
          <button className="ql-divider" />
        </span>
      </span>
    </div>
  );
};

const Editor = () => {
  const quillRef = useRef<ReactQuill | null>(null);

  const dividerToolbarHandler = useCallback(() => {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();

    let index = (quill.getSelection(true) || {}).length;

    // 포커스 안 되어 있을 때 예외처리
    if (index === undefined || index < 0) {
      index = quill.getLength();
    }

    quill.insertText(index, '\n', 'user');
    quill.insertEmbed(index + 1, 'divider', true, 'user');
    quill.setSelection(index + 2, 1, 'user');
  }, []);

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        divider: dividerToolbarHandler,
      },
    },
  };

  const formats = [
    'size',
    'color',
    'background',
    'bold',
    'underline',
    'strike',
    'italic',
    'align',
    'list',
    'bullet',
    'blockquote',
    'divider',
  ];

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="bubble"
        placeholder="글을 작성해 주세요"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
