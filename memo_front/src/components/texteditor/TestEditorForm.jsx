import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.5vw;
  padding: 1vw;
  width: 50%;
`;

// 상태 표시줄
const StatusBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ccc; /* 가로 선 추가 */
  padding-top: 0.5vw; /* 가로 선 위쪽 패딩 추가 */
`;

const MyBlock = styled.div` 
  .wrapper-class {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editor {
    height: 500px;
    border: 1px solid #f1f1f1;
    padding: 5px;
    border-radius: 2px;
  }
`;

const TestEditorForm = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const blocksFromHTML = convertFromHTML(savedContent);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    localStorage.setItem("editorContent", htmlContent);
    console.log(htmlContent);
  };

  // 타자를 칠 때마다 글자 수 업데이트
  const handleTextChange = (editorState) => {
    setEditorState(editorState);
    const plainText = editorState.getCurrentContent().getPlainText("");
    console.log("글자 수:", plainText.length);
  };

  return (
    <>
      <EditorContainer>
        <MyBlock>
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
            }}
            placeholder="필기하고 싶은 내용을 정리해주세요."
            localization={{
              locale: "ko",
            }}
            editorState={editorState}
            onEditorStateChange={handleTextChange} // 타자를 칠 때마다 호출될 핸들러 변경
          />
          <StatusBar>
            <div style={{ marginRight: "1vw"}}>
              글자 수: {editorState.getCurrentContent().getPlainText("").length}
            </div>
            <button onClick={saveContent}>저장하기</button>
          </StatusBar>
        </MyBlock>
      </EditorContainer>
    </>
  );
};

export default TestEditorForm;