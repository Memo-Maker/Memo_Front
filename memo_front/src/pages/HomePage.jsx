import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHomePage from "../components/home/MobileHomePage";
import PCHomePage from "../components/home/HomePage";
import Header from "../components/header/Header";
import MobileHeader from "../components/header/MobileHeader";
import Footer from "../components/footer/footer";
import MobileFooter from "../components/footer/Mobilefooter";

const HomePage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    console.log(`This Device: ${isMobile ? "📱Mobile" : "💻Computer"}`);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileHomePage />
          <MobileFooter />
        </>
      ) : (
        <>
          <Header />
          <PCHomePage />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
