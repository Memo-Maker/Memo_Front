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
  margin: 0;
  border: 1px solid #727272;
  border-radius: 12px;
  background-color: #ffffff;
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const Toolbar = styled.div`
  display: flex;
  width:100%;
  gap: 4px; /* 버튼간의 간격 */
  background-color: #d8d8d8;
  padding: 4px;
  border-radius: 8px;
  justify-content: center;
`;

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 9vw;
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
  /* padding: 0px; */
  padding: 0.2vw;
  width: 100%;
  min-height: 28vh;
  background-color: #ffffff;
  .tiptap ul p,
  .tiptap ol p {
    display: inline;
  }
`;

const EmptyEditorPlaceholder = styled.p`
  width: 100%;
  height: 100%;
  &::before {
    content: attr(placeholder);
    float: left;
    width: 38vw;
    height: 20vh;
    border: 1px solid #00ff0d;

  }
  &:hover::before {
    border: 1px solid #fffb00;
    width: 100%;
    height: 100%;

  }
`;

const HoverEffect = styled.div`
  .text-gray-600.bg-blue-100:hover {
    border: 2px solid transparent; /* 테두리 설정을 2px로 변경 */
    transition: border-color 0.2s; /* 테두리 색상 전환 애니메이션 */
  }
`;

const Edit = ({ setHtmlContent, initialContent, setCharCount }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Editor({
      element: editorRef.current,
      extensions: [
        Placeholder.configure({
          placeholder: 'Play around with the editor...',
          emptyNodeClass: 'text-gray-600',
        }),
        StarterKit.configure({}),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-gray-600 bg-blue-100',
            style: 'width: 95vw; height: 2vh; line-height: 1.3; margin-top: 1px; padding: 0.2vw; border: 1px solid transparent;',
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
            class: 'inline-flex items-center gap-x-1 text-blue-500 decoration-2 hover:underline font-medium',
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
        setCharCount(editor.getText().length); // 글자 수 업데이트
      },
    });

    // 이전에 입력한 내용의 마지막 부분으로 이동하는 기능 추가
    editor.on('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 키 동작 방지
        const { selection } = editor.state;
        if (selection && selection.anchor) {
          const lastNode = editor.state.doc.lastChild; // 마지막 노드 가져오기
          editor.commands.insertContentAt(selection.anchor, '\n'); // 엔터를 현재 커서 위치에 삽입
          editor.setSelection(lastNode.nodeSize - 1); // 마지막 노드의 끝으로 커서 이동
        }
      }
    });

    // 에디터가 초기화될 때 초기 컨텐츠의 글자 수 설정
    setCharCount(editor.getText().length);

    const actions = [
      { id: 'data-hs-editor-bold', fn: () => editor.chain().focus().toggleBold().run() },
      { id: 'data-hs-editor-italic', fn: () => editor.chain().focus().toggleItalic().run() },
      { id: 'data-hs-editor-underline', fn: () => editor.chain().focus().toggleUnderline().run() },
      { id: 'data-hs-editor-strike', fn: () => editor.chain().focus().toggleStrike().run() },
      {
        id: 'data-hs-editor-link', fn: () => {
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
      // 클린업 함수에서 editorRef.current가 존재하는지 확인
      if (editorRef.current) {
        editorRef.current.removeEventListener('click', handleClick);
      }
      // 에디터 인스턴스 파괴
      editor.destroy();
    };
  }, [editorRef.current, setCharCount]);

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
            <path d="M11 5L14 5M17 5L14 5M14 5L10 19M14 5L12 12M12 12L15 12M12 12H8M12 12L13 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-underline>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V11C8 11 8 14 12 14C16 14 16 11 16 11V5M5 19H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-strike>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9.49995C20 8.99995 20 8.2 19 7.5C17 6.2 14 6 12 6C10 6 7 6.2 5 7.5C4 8.2 4 8.99995 4 9.49995M9 11.5H15M20 14.5C20 15 20 15.8 19 16.5C17 17.8 14 18 12 18C10 18 7 17.8 5 16.5C4 15.8 4 15 4 14.5M9 12.5H15" stroke="currentColor" strokeWidth="1.5"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-link>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14C10.8284 14.8284 12.1716 14.8284 13 14L16.8284 10.1716C17.6569 9.34315 17.6569 8 16.8284 7.17157C16 6.34315 14.6569 6.34315 13.8284 7.17157L12 9M12 15L7.17157 19.8284C6.34315 20.6569 5 20.6569 4.17157 19.8284C3.34315 19 3.34315 17.6569 4.17157 16.8284L8 13C8.82843 12.1716 10.1716 12.1716 11 13M11 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ol>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6H21M8 12H21M8 18H21M3 17.5V17C3 16.1716 3.67157 15.5 4.5 15.5C5.32843 15.5 6 16.1716 6 17V17.5C6 18.3284 5.32843 19 4.5 19H4M4.5 19V21.5M4.5 21.5H3M4.5 21.5H6M3 7H5L3 10H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-ul>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6H21M8 12H21M8 18H21M4 6H4.01M4 12H4.01M4 18H4.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-blockquote>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18H5.6C5.26863 18 5 17.7314 5 17.4V14.6C5 14.2686 5.26863 14 5.6 14H7C7.82843 14 8.5 13.3284 8.5 12.5V11.5C8.5 10.6716 7.82843 10 7 10H5.6C5.26863 10 5 9.73137 5 9.4V7.6C5 7.26863 5.26863 7 5.6 7H7C8.65685 7 10 8.34315 10 10V12C10 13.6569 8.65685 15 7 15M19 18H17.6C17.2686 18 17 17.7314 17 17.4V14.6C17 14.2686 17.2686 14 17.6 14H19C19.8284 14 20.5 13.3284 20.5 12.5V11.5C20.5 10.6716 19.8284 10 19 10H17.6C17.2686 10 17 9.73137 17 9.4V7.6C17 7.26863 17.2686 7 17.6 7H19C20.6569 7 22 8.34315 22 10V12C22 13.6569 20.6569 15 19 15" stroke="currentColor" strokeWidth="1.5"></path>
          </svg>
        </Button>
        <Button type="button" data-hs-editor-code>
          <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6L9 18M9 13L5 9M9 13L5 17M15 13L19 9M15 13L19 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
      </Toolbar>
      <HoverEffect>
        <EditorField className="tiptap" ref={editorRef} />
      </HoverEffect>
    </Container>
  );
};

export default Edit;
