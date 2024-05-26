import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PCMemoryPage from "../components/memory/MemoryPage";
import MobileMemoryPage from "../components/memory/MobileMemoryPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import MobileHeader from "../components/header/MobileHeader";
import MobileFooter from "../components/footer/Mobilefooter";

const MemoryPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    console.log(`This Device: ${isMobile ? "📱Mobile" : "💻Computer"}`);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileMemoryPage />
          {/* <MobileFooter /> */}
        </>
      ) : (
        <>
          <Header />
          <PCMemoryPage />
          {/* <Footer /> */}
        </>
      )}
    </div>
  );

};

export default MemoryPage;