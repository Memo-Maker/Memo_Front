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
  z-index: 98;
  overflow-y: auto;
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
  max-height: 25vh;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a7a7a7;
    border-radius: 1vw;
    margin-right: 5%;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #646464;
  }
`;

const CategoryImage = styled.img`
  width: 2vw;
  margin-right: 1vw;
`;

const Category = styled.button`
  width: 80%;
  height: 3vw; /* 카테고리 상자의 높이를 고정값으로 설정 */
  display: flex;
  padding: 0.3vw 1vw;
  align-items: center;
  font-size: 1rem;
  text-align: start;
  border-radius: 0.5vw;
  border: 0.1vw solid #838383;
  cursor: pointer;
  overflow: hidden; /* 텍스트가 넘칠 경우 숨김 처리 */
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 처리 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 생략 부호(...) 처리 */

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 0.2vw solid #646464;
      background-color: #bababa;
      opacity: 0.9;
    `}

  /* 텍스트 축소 스타일 */
  transform-origin: left; /* 축소 중심점 설정 */
  transform: scale(
    ${({ scale }) => scale || 1}
  ); /* scale 속성을 props로 전달 */

  /* 기본 폰트 크기가 1rem일 때, 텍스트 길이에 따라 폰트 크기를 조절합니다. */
  transition: transform 0.3s ease-in-out; /* 애니메이션 효과 추가 */
`;


const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 50%;
  font-size: 0.9rem;
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 1vw;
  margin: 0 0 1vw 6vw;
  border-radius: 1vw;
`;

const AddButton = styled.button`
  margin: 0 0 1vw 1vw;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 2vw;
  }
`;

const ConfirmButton = styled.button`
  width: 6vw;
  margin: 0 1vw 1vw 1vw;
  border-radius: 1vw;
  font-weight: 600;
  color: #fff;
  background-color: #000000;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #b8b8b8;
  }
`;

const DeleteButton = styled.button`
  width: 6vw;
  margin: 0 6vw 1vw 0;
  border-radius: 1vw;
  font-weight: 600;
  background-color: #ff3b30;
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log("선택된 카테고리:", category);
  };

 const handleCategoryRightClick = () => {
   if (selectedCategory) {
     const confirmDelete = window.confirm(
       `${selectedCategory}을(를) 삭제하시겠습니까?`
     );
     if (confirmDelete) {
       // 로컬 스토리지에서도 해당 카테고리 삭제
       const updatedCategoryList = categoryList.filter(
         (category) => category !== selectedCategory
       );
       localStorage.setItem("categoryList", updatedCategoryList.join(", "));

       setCategoryList(updatedCategoryList);
       setSelectedCategory(null);
       console.log(`${selectedCategory} 삭제됨`);
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
      setCategoryList(storedCategoryList.split(", "));
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
        <CloseButton onClick={closeModal}>X</CloseButton>
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
            <AddButton onClick={handleAddContent}>
              <img src={addImg} alt="Add" />
            </AddButton>
            <ConfirmButton onClick={handleSave}>확인</ConfirmButton>
            <DeleteButton onClick={handleCategoryRightClick}>삭제</DeleteButton>
          </ButtonSet>
        </ModalContent>
      </ModalWrapper>
    </ModalBackdrop>
  );
};

export default SaveModal;
