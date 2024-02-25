import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

export type FontWeightOptions = {
  types: string[];
  defaultWeight: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontWeight: {
      /**
       * Set the font weight
       */
      // eslint-disable-next-line no-unused-vars
      setFontWeight: (fontWeight: string) => ReturnType;
      /**
       * Unset the font weight
       */
      unsetFontWeight: () => ReturnType;
    };
  }
}

export const FontWeight = Extension.create<FontWeightOptions>({
  name: 'fontWeight',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultWeight: '400',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontWeight: {
            default: null,
            parseHTML: (element) => element.style.fontWeight.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontWeight) {
                return {};
              }

              return {
                style: `font-weight: ${attributes.fontWeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontWeight:
        (fontWeight) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontWeight }).run();
        },
      unsetFontWeight:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontWeight: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
