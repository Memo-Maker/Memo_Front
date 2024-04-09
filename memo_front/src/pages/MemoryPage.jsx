import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import TestEditorForm from "../components/texteditor/TestEditorForm";
import Summary from "../components/memory/Summary";

const Layout = styled.div`
  display: flex;
  height:90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  background-color: #dddddd;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;
  height: 100%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });

  useEffect(() => {
    // 로컬스토리지에서 videoUrl 읽어오기
    const storedVideoUrl = localStorage.getItem("videoUrl");
    if (storedVideoUrl) {
      const videoId = extractVideoId(storedVideoUrl);
      setVideoId(videoId);
    }
    // 윈도우 리사이즈 이벤트 핸들러 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 핸들러 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // YouTube 영상의 고유 ID를 추출하는 함수
  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  // 창 크기가 변경될 때 호출되는 함수
  const handleResize = () => {
    // 창의 너비와 높이를 가져와서 state를 업데이트
    setPlayerSize({
      width: window.innerWidth * 0.4,
      height: (window.innerWidth * 0.4 * 9) / 16,
    });
  };

  // 버튼 클릭 시 동작을 정의하는 함수
  const handleButtonClick = () => {
    // 버튼이 클릭되었을 때 할 일을 여기에 추가하세요.
    console.log("버튼이 클릭되었습니다.");
  };

  return (
    <Layout>
      <Container>
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={{
              width: playerSize.width.toString(), // 플레이어 너비
              height: playerSize.height.toString(), // 플레이어 높이
              playerVars: {
                autoplay: 1, // 자동 재생 여부
                rel: 0, // 관련 동영상 표시 여부
                modestbranding: 1, // 컨트롤 바에 YouTube 로고 표시 여부
              },
            }}
          />
        )}
        <Summary />
      </Container>

      <Button onClick={handleButtonClick}>?</Button>

      <TestEditorForm />
    </Layout>
  );
};

export default MemoryPage;
