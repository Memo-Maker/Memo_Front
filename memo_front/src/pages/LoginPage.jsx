import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PCLoginPage from "../components/login/PCLoginPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import MobileLoginPage from "../components/login/MobileLoginPage";
import MobileHeader from "../components/header/MobileHeader";
import MobileFooter from "../components/footer/Mobilefooter";

const LoginPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    console.log(`This Device: ${isMobile ? "📱Mobile" : "💻Computer"}`);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileLoginPage />
          <MobileFooter />
        </>
      ) : (
        <>
          {/* <Header /> */}
          <PCLoginPage />
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default LoginPage;
