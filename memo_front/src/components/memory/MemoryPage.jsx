import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import TextEditorForm from "../texteditor/TextEditorForm";
import Summary from "./Summary";
import ChatIcon from "../../assets/images/GPTIcon.png";
import Modal from "./Chatgpt";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #fffc5e;
  justify-content: center;
  gap: 2vw;
`;

const Container = styled.div`
  width: 35%;
`;

const GPTButton = styled.button`
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 1vw;
  background-image: url(${ChatIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 3vw;
  height: 3vw;

  position: relative;
  top: -2vw;
  left: -4vw;
  transform: translateY(-50%);
`;

const DateText = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5vw;
  color: #838383;
`;

const TitleText = styled.div`
  font-size: 1.1vw;
  font-weight: 800;
  text-align: start;
  margin-top: 0.5vw;
  color: #000000;
  justify-content: center;
  border: 3px solid #8d8d8d;
  border-radius: 3vw;
  padding: 0.5vw;
  white-space: nowrap; /* 한 줄로만 표시하도록 설정 */
  overflow: hidden; /* 넘칠 경우 숨김 처리 */
  text-overflow: ellipsis; /* 말 줄임표(...) 추가 */
`;

const Scroll = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 16vw;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #a7a7a7;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #646464;
  }
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const storedVideoUrl = localStorage.getItem("videoUrl");
    // console.log("storedVideoUrl::" + storedVideoUrl);
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
      width: window.innerWidth * 0.35,
      height: (window.innerWidth * 0.35 * 9) / 16,
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleButtonClick = () => {
    toggleModal();
  };

  return (
    <>
      <Layout>
        <Container>
          <DateText>{localStorage.getItem("documentDate")}</DateText>
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
          <Scroll>
            <TitleText>{localStorage.getItem("videoTitle")}</TitleText>
            <Summary />
          </Scroll>
          <GPTButton onClick={handleButtonClick}></GPTButton>
          <Modal visible={isModalVisible} onClose={toggleModal} />
        </Container>
        <TextEditorForm />
      </Layout>
    </>
  );
};

export default MemoryPage;
