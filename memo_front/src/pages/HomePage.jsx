import React, { useState } from "react";
import styled from "styled-components";
// import LoginWarning from "../components/modal/LoginWarning"; // 모달 컴포넌트 import

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 73vh; // 나중에 지울 거임
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false); // ProgressBar의 가시성 상태

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    setIsLoading(true);
    setShowProgressBar(true); // 업로드 시작 시 ProgressBar 표시
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      setProgress(uploadProgress);
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setIsCompleted(true);
        openModal();
      }
    }, 500);
  };

  // Title 텍스트를 동적으로 설정하기 위한 함수
  const getTitleText = () => {
    if (isLoading) {
      return "영상을 올리고 있어요...";
    } else if (isCompleted) {
      return "영상이 옮겨졌어요! 이제 필기하러 가볼까요?";
    } else {
      return "정리할 영상의 링크를 걸어주세요!";
    }
  };

  // Subheading 텍스트를 동적으로 설정하는 함수
  const getSubheadingText = () => {
    if (isCompleted) {
      return "지금 바로 MEMO 하러 가요";
    } else {
      return "정리하고 싶은 YouTube 영상의 링크를 붙여넣어주세요.";
    }
  };

  return (
    <Container>
      <Title>{getTitleText()}</Title>
      <Subheading>{getSubheadingText()}</Subheading>
      <Detail>
        <Input type="text" placeholder="https://www.youtube.com/" />
        <Button onClick={handleUpload} disabled={isLoading || isCompleted}>
          {isLoading ? "변환 중.." : isCompleted ? "시작하기" : "올리기"}
        </Button>
      </Detail>
      <ProgressBar show={showProgressBar}>
        {" "}
        {/* ProgressBar의 가시성 상태 전달 */}
        <ProgressFill progress={progress} />
        <WriteIcon className="fas fa-pencil-alt" isFull={isCompleted} />
        <ProgressText>{progress}%</ProgressText>
      </ProgressBar>
      {/* <LoginWarning isOpen={isModalOpen} onClose={closeModal} />{" "} */}
    </Container>
  );
};

export default HomePage;
