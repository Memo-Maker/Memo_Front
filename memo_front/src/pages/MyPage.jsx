import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PCMyPage from "../components/myPage/MyPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import MobileMyPage from "../components/myPage/MobileMyPage";
import MobileHeader from "../components/header/MobileHeader";
import MobileFooter from "../components/footer/Mobilefooter";

const MyPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    console.log(`This Device: ${isMobile ? "📱Mobile" : "💻Computer"}`);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileMyPage />
          <MobileFooter />
        </>
      ) : (
        <>
          <Header />
          <PCMyPage />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MyPage;
