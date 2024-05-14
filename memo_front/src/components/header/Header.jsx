import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Search from "../../assets/images/search.png";
import Profile from "../../assets/images/profile.png";
import ProfileModal from "../modal/ProfileModal"
import SearchModal from "../modal/SearchModal";
import SideMenu from "../menu/SideMenu"; // SideMenu 컴포넌트 추가
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  position: relative; /* HeaderContainer를 relative로 설정하여 하위 요소를 absolute로 배치 */
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

  img {
    width: 80%;
    height: auto;
  }
`;

const HamburgerButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2vw;
`;

const SearchButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  position: relative; /* 상대적인 위치 설정 */
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

const UserProfileDropdown = styled(ProfileModal)`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
`;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 모달 열림/닫힘 상태 추가
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // SearchModal을 열기 위한 상태 추가
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // 사이드메뉴 열림/닫힘 상태 추가
  const navigate = useNavigate();
  
  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 여부를 확인하여 상태를 설정합니다.
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedIn === "true"); // "true" 문자열을 boolean 값으로 변환하여 설정합니다.
  }, []);

  // 프로필 모달 열기 핸들러 함수
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  // 프로필 모달 닫기 핸들러 함수
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // 검색 모달 열기 핸들러 함수
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  // 검색 모달 닫기 핸들러 함수
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  //새로고침
const handleRefresh = () => {
  navigate("/");
  window.location.reload();
};

  return (
    <HeaderContainer>
      <Left>
        <HamburgerButton onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
          ☰
        </HamburgerButton>{" "}
        {/* 사이드메뉴 버튼 클릭 시 사이드메뉴 열림/닫힘 상태를 변경하는 이벤트 추가 */}
        <Link to="/" onClick={handleRefresh}>
          <LogoTitle>
            <img src={Logo} alt="Logo" />
          </LogoTitle>
        </Link>
      </Left>
      <Right>
        <SearchButton onClick={openSearchModal}>
          {" "}
          {/* SearchButton 클릭 시 검색 모달 열도록 설정 */}
          <img src={Search} alt="Search" />
        </SearchButton>

        {/* 프로필이미지버튼 or 로그인하기버튼 */}
        {/* isLoggedIn 상태에 따라 프로필 이미지 또는 로그인 버튼을 렌더링합니다. */}
        {isLoggedIn ? (
          <ProfileTitle>
            {/* 프로필 이미지를 클릭하면 모달창을 열도록 설정 */}
            <ProfileImage
              src={Profile}
              alt="Profile"
              onClick={openProfileModal}
            />
            {/* 모달 열림 상태에 따라 모달을 렌더링 */}
            {isProfileModalOpen && (
              <UserProfileDropdown closeModal={closeProfileModal} />
            )}
          </ProfileTitle>
        ) : (
          <ProfileTitle>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </ProfileTitle>
        )}
      </Right>
      {/* 검색 모달 */}
      {isSearchModalOpen && <SearchModal closeModal={closeSearchModal} />}
      {isSideMenuOpen && (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      )}{" "}
      {/* 사이드메뉴 열림 상태에 따라 사이드메뉴를 렌더링 */}
    </HeaderContainer>
  );
}

export default Header;
