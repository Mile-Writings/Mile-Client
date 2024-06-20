/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
import styled from '@emotion/styled';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState, useRef } from 'react';

// custom
import { FontSize } from '../utils/fontSize';
import { FontWeight } from '../utils/fontWeight';
import { LineHeight } from '../utils/lineHeight';

// custom editor css
import './tiptap.css';
// editor svg
import * as ToolbarIcon from '../../../assets/svgs/editorSVG';
import useClickOutside from '../../../hooks/useClickOutside';

interface EditorPropTypes {
  title: string | undefined;
  setTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tempContent: string;
  editContent: string;
  setEditorContent: (content: string) => void;
  setContentWithoutTag: (content: string) => void;
}

const TipTap = (props: EditorPropTypes) => {
  const { title, setTitle, tempContent, editContent, setEditorContent, setContentWithoutTag } =
    props;
  // toolbar 드롭다운 전체 핸들
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  // font size drop down
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  // font color drop down
  const [isFontColorOpen, setIsFontColorOpen] = useState(false);
  // font background color drop down
  const [isFontBgColorOpen, setIsFontBgColorOpen] = useState(false);

  // 제목 textarea 높이 조절용
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  // 제목 onChange 높이 조절 포함
  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (titleRef.current) {
      titleRef.current.style.height = '9.4rem';
      titleRef.current.style.height = titleRef.current.scrollHeight * 0.1 + 'rem';
    }
    setTitle(e);
  };

  const fontSizeDropDownRef = useRef(null);
  const fontColorDropDownRef = useRef(null);
  const fontBgColorDropDownRef = useRef(null);
  // 커스텀 훅 전달 함수
  const handleFontSizeOutSideClick = () => {
    setIsFontSizeOpen(false);
  };
  const handleFontColorOutSideClick = () => {
    setIsFontColorOpen(false);
  };
  const handleFontBgColorOutSideClick = () => {
    setIsFontBgColorOpen(false);
  };
  // 커스텀 훅 사용
  useClickOutside(fontSizeDropDownRef, handleFontSizeOutSideClick);
  useClickOutside(fontColorDropDownRef, handleFontColorOutSideClick);
  useClickOutside(fontBgColorDropDownRef, handleFontBgColorOutSideClick);

  const onClickFontSizeToggle = () => {
    setIsFontSizeOpen(!isFontSizeOpen);
    setIsFontColorOpen(false);
    setIsFontBgColorOpen(false);
    setIsToggleOpen(!isToggleOpen);
  };

  const onClickFontColorToggle = () => {
    setIsFontColorOpen(!isFontColorOpen);
    setIsFontSizeOpen(false);
    setIsFontBgColorOpen(false);
    setIsToggleOpen(!isToggleOpen);
  };

  const onClickFontBgColorToggle = () => {
    setIsFontBgColorOpen(!isFontBgColorOpen);
    setIsFontSizeOpen(false);
    setIsFontColorOpen(false);
    setIsToggleOpen(!isToggleOpen);
  };

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Placeholder.configure({ placeholder: '글을 작성해 주세요' }),
      FontSize.configure({ types: ['textStyle'], defaultSize: '1.6rem' }),
      FontWeight.configure({ types: ['textStyle'], defaultWeight: '400' }),
      LineHeight.configure({ types: ['textStyle'], defaultLineHeight: '160%' }),
      Color,
      Highlight.configure({ multicolor: true }),
      Bold,
      Underline,
      Strike,
      Italic,
      TextAlign.configure({
        types: ['paragraph'],
        alignments: ['center', 'left'],
        defaultAlignment: 'left',
      }),
      ListItem,
      BulletList,
      OrderedList,
      Blockquote,
      HorizontalRule,
      History.configure({ depth: 100 }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
      setContentWithoutTag(editor.getText());
    },
  }) as Editor;

  // 에디터 content 업데이트
  useEffect(() => {
    if (editor && tempContent) {
      editor.commands.setContent(tempContent);
    }
    if (editor && editContent) {
      editor.commands.setContent(editContent);
    }
  }, [editor, tempContent, editContent]);

  // 글자 크기 함수
  const toggleFontSize = useCallback(
    (fontSize: string, fontWeight: string, lineHeight: string) => {
      editor.chain().focus().setFontSize(fontSize).run();
      editor.chain().focus().setFontWeight(fontWeight).run();
      editor.chain().focus().setLineHeight(lineHeight).run();
      setIsFontSizeOpen(false);
    },
    [editor],
  );

  // 글자 색상 함수
  const toggleTextColor = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run();
      setIsFontColorOpen(false);
    },
    [editor],
  );

  // 글자 배경색 함수
  const toggleTextBgColor = useCallback(
    (color: string) => {
      editor.chain().focus().toggleHighlight({ color: color }).run();
      setIsFontBgColorOpen(false);
    },
    [editor],
  );

  // bold 함수
  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  // 밑줄 함수
  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  // 취소선 함수
  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  // 기울기 함수
  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  // 왼쪽 정렬 함수
  const toggleAlignLeft = useCallback(() => {
    editor.chain().focus().setTextAlign('left').run();
  }, [editor]);

  // 가운데 정렬 함수
  const toggleAlignCenter = useCallback(() => {
    editor.chain().focus().setTextAlign('center').run();
  }, [editor]);

  // Bullet 리스트 함수
  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  // Ordered 리스트 함수
  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  // 인용구 함수
  const toggleBlockQuote = useCallback(() => {
    const current = editor.view.state.selection.$head.pos + 1;
    const focusPos = current === 1 ? 'start' : current;

    editor.chain().focus().toggleBlockquote().enter().unsetBlockquote().focus(focusPos).run();
  }, [editor]);

  // 구분선 함수
  const toggleHorizontalRule = useCallback(() => {
    editor.chain().focus().setHorizontalRule().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <TipTapWrapper>
      <Title
        placeholder="제목을 적어주세요"
        onChange={onChangeTitle}
        value={title}
        rows={1}
        ref={titleRef}
      />
      <Toolbar>
        <ToolbarBottom />
        <ToolbarWrapper className="menu">
          {/* 글자 크기 */}
          <ToolbarDropDownWrapper ref={fontSizeDropDownRef}>
            <FontSizeToggle onClick={onClickFontSizeToggle}>
              <FontSizeLabel>
                {editor.isActive('textStyle', { fontSize: '1.2rem' })
                  ? '본문 2'
                  : editor.isActive('textStyle', { fontSize: '1.6rem' })
                    ? '본문 1'
                    : editor.isActive('textStyle', { fontSize: '1.8rem' })
                      ? '제목 2'
                      : editor.isActive('textStyle', { fontSize: '2.6rem' })
                        ? '제목 1'
                        : '본문 1'}
              </FontSizeLabel>
              <ToolbarFontSizeDropDonwOpen $isOpen={isFontSizeOpen}>
                <ToolbarIcon.EditorDropIcnOpen />
              </ToolbarFontSizeDropDonwOpen>
              <ToolbarFontSizeDropDonwClose $isOpen={isFontSizeOpen}>
                <ToolbarIcon.EditorDropIcnClose />
              </ToolbarFontSizeDropDonwClose>
            </FontSizeToggle>
            <FontSizeOptionList $isFontSizeOpen={isFontSizeOpen}>
              <FontSizeOption onClick={() => toggleFontSize('2.6rem', '700', '200%')}>
                <FontSizeText
                  className={
                    editor.isActive('textStyle', { fontSize: '2.6rem' }) ? 'is-active' : ''
                  }
                >
                  제목 1
                </FontSizeText>
              </FontSizeOption>
              <FontSizeOption onClick={() => toggleFontSize('1.8rem', '700', '200%')}>
                <FontSizeText
                  className={
                    editor.isActive('textStyle', { fontSize: '1.8rem' }) ? 'is-active' : ''
                  }
                >
                  제목 2
                </FontSizeText>
              </FontSizeOption>
              <FontSizeOption onClick={() => toggleFontSize('1.6rem', '400', '200%')}>
                <FontSizeText
                  className={
                    editor.isActive('textStyle', { fontSize: '1.6rem' }) ? 'is-active' : ''
                  }
                >
                  본문 1
                </FontSizeText>
              </FontSizeOption>
              <FontSizeOption onClick={() => toggleFontSize('1.2rem', '400', '200%')}>
                <FontSizeText
                  className={
                    editor.isActive('textStyle', { fontSize: '1.2rem' }) ? 'is-active' : ''
                  }
                >
                  본문 2
                </FontSizeText>
              </FontSizeOption>
            </FontSizeOptionList>
          </ToolbarDropDownWrapper>

          {/* 글자색 */}
          <ToolbarDropDownWrapper ref={fontColorDropDownRef}>
            <TextColorToggle onClick={onClickFontColorToggle}>
              {editor.isActive('textStyle', { color: '#010101' }) ? (
                <ToolbarIcon.EditorTextColorBlackIcn />
              ) : editor.isActive('textStyle', { color: '#505050' }) ? (
                <ToolbarIcon.EditorTextColorGrayIcn />
              ) : editor.isActive('textStyle', { color: '#B81616' }) ? (
                <ToolbarIcon.EditorTextColorRedIcn />
              ) : editor.isActive('textStyle', { color: '#DA5B24' }) ? (
                <ToolbarIcon.EditorTextColorOrangeIcn />
              ) : editor.isActive('textStyle', { color: '#C5B525' }) ? (
                <ToolbarIcon.EditorTextColorYellowIcn />
              ) : editor.isActive('textStyle', { color: '#2F7417' }) ? (
                <ToolbarIcon.EditorTextColorGreenIcn />
              ) : editor.isActive('textStyle', { color: '#172B74' }) ? (
                <ToolbarIcon.EditorTextColorBlueIcn />
              ) : editor.isActive('textStyle', { color: '#6139D1' }) ? (
                <ToolbarIcon.EditorTextColorVioletIcn />
              ) : editor.isActive('textStyle', { color: '#951479' }) ? (
                <ToolbarIcon.EditorTextColorPinkIcn />
              ) : (
                <ToolbarIcon.EditorTextColorBlackIcn />
              )}
              <ToolbarFontColorDropDonwOpen $isOpen={isFontColorOpen}>
                <ToolbarIcon.EditorDropIcnOpen />
              </ToolbarFontColorDropDonwOpen>
              <ToolbarFontColorDropDonwClose $isOpen={isFontColorOpen}>
                <ToolbarIcon.EditorDropIcnClose />
              </ToolbarFontColorDropDonwClose>
            </TextColorToggle>
            <TextColorList $isFontColorOpen={isFontColorOpen}>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#010101')}>
                <ToolbarIcon.EditorTextColorBlackIcn
                  className={editor.isActive('textStyle', { color: '#010101' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#010101' }) ? 'is-active' : ''}
                >
                  black
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#505050')}>
                <ToolbarIcon.EditorTextColorGrayIcn
                  className={editor.isActive('textStyle', { color: '#505050' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#505050' }) ? 'is-active' : ''}
                >
                  gray
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#B81616')}>
                <ToolbarIcon.EditorTextColorRedIcn
                  className={editor.isActive('textStyle', { color: '#B81616' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#B81616' }) ? 'is-active' : ''}
                >
                  red
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#DA5B24')}>
                <ToolbarIcon.EditorTextColorOrangeIcn
                  className={editor.isActive('textStyle', { color: '#DA5B24' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#DA5B24' }) ? 'is-active' : ''}
                >
                  orange
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#C5B525')}>
                <ToolbarIcon.EditorTextColorYellowIcn
                  className={editor.isActive('textStyle', { color: '#C5B525' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#C5B525' }) ? 'is-active' : ''}
                >
                  yellow
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#2F7417')}>
                <ToolbarIcon.EditorTextColorGreenIcn
                  className={editor.isActive('textStyle', { color: '#2F7417' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#2F7417' }) ? 'is-active' : ''}
                >
                  green
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#172B74')}>
                <ToolbarIcon.EditorTextColorBlueIcn
                  className={editor.isActive('textStyle', { color: '#172B74' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#172B74' }) ? 'is-active' : ''}
                >
                  blue
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#6139D1')}>
                <ToolbarIcon.EditorTextColorVioletIcn
                  className={editor.isActive('textStyle', { color: '#6139D1' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#6139D1' }) ? 'is-active' : ''}
                >
                  violet
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextColor('#951479')}>
                <ToolbarIcon.EditorTextColorPinkIcn
                  className={editor.isActive('textStyle', { color: '#951479' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('textStyle', { color: '#951479' }) ? 'is-active' : ''}
                >
                  pink
                </TextColorText>
              </TextColorOptionWrapper>
            </TextColorList>
          </ToolbarDropDownWrapper>

          {/* 글자 배경색 */}
          <ToolbarDropDownWrapper ref={fontBgColorDropDownRef}>
            <TextColorToggle onClick={onClickFontBgColorToggle}>
              {editor.isActive('highlight', { color: '#FFFFFF' }) ? (
                <ToolbarIcon.EditorTextBgColorWhiteIcn />
              ) : editor.isActive('highlight', { color: '#EAEAEA' }) ? (
                <ToolbarIcon.EditorTextBgColorGrayIcn />
              ) : editor.isActive('highlight', { color: '#F6E2E2' }) ? (
                <ToolbarIcon.EditorTextBgColorRedIcn />
              ) : editor.isActive('highlight', { color: '#F6E7E2' }) ? (
                <ToolbarIcon.EditorTextBgColorOrangeIcn />
              ) : editor.isActive('highlight', { color: '#F6F4E2' }) ? (
                <ToolbarIcon.EditorTextBgColorYellowIcn />
              ) : editor.isActive('highlight', { color: '#F1F6E2' }) ? (
                <ToolbarIcon.EditorTextBgColorGreenIcn />
              ) : editor.isActive('highlight', { color: '#E2EAF6' }) ? (
                <ToolbarIcon.EditorTextBgColorBlueIcn />
              ) : editor.isActive('highlight', { color: '#E9E3F8' }) ? (
                <ToolbarIcon.EditorTextBgColorVioletIcn />
              ) : editor.isActive('highlight', { color: '#F6E2F3' }) ? (
                <ToolbarIcon.EditorTextBgColorPinkIcn />
              ) : (
                <ToolbarIcon.EditorTextBgColorWhiteIcn />
              )}
              <ToolbarFontBgColorDropDonwOpen $isOpen={isFontBgColorOpen}>
                <ToolbarIcon.EditorDropIcnOpen />
              </ToolbarFontBgColorDropDonwOpen>
              <ToolbarFontBgColorDropDonwClose $isOpen={isFontBgColorOpen}>
                <ToolbarIcon.EditorDropIcnClose />
              </ToolbarFontBgColorDropDonwClose>
            </TextColorToggle>
            <TextColorBgList $isFontBgColorOpen={isFontBgColorOpen}>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#FFFFFF')}>
                <ToolbarIcon.EditorTextBgColorWhiteIcn
                  className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}
                >
                  white
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#EAEAEA')}>
                <ToolbarIcon.EditorTextBgColorGrayIcn
                  className={editor.isActive('highlight', { color: '#EAEAEA' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#EAEAEA' }) ? 'is-active' : ''}
                >
                  gray
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E2E2')}>
                <ToolbarIcon.EditorTextBgColorRedIcn
                  className={editor.isActive('highlight', { color: '#F6E2E2' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#F6E2E2' }) ? 'is-active' : ''}
                >
                  red
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E7E2')}>
                <ToolbarIcon.EditorTextBgColorOrangeIcn
                  className={editor.isActive('highlight', { color: '#F6E7E2' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#F6E7E2' }) ? 'is-active' : ''}
                >
                  orange
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6F4E2')}>
                <ToolbarIcon.EditorTextBgColorYellowIcn
                  className={editor.isActive('highlight', { color: '#F6F4E2' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#F6F4E2' }) ? 'is-active' : ''}
                >
                  yellow
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F1F6E2')}>
                <ToolbarIcon.EditorTextBgColorGreenIcn
                  className={editor.isActive('highlight', { color: '#F1F6E2' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#F1F6E2' }) ? 'is-active' : ''}
                >
                  green
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#E2EAF6')}>
                <ToolbarIcon.EditorTextBgColorBlueIcn
                  className={editor.isActive('highlight', { color: '#E2EAF6' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#E2EAF6' }) ? 'is-active' : ''}
                >
                  blue
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#E9E3F8')}>
                <ToolbarIcon.EditorTextBgColorVioletIcn
                  className={editor.isActive('highlight', { color: '#E9E3F8' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#E9E3F8' }) ? 'is-active' : ''}
                >
                  violet
                </TextColorText>
              </TextColorOptionWrapper>
              <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E2F3')}>
                <ToolbarIcon.EditorTextBgColorPinkIcn
                  className={editor.isActive('highlight', { color: '#F6E2F3' }) ? 'is-active' : ''}
                />
                <TextColorText
                  className={editor.isActive('highlight', { color: '#F6E2F3' }) ? 'is-active' : ''}
                >
                  pink
                </TextColorText>
              </TextColorOptionWrapper>
            </TextColorBgList>
          </ToolbarDropDownWrapper>

          {/* bold */}
          <ToolbarSvgBtn
            onClick={toggleBold}
            className={classNames('menu-button', {
              'is-active': editor.isActive('bold'),
            })}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorBoldIcn
                className={classNames('menu-button', {
                  'is-active': editor.isActive('bold'),
                })}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* underline */}
          <ToolbarSvgBtn
            onClick={toggleUnderline}
            className={classNames('menu-button', {
              'is-active': editor.isActive('underline'),
            })}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorLineIcn
                className={classNames('menu-button', {
                  'is-active': editor.isActive('underline'),
                })}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* strike */}
          <ToolbarSvgBtn
            onClick={toggleStrike}
            className={classNames('menu-button', {
              'is-active': editor.isActive('strike'),
            })}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorStrikeIcn
                className={classNames('menu-button', {
                  'is-active': editor.isActive('strike'),
                })}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* Italic */}
          <ToolbarSvgBtn
            onClick={toggleItalic}
            className={classNames('menu-button', {
              'is-active': editor.isActive('italic'),
            })}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorItalicIcn
                className={classNames('menu-button', {
                  'is-active': editor.isActive('italic'),
                })}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* Left */}
          <ToolbarSvgBtn
            onClick={toggleAlignLeft}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorLeftIcn
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* Center */}
          <ToolbarSvgBtn
            onClick={toggleAlignCenter}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorCenterIcn
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* bullet List */}
          <ToolbarSvgBtn
            onClick={toggleBulletList}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorBulletListIcn
                className={editor.isActive('bulletList') ? 'is-active' : ''}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* number List */}
          <ToolbarSvgBtn
            onClick={toggleOrderedList}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorNumberListIcn
                className={editor.isActive('orderedList') ? 'is-active' : ''}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* Quote */}
          <ToolbarSvgBtn
            onClick={toggleBlockQuote}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <ToolbarSvg>
              <ToolbarIcon.EditorQuoteIcn
                className={editor.isActive('blockquote') ? 'is-active' : ''}
              />
            </ToolbarSvg>
          </ToolbarSvgBtn>

          {/* Divider */}
          <ToolbarSvgBtnLast onClick={toggleHorizontalRule}>
            <ToolbarSvg>
              <ToolbarIcon.EditorDividerIcn />
            </ToolbarSvg>
          </ToolbarSvgBtnLast>
        </ToolbarWrapper>
        <ToolbarBottom />
      </Toolbar>

      <TextWrapper>
        <EditorContent editor={editor} />
      </TextWrapper>
    </TipTapWrapper>
  );
};

export default TipTap;

const TextWrapper = styled.div`
  position: sticky;
  top: 14.4rem;
`;

const Title = styled.textarea`
  width: 82.6rem;
  max-height: 13.2rem;
  padding: 2.8rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.grayBlack};

  border: 0;
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.title3};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray40};
  }
`;

// 에디터 전체 wrapper
const TipTapWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 82.6rem;
  height: 100%;
`;

// 마진 포함 툴바
const Toolbar = styled.div`
  position: sticky;
  top: 6.4rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
`;

// 툴바 전체 감싸기
const ToolbarWrapper = styled.div`
  position: sticky;
  top: 6.4rem;
  z-index: 99;
  display: flex;
  align-items: center;
  width: 82.6rem;
  height: 4.6rem;

  /* margin-bottom: 2.4rem; */
  padding: 0;

  background-color: white;
  border-radius: 0.8rem;
`;

// toolbar 전용 bottom
const ToolbarBottom = styled.div`
  z-index: 99;
  height: 2.4rem;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

// 드롭다운 리스트
const ToolbarDropDownWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 4.6rem;

  cursor: pointer;
  border-right: 1px solid ${({ theme }) => theme.colors.gray30};
`;

// 글자 크기 드롭다운 리스트
const FontSizeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12.9rem;
  height: 4.6rem;
  padding: 0 1.3rem;

  background-color: white;
  border-radius: 0.8rem;
`;

const FontSizeLabel = styled.p`
  width: 5.622rem;
  margin-right: 1.02rem;

  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.body1}
`;

const FontSizeOptionList = styled.div<{ $isFontSizeOpen: boolean }>`
  position: absolute;
  top: 4.65rem;
  display: ${({ $isFontSizeOpen }) => ($isFontSizeOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 13.2rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;
`;

const FontSizeOption = styled.div`
  display: flex;
  align-items: center;
  width: 11.2rem;
  height: 3.5rem;
  padding: 0.8rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  .is-active {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;

const FontSizeText = styled.p`
  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.gray90};
`;

// 글자 색상 드롭다운
const TextColorToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 10.4rem;
  height: 4.6rem;
  padding: 0 1.66rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const TextColorList = styled.div<{ $isFontColorOpen: boolean }>`
  position: absolute;
  top: 4.65rem;

  display: ${({ $isFontColorOpen }) => ($isFontColorOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 11.6rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;
`;

const TextColorBgList = styled.div<{ $isFontBgColorOpen: boolean }>`
  position: absolute;
  top: 4.65rem;

  display: ${({ $isFontBgColorOpen }) => ($isFontBgColorOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;
  width: 12.6rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;
`;

const TextColorOptionWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 11rem;
  padding: 0.6rem 1rem;

  border-radius: 6px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  .is-active {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;

const TextColorText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.body7};
`;

// 기본 svg 커스텀
const ToolbarSvgBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.6rem;
  height: 4.6rem;

  border-right: 0.96px solid ${({ theme }) => theme.colors.gray30};
`;

const ToolbarSvgBtnLast = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.4rem;
  margin-right: 2.7rem;
`;

const ToolbarSvg = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  margin: 0.6rem;

  border-left: 1px transparent;
  border-radius: 0.4rem;

  & > svg {
    fill: ${({ theme }) => theme.colors.black};
  }

  & > svg.is-active {
    fill: ${({ theme }) => theme.colors.mainViolet};
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;

// svg 조건부 렌더링용
const ToolbarFontSizeDropDonwOpen = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
`;
const ToolbarFontSizeDropDonwClose = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'inline')};
`;
const ToolbarFontColorDropDonwOpen = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
`;
const ToolbarFontColorDropDonwClose = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'inline')};
`;
const ToolbarFontBgColorDropDonwOpen = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
`;
const ToolbarFontBgColorDropDonwClose = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'inline')};
`;
