import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  //height: 100vh; /* 화면 전체 높이에 꽉 차도록 설정 */
  overflow: hidden; /* 스크롤 숨기기 */
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 10vw;
  border-right: 0.1vw solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  width: 60%;
  height: 60%;
  padding: 2vw;
  background-color: #f0f0f0;
  border-radius: 0.3vw;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1vw;
`;

const LoginTitle = styled.p`
  color: #00000;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1vw;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.3vw;
  margin-bottom: 0.5vw;
  border: 0.1vw solid #ccc;
  border-radius: 2vw;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.5vw;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 0.3vw;
  cursor: pointer;
`;

const SignupContainer = styled.div`
  display: flex;
  gap: 1vw;
  opacity: 0.5;
  font-size: 1rem;
`;

const SignupLink = styled(Link)`
  text-decoration: underline;
  color: #000000;
  margin-top: 0.8vw;
`;

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [userid, setUserId] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleLogin = async () => {
    // 로그인 처리 로직 추가
  };

  return (
    <Container>
      <LeftSection>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm onSubmit={handleLogin}>
          <InputContainer>
            <label htmlFor="username">이메일(ID)</label>
            <Input
              type="text"
              placeholder="example@gmail.com"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="password">비밀번호(PW)</label>
            <Input
              type={showPass ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              value={userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </InputContainer>

          <LoginButton type="submit">LOGIN</LoginButton>

          <SignupContainer>
            <p>아직 회원이 아니신가요?</p>
            <SignupLink to="/signup">회원가입하기</SignupLink>
          </SignupContainer>
        </LoginForm>
      </LeftSection>

      <RightSection>
        <Banner>{/* 배너 컴포넌트 내용 */}</Banner>
      </RightSection>
    </Container>
  );
};

export default LoginPage;
