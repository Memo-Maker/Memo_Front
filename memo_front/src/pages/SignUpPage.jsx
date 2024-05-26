import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import PCSignupPage from "../components/signup/SignupPage";
import MobileSignupPage from "../components/signup/MobileSignupPage";
import MobileHeader from "../components/header/MobileHeader";
import MobileFooter from "../components/footer/Mobilefooter";


const SignupPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    console.log(`This Device: ${isMobile ? "📱Mobile" : "💻Computer"}`);
  }, [isMobile]);

  return (
    <div>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileSignupPage />
          <MobileFooter />
        </>
      ) : (
        <>
          {/* <Header /> */}
          <PCSignupPage />
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default SignupPage;
