import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import addImg from "../../assets/images/add.png";
import { useAuth } from "../../context/AuthContext";
import Floder from "../../assets/images/macos_folder.png";
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
  z-index: 9998;
  overflow-y: auto;
`;

const ModalWrapper = styled.div`
  position: fixed;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1vw;
  z-index: 9999;
`;

const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3vw;
`;

const StyledImg = styled.img`
  width: 7%;
  margin-right: 0.5vw;
`;

const SaveText = styled.div`
  color: #000000;
  font-size: 5vw;
  text-align: center;
  font-weight: bold;
  font-family: KCC-Hanbit;
`;

const CloseButton = styled.span`
  display: flex;
  justify-content: flex-end;
  padding: 1vw 2vw 0 2vw;
  font-size: 5vw;
  font-weight: bold;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  height: 40vh;
  flex-direction: column;
  overflow-y: auto;
  background-color: #f0f0f0;
  border-radius: 1vw;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  margin: 2vw 5vw;
  overflow-y: auto;
  background-color: #f0f0f0;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a7a7a7;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #646464;
  }
`;

const CategoryImage = styled.img`
  width: 4vw;
  margin-right: 1vw;
`;

const Category = styled.button`
  width: 80%;
  height: 10vw;
  display: flex;
  padding: 2vw 2vw;
  margin-top: 3vw;
  align-items: center;
  color: #000000;
  font-size: 3.5vw;
  text-align: start;
  border-radius: 2vw;
  border: 0.5vw solid #838383;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 0.3vw solid #646464;
      background-color: #d2e5ff;
      opacity: 0.9;
    `}

  transform-origin: left;
  transform: scale(${({ scale }) => scale || 1});

  transition: transform 0.3s ease-in-out;
`;

const ButtonSet = styled.div`
  height: 12%;
  display: flex;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 45%;
  font-size: 2.5vw;
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 1vw;
  margin: 1vw 0 1vw 4vw;
  border-radius: 1vw;
  border: 0.1vw solid #000000;
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  margin: 1vw 1vw 1vw 1vw;
  border-radius: 2vw;
  border: ${({ hasImage }) => (hasImage ? "none" : "0.2vw solid #eeda25")};
  font-weight: bold;
  font-size: 2.4vw;
  cursor: pointer;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#f0f0f0")};

  img {
    width: 6vw;
  }

  &:not(:has(img)) {
    &:hover {
      background-color: ${({ disabled }) => (disabled ? "#c2c2c2" : "#c2bd80")};
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const EditButton = styled(AddButton)`
  font-size: 2.4vw;
  margin-left: 1vw;
  background-color: #ffc107;
  border: none;
  color: #000;
`;

const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  margin: 1vw 1vw 1vw 0.5vw;
  border-radius: 2vw;
  border: 0.2vw solid #000000;
  font-weight: bold;
  font-size: 2.5vw;
  color: #000000;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #b8b8b8;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  margin: 1vw 4vw 1vw 0.5vw;
  border-radius: 2vw;
  border: 0.2vw solid #ff0000;
  font-weight: bold;
  font-size: 2.5vw;
  color: #000000;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff0000;
    color: #fff;
  }
`;

const SaveModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    saveCategoryToLocal,
    saveCategoryToDB,
    saveVideoToCategory,
    updateCategoryName,
    deleteCategory,
  } = useAuth();

  const handleAddContent = () => {
    if (isEditMode) {
      handleEditContent();
    } else {
      handleAddNewContent();
    }
  };

  const handleEditContent = () => {
    if (selectedCategory) {
      // 수정 전 카테고리명과 수정 후 카테고리명을 updateCategoryName 함수에 전달하여 호출
      updateCategoryName(selectedCategory, content);

      const updatedCategoryList = categoryList.map((category) =>
        category === selectedCategory ? content : category
      );
      localStorage.setItem("categoryList", JSON.stringify(updatedCategoryList));
      setCategoryList(updatedCategoryList);
      setSelectedCategory(null);
      setIsEditMode(false);
    }
  };

  const handleAddNewContent = () => {
    saveCategoryToDB(content);
    saveCategoryToLocal(content);
    setCategoryList((prevList) => [...prevList, content]);
    setContent("");
  };

  const handleSave = () => {
    saveVideoToCategory(selectedCategory);
    localStorage.setItem("categoryName", selectedCategory)
    // window.location.reload();
    closeModal();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setContent(category);
    setIsEditMode(true);
  };

  const handleCategoryRightClick = () => {
    if (selectedCategory) {
      const confirmDelete = window.confirm(
        `${selectedCategory}을(를) 삭제하시겠습니까?`
      );
      if (confirmDelete) {
        deleteCategory(selectedCategory);
        // 로컬 스토리지에서도 해당 카테고리 삭제
        const updatedCategoryList = categoryList.filter(
          (category) => category !== selectedCategory
        );
        localStorage.setItem(
          "categoryList",
          JSON.stringify(updatedCategoryList)
        );
        setCategoryList(updatedCategoryList);
        setSelectedCategory(null);
        setIsEditMode(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 8) {
      setContent(inputValue);
    } else {
      alert("카테고리는 8글자 이하로 입력해주세요.");
    }
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
      // 로컬 스토리지에서 가져온 문자열을 JSON.parse 메서드를 사용하여 배열로 파싱합니다.
      setCategoryList(JSON.parse(storedCategoryList));
    }
  }, []);

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalWrapper
        className="modal"
        onMouseDown={(e) => {
          if (e.button === 2) {
            handleCategoryRightClick();
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={closeModal}>Ⅹ</CloseButton>
        <SaveContainer>
          <StyledImg src={saveFileImage} alt="saveFileImage" />
          <SaveText modalWidth={modalSize.width} modalHeight={modalSize.height}>
            어느 폴더에 저장할까요?
          </SaveText>
        </SaveContainer>
        <ModalContent>
          <CategoryList>
            {categoryList.map((category, index) => (
              <Category
                key={index}
                onClick={() => handleCategoryClick(category)}
                isSelected={selectedCategory === category}
              >
                <CategoryImage src={Floder} alt="Folder" />
                {category}
              </Category>
            ))}
          </CategoryList>
          <ButtonSet>
            <TextInput
              type="text"
              value={content}
              onChange={handleInputChange}
              placeholder="추가할 폴더명을 입력해주세요."
            />
            {/* isEditMode에 따라 AddButton 또는 EditButton을 렌더링 */}
            {isEditMode ? (
              <EditButton onClick={handleAddContent}>수정</EditButton>
            ) : (
              <AddButton
                onClick={handleAddContent}
                hasImage={!isEditMode}
                disabled={!content.trim()}
              >
                <img src={addImg} alt="Add" />
              </AddButton>
            )}
            <ConfirmButton onClick={handleSave}>확인</ConfirmButton>
            <DeleteButton onClick={handleCategoryRightClick}>삭제</DeleteButton>
          </ButtonSet>
        </ModalContent>
      </ModalWrapper>
    </ModalBackdrop>
  );
};

export default SaveModal;
