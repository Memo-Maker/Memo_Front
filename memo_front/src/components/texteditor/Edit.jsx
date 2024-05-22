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
    content: attr(placeholder); // placeholder 속성의 값을 콘텐츠로 표시
    float: left; // 왼쪽으로 정렬
    width: 100%; // 너비 설정
    height: 20vh; // 높이 설정
    background-color: #582fff; // 배경색 설정
  }

  .tiptap p.is-editor-empty {
    border: 1px solid #000; // 테두리 설정
    background-color: #f0f0f0; // 배경색 설정
  }

  .tiptap p.is-editor-empty:hover::before { /* 마우스 호버시 효과 */
    border: 1px solid #000; // 호버 시 테두리 설정
    width: 100%; // 호버 시 너비 설정
    height: 20vh; // 호버 시 높이 
    background-color: #a4a4a4; // 배경색 설정
  }
`;

const HoverEffect = styled.div`
  .text-gray-600.bg-blue-100:hover {
    border: 2px solid transparent; /* 테두리 설정을 2px로 변경 */
    transition: border-color 0.2s; /* 테두리 색상 전환 애니메이션 */
    border-color: #000; /* 마우스 호버 시 테두리 색상 변경 */
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
        StarterKit.configure({}),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-gray-600 bg-blue-100',
            style: 'width: 20vw; height: 2vh; line-height: 1.2; margin: 0; padding: 0.2vw; border: 1px solid transparent;',
          },
        }),
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
      content: initialContent,
      onUpdate({ editor }) {
        setHtmlContent(editor.getHTML());
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

    const handleClick = (e) => {
      if (e.target === editorRef.current) {
        editor.chain().focus().run();
      }
    };

    editorRef.current.addEventListener('click', handleClick);

    return () => {
      editor.destroy();
      editorRef.current.removeEventListener('click', handleClick);
    };
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
            <path d="M8 5V10C8 12.2091 9.79086 14 12 14V14C14.2091 14 16 12.2091 16 10V5M6 19H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-strike>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9.35484C18 7.60435 16.2091 6.19355 14 6.19355M10 6.19355C8.34315 6.19355 7 7.35034 7 8.77419C7 11.5 10 12 12 12C14 12 17 12.5 17 15.2258C17 16.6497 15.6569 17.8065 14 17.8065M10 17.8065C7.79086 17.8065 6 16.3957 6 14.6452" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-link>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14C10.6215 14.6223 11.4307 15 12.3 15C13.1693 15 13.9785 14.6223 14.6 14L16.9 11.7C17.5215 11.0777 17.9 10.2685 17.9 9.39999C17.9 8.53151 17.5215 7.7223 16.9 7.09999C16.2777 6.47848 15.4685 6.09999 14.6 6.09999C13.7307 6.09999 12.9215 6.47848 12.3 7.09999L11.8 7.59999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 10C13.3785 9.37769 12.5693 9 11.7 9C10.8307 9 10.0215 9.37769 9.40002 10L7.10002 12.3C6.47851 12.9223 6.10002 13.7315 6.10002 14.6C6.10002 15.4685 6.47851 16.2777 7.10002 16.9C7.72154 17.5215 8.53074 17.9 9.40002 17.9C10.2693 17.9 11.0785 17.5215 11.7 16.9L12.2 16.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ol>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6H20M10 12H20M10 18H20M4 5.5L5 5V10M5 10H3M3 10V8.5M5 10V11M4 14H5.5C6 14 7 14 7 15C7 16 6 16 5.5 16H4.5M4 16V18M5 18V17.5M5 18C5 18 6 18 6 18.5C6 19 5.5 19.5 5 19.5C4.5 19.5 4 19 4 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ul>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6H20M10 12H20M10 18H20M5 6H5.01M5 12H5.01M5 18H5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-blockquote>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8.25H7.5C7.91421 8.25 8.25 8.58579 8.25 9V11.25C8.25 12.0784 7.57843 12.75 6.75 12.75H5.25V15H8.25M12 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9V11.25C15.25 12.0784 14.5784 12.75 13.75 12.75H12.25V15H15.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-code>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 8L18 12L14.5 16M9.5 8L6 12L9.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
      </Toolbar>
      <HoverEffect>
        <EditorField ref={editorRef} className="tiptap" />
      </HoverEffect>
    </Container>
  );
};

export default Edit;
