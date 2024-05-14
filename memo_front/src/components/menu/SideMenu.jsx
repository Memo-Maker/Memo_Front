// SideMenu 컴포넌트

import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import folderIcon from "../../assets/images/macos_folder.png";

const SideMenuContainer = styled.div`
  position: fixed;
  bottom: ${({ isOpen }) =>
    isOpen ? "0" : "-100%"}; /* isOpen 상태에 따라 아래로 내려옴/올라감 */
  left: 0;
  width: 16%;
  height: 80%;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding-top: 60px;
  transition: bottom 0.3s ease; /* 아래쪽으로 이동하는 애니메이션 효과 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const StyledMenuItem = styled.div`
  display: flex;
  width: 80%;
  border-radius: 10px; /* 둥근 네모 모양의 버튼으로 만들기 위해 border-radius 값을 조정합니다. */
  margin: 1vw 0 1vw 1.2vw;
  padding: 1vw 0 1vw 0;
  border: 2px solid #d9d9d9; /* 테두리를 추가하여 버튼처럼 보이도록 설정합니다. */
  cursor: pointer; /* 마우스 포인터를 올렸을 때 버튼임을 나타내기 위해 커서 모양을 변경합니다. */
  transition: background-color 0.3s; /* 배경색 변경에 대한 애니메이션 효과를 추가합니다. */

  &:hover {
    background-color: #f0f0f0; /* 마우스를 올렸을 때 배경색 변경을 위한 스타일을 추가합니다. */
  }
`;
const Icon = styled.img`
  width: 1.5vw;
  margin-right: 1vw;
  margin-left: 1vw;
`;

const Text = styled.div`
  flex: 1; /* 텍스트가 남은 공간을 차지하도록 */
  text-align: start; /* 텍스트 중앙 정렬 */
`;

const SideMenu = ({ isOpen, onClose }) => {
  const categoryList = JSON.parse(localStorage.getItem("categoryList")) || []; // 로컬스토리지에서 카테고리 목록 가져오기
  const { getVideoList } = useAuth();

  const handleMenuItemClick = (category) => {
    onClose(); // 이동 후에 메뉴 닫기
    console.log("getVideoList(" + category + ") 실행 중...");
    getVideoList(category);
  };

  return (
    <SideMenuContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {categoryList.map((category, index) => (
        <StyledMenuItem
          key={index}
          onClick={() => handleMenuItemClick(category)}
        >
          <Icon src={folderIcon} alt="Folder Icon" />
          <Text>{category}</Text>
        </StyledMenuItem> // 각 카테고리에 대한 메뉴 항목 생성
      ))}
    </SideMenuContainer>
  );
};

export default SideMenu;
