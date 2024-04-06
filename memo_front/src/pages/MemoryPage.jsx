import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import TestEditorForm from "../components/texteditor/TestEditorForm";


const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 76.5vh;
  margin-bottom: 1vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40vw;
  height: 100%;
`;

const YouTubeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 33vw;
  height: 100%;
`;

const GptBox = styled.div`
  width: 33vw;
  height: 30vw;
  background-color: #f0f0f0;
`;


const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    // 로컬스토리지에서 videoUrl 읽어오기
    const storedVideoUrl = localStorage.getItem("videoUrl");
    if (storedVideoUrl) {
      const videoId = extractVideoId(storedVideoUrl);
      setVideoId(videoId);
    }
  }, []);

  // YouTube 영상의 고유 ID를 추출하는 함수
  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  return (
    <Layout>
      <Container>
        <YouTubeBox>{videoId && <YouTube videoId={videoId} />}</YouTubeBox>
        <GptBox></GptBox>
      </Container>
      <TestEditorForm></TestEditorForm>
    </Layout>
  );
};

export default MemoryPage;
