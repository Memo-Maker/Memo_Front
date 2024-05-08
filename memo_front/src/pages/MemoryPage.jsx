import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import TextEditorForm from "../components/texteditor/TextEditorForm";
import Summary from "../components/memory/Summary";
import ChatIcon from "../assets/images/chat.png";
import Modal from "../components/memory/Chatgpt"; 

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  justify-content: center;
  gap: 2vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;
  height: 100%;
`;

const Button = styled.button`
  background-color: #fff;
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
  top: -1vh;
  left: -4vw;
  transform: translateY(-50%);

  &:hover {
    background-color: #838383;
  }
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const storedVideoUrl = localStorage.getItem("videoUrl");
    if (storedVideoUrl) {
      const videoId = extractVideoId(storedVideoUrl);
      setVideoId(videoId);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
      width: window.innerWidth * 0.4,
      height: (window.innerWidth * 0.4 * 9) / 16,
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
      <Container>
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
      </Container>
      <TextEditorForm />

      <Modal visible={isModalVisible} onClose={toggleModal}>
        모달 내용이 여기 들어갑니다.
      </Modal>
    </Layout>
  );
};

export default MemoryPage;
