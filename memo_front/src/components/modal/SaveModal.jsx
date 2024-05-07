import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components"; // 스타일 컴포넌트 라이브러리를 가져옴
import addImg from "../../assets/images/add.png";

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
// 스타일 컴포넌트를 사용하여 모달 스타일을 정의
const ModalWrapper = styled.div`
  /* 모달 스타일을 여기에 정의합니다. */
  position: fixed;
  width: 40%;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  /* padding: 20px; */
  border-radius: 8px;
  z-index: 99; /* 모달의 z-index를 높은 값으로 설정하여 화면의 제일 위에 표시 */
`;

const SaveText = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  color: #000000;
  /* 폰트 크기를 모달의 크기에 따라 동적으로 조절합니다. */
  ${({ modalWidth, modalHeight }) => css`
    font-size: ${Math.min(modalWidth, modalHeight) * 0.05}px;
    text-align: center; /* 가운데 정렬 */
    font-weight: bold; /* 글자를 bold로 설정 */
  `}
`;

const CloseButton = styled.span`
  /* 닫기 버튼 스타일을 여기에 정의합니다. */
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
const ButtonSet = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextInput = styled.input`
  /* 입력 필드 스타일을 여기에 정의합니다. */
  width: 55%;
  padding: 10px;
  margin-left: 4%;
  margin-bottom: 10px;
  border-radius: 8px;
`;

// 이미지 버튼 스타일 정의
const AddButton = styled.button`
  width: 1%;
  margin-bottom: 10px;
  margin-right: 14%;
  border: none; // border 제거
  background: none; // 배경 제거
  cursor: pointer; // 커서 모양 변경

  img {
    width: 3vw; // 이미지의 너비 조절
  }
`;

const ConfirmButton = styled.button`
  /* 확인 버튼 스타일을 여기에 정의합니다. */
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

  const handleAddContent = () => {
    // 추가 기능 구현
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
  }, []);

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalWrapper className="modal" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <SaveText modalWidth={modalSize.width} modalHeight={modalSize.height}>
          폴더에 저장해보세요!
        </SaveText>



        <ModalContent>
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
