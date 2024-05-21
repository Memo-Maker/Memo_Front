// Div.js
import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'div',

  defaultOptions: {
    HTMLAttributes: {},
  },

  content: 'block*',

  group: 'block',

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
