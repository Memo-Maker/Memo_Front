import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import HomePage from "./pages/HomePage";
import MemoryPage from "./pages/MemoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import LoginHandler from "./components/login/LoginHandler"; // 로그인 핸들러 컴포넌트 import

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App" style={{ height: `${windowHeight}px` }}>
          <ToastContainer autoClose={1000} />
          <Routes>
            <Route path="/" element={<><Header /><HomePage /><Footer/></>} />
            <Route path="/memory" element={<><Header /><MemoryPage /></>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mypage" element={<><Header /><MyPage /><Footer/></>} />
            {/* /auth 경로에 대한 라우트 추가 */}
            <Route path="/auth" element={<LoginHandler />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
