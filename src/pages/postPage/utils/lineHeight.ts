//lineHeight.ts
import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

export type LineHeightOptions = {
  types: string[];
  defaultLineHeight: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height
       */
      // eslint-disable-next-line no-unused-vars
      setLineHeight: (lineHeight: string) => ReturnType;
      /**
       * Unset the line height
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultLineHeight: '160%',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          LineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { lineHeight }).run();
        },
      unsetLineHeight:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { lineHeight: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
