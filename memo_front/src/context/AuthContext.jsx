import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate를 import합니다.
import { toast } from "react-toastify";
import axios from "axios"; // axios를 import합니다.

// 공통 URL 정의
const BASE_URL = "http://localhost:8080";
const FLASK_BASE_URL = "http://localhost:5000";
// const FLASK_BASE_URL = "http://taeksin.iptime.org:5002";
// 카카오 REST API 키와 리다이렉트 URI 설정

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
      console.log("로컬 스토리지에서 로그인 여부 및 토큰을 가져왔습니다.");
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
  // - Name : getEmailFromLocalStorage
  // - Desc : 로컬 스토리지에서 email을 가져오는 함수
  // -----------------------------------------------------------------------------
  const getEmailFromLocalStorage = () => {
    const userEmail = localStorage.getItem("userId");
    return userEmail;
  };

  // -----------------------------------------------------------------------------
  // - Name : getVideoFromLOcaltorage
  // - Desc : 로컬 스토리지에서 videoUrl을 가져오는 함수
  // -----------------------------------------------------------------------------
  const getVideoFromLocalStorage = () => {
    const videoUrl = localStorage.getItem("videoUrl");
    return videoUrl;
  };

  // -----------------------------------------------------------------------------
  // - Name : getRankingDataFromLocalStorage
  // - Desc : 로컬 스토리지에서 rankingData를 가져오는 함수
  // -----------------------------------------------------------------------------
  const getRankingDataFromLocalStorage = () => {
    const rankingData = localStorage.getItem("rankingData");
    return rankingData;
  };


  // -----------------------------------------------------------------------------
  // - Name : saveContentToLocal
  // - Desc : 메모를 html로 로컬스토리지에 저장함
  // -----------------------------------------------------------------------------
  const saveContentToLocal = (htmlContent) => {
    localStorage.setItem("editorContent", htmlContent);
    console.log("텍스트 내용이 로컬스토리지에 저장되었씁니다.");
  };

  // -----------------------------------------------------------------------------
  // - Name : signup
  // - Desc : 사용자를 회원가입하는 함수
  // - Input
  //   1) userid : 사용자 이메일
  //   2) userpassword : 사용자 비밀번호
  //   3) usernickname : 사용자 닉네임
  // -----------------------------------------------------------------------------
  const signup = async (memberEmail, memberPassword, memberName) => {
    try {
      console.log("회원가입 시도 중...");
      console.log(
        "  -user 정보- " +
          "\n { 사용자이메일: " +
          memberEmail +
          "\n   비밀번호: " +
          memberPassword +
          "\n   닉네임:" +
          memberName +
          " }"
      );
      console.log("보낼 서버 주소 : " + `${BASE_URL}/api/v1/auth/sign-up`);
      // 서버에 회원가입 정보를 전송하고 응답을 기다림
      const response = await fetch(`${BASE_URL}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberEmail,
          memberPassword,
          memberName
        })
      });
      if (response.ok) {
        console.log("회원가입 성공!");
        toast.success("회원가입 성공!");
        login(memberEmail, memberPassword);

        navigate("/");

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
  //   1) memberEmail : 사용자 이름
  //   2) memberPassword : 사용자 비밀번호
  // - Output
  // -----------------------------------------------------------------------------
  const login = async (memberEmail, memberPassword) => {
    try {
      console.log("로그인 시도 중...");
      console.log(
        "  -user 정보- " +
          "\n { 사용자이메일: " +
          memberEmail +
          "\n   비밀번호: " +
          memberPassword +
          " }"
      );
      console.log("보낼 서버 주소 : " + `${BASE_URL}/api/v1/auth/sign-in`);

      // 서버에 로그인 정보를 전송하고 응답을 기다림
      const response = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberEmail,
          memberPassword
        })
      });

      if (response.ok) {
        console.log("로그인 성공!");
        toast.success("로그인 성공!");

        // 헤더에서 토큰 추출
        const responseData = await response.json();
        const jwtToken = responseData.token;

        localStorage.setItem("token", jwtToken); // 토큰 저장
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", memberEmail); // 토큰 저장
        setIsLoggedIn(true);
        setUser(responseData.user);
        console.log("토큰이 로컬 스토리지에 저장되었습니다.");
        console.log("[ token ]\n" + jwtToken);

        navigate("/");
        // window.location.reload();
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
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
    // setUser(null);
    console.log("로그인 정보 및 인증 정보가 로컬 스토리지에서 삭제되었습니다.");
    window.location.reload();

    navigate("/");
  };

  // -----------------------------------------------------------------------------
  // - Name : homePageData
  // - Desc : 백엔드의 / 주소로 GET 요청을 보내는 함수
  // -----------------------------------------------------------------------------
  const homePageData = async () => {
    try {
      console.log("백엔드로 GET 요청을 보내는 중...");

      // 서버에 GET 요청 보내기
      const response = await axios.get(
        `${BASE_URL}/api/v1/video/most-frequent-url`
      );

      if (response.status === 200) {
        console.log("데이터를 성공적으로 받았습니다.");
        // 성공적으로 데이터를 받으면 추가 작업 수행
        const data = response.data;
        console.log("받은 데이터:", data);
        // saveVideoToLocalstorage("rankingData", data)
        // 받은 데이터를 각각의 영상 정보로 나누어 저장
        if (data.length >= 1) {
          saveVideoToLocalstorage("ranking1", data[0]);
        }
        if (data.length >= 2) {
          saveVideoToLocalstorage("ranking2", data[1]);
        }
        if (data.length >= 3) {
          saveVideoToLocalstorage("ranking3", data[2]);
        }

        // 받은 데이터 반환
        return data;
      } else {
        console.error("데이터를 받아오는데 실패했습니다.");
        // 데이터를 받아오는데 실패한 경우 에러 처리
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 에러가 발생한 경우 에러 처리
    }
  };

  // 각 영상 정보를 로컬 스토리지에 저장하는 함수
  const saveVideoToLocalstorage = (ranking, videoData) => {
    // localStorage.setItem(`${ranking}_videoTitle`, videoData.videoTitle);
    // localStorage.setItem(`${ranking}_thumbnailUrl`, videoData.thumbnailUrl);
    // localStorage.setItem(`${ranking}_videoUrl`, videoData.videoUrl);
    localStorage.setItem(`${ranking}`, JSON.stringify(videoData));
  };

  // -----------------------------------------------------------------------------
  // - Name : saveCategoryToLocal
  // - Desc : 메모를 html로 로컬스토리지에 저장함
  // -----------------------------------------------------------------------------
  const saveCategoryToLocal = (categoryName) => {
    console.log(categoryName + "을 저장해보겠습니다");

    // 기존에 저장된 카테고리 리스트를 가져옴
    const existingCategories = localStorage.getItem("categoryList");

    // 기존에 저장된 카테고리가 없다면 새로운 카테고리로 설정
    if (!existingCategories) {
      localStorage.setItem("categoryList", categoryName);
      console.log(categoryName + "이 저장되었습니다.");
      return;
    }

    // 기존에 저장된 카테고리와 새로운 카테고리를 합침
    const updatedCategories = existingCategories + ", " + categoryName;
    localStorage.setItem("categoryList", updatedCategories);
    console.log(categoryName + "이 저장되었습니다.");
  };

  // -----------------------------------------------------------------------------
  // - Name : saveMarkdownToServer
  // - Desc : 마크다운을 서버에 저장하는 함수
  // - Input
  //   1) markdownContent: 저장할 마크다운 내용
  // - Output
  // -----------------------------------------------------------------------------
  const saveMarkdownToServer = async (markdownContent) => {
    try {
      console.log("마크다운을 서버에 저장하는 중...");
      console.log("[ 저장할 마크다운 내용 ]\n", markdownContent);
      const userEmail = getEmailFromLocalStorage(); // 로컬 스토리지에서 이메일 가져오기
      const videoUrl = getVideoFromLocalStorage(); // 로컬 스토리지에서 비디오 URL 가져오기

      // 서버에 POST 요청 보내기
      const response = await fetch(`${BASE_URL}/api/v1/video/document-save`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberEmail: userEmail,
          videoUrl: videoUrl,
          document: markdownContent
        })
      });

      if (response.ok) {
        console.log("마크다운 저장 성공!");
        // 저장 성공 시 추가 작업 수행
      } else {
        console.error("마크다운 저장 실패:", response.statusText);
        // 저장 실패 시 에러 처리
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 에러 발생 시 에러 처리
    }
  };

  // -----------------------------------------------------------------------------
  // - Name : sendAuthorizationCode
  // - Desc : 백엔드로 인가코드를 전송하는 함수
  // - Input
  //   1) code: 카카오 로그인 후 받은 인가코드
  // - Output
  // -----------------------------------------------------------------------------
  const sendAuthorizationCode = async (code) => {
    try {
      console.log("인가코드를 백엔드로 전송하는 중...");
      console.log("[ 인가코드 ]\n", code);

      // 인가코드를 URL의 쿼리 파라미터로 포함하여 백엔드로 전송
      const response = await axios.post(
        `${BASE_URL}/login/oauth2/code/kakao?code=${code}`
      );

      if (response.status === 200) {
        console.log("인가코드 전송 성공!");
        // 성공 시 추가 작업 수행
      } else {
        console.error("인가코드 전송 실패:", response.statusText);
        // 실패 시 에러 처리
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 에러 발생 시 에러 처리
    }
  };

  // -----------------------------------------------------------------------------
  // - Name : GPTQuery
  // - Desc : GPT 모델에 쿼리를 보내는 함수
  // - Input
  //   1) query: GPT 모델에 전달할 쿼리
  // - Output
  // -----------------------------------------------------------------------------
  const GPTQuery = async (query) => {
    try {
      // 로컬스토리지에서 userId 값을 가져옴
      const userId = localStorage.getItem("userId");
      const videoUrl = localStorage.getItem("videoUrl");

      console.log("GPT 모델에 쿼리를 전송하는 중...");
      console.log("[ 쿼리 ] : ", query);
      console.log("[ userId ] : ", userId);
      console.log("[ videoUrl ] : ", videoUrl);

      // 서버에 쿼리와 userId를 함께 전송하고 응답을 기다림
      const response = await fetch(`${FLASK_BASE_URL}/questionurl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: query,
          userId: userId, // userId 값을 함께 전송
          videoUrl: videoUrl
        })
      });

      if (!response.ok) {
        throw new Error("서버에서 오류를 반환했습니다.");
      }

      const data = await response.json();
      console.log("쿼리 전송 성공!");
      console.log("받은 답변:", data); // 받은 답변을 로그로 출력
      console.log("받은 답변:", data.qAnswer); // 받은 답변을 로그로 출력

      return data;
    } catch (error) {
      console.error("에러 발생:", error);
      throw new Error("쿼리 전송 중 에러가 발생했습니다.");
    }
  };

  // -----------------------------------------------------------------------------
  // - Name : GPTSummary
  // - Desc : GPT 모델에 summary 요청을 보내는 함수
  // - Input
  //   1) url: summary를 생성할 대상 URL
  // - Output
  //   - 서버에서 받은 summary 데이터
  // -----------------------------------------------------------------------------
  const GPTSummary = async (url) => {
    try {
      // 로컬스토리지에서 userId 값을 가져옴
      const userId = localStorage.getItem("userId");
      console.log("GPT 모델에 summary 요청을 전송하는 중...");
      console.log("[ 대상 URL ]\n", url);
      console.log("[ userId ]\n", userId);

      // 서버에 요청을 보내고 응답을 기다림
      const response = await fetch(`${FLASK_BASE_URL}/summaryurl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url,
          userId: userId // userId 값을 함께 전송
        })
      });

      if (!response.ok) {
        throw new Error("서버에서 오류를 반환했습니다.");
      }

      const data = await response.json();
      console.log("summary 요청 전송 성공!");
      console.log("받은 summary:", data); // 받은 summary를 로그로 출력

      // 받은 summary 데이터를 로컬스토리지에 저장
      localStorage.setItem("summaryData", JSON.stringify(data.summary));

      return data;
    } catch (error) {
      console.error("에러 발생:", error);
      throw new Error("summary 요청 중 에러가 발생했습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        getTokenFromLocalStorage,
        getEmailFromLocalStorage,
        saveContentToLocal,
        signup,
        login,
        logout,
        sendAuthorizationCode,
        GPTQuery,
        GPTSummary,
        saveMarkdownToServer,
        saveCategoryToLocal,
        homePageData
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
