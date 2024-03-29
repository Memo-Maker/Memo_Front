import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import Banner from "../assets/images/Banner.png";
import { useAuth } from "../context/AuthContext"; // AuthContext import 추가

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

  // useAuth 훅을 사용하여 AuthContext에서 login 함수 가져옴
  const { signup } = useAuth();

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };


  // 회원가입 버튼 클릭 시 호출되는 함수
  const handleSignup = async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작 막기
    // 사용자 데이터를 구성합니다.
    signup(userid, userpassword, usernickname);
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
            id="usernickname" // 고유한 id 추가
            placeholder="사용할 이름을 작성해주세요."
            value={usernickname}
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label htmlFor="userid">이메일(ID)</Label>
          <Input
            type="text"
            id="userid" // 고유한 id 추가
            placeholder="test@naver.com"
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label htmlFor="userpassword">비밀번호(PW)</Label>
          <Input
            type={showPass ? "text" : "password"}
            id="userpassword" // 고유한 id 추가
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
