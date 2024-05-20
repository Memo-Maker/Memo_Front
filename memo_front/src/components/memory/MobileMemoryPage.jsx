import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import MobileTextEditorForm from "../texteditor/MobileTextEditorForm";
import Summary from "./MobileSummary";
import ChatIcon from "../../assets/images/chat.png";
import Modal from "./Chatgpt";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: flex-start;
  /* background-color: #ffffff; */
  background-color: #ffc2c2;
  justify-content: center;
  gap: 2vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ff9a9a;
`;

// GPT 버튼
const Button = styled.button`
  /* background-color: #fff; */
  background-color: #02ff56;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 1vw;

  background-image: url(${ChatIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 10vw;
  height: 10vw;

  position: relative;
  top: -1vh;
  left: -4vw;
  transform: translateY(-50%);

  &:hover {
    background-color: #838383;
  }
`;

const DateText = styled.p`
  font-size: 1rem;
  margin-top: 0vw;
  margin-bottom: -1vw;
  margin-left: 3vw;
  color: #838383;
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const storedVideoUrl = localStorage.getItem("videoUrl");
    console.log("storedVideoUrl::" + storedVideoUrl);
    if (storedVideoUrl) {
      const videoId = extractVideoId(storedVideoUrl);
      setVideoId(videoId);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const handleResize = () => {
    setPlayerSize({
      width: window.innerWidth * 0.95, // 40% -> 90%로 증가
      height: (window.innerWidth * 0.95 * 9) / 16, // 16:9 비율 유지
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleButtonClick = () => {
    toggleModal();
  };

  return (
    <Layout>
      <DateText>{localStorage.getItem("documentDate")}</DateText>
      <Container>
        {/* Youtube 컴포넌트 */}
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={{
              width: playerSize.width.toString(),
              height: playerSize.height.toString(),
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
              },
            }}
          />
        )}
        <Summary />
        <Button onClick={handleButtonClick}></Button>
        <MobileTextEditorForm />
      </Container>

      <Modal visible={isModalVisible} onClose={toggleModal} />
    </Layout>
  );
};

export default MemoryPage;
