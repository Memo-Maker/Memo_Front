import React from "react";
import styled from "styled-components";
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

function Header() {
  return (
    <HeaderContainer>
      <Left>
      <HamburgerButton>☰</HamburgerButton>
      <LogoTitle>
        <img src={Logo} alt="Logo" />
        </LogoTitle>
      </Left>
      <Right>
      <SearchTitle>
        <img src={Search} alt="Search" />
      </SearchTitle>
      <ProfileTitle>
        <img src={Profile} alt="Profile" />
        </ProfileTitle>
      </Right>
    </HeaderContainer>
  );
}

export default Header;
