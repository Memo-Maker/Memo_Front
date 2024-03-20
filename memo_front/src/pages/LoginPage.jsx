import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const LoginForm = styled.form`
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

//소셜로그인
const SocialLoginButton = styled.button`
  width: 50%;
  height: 3vw;
  padding: 0.5vw;
  background-color: #fff;
  border: 0.15vw solid ${(props) => props.bgColor};
  border-radius: 0.3vw;
  cursor: pointer;
  margin-top: 1vw;
  font-weight: bold;
`;

const OrDivider = styled.div`
  margin: 1vw;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #838383;
  div {
    flex: 1;
    height: 0.2vw;
    background-color: #ccc;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 0.8rem;
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

const LoginButton = styled.button`
  width: 100%;
  padding: 1vw;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 0.3vw;
  cursor: pointer;
  margin-top: 1vw;
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
        <LogoTitle>
          <img src={Logo} alt="Logo" />
        </LogoTitle>
        <SocialLoginButton bgColor="#FFEB00">
          카카오로 시작하기
        </SocialLoginButton>
        <SocialLoginButton bgColor="#03C75A">
          네이버로 시작하기
        </SocialLoginButton>

        <OrDivider>
          <div></div>
          또는
          <div></div>
        </OrDivider>

        <LoginForm onSubmit={handleLogin}>
          <InputContainer>
            <Label htmlFor="username">이메일(ID)</Label>
            <Input
              type="text"
              placeholder="test@naver.com"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">비밀번호(PW)</Label>
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
        <BannerImg>
          <img src={Banner} alt="Banner를 부를 수 없어요!" />
        </BannerImg>
      </RightSection>
    </Container>
  );
};

export default LoginPage;
