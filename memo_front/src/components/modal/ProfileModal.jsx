import React from "react";
import styled from "styled-components";
import Profile from "../../assets/images/profile.png";
import SettingsIconImg from "../../assets/images/SettingsIcon.png";
import HistoryIconImg from "../../assets/images/history.png";
import LogoutIconImg from "../../assets/images/logout.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // AuthContext import 추가

const Overlay = styled.div`
  position: fixed;
  top: -13vw;
  left: 40vw;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dropdown = styled.div`
  width: 240px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Email = styled.div`
  font-size: 1rem;
  color: #838383;
  margin: 0 1vw 0.5vw 1vw;
`;

const Nickname = styled.div`
  font-size: 1rem;
  margin: 0 1vw 0 1vw;
  font-weight: bold;
`;

const EditButton = styled.button`
  border: none;
  background: none;
  color: blue;
  cursor: pointer;
`;

const Options = styled.div`
  list-style: none;
  padding: 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const OptionItem = styled.div`
  font-size: 1rem;
  padding: 0.5vw 1vw;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: auto;
  border-radius: 50%;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const UserProfileDropdown = ({ closeModal }) => {
  const navigate = useNavigate();
  const { logout, getVideoList } = useAuth();
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleClickOutside}>
      <Dropdown>
        <UserInfo>
          <ProfileImage src={Profile} alt="Profile" />
          <Nickname>박박</Nickname>
          <EditButton>Edit</EditButton>
        </UserInfo>
        <Email>test@naver.com</Email>
        <Options>
          <Option>
            <OptionItem onClick={() => { getVideoList("최근 본 영상"); navigate("/mypage");}}>
              내 기록보기
            </OptionItem>
            <IconImg src={HistoryIconImg} alt="History" />
          </Option>
          <Option>
            <OptionItem onClick={() => console.log("정보수정")}>
              회원정보 수정하기
            </OptionItem>
            <IconImg src={SettingsIconImg} alt="Settings" />
          </Option>
          <Option>
            <OptionItem onClick={() => {logout(); console.log("로그아웃")}}>
              로그아웃
            </OptionItem>
            <IconImg src={LogoutIconImg} alt="Logout" />
          </Option>
        </Options>
      </Dropdown>
    </Overlay>
  );
};

export default UserProfileDropdown;