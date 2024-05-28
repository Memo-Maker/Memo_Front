
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import SaveModal from "../modal/MobileSaveModal";
import MobileEdit from "./MobileEdit";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 0.1vw solid #ccc; */
  border-radius: 0.3vw;
  padding: 0.5vw;
  width: 95%;
`;

const MyBlock = styled.div`
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
  }
  .editor {
    height: 60vw;
    border: 0.1vw solid #f1f1f1;
    padding: 0.5vw;
  }
`;

const Button = styled.button`
  background-color: #4b4c4c;
  color: #fff;
  cursor: pointer;
  padding: 1vw 1.5vw;
  border-radius: 0.5vw;
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
  padding: 1vw 1.5vw;
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
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
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
    console.log(htmlContent);
  };
  const handleFolderButtonClick = () => {
    localStorage.setItem("document", htmlContent); // 현재 내용 로컬 스토리지에 저장
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <EditorContainer>
        <MyBlock>
        <MobileEdit setHtmlContent={setHtmlContent} initialContent={htmlContent} setCharCount={setCharCount} /> {/* Edit 컴포넌트에 props 전달 */}
          <StatusBar>
            <FolderContainer>
              {/* FolderButton의 텍스트를 selectedCategory로 조건부 렌더링 */}
              <FolderButton onClick={handleFolderButtonClick}>
              {(selectedCategory || selectedCategory==="최근 본 영상") ? selectedCategory : "폴더 선택"}
              </FolderButton>
              {/* 선택된 카테고리가 있을 때만 표시 */}
              {/* {selectedCategory && <span>에 저장됨</span>} */}
            </FolderContainer>

            <TextInfoContainer>
              <TextInfo>
              글자 수: {charCount}
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
