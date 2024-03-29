import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate를 import합니다.
import { toast } from 'react-toastify';
import axios from "axios"; // axios를 import합니다.

// 공통 URL 정의
const BASE_URL = "http://localhost:8080";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(""); // 토큰 상태 추가
  const navigate = useNavigate(); // useNavigate를 통해 navigate 함수를 가져옵니다.

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 정보 및 토큰 확인
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (loggedIn && userInfo && storedToken) {
      setIsLoggedIn(true);
      setUser(userInfo);
      // setToken(storedToken); // 저장된 토큰 상태로 설정
      console.log("로컬 스토리지에서 로그인 정보 및 토큰을 가져왔습니다.");
    }
  }, []);
  

  // -----------------------------------------------------------------------------
  // - Name : getTokenFromLocalStorage
  // - Desc : 로컬 스토리지에서 토큰을 가져오는 함수
  // -----------------------------------------------------------------------------
  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  // -----------------------------------------------------------------------------
  // - Name : signup
  // - Desc : 사용자를 회원가입하는 함수
  // - Input
  //   1) userid : 사용자 이메일
  //   2) userpassword : 사용자 비밀번호
  //   3) usernickname : 사용자 닉네임
  // -----------------------------------------------------------------------------
  const signup = async (userid, userpassword, usernickname) => {
    try {
      console.log("회원가입 시도 중...");
      console.log("  -user 정보- " + "\n { 사용자이메일: " + userid + "\n   비밀번호: " + userpassword + "\n   닉네임:" + usernickname + " }");
      console.log("보낼 서버 주소 : " + `${BASE_URL}/member/save`);
      // 서버에 회원가입 정보를 전송하고 응답을 기다림
      const response = await fetch(`${BASE_URL}/member/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          userpassword,
          usernickname
        }),
      });
      if (response.ok) {
        console.log("회원가입 성공!");
        toast.success("회원가입 성공!");
        navigate("/");
        // const userData = await response.json();
        // const jwtToken = response.headers.get("Authorization"); // 토큰 헤더에서 추출
        // 회원가입 후 추가 작업 수행
        // 예: 로그인 처리 등
      } else {
        console.error("회원가입 실패:", response.statusText);
        // 회원가입 실패 시 토스트 메시지 표시
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // -----------------------------------------------------------------------------
  // - Name : login
  // - Desc : 사용자를 로그인하는 함수
  // - Input
  //   1) username : 사용자 이름
  //   2) password : 사용자 비밀번호
  // - Output
  // -----------------------------------------------------------------------------
  const login = async (username, password) => {
    try {
      console.log("로그인 시도 중...");
      console.log("  -user 정보- " + "\n { 사용자이메일: " + username + "\n   비밀번호: " + password + " }");
      console.log("보낼 서버 주소 : " + `${BASE_URL}/login`);

      // 서버에 로그인 정보를 전송하고 응답을 기다림
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        console.log("로그인 성공!");
        toast.success("로그인 성공!");
        navigate("/");
        const jwtToken = response.headers.get("Authorization"); // 토큰 헤더에서 추출
        // 사용자 정보를 추가로 가져오는 API 호출
        const userInfoResponse = await fetch( BASE_URL , {
          method: "GET",
          headers: {
            Authorization: jwtToken,
          },
        });
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          // 로컬 스토리지에 사용자 정보 저장
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(userInfo));
          localStorage.setItem("token", jwtToken); // 토큰 저장

          setIsLoggedIn(true);
          setUser(userInfo);

          console.log("로그인 정보 및 토큰이 로컬 스토리지에 저장되었습니다.");
        } else {
          console.error(
            "사용자 정보 가져오기 실패:",
            userInfoResponse.statusText
          );
        }
      } else {
        console.error("로그인 실패:", response.statusText);
        // 로그인 실패 시 토스트 메시지 표시
        toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      toast.error("로그인 중 에러가 발생했습니다.");
    }
  };

  // -----------------------------------------------------------------------------
  // - Name : logout
  // - Desc : 사용자를 로그아웃하는 함수
  // -----------------------------------------------------------------------------
  const logout = () => {
    // 로그아웃 시 로컬 스토리지에서 로그인 정보 및 인증 정보 삭제
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    console.log("로그인 정보 및 인증 정보가 로컬 스토리지에서 삭제되었습니다.");
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        getTokenFromLocalStorage,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용되어야 합니다.");
  }
  return context;
};
