import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // AuthContext에서 useAuth 함수를 import합니다.

const LoginHandler = () => {
  const navigate = useNavigate();
  const { sendAuthorizationCode } = useAuth(); // useAuth 훅을 사용하여 sendAuthorizationCode 함수를 가져옵니다.

  useEffect(() => {
    // 여기서 인가 코드를 추출합니다.
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("code: ", code);
    
    // 인가 코드를 백엔드로 전송하는 함수를 호출합니다.
    if (code) {
      sendAuthorizationCode(code);
    }

    // 여기에 로그인이 성공하면 사용자를 다른 페이지로 리디렉션하는 코드를 추가할 수 있습니다.
    // 예: navigate('/dashboard'); // 로그인 후 이동할 페이지

    // 임시로 홈페이지로 이동하는 예시입니다.
    navigate('/');
  }, [navigate, sendAuthorizationCode]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;
