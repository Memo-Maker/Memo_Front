import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import SaveModal from "../modal/SaveModal";
import Edit from "./Edit";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1vw solid #ccc;
  border-radius: 0.5vw;
  padding: 0.5vw;
  width: 40%;
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
  color: #000000;
  cursor: pointer;
  padding: 0.7vw 1.3vw;
  border-radius: 0.5vw;
  border: 0.15vw solid #4b4c4c;
`;

const TextInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TextInfo = styled.div`
  margin-right: 1vw;
`;

const TextEditorForm = () => {
  const [charCount, setCharCount] = useState(0); // 글자 수 상태 추가
  const { saveContentToLocal, saveMarkdownToServer } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [htmlContent, setHtmlContent] = useState(""); // 새로운 상태 추가

  useEffect(() => {
    const savedContent = localStorage.getItem("document") || "";
    setHtmlContent(savedContent);
  }, []);
  
  useEffect(() => {
    const storedCategory = localStorage.getItem("categoryName");
    if (storedCategory !== "null") {
      setSelectedCategory(storedCategory);
    }
  }, []);

  const handleSaveContent = () => {
    saveContentToLocal(htmlContent);
    saveMarkdownToServer(htmlContent);
    
  };
  const handleFolderButtonClick = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <EditorContainer>
        <Edit setHtmlContent={setHtmlContent} initialContent={htmlContent} setCharCount={setCharCount} /> {/* Edit 컴포넌트에 props 전달 */}
        <StatusBar>
          <FolderContainer>
            <FolderButton onClick={handleFolderButtonClick}>
              {selectedCategory || selectedCategory === "최근 본 영상"
                ? selectedCategory
                : "폴더 선택"}
            </FolderButton>
          </FolderContainer>
          <TextInfoContainer>
            <TextInfo>
              글자 수: {charCount}
            </TextInfo>
            <Button onClick={handleSaveContent}>저장하기</Button>
          </TextInfoContainer>
        </StatusBar>
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
