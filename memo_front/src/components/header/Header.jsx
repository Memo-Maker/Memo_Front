import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Search from "../../assets/images/search.png";
import Profile from "../../assets/images/profile.png";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태(state)

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
        {isLoggedIn ? (
          <ProfileTitle>
            <ProfileImage src={Profile} alt="Profile" />
          </ProfileTitle>
        ) : (
          <ProfileTitle>
            <Link to="/login">
              <Button onClick={() => setIsLoggedIn(true)}>로그인하기</Button>
            </Link>
          </ProfileTitle>
        )}
      </Right>
    </HeaderContainer>
  );
}

export default Header;
