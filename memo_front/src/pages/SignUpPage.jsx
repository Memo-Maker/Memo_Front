import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import Banner from "../assets/images/Banner.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 3vw 3vw 1vw 3vw;
  gap: 5vw;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerImg = styled.div`
  width: 70%;
  border-radius: 0.3vw;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1vw;
  width: 50%;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1vw;
`;

const LogoTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vw;
`;

const Input = styled.input`
  width: 92%;
  padding: 0.7vw;
  margin-top: 0.5vw;
  border: 0.1vw solid #ccc;
  border-radius: 0.3vw;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 0.8rem;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 1vw;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 0.3vw;
  cursor: pointer;
  margin-top: 1vw;
`;

const SignupPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [userid, setUserId] = useState("");
  const [usernickname, setUserNickname] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  // 회원가입 함수
  const signup = async (userData) => {
    try {
      console.log("회원가입 시도 중...");
      // 서버에 회원가입 정보를 전송하고 응답을 기다림
      const response = await fetch("http://localhost:3000/member/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log("회원가입 성공!");
        const userData = await response.json();
        const jwtToken = response.headers.get("Authorization"); // 토큰 헤더에서 추출
        // 회원가입 후 추가 작업 수행
        // 예: 로그인 처리 등
      } else {
        console.error("회원가입 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // 회원가입 버튼 클릭 시 호출되는 함수
  const handleSignup = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    try {
      // 회원가입 함수 호출
      await signup({ userid, userpassword, usernickname });
      // 회원가입 성공 시 추가 작업 수행
      navigate("/"); // 회원가입 후 홈페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      // 회원가입 실패 시 추가 작업 수행
    }
  };


  return (
    <Container>
      <LeftSection>
        <LogoTitle>
          <img src={Logo} alt="Logo" />
        </LogoTitle>

        <SignupForm onSubmit={handleSignup}>
          <InputContainer>
            <Label htmlFor="usernickname">닉네임(NickName)</Label>
            <Input
              type="text"
              placeholder="사용할 이름을 작성해주세요."
              value={usernickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="userid">이메일(ID)</Label>
            <Input
              type="text"
              placeholder="test@naver.com"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="userpassword">비밀번호(PW)</Label>
            <Input
              type={showPass ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              value={userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </InputContainer>

          <SignupButton type="submit">회원가입</SignupButton>
        </SignupForm>
      </LeftSection>

      <RightSection>
        <BannerImg>
          <img src={Banner} alt="Banner를 부를 수 없어요!" />
        </BannerImg>
      </RightSection>
    </Container>
  );
};

export default SignupPage;
