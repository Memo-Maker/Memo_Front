import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 74.5vh;
`;

const Title = styled.h1`
  color: #000000;
  font-weight: bold;
`;

const Subheading = styled.h5`
  color: #333;
  margin-top: -1vw;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;

const Input = styled.input`
  width: 30vw;
  padding: 1vw;
  border: 0.1vw solid #ddd;
  border-radius: 0.4vw;
  background-color: #bababa;
`;

const Button = styled.button`
  padding: 1vw 2vw;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 0.4vw;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#000" : "#555")};
  }
`;

const ProgressBar = styled.div`
  position: relative;
  width: 30vw;
  height: 0.5vw;
  background-color: #ddd;
  border-radius: 0.25vw;
  margin-top: 1vw;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const ProgressFill = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: linear-gradient(to right, #e6e6e6, #141414);
  border-radius: 0.25vw;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.span`
  position: absolute;
  bottom: -1.5vw;
  right: 0.5vw;
  color: #fff;
  font-size: 0.8vw;
  font-weight: bold;
  text-shadow: 0 0 0.2vw rgba(0, 0, 0, 1);
`;

const WriteIcon = styled.i`
  color: #333;
  font-size: 2vw;
  margin-top: 1vw;
  display: ${({ isFull }) => (isFull ? "block" : "none")};
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

const handleUpload = () => {
  setIsLoading(true);
  setShowProgressBar(true);
  let uploadProgress = 0;
  const interval = setInterval(() => {
    uploadProgress += 10;
    setProgress(uploadProgress);
    if (uploadProgress >= 100) {
      clearInterval(interval);
      setIsLoading(false);
      setIsCompleted(true);
      console.log("영상 링크:", videoUrl); // 링크 콘솔에 출력
      localStorage.setItem("videoUrl", videoUrl); // 로컬스토리지에 videoUrl 저장
      navigate("/memory");
    }
    // handleLoadVideo 함수 호출
    handleLoadVideo();
  }, 100);
};

  const getTitleText = () => {
    if (isLoading) {
      return "영상을 올리고 있어요...";
    } else if (isCompleted) {
      return "영상이 옮겨졌어요! 이제 필기하러 가볼까요?";
    } else {
      return "정리할 영상의 링크를 걸어주세요!";
    }
  };

  const getSubheadingText = () => {
    if (isCompleted) {
      return "지금 바로 MEMO 하러 가요";
    } else {
      return "정리하고 싶은 YouTube 영상의 링크를 붙여넣어주세요.";
    }
  };

  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState(null);

  // 유튜브 영상의 고유 ID 추출
  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  // 입력 필드의 값이 변경될 때마다 상태 업데이트
  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  // 버튼 클릭 시 유튜브 영상의 고유 ID 추출하여 상태 업데이트
  const handleLoadVideo = () => {
    const id = extractVideoId(videoUrl);
    setVideoId(id);
  };

  return (
    <Container>
      <Title>{getTitleText()}</Title>
      <Subheading>{getSubheadingText()}</Subheading>
      <Detail>
        <Input
          type="text"
          value={videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/"
        />
        <Button onClick={handleUpload} disabled={isLoading || isCompleted}>
          {isLoading ? "Loading.." : isCompleted ? "시작하기" : "Load Video"}
        </Button>
      </Detail>
      {/* 나중에 다시 주석 해제하기 */}
      {/* <ProgressBar show={showProgressBar}>
        <ProgressFill progress={progress} />
        <WriteIcon className="fas fa-pencil-alt" isFull={isCompleted} />
        <ProgressText>{progress}%</ProgressText>
      </ProgressBar> */}
    </Container>
  );
};

export default HomePage;
