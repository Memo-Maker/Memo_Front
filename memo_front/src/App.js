//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // react-toastify에서 ToastContainer를 import합니다.
import "react-toastify/dist/ReactToastify.css"; // react-toastify의 CSS 파일을 import합니다.
import Header from "./components/header/Header";
import Header2 from "./components/header/Header2";
import Footer from "./components/footer/footer";
import HomePage from "./pages/HomePage";
import MemoryPage from "./pages/MemoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
      <ToastContainer autoClose={2000} /> {/* 토스트 컨테이너 설정 */}
        {/* 헤더 컴포넌트를 추가합니다. */}
        <Routes>
          <Route path="/" element={<><Header /><HomePage /><Footer/></>} />
          <Route path="/memory" element={<><Header2 /><MemoryPage /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
