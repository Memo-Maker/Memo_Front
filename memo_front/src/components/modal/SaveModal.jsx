import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import addImg from "../../assets/images/add.png";
import { useAuth } from "../../context/AuthContext";
import Floder from "../../assets/images/floder.png";
import saveFileImage from "../../assets/images/savefile.png";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 98;
  overflow-y: auto; /* 추가: 세로 스크롤을 추가합니다. */
`;

const ModalWrapper = styled.div`
  position: fixed;
  width: 40%;
  //height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1vw;
  z-index: 99;
`;
const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1vw;
`;

const StyledImg = styled.img`
  width: 7%;
  margin-right: 0.5vw;
`;

const SaveText = styled.div`
  color: #000000;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const CloseButton = styled.span`
  display: flex;
  justify-content: flex-end;
  padding: 1vw 2vw 0 2vw;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #f0f0f0;
  border-radius: 1vw;
`;

const CategoryList = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1vw;
  margin: 1vw 5vw 2vw 5vw;
  overflow-y: auto; 
  max-height: 30vh;
`;

const Category = styled.button`
  width: 80%;
  display: flex;
  padding: 0.3vw 1vw;
  align-items: center;
  font-size: 1rem;
  text-align: start;
  border-radius: 0.5vw;
  border: 0.1vw solid #838383;
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const TextInput = styled.input`
  width: 50%;
  padding: 1vw;
  margin: 0 1vw 1vw 5vw;
  border-radius: 1vw;
`;

const AddButton = styled.button`
  margin: 0 1vw 1vw 1vw;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 2vw;
  }
`;

const ConfirmButton = styled.button`
  width: 8vw;
  padding: 1vw 1.5vw;
  margin: 0 5vw 1vw 1vw;
  border-radius: 2vw;
`;

const SaveModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [categoryList, setCategoryList] = useState([]);

  const { saveCategoryToLocal, saveCategoryToDB } = useAuth();

const handleAddContent = () => {
  saveCategoryToDB(content);
  saveCategoryToLocal(content);
  setCategoryList((prevList) => [...prevList, content]); 
  setContent("");
};

  const handleSave = () => {
    closeModal();
  };

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (modal) {
      const { offsetWidth, offsetHeight } = modal;
      setModalSize({ width: offsetWidth, height: offsetHeight });
    }

    // 모달이 열릴 때마다 로컬 스토리지에서 카테고리 리스트를 가져와 상태에 저장
    const storedCategoryList = localStorage.getItem("categoryList");
    if (storedCategoryList) {
      setCategoryList(storedCategoryList.split(", "));
    }
  }, []);

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalWrapper className="modal" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <SaveContainer>
          <StyledImg src={saveFileImage} alt="saveFileImage" />
          <SaveText modalWidth={modalSize.width} modalHeight={modalSize.height}>
            어느 폴더에 저장할까요?
          </SaveText>
        </SaveContainer>
        <ModalContent>
          <CategoryList>
            {/* 카테고리 리스트를 출력 */}
            {categoryList.map((category, index) => (
              <Category key={index}>
                <img src={Floder} alt="Folder" style={{ marginRight: "1vw" }} />
                {category}
              </Category>
            ))}
          </CategoryList>
          <ButtonSet>
            <TextInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
            <AddButton onClick={() => handleAddContent(content)}>
              <img src={addImg} alt="Add" />
            </AddButton>
            <ConfirmButton onClick={handleSave}>확인</ConfirmButton>
          </ButtonSet>
        </ModalContent>
      </ModalWrapper>
    </ModalBackdrop>
  );
};

export default SaveModal;
