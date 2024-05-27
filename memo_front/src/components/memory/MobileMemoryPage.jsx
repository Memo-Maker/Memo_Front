import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import MobileTextEditorForm from "../texteditor/MobileTextEditorForm";
import Summary from "./MobileSummary";
import ChatIcon from "../../assets/images/GPTIcon.png";
import Chatgpt from "./MobileChatgpt";
import SummaryO from "../../assets/images/Summary_O.png";
import SummaryX from "../../assets/images/Summary_X.png";
import GPTO from "../../assets/images/GPT_O.png";
import GPTX from "../../assets/images/GPT_X.png";
import MemoO from "../../assets/images/Memo_O.png";
import MemoX from "../../assets/images/Memo_X.png";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  gap: 2vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 1; /* 유튜브 영상 컨테이너의 z-index 설정 */
`;

const Button = styled.button`
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
  margin-top: 2.1vw;
  margin-bottom: -1vw;
  margin-left: 3vw;
  color: #838383;
`;

const TitleText = styled.div`
  font-size: 4vw;
  font-weight: 800;
  text-align: start;
  margin-top: 0.5vw;
  color: #000000;
  justify-content: center;
  border: 3px solid #8d8d8d;
  border-radius: 3vw;
  padding: 1vw;
  margin: 1vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: center;
  gap: 10vw;
  background-color: #ffffff;
  padding: 1vw;
  width: 100%;
`;

const ImageButton = styled.button`
  display: flex;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  width: 10vw;
  height: 10vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedButton, setSelectedButton] = useState("summary"); // 기본값을 "summary"로 설정

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
      /^.*(?:youtu.be\/|v\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const handleResize = () => {
    setPlayerSize({
      width: window.innerWidth * 0.95,
      height: (window.innerWidth * 0.95 * 9) / 16,
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleButtonClick = () => {
    toggleModal();
  };

  const handleImageButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <Layout>
      <DateText>{localStorage.getItem("documentDate")}</DateText>
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
        <TitleText>{localStorage.getItem("videoTitle")}</TitleText>
        <Content>
          {selectedButton === "summary" && <Summary />}
          {selectedButton === "gpt" && <Chatgpt />}
          {selectedButton === "memo" && <MobileTextEditorForm />}
        </Content>
      </Container>
      <ButtonSet>
        <ImageButton
          onClick={() => handleImageButtonClick("summary")}
          style={{
            backgroundImage: `url(${
              selectedButton === "summary" ? SummaryO : SummaryX
            })`,
          }}
          selected={selectedButton === "summary"}
        />
        <ImageButton
          onClick={() => handleImageButtonClick("gpt")}
          style={{
            backgroundImage: `url(${selectedButton === "gpt" ? GPTO : GPTX})`,
          }}
          selected={selectedButton === "gpt"}
        />
        <ImageButton
          onClick={() => handleImageButtonClick("memo")}
          style={{
            backgroundImage: `url(${selectedButton === "memo" ? MemoO : MemoX})`,
          }}
          selected={selectedButton === "memo"}
        />
      </ButtonSet>
    </Layout>
  );
};

export default MemoryPage;
