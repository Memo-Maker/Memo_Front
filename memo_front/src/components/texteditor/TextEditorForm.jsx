import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useAuth } from "../../context/AuthContext";
import SaveModal from "../modal/SaveModal"; // SaveModal을 불러옵니다.

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1vw solid #ccc;
  border-radius: 0.5vw;
  padding: 0.5vw;
  width: 40%;
`;

const MyBlock = styled.div`
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
  }
  .editor {
    height: 30vw;
    border: 0.1vw solid #f1f1f1;
    padding: 0.5vw;
  }
`;

const Button = styled.button`
  background-color: #4b4c4c;
  color: #fff;
  cursor: pointer;
  padding: 0.7vw 1.3vw;
  border-radius: 0.2vw;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  border-top: 0.1vw solid #ccc;
  padding-top: 0.5vw;
`;

const FolderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FolderButton = styled.button`
  background-color: #4b4c4c;
  color: #fff;
  cursor: pointer;
  padding: 0.7vw 1.3vw;
  border-radius: 0.5vw;
`;

const TextInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TextInfo = styled.div`
  margin-right: 1vw;
`;

const TextEditorForm = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { saveContentToLocal, saveMarkdownToServer } = useAuth();
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    let savedContent = localStorage.getItem("document");

    // 만약 가져온 document 값이 null이라면 빈 문자열로 대체합니다.
    savedContent = (savedContent == null) ? "" : savedContent;
  
    const blocksFromHTML = convertFromHTML(savedContent);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, []);
  

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSaveContent = () => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    saveContentToLocal(htmlContent);
    saveMarkdownToServer(htmlContent);
    console.log(htmlContent);
    // setShowModal(true); // 모달 열기
  };

  // 폴더 선택하기 버튼 클릭 시 모달 열기
  const handleFolderButtonClick = () => {
    setShowModal(true);
  };

  

  // 타자를 칠 때마다 글자 수 업데이트
  const handleTextChange = (editorState) => {
    setEditorState(editorState);
    const plainText = editorState.getCurrentContent().getPlainText("");
    console.log("글자 수:", plainText.length);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
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
            <FolderContainer>
              <FolderButton onClick={handleFolderButtonClick}>
                폴더 선택
              </FolderButton>
              {selectedCategory && <span>{selectedCategory}</span>}
            </FolderContainer>
            <TextInfoContainer>
              <TextInfo>
                글자 수:{" "}
                {editorState.getCurrentContent().getPlainText("").length}
              </TextInfo>
              <Button onClick={handleSaveContent}>저장하기</Button>
            </TextInfoContainer>
          </StatusBar>
        </MyBlock>
      </EditorContainer>
      {showModal && (
        <SaveModal
          closeModal={closeModal}
          handleCategoryClick={setSelectedCategory}
        />
      )}
    </>
  );
};

export default TextEditorForm;
