import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../../assets/images/profile.png";
import SettingsIconImg from "../../assets/images/SettingsIcon.png";
import HistoryIconImg from "../../assets/images/history.png";
import LogoutIconImg from "../../assets/images/logout.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // AuthContext import 추가

const Overlay = styled.div`
  position: fixed;
  top: 100px; /* y 좌푯값 지정 */
  left: 1450px; /* x 좌푯값 지정 */
  z-index: 99;
  width: 23%;
  height: 24%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-end;
`;

const DropdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2vw;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
`;

const InfoBox = styled.div``;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const ProfileBox = styled.div``;

const ProfileImage = styled.img`
  margin-top: 1vw;
  border-radius: 50%;
  cursor: pointer;
`;

const Email = styled.div`
  font-size: 1rem;
  color: #838383;
  margin: 0 1vw 0.5vw 1vw;
`;

const Nickname = styled.div`
  font-size: 1vw;
  margin: 0 1vw 0 1vw;
  font-weight: bold;
`;

const Options = styled.div`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const OptionItem = styled.div`
  font-size: 0.8vw;
  padding: 0.5vw 1vw;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e7e7e7;
  padding: 20px;
  border-radius: 1vw;
`;

const TextInput = styled.input`
  font-size: 1vw;
  background-color: #f0f0f0;
  font-weight: bold;
  margin: 1vw;
  padding: 1vw;
  border-radius: 1vw;
  border: 0.1vw solid #000000;
`;

const Button = styled.button`
  margin: 1vw;
  padding: 1vw;
  border-radius: 1vw;
  border: 0.2vw solid #000000;
  font-weight: bold;
  font-size: 1vw;

  &:hover {
    background-color: #b8b8b8;
  }
`;

const UserProfileDropdown = ({ closeModal }) => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout, getVideoList } = useAuth();

  useEffect(() => {
    const memberName = localStorage.getItem("memberName");
    if (memberName) {
      setNickname(memberName);
    }

    const memberEmail = localStorage.getItem("userId");
    if (memberEmail) {
      setEmail(memberEmail);
    }
  }, []);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    setNickname(newNickname);
    localStorage.setItem("memberName", newNickname);
    setNewNickname("");
    setShowModal(false);
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleClickOutside}>
      <DropdownContainer>
        <InfoBox>
          <UserInfo>
            <Nickname>{nickname}님 안녕하세요ᵔᴗᵔ</Nickname>
          </UserInfo>
          <Email>{email}</Email>
          <Options>
            <Option>
              <OptionItem
                onClick={() => {
                  getVideoList("최근 본 영상");
                  navigate("/mypage");
                }}
              >
                내 기록보기
              </OptionItem>
              <IconImg src={HistoryIconImg} alt="History" />
            </Option>
            <Option>
              <OptionItem onClick={() => setShowModal(true)}>
                닉네임 변경
              </OptionItem>
              <IconImg
                onClick={() => setShowModal(true)}
                src={SettingsIconImg}
                alt="Settings"
              />
            </Option>
            <Option>
              <OptionItem
                onClick={() => {
                  logout();
                  console.log("로그아웃");
                }}
              >
                로그아웃
              </OptionItem>
              <IconImg src={LogoutIconImg} alt="Logout" />
            </Option>
          </Options>
        </InfoBox>
        <ProfileBox>
          <ProfileImage src={Profile} alt="Profile" />
        </ProfileBox>
      </DropdownContainer>
      {showModal && (
        <Modal>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            닉네임을 변경하시겠습니까?
          </div>
          <TextInput
            type="text"
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder="새 닉네임 입력"
          />
          <Button onClick={handleNicknameSubmit}>변경하기</Button>
        </Modal>
      )}
    </Overlay>
  );
};

export default UserProfileDropdown;
