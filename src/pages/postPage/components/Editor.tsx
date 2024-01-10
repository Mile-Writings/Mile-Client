import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import './editor.css';

// 볼드 아이콘 커스텀
// const icons = Quill.import('ui/icons');
// icons['color'] = <EditorTextColorIcnBlackSvg />;

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

        <select className="ql-color ql-custom-color">
          <option value="#010101"></option>
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
        <button className="ql-align" />
        <button className="ql-align" value="center" />
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
        <button className="ql-blockquote" value="ordered" />
      </span>
    </div>
  );
};

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

const Editor = () => {
  const modules = {
    toolbar: {
      container: '#toolbar',
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
  ];

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        theme="bubble"
        placeholder="글을 작성해 주세요"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
