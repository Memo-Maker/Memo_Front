// Header.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Search from "../../assets/images/search.png";
import Profile from "../../assets/images/profile.png";
import MyModal from "../modal/MyInfomation"; // 모달 컴포넌트를 import합니다.

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vw 2vw;
`;

const Left = styled.div`
  display: flex;
  gap: 1vw;
`;

const Right = styled.div`
  display: flex;
  gap: 3vw;
`;

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HamburgerButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2vw;
`;

const SearchTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: auto;
  border-radius: 50%;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 1vw 2vw;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 0.4vw;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달이 열려있는지 여부를 저장하는 상태(state)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태(state)
  
  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 여부를 확인하여 상태를 설정합니다.
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true"); // "true" 문자열을 boolean 값으로 변환하여 설정합니다.
  }, []);

  // 모달을 열기 위한 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <HeaderContainer>
      <Left>
        <HamburgerButton>☰</HamburgerButton>
        <Link to="/">
          <LogoTitle>
            <img src={Logo} alt="Logo" />
          </LogoTitle>
        </Link>
      </Left>
      <Right>
        <SearchTitle>
          <img src={Search} alt="Search" />
        </SearchTitle>
        {/* isLoggedIn 상태에 따라 프로필 이미지 또는 로그인 버튼을 렌더링합니다. */}
        {isLoggedIn ? (
          <ProfileTitle>
            {/* 프로필 이미지를 클릭하면 openModal 함수를 호출하여 모달창을 엽니다. */}
            <ProfileImage src={Profile} alt="Profile" onClick={openModal} />
          </ProfileTitle>
        ) : (
          <ProfileTitle>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </ProfileTitle>
        )}
      </Right>
      {/* 모달창을 렌더링합니다. 모달이 열려있으면 MyModal 컴포넌트를 렌더링합니다. */}
      {isModalOpen && <MyModal closeModal={() => setIsModalOpen(false)} />}
    </HeaderContainer>
  );
}

export default Header;
