import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import checkImg from "../assets/images/check3.png"
import videoDummy from "../assets/dummyDatas/videoDummy.json"; // videoDummy 데이터 import

const CheckImage = styled.img`
  width: 4.5%;
  height: 7.5%;
`;

const LoadingIcon = styled(FontAwesomeIcon).attrs({
  icon: faSpinner,
  size: "4x",
  color: "#333"
})``;

const LoadingText = styled.span`
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

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

const RankingContainer = styled.div`
  margin-top: 2rem;
  display: flex; /* 아이템을 수평으로 배치하기 위해 flex 사용 */
  flex-direction: row; /* 아이템을 가로 방향으로 배치 */
  flex-wrap: wrap; /* 아이템이 화면에 맞지 않을 경우 여러 줄로 나누기 */
  justify-content: space-between; /* 아이템 사이의 간격을 최대한으로 확보하고 좌우 여백을 균등하게 배분 */
  gap: 1rem; /* 아이템 사이의 간격 */
`;

const RankingItem = styled.div`
  font-size: 1.2rem;
`;



const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const { GPTSummary } = useAuth();

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      // GPTSummary 함수 호출하여 요약 생성
      await GPTSummary(videoUrl);
      console.log("영상 링크:", videoUrl); // 링크 콘솔에 출력
      localStorage.setItem("videoUrl", videoUrl); // 로컬스토리지에 videoUrl 저장
      setIsCompleted(true);
    } catch (error) {
      console.error("GPTSummary 호출 중 에러 발생:", error);
      // 에러 처리
    }
    setIsLoading(false);
  };

  // const handleUpload = () => {
  //   setIsLoading(true);
  //   setShowProgressBar(true);
  //   let uploadProgress = 0;
  //   const interval = setInterval(() => {
  //     uploadProgress += 10;
  //     setProgress(uploadProgress);
  //     if (uploadProgress >= 100) {
  //       clearInterval(interval);
  //       setIsLoading(false);
  //       setIsCompleted(true);
  //       console.log("영상 링크:", videoUrl); // 링크 콘솔에 출력
  //       localStorage.setItem("videoUrl", videoUrl); // 로컬스토리지에 videoUrl 저장
  //       navigate("/memory");
  //     }
  //     // handleLoadVideo 함수 호출
  //     handleLoadVideo();
  //   }, 100);
  // };

  // 초기화 작업 및 useEffect 설정
  useEffect(() => {
    handleLoadRanking();
  }, []);

  // grade에 따라 영상 순위 정렬하는 함수
  const handleLoadRanking = () => {
    const sortedVideos = Object.keys(videoDummy).sort(
      (a, b) => videoDummy[a].grade - videoDummy[b].grade
    );
    setRanking(sortedVideos);
  };

  const getTitleContent = () => {
    if (isLoading) {
      return (
        <>
          <LoadingIcon spin />
          <LoadingText>Loading...</LoadingText>
        </>
      );
    } else {
      return (
        <>
          {isCompleted && <CheckImage src={checkImg} alt="Check" />}
          <Title>{getTitleText()}</Title>
          <Subheading>{getSubheadingText()}</Subheading>
        </>
      );
    }
  };

  const getTitleText = () => {
    if (isLoading) {
      return ("영상을 요약하고 있어요...");
    } else if (isCompleted) {
      return "요약을 완료했어요! 이제 필기하러 가볼까요?";
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

  const handleStart = () => {
    navigate("/memory");
  };

  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [ranking, setRanking] = useState([]);

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
      {getTitleContent()}
      {/* <Title>{getTitleText()}</Title>
      <Subheading>{getSubheadingText()}</Subheading> */}
      <Detail>
        <Input
          type="text"
          value={videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/"
        />
        {isCompleted ? (
          <Button primary onClick={handleStart}>
            시작하기
          </Button>
        ) : (
          <Button
            onClick={isLoading ? () => {} : handleUpload}
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Load Video"}
          </Button>
        )}
      </Detail>
      {/* 나중에 다시 주석 해제하기 */}
      {/* <ProgressBar show={showProgressBar}>
        <ProgressFill progress={progress} />
        <WriteIcon className="fas fa-pencil-alt" isFull={isCompleted} />
        <ProgressText>{progress}%</ProgressText>
      </ProgressBar> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h2>사람들이 많이 본 영상</h2>
      <RankingContainer>
        
        {ranking.map((videoKey, index) => (
          <RankingItem key={videoKey}>

            <img
              src={videoDummy[videoKey].thumbnail_url}
              alt={videoDummy[videoKey].title}
              width="100"
              height="100"
            />
            {videoDummy[videoKey].title}
          </RankingItem>
        ))}
      </RankingContainer>

    </Container>
  );
};

export default HomePage;
