import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Profile from "../../assets/images/profile.png";
import SettingsIconImg from "../../assets/images/SettingsIcon.png";
import HistoryIconImg from "../../assets/images/history.png";
import LogoutIconImg from "../../assets/images/logout.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // AuthContext import 추가

const Overlay = styled.div`
  position: fixed;
  top: ${({ top }) => top - top * 0.94}px; /* y 좌푯값 지정 */
  left: ${({ left }) => left - left * 0.55}px; /* x 좌푯값 지정 */
  z-index: 99;
  width: ${({ width }) => width - width * 0.5}px; /* 동적으로 width 조정 */
  height: ${({ height }) => height - height * 0.8}px; /* 동적으로 height 조정 */
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

const InfoBox = styled.div`
  /* background-color: aquamarine; */
  width: 100%;
`;

const ProfileBox = styled.div`
  /* background-color: beige; */
  width:50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  margin-top: 1vw;  
  border-radius: 50%;
`;

const Email = styled.div`
  font-size: 3vw;
  color: #838383;
  margin: 0 1vw 0.5vw 1vw;
`;

const Nickname = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 3vw;
  margin: 0 1vw 0 1vw;
  margin-bottom: 10px;
  font-weight: bold;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

const Options = styled.div`
  list-style: none;
  padding: 0;
  margin-top: 3%;
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
  font-size: 3vw;
  padding: 1.5vw 2vw;
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
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 상태 추가
  const navigate = useNavigate();
  const { logout, getVideoList, changeNickname } = useAuth();
  const modalRef = useRef();
  const overlayRef = useRef();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const memberName = localStorage.getItem("memberName");
    if (memberName) {
      setNickname(memberName);
    }

    const memberEmail = localStorage.getItem("userId");
    if (memberEmail) {
      setEmail(memberEmail);
    }

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    console.log("top:", windowSize.height);
    console.log("left:", windowSize.width);
  }, [windowSize]);

  const handleNicknameChange = (e) => {
    if (e.target.value.length <= 3) {
      setNewNickname(e.target.value);
      setShowWarning(false);
    } else {
      setShowWarning(true); // 3글자를 초과하면 경고 메시지 표시
    }
  };

  const handleNicknameSubmit = async () => {
    try {
      if (newNickname.length <= 3) {
        await changeNickname(newNickname);
        setNickname(newNickname);
        localStorage.setItem("memberName", newNickname);
        setNewNickname("");
        setShowModal(false);
      }
    } catch (error) {
      console.error("닉네임 변경 오류:", error);
    }
  };

  return (
    <Overlay ref={overlayRef} top={windowSize.height} left={windowSize.width} width={windowSize.width} height={windowSize.height}>
      <DropdownContainer>
        <InfoBox>
          <Nickname>{nickname}님 안녕하세요</Nickname>
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
        <Modal ref={modalRef}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "3vw",
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
          {showWarning && (
            <div style={{ color: "red", fontWeight: "bold", marginTop: "1vw" }}>
              닉네임은 3글자까지 가능합니다.
            </div>
          )}
          <Button onClick={handleNicknameSubmit}>변경하기</Button>
        </Modal>
      )}
    </Overlay>
  );
};

export default UserProfileDropdown;
