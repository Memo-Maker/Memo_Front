//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
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
        {/* 헤더 컴포넌트를 추가합니다. */}
        <Routes>
          <Route path="/" element={<><Header /><HomePage /><Footer/></>} />
          <Route path="/memory" element={<><Header /><MemoryPage /><Footer/></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
