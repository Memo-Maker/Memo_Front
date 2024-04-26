// ProfileModal.jsx

import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

function ProfileModal({ closeModal }) {
  const { user, logout } = useAuth();

  // 로그아웃 함수
  const handleLogout = () => {
    logout();
    closeModal();
  };

  // 모달 배경 클릭 시 닫기
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContent>
        {/* 사용자 정보 표시 */}
        <UserInfo>
          <p>사용자 이름: {user && user.name}</p>
        </UserInfo>
        {/* 로그아웃 버튼 */}
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ModalContent>
    </ModalBackground>
  );
}

export default ProfileModal;
