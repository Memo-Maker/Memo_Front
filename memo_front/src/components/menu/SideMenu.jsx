// SideMenu 컴포넌트

import React from "react";
import styled from "styled-components";

const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-300px")}; /* isOpen 상태에 따라 오른쪽으로 들어옴/나감 */
  width: 300px; /* 사이드바의 너비 설정 */
  height: 100%;
  background-color: #ffffff; /* 사이드바의 배경색 설정 */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* 사이드바에 그림자 효과 추가 */
  z-index: 999; /* 사이드바가 위에 나타나도록 설정 */
  padding-top: 60px; /* 사이드바 내용의 상단 여백 설정 */
  transition: left 0.3s ease; /* 오2른쪽으로 이동하는 애니메이션 효과 */
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

const MenuItem = styled.div`
  border-radius: 10px; /* 둥근 네모 모양의 버튼으로 만들기 위해 border-radius 값을 조정합니다. */
  padding: 20px;
  border: 1px solid transparent; /* 테두리를 추가하여 버튼처럼 보이도록 설정합니다. */
  border-bottom: 1px solid #f0f0f0; /* 각 메뉴 사이에 구분선 추가 */
  cursor: pointer; /* 마우스 포인터를 올렸을 때 버튼임을 나타내기 위해 커서 모양을 변경합니다. */
  transition: background-color 0.3s; /* 배경색 변경에 대한 애니메이션 효과를 추가합니다. */

  &:hover {
    background-color: #f0f0f0; /* 마우스를 올렸을 때 배경색 변경을 위한 스타일을 추가합니다. */
  }
`;


const SideMenu = ({ isOpen, onClose }) => {
  return (
    <SideMenuContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <MenuItem>최근에 본 영상</MenuItem>
      <MenuItem>메뉴 항목 1</MenuItem>
      <MenuItem>메뉴 항목 2</MenuItem>
      <MenuItem>메뉴 항목 3</MenuItem>
      {/* 필요한 만큼 메뉴 항목을 추가할 수 있습니다. */}
    </SideMenuContainer>
  );
};

export default SideMenu;
