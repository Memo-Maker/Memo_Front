
// Edit.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';

const Container = styled.div`
  width: 100%;
  max-height: 40vh; /* 최대 높이 설정 */
  margin: 0 auto;
  border: 1px solid #ff0000;
  border-radius: 12px;
  background-color: #ffffff;
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const Toolbar = styled.div`
  display: flex;
  gap: 4px; /* 버튼간의 간격 */
  background-color: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
`;

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 4vw;
  height: 3.5vh;
  background: none;
  border: none;
  border-radius: 8px;
  color: #1f2937;
  font-size: 1.2vw;
  font-weight: 500;
  text-transform: uppercase;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d1d5db;
  }
  &:active {
    background-color: #9ca3af;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
const EditorField = styled.div`
  padding: 8px;
  min-height: 280px;
  background-color: #e4cfcf;
  .tiptap ul p,
  .tiptap ol p {
    display: inline;
  }
  .tiptap p.is-editor-empty:first-child::before {
    content: attr(placeholder);
    float: left;
    height: 10;
    color: #0e5ce2;
    background-color: #4c00ff;
  }
`;
const Edit = ({ setHtmlContent, initialContent }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Editor({
      element: editorRef.current,
      extensions: [
        Placeholder.configure({
          placeholder: 'Play around with the editor...',
          emptyNodeClass: 'text-gray-600',
          width: '100%',
          height: '100%'
        }),
        StarterKit.configure({

        }),
        Paragraph.configure({
          HTMLAttributes: {
          class: 'text-gray-600 bg-blue-100', // 배경색을 추가한 클래스
          style: 'width: 20vw; height: 2vh; line-height: 1.2; margin: 0; padding: 0.2vw; border: 1px solid transparent;', // 너비, 높이, 줄간격, 여백 및 테두리 설정
          },
          })
        
        
        ,
        Bold.configure({
          HTMLAttributes: {
            class: 'font-bold',
          },
        }),
        Underline,
        Link.configure({
          HTMLAttributes: {
            class:
              'inline-flex items-center gap-x-1 text-blue-500 decoration-2 hover:underline font-medium',
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc list-inside text-gray-800',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal list-inside text-gray-800',
          },
        }),
        Blockquote.configure({
          HTMLAttributes: {
            class: 'text-gray-800 sm:text-xl',
          },
        }),
      ],
      content: initialContent, // 초기 콘텐츠 설정
      onUpdate({ editor }) {
        setHtmlContent(editor.getHTML()); // 콘텐츠가 업데이트될 때마다 콜백 호출
      },
    });
    const actions = [
      { id: 'data-hs-editor-bold', fn: () => editor.chain().focus().toggleBold().run() },
      { id: 'data-hs-editor-italic', fn: () => editor.chain().focus().toggleItalic().run() },
      { id: 'data-hs-editor-underline', fn: () => editor.chain().focus().toggleUnderline().run() },
      { id: 'data-hs-editor-strike', fn: () => editor.chain().focus().toggleStrike().run() },
      { id: 'data-hs-editor-link', fn: () => {
          const url = window.prompt('URL');
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
      },
      { id: 'data-hs-editor-ol', fn: () => editor.chain().focus().toggleOrderedList().run() },
      { id: 'data-hs-editor-ul', fn: () => editor.chain().focus().toggleBulletList().run() },
      { id: 'data-hs-editor-blockquote', fn: () => editor.chain().focus().toggleBlockquote().run() },
      { id: 'data-hs-editor-code', fn: () => editor.chain().focus().toggleCode().run() },
    ];
    actions.forEach(({ id, fn }) => {
      const button = document.querySelector(`[${id}]`);
      if (button) {
        button.addEventListener('click', fn);
      }
    });
    return () => editor.destroy();
  }, [editorRef.current]);

  return (
    <Container>
      <Toolbar>
        <Button type="button" data-hs-editor-bold>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11.6667H8M12 11.6667C12 11.6667 15.3333 11.6667 15.3333 8.33333C15.3333 5.00002 12 5 12 5C12 5 12 5 12 5H8.6C8.26863 5 8 5.26863 8 5.6V11.6667M12 11.6667C12 11.6667 16 11.6667 16 15.3333C16 19 12 19 12 19C12 19 12 19 12 19H8.6C8.26863 19 8 18.7314 8 18.4V11.6667" stroke="currentColor" strokeWidth="1.5"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-italic>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L14 5M17 5L14 5M14 5L10 19M10 19L7 19M10 19L13 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-underline>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5V11C16 13.2091 14.2091 15 12 15V15C9.79086 15 8 13.2091 8 11V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M6 19L18 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-strike>
          <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M16.2857 3L10.068 3C7.82129 3 6 4.82129 6 7.06797C6 8.81895 7.12044 10.3735 8.78157 10.9272L12 12M6 21H13.932C16.1787 21 18 19.1787 18 16.932C18 16.2409 17.8255 15.5804 17.512 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-link>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.37089 7 7.88757 7.07803 7.42345 7.22794M9.70711 14.2929C8.42122 15.5788 6.51197 15.5788 5.22608 14.2929C3.94019 13.007 3.94019 11.0977 5.22608 9.81185M7.42345 7.22794C8.05672 6.91826 8.81836 6.7938 9.60773 7.03597M16.5848 9.00991C17.4703 9.35158 18.1074 10.0772 18.3535 10.9659M9.70711 14.2929C10.5118 15.0976 11.7386 15.2912 12.7071 14.7929M19.7683 13.9802C20.0564 13.2058 20.0576 12.2743 19.7684 11.4999C19.3013 10.1605 18.0763 9.23631 16.6317 9.00991M12.7071 14.7929C12.0433 15.1257 11.3198 15.1914 10.6464 14.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ol>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8 18L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 7H5L3 9H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3.5 17L4 16C4.5 15 3.5 14 3 14C2.5 14 2 14.5 2 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 11H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ul>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M8 18L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 6.5H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 12.5H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 18.5H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-blockquote>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.5C6 8.39543 6.89543 7.5 8 7.5C9.10457 7.5 10 8.39543 10 9.5C10 10.3284 9.32843 11 8.5 11H7.5C6.67157 11 6 11.6716 6 12.5V15.5M16 9.5C16 8.39543 16.8954 7.5 18 7.5C19.1046 7.5 20 8.39543 20 9.5C20 10.3284 19.3284 11 18.5 11H17.5C16.6716 11 16 11.6716 16 12.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-code>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M7 10L4 12L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M17 10L20 12L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
      </Toolbar>
      <EditorField ref={editorRef} className="tiptap" placeholder="Start typing..." />
    </Container>
  );
};
export default Edit;
