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
import React, { useCallback, useEffect, useRef, useState } from 'react';

import ToolbarColorIcons from './mobile/MobileToolbarFontColor';

// custom
import { FontSize } from '../utils/fontSize';
import { FontWeight } from '../utils/fontWeight';
import { LineHeight } from '../utils/lineHeight';

// custom editor css
import './tiptap.css';
// editor svg
import * as ToolbarIcon from '../../../assets/svgs/editorSVG';
import useClickOutside from '../../../hooks/useClickOutside';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import Responsive from '../../../components/commons/Responsive/Responsive';

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
  const desktopTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const mobileTitleRef = useRef<HTMLTextAreaElement | null>(null);
  // 제목 onChange 높이 조절 포함
  const onChangeDesktopTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (desktopTitleRef.current) {
      desktopTitleRef.current.style.height = '9.4rem';
      desktopTitleRef.current.style.height = desktopTitleRef.current.scrollHeight * 0.1 + 'rem';
    }
    setTitle(e);
  };

  const onChangeMobileTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (mobileTitleRef.current) {
      mobileTitleRef.current.style.height = '6.1rem';
      mobileTitleRef.current.style.height = mobileTitleRef.current.scrollHeight * 0.1 + 'rem';
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
      <Responsive only="desktop">
        <Title
          placeholder="제목을 적어주세요"
          onChange={onChangeDesktopTitle}
          value={title}
          rows={1}
          ref={desktopTitleRef}
        />
      </Responsive>
      <Responsive only="mobile" asChild>
        <Title
          placeholder="제목을 적어주세요"
          onChange={onChangeMobileTitle}
          value={title}
          rows={1}
          ref={mobileTitleRef}
        />
      </Responsive>
      <ToolbarWrapper>
        {/* 폰트크기 옵션 리스트 */}
        <FontSizeOptionList $isFontSizeOpen={isFontSizeOpen}>
          <FontSizeOption onClick={() => toggleFontSize('2.6rem', '700', '200%')}>
            <FontSizeText
              className={editor.isActive('textStyle', { fontSize: '2.6rem' }) ? 'is-active' : ''}
            >
              제목 1
            </FontSizeText>
          </FontSizeOption>
          <FontSizeOption onClick={() => toggleFontSize('1.8rem', '700', '200%')}>
            <FontSizeText
              className={editor.isActive('textStyle', { fontSize: '1.8rem' }) ? 'is-active' : ''}
            >
              제목 2
            </FontSizeText>
          </FontSizeOption>
          <FontSizeOption onClick={() => toggleFontSize('1.6rem', '400', '200%')}>
            <FontSizeText
              className={editor.isActive('textStyle', { fontSize: '1.6rem' }) ? 'is-active' : ''}
            >
              본문 1
            </FontSizeText>
          </FontSizeOption>
          <FontSizeOption onClick={() => toggleFontSize('1.2rem', '400', '200%')}>
            <FontSizeText
              className={editor.isActive('textStyle', { fontSize: '1.2rem' }) ? 'is-active' : ''}
            >
              본문 2
            </FontSizeText>
          </FontSizeOption>
        </FontSizeOptionList>

        {/* 글자 색상 변경 리스트 */}
        <TextColorList $isFontColorOpen={isFontColorOpen}>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#010101')}>
            <ToolbarColorIcons.EditorTextColorBlackIcn
              className={editor.isActive('textStyle', { color: '#010101' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#010101' }) ? 'is-active' : ''}
              >
                black
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#505050')}>
            <ToolbarColorIcons.EditorTextColorGrayIcn
              className={editor.isActive('textStyle', { color: '#505050' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#505050' }) ? 'is-active' : ''}
              >
                gray
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#B81616')}>
            <ToolbarColorIcons.EditorTextColorRedIcn
              className={editor.isActive('textStyle', { color: '#B81616' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#B81616' }) ? 'is-active' : ''}
              >
                red
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#DA5B24')}>
            <ToolbarColorIcons.EditorTextColorOrangeIcn
              className={editor.isActive('textStyle', { color: '#DA5B24' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#DA5B24' }) ? 'is-active' : ''}
              >
                orange
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#C5B525')}>
            <ToolbarColorIcons.EditorTextColorYellowIcn
              className={editor.isActive('textStyle', { color: '#C5B525' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#C5B525' }) ? 'is-active' : ''}
              >
                yellow
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#2F7417')}>
            <ToolbarColorIcons.EditorTextColorGreenIcn
              className={editor.isActive('textStyle', { color: '#2F7417' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#2F7417' }) ? 'is-active' : ''}
              >
                green
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#172B74')}>
            <ToolbarColorIcons.EditorTextColorBlueIcn
              className={editor.isActive('textStyle', { color: '#172B74' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#172B74' }) ? 'is-active' : ''}
              >
                blue
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#6139D1')}>
            <ToolbarColorIcons.EditorTextColorVioletIcn
              className={editor.isActive('textStyle', { color: '#6139D1' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#6139D1' }) ? 'is-active' : ''}
              >
                violet
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextColor('#951479')}>
            <ToolbarColorIcons.EditorTextColorPinkIcn
              className={editor.isActive('textStyle', { color: '#951479' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('textStyle', { color: '#951479' }) ? 'is-active' : ''}
              >
                pink
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
        </TextColorList>

        {/* 글자 배경색 리스트 */}
        <TextColorBgList $isFontBgColorOpen={isFontBgColorOpen}>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#FFFFFF')}>
            <ToolbarColorIcons.EditorTextBgColorWhiteIcn
              className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}
              >
                white
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#EAEAEA')}>
            <ToolbarColorIcons.EditorTextBgColorGrayIcn
              className={editor.isActive('highlight', { color: '#EAEAEA' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#EAEAEA' }) ? 'is-active' : ''}
              >
                gray
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E2E2')}>
            <ToolbarColorIcons.EditorTextBgColorRedIcn
              className={editor.isActive('highlight', { color: '#F6E2E2' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#F6E2E2' }) ? 'is-active' : ''}
              >
                red
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E7E2')}>
            <ToolbarColorIcons.EditorTextBgColorOrangeIcn
              className={editor.isActive('highlight', { color: '#F6E7E2' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#F6E7E2' }) ? 'is-active' : ''}
              >
                orange
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6F4E2')}>
            <ToolbarColorIcons.EditorTextBgColorYellowIcn
              className={editor.isActive('highlight', { color: '#F6F4E2' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#F6F4E2' }) ? 'is-active' : ''}
              >
                yellow
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F1F6E2')}>
            <ToolbarColorIcons.EditorTextBgColorGreenIcn
              className={editor.isActive('highlight', { color: '#F1F6E2' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#F1F6E2' }) ? 'is-active' : ''}
              >
                green
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#E2EAF6')}>
            <ToolbarColorIcons.EditorTextBgColorBlueIcn
              className={editor.isActive('highlight', { color: '#E2EAF6' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#E2EAF6' }) ? 'is-active' : ''}
              >
                blue
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#E9E3F8')}>
            <ToolbarColorIcons.EditorTextBgColorVioletIcn
              className={editor.isActive('highlight', { color: '#E9E3F8' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#E9E3F8' }) ? 'is-active' : ''}
              >
                violet
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
          <TextColorOptionWrapper onClick={() => toggleTextBgColor('#F6E2F3')}>
            <ToolbarColorIcons.EditorTextBgColorPinkIcn
              className={editor.isActive('highlight', { color: '#F6E2F3' }) ? 'is-active' : ''}
            />
            <Responsive only="desktop">
              <TextColorText
                className={editor.isActive('highlight', { color: '#F6E2F3' }) ? 'is-active' : ''}
              >
                pink
              </TextColorText>
            </Responsive>
          </TextColorOptionWrapper>
        </TextColorBgList>

        <ToolbarPaddingDiv divHeight={2.4} />
        <ToolbarContainer className="menu">
          {/* 글자 크기 */}
          <ToolbarDropDownWrapper ref={fontSizeDropDownRef}>
            <FontSizeToggle onClick={onClickFontSizeToggle} $isOpen={isFontSizeOpen}>
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
              <Responsive only="desktop">
                <ToolbarFontSizeDropDonwOpen $isOpen={isFontSizeOpen}>
                  <ToolbarIcon.EditorDropIcnOpen />
                </ToolbarFontSizeDropDonwOpen>
                <ToolbarFontSizeDropDonwClose $isOpen={isFontSizeOpen}>
                  <ToolbarIcon.EditorDropIcnClose />
                </ToolbarFontSizeDropDonwClose>
              </Responsive>
            </FontSizeToggle>
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
              <Responsive only="desktop">
                <ToolbarFontColorDropDonwOpen $isOpen={isFontColorOpen}>
                  <ToolbarIcon.EditorDropIcnOpen />
                </ToolbarFontColorDropDonwOpen>
                <ToolbarFontColorDropDonwClose $isOpen={isFontColorOpen}>
                  <ToolbarIcon.EditorDropIcnClose />
                </ToolbarFontColorDropDonwClose>
              </Responsive>
            </TextColorToggle>
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
              <Responsive only="desktop">
                <ToolbarFontBgColorDropDonwOpen $isOpen={isFontBgColorOpen}>
                  <ToolbarIcon.EditorDropIcnOpen />
                </ToolbarFontBgColorDropDonwOpen>
                <ToolbarFontBgColorDropDonwClose $isOpen={isFontBgColorOpen}>
                  <ToolbarIcon.EditorDropIcnClose />
                </ToolbarFontBgColorDropDonwClose>
              </Responsive>
            </TextColorToggle>
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
        </ToolbarContainer>
        <ToolbarPaddingDiv divHeight={2.2} />
      </ToolbarWrapper>

      <EditorContent editor={editor} />
    </TipTapWrapper>
  );
};

export default TipTap;

const ToolbarPaddingDiv = styled.div<{ divHeight: number }>`
  height: ${({ divHeight }) => `${divHeight}rem`};

  background-color: ${({ theme }) => theme.colors.backGroundGray};
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 6.1rem;
    padding: 1.6rem;

    ${({ theme }) => theme.fonts.mTitle3};
  }
`;

// 에디터 전체 wrapper
const TipTapWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 82.6rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

// 툴바 전체 감싸기
const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 82.6rem;
  height: 4.6rem;
  margin: 0;
  padding: 0;

  background-color: white;
  border-radius: 0.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 5.2rem;
    padding: 1rem 1.6rem;
    overflow: scroll hidden;

    ::after {
      position: absolute;
      right: 0;
      bottom: 2.2rem;
      width: 4.6rem;
      height: 5.2rem;

      background: linear-gradient(to left, #fff, transparent);
      border-radius: 0.8rem;

      content: '';
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const ToolbarWrapper = styled.div`
  position: sticky;
  top: 5rem;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.backGroundGray};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: fit-content;
    height: 100%;
    padding: 0;

    border: none;
  }
`;

// 글자 크기 드롭다운 리스트
const FontSizeToggle = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12.9rem;
  height: 4.6rem;
  padding: 0 1.3rem;

  background-color: white;
  border-radius: 0.8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 5rem;
    height: 3.2rem;
    margin-right: 0.8rem;
    padding: 0 0.7rem;

    background-color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.mileViolet : '')};
  }
`;

const FontSizeLabel = styled.p`
  width: 5.622rem;
  margin-right: 1.02rem;

  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
    width: 100%;
    margin-right: 0;
  }
`;

const FontSizeOptionList = styled.div<{ $isFontSizeOpen: boolean }>`
  position: absolute;
  top: 7rem;
  z-index: 1;
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

  @media ${MOBILE_MEDIA_QUERY} {
    top: 7.7rem;
    flex-direction: row;
    width: 33.5rem;
    padding: 0.8rem 1.6rem;
  }
`;

const FontSizeOption = styled.div`
  display: flex;
  align-items: center;
  width: 11.2rem;
  height: 3.5rem;
  padding: 0.8rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border-radius: 6px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  .is-active {
    color: ${({ theme }) => theme.colors.mainViolet};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    width: 4.9rem;
    padding: 0;
  }
`;

const FontSizeText = styled.p`
  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.gray90};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    margin-right: 1.2rem;
    padding: 0;
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
`;

const TextColorList = styled.div<{ $isFontColorOpen: boolean }>`
  position: absolute;
  top: 7rem;
  left: 12.8rem;
  z-index: 1;

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

  @media ${MOBILE_MEDIA_QUERY} {
    top: 7.7rem;
    left: 0;
    flex-direction: row;
    width: 33.5rem;
    padding: 1.2rem 1.6rem;
  }
`;

const TextColorBgList = styled.div<{ $isFontBgColorOpen: boolean }>`
  position: absolute;
  top: 7rem;
  left: 23.5rem;
  z-index: 1;

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

  @media ${MOBILE_MEDIA_QUERY} {
    top: 7.7rem;
    left: 0;
    flex-direction: row;
    width: 33.5rem;
    padding: 1.2rem 1.6rem;
  }
`;

const TextColorOptionWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 11rem;
  padding: 0.6rem 1rem;

  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 6px;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  .is-active {
    color: ${({ theme }) => theme.colors.mainViolet};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 5rem;
    padding: 0;

    :hover {
      background-color: ${({ theme }) => theme.colors.white};
    }
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

  @media ${MOBILE_MEDIA_QUERY} {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 0.8rem;

    border: none;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;

    :active {
      /* background-color: ${({ theme }) => theme.colors.mileViolet}; */
      background-color: red;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ theme }) => theme.colors.mileViolet};
    }
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
