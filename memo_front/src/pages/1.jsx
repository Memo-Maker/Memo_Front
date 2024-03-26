import React, { useState } from "react";
import Backicon from "../../assets/images/keyboard-left-arrow-button.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import styled from "styled-components";
import SignupStyle from "./SignupStyle";
import Participant from "./Participant";
import Organizer from "./Organizer";
import { useAuth } from "../../context/AuthContext"; // AuthContext import 추가
const Signup = () => {
  const { login } = useAuth(); // useAuth 훅을 사용하여 login 함수 가져옴
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [agreements, setAgreements] = useState({
    agreement1: false,
    agreement2: false,
    agreement3: false
  });
  // 모달 관련 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleComponent, setRoleComponent] = useState(null);
  // useHistory 대신 useNavigate 사용
  const navigate = useNavigate();
  // 모달 열기 함수
  const openModal = () => {
    console.log("Opening modal");
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // 모달이 열릴 때 스크롤을 막음
  };
  // 모달 닫기 함수
  const closeModal = () => {
    console.log("Closing modal");
    setModalOpen(false);
    document.body.style.overflow = "auto"; // 모달이 닫힐 때 스크롤을 다시 허용
  };
  
  // 역할에 따라 URL 변경 및 모달 닫기
  const handleModalNext = async (role) => {
    // "다음" 버튼이 눌리면 선택된 데이터를 상태에 저장하고 모달을 닫음
    setModalOpen(false);
    try {
      // fetch 함수 호출
      console.log("Sending data to the server:", {
        name,
        password,
        checkPassword: checkPassword,
        email,
        role
      });
      // 선택된 역할과 함께 사용자가 입력한 정보를 서버로 전송하기 위한 데이터
      const userData = {
        name,
        password,
        checkPassword,
        email,
        agreements,
        role: selectedRole
      };
      // 백엔드 API 호출 및 응답 처리
      // fetch 함수 호출 또는 axios 등을 사용하여 백엔드로 데이터 전송
      const response = await fetch("https://www.career-festival.com:443/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      const responseData = await response.text(); // 서버 응답을 문자열로 받음
      console.log("회원가입 응답 데이터:", responseData);
      // 응답 확인
      if (response.ok) {
        // 백엔드에서 온 응답 처리
        console.log("99회원가입 성공");
        console.log(response);
        login(email, password);
        navigate("/");
      } else {
        console.error("회원가입 실패:", response.statusText);
      }
      // 역할에 따라 URL 변경
      const url = selectedRole === "ROLE_PARTICIPANT" ? "/participant" : "/organizer";
      navigate(url); // navigate 함수 사용
      // 선택된 역할에 따라 화면을 설정
      setRoleComponent(
        selectedRole === "ROLE_PARTICIPANT" ? (
          <Participant />
        ) : selectedRole === "ROLE_ORGANIZER" ? (
          <Organizer />
        ) : null
      );
      // 선택된 역할을 로컬 스토리지에 저장
      localStorage.setItem("userRole", selectedRole);
      
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  // 회원가입 버튼 클릭 처리
  const handleSignup = async () => {
    // 모달 열기 부분 추가
    openModal();
  };
  // 회원가입 버튼 활성/비활성 여부 체크
  const isSignupButtonDisabled = () => {
    return (
      !name ||
      !password ||
      !(agreements.agreement1 && agreements.agreement2 && agreements.agreement3)
    );
  };
  // 모달 내용 컴포넌트
const Modal = ({ closeModal }) => {
  const handleOptionChange = (e) => {
    setSelectedRole(e.target.value);
  };
  const handleNextButtonClick = () => {
    // "다음" 버튼이 눌리면 선택된 데이터를 상태에 저장하고 모달을 닫음
    closeModal();
    handleModalNext(selectedRole);
  };
  return (
    <SignupStyle.Modal>
      {/* 무조건 나타나는 환영 메시지 */}
      <SignupStyle.CheckIcon
        src={require("../../assets/images/check-icon.png")}
        alt="Check Icon"
      />
      <SignupStyle.WelcomeText>
        <p>
          <span>{name}</span>님 환영합니다!
        </p>
        <br />
        오늘부터 행사의 참여자도, 주최자도 될 수 있어요.
      </SignupStyle.WelcomeText>
      <SignupStyle.WelcomeText2>
        어떤 용도로 사용하실건가요?
      </SignupStyle.WelcomeText2>
      <SignupStyle.ModalRadioContainer>
        <label checked={selectedRole === "ROLE_PARTICIPANT"}>
          <input
            type="radio"
            value="ROLE_PARTICIPANT"
            checked={selectedRole === "ROLE_PARTICIPANT"}
            onChange={handleOptionChange}
          />
          참가자
          <br />
          행사를 신청하고 참여합니다!
        </label>
        <label checked={selectedRole === "ROLE_ORGANIZER"}>
          <input
            type="radio"
            value="ROLE_ORGANIZER"
            checked={selectedRole === "ROLE_ORGANIZER"}
            onChange={handleOptionChange}
          />
          주최자
          <br />
          행사를 개설하고 운영합니다!
        </label>
      </SignupStyle.ModalRadioContainer>
      <SignupStyle.ModalButton onClick={handleNextButtonClick}>
        다음
      </SignupStyle.ModalButton>
    </SignupStyle.Modal>
  );
};
  return (
    <div>
      <br />
      <SignupStyle.BackLink to="/login">
        {" "}
        {/* 로그인 화면으로 이동하는 BackLink 컴포넌트 추가 */}
        <img src={Backicon} alt="Backicon" />
      </SignupStyle.BackLink>
      <SignupStyle.SignupContainer>
        <div>회원가입</div>
        <SignupStyle.SocialLoginButtons>
          <button>카카오로 시작하기</button>
          <button>네이버로 시작하기</button>
        </SignupStyle.SocialLoginButtons>
        <SignupStyle.OrDivider>
          <div></div>또는
          <div></div>
        </SignupStyle.OrDivider>
        {/* 이름 섹션 */}
        <div className="input-section">
          <SignupStyle.InputLabel className="input-label">
            이름
          </SignupStyle.InputLabel>
          <SignupStyle.InputField
            type="text"
            //placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* 비밀번호 섹션 */}
        <div className="input-section">
          <SignupStyle.InputLabel className="input-label">
            비밀번호
          </SignupStyle.InputLabel>
          <SignupStyle.InputField
            type="password"
            //placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SignupStyle.InputLabel className="input-label">
            비밀번호 확인
          </SignupStyle.InputLabel>
          <SignupStyle.InputField
            type="password"
            //placeholder="비밀번호 확인"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>
        {/* 이메일 섹션 */}
        <div className="input-section">
          <SignupStyle.InputLabel className="input-label">
            이메일(ID)
          </SignupStyle.InputLabel>

          <SignupStyle.InputField
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />



          <SignupStyle.EmailVerificationContainer>
            {/* <input
              type="text"
              placeholder="인증번호 6자리를 입력해주세요."
              value={emailVerificationCode}
              onChange={(e) => setEmailVerificationCode(e.target.value)}
            />
            <button>인증하기</button> */}
          </SignupStyle.EmailVerificationContainer>
        </div>





        {/*  이용약관 세션 */}
        <SignupStyle.AgreementContainer>
          <label>
            <input
              type="checkbox"
              checked={agreements.agreement1}
              onChange={() =>
                setAgreements({
                  ...agreements,
                  agreement1: !agreements.agreement1,
                })
              }
            />
            [필수] 만 14세 이상입니다.
          </label>
          <label>
            <input
              type="checkbox"
              checked={agreements.agreement2}
              onChange={() =>
                setAgreements({
                  ...agreements,
                  agreement2: !agreements.agreement2,
                })
              }
            />
            [필수] 이용약관
            <button
              style={{
                color: "#582FFF",
                fontSize: "10px",
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "underline",
              }}
            >
              {" "}
              보기
            </button>
          </label>
          <label>
            <input
              type="checkbox"
              checked={agreements.agreement3}
              onChange={() =>
                setAgreements({
                  ...agreements,
                  agreement3: !agreements.agreement3,
                })
              }
            />
            [필수] 개인정보 수집·이용 동의서
            <button
              style={{
                color: "#582FFF",
                fontSize: "10px",
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "underline",
              }}
            >
              {" "}
              보기
            </button>
          </label>
        </SignupStyle.AgreementContainer>
        {/* 회원가입 버튼 */}
        <SignupStyle.SignupButton
          disabled={isSignupButtonDisabled()}
          onClick={handleSignup}
        >
          회원가입
        </SignupStyle.SignupButton>
        {/* 모달 컴포넌트 */}
        {modalOpen && (
          <>
            <SignupStyle.Backdrop onClick={closeModal} />
            <Modal closeModal={closeModal} />
          </>
        )}
      </SignupStyle.SignupContainer>
      {/* 선택된 역할에 따른 컴포넌트 표시 */}
      {roleComponent}
    </div>
  );
};
export default Signup;