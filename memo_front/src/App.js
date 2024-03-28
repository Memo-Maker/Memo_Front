//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 헤더 컴포넌트를 추가합니다. */}
        <Routes>
          <Route path="/" element={<><Header /><HomePage /><Footer/></>} />
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
