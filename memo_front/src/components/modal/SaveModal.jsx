import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import addImg from "../../assets/images/add.png";
import { useAuth } from "../../context/AuthContext";

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
`;

const ModalWrapper = styled.div`
  position: fixed;
  width: 40%;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  z-index: 99;
`;

const SaveText = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  color: #000000;
  ${({ modalWidth, modalHeight }) => css`
    font-size: ${Math.min(modalWidth, modalHeight) * 0.05}px;
    text-align: center;
    font-weight: bold;
  `}
`;

const CloseButton = styled.span`
  position: absolute;
  background-color: #ffa2a2;
  padding: 2%;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 80%;
  background-color: #d9d9d9;
`;

const CategoryList = styled.div`
  background-color: #000000;
  color: #ffffff;
  padding: 10px;
`;

const Category = styled.div`
  background-color: #4883d0;
  color: #ffffff;
  border-radius: 2px;
`;

const ButtonSet = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextInput = styled.input`
  width: 55%;
  padding: 10px;
  margin-left: 4%;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const AddButton = styled.button`
  width: 1%;
  margin-bottom: 10px;
  margin-right: 14%;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 3vw;
  }
`;

const ConfirmButton = styled.button`
  width: 25%;
  padding: 10px 20px;
  margin-right: 4%;
  margin-bottom: 10px;
  background-color: #73e279;
  border-radius: 1vw;
`;

const SaveModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [categoryList, setCategoryList] = useState([]);

  const { saveCategoryToLocal, saveCategoryToDB } = useAuth();

  const handleAddContent = () => {
    saveCategoryToDB(content);
    saveCategoryToLocal(content);
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
        <SaveText modalWidth={modalSize.width} modalHeight={modalSize.height}>
          폴더에 저장해보세요!
        </SaveText>
        <ModalContent>
        <CategoryList>
            {/* 카테고리 리스트를 출력 */}
            {categoryList.map((category, index) => (
              <Category key={index}>{category}</Category>
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
