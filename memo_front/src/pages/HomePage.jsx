import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import checkImg from "../assets/images/check3.png";
import YoutubeIcon from "../assets/images/youtubebutton.png";
import RankVideo from "../components/home/RankingVideo"; 

const CheckImage = styled.img`
  width: 7%;
`;

const LoadingIcon = styled(FontAwesomeIcon).attrs({
  icon: faSpinner,
  size: "4x",
  color: "#333",
})``;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2vw;
  margin-bottom: 2vw;
`;

const RedText = styled.span`
  font-size: 1.2rem;
  color: red;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #000000;
  font-weight: bold;
  font-size: 2.5rem;
`;

const Subheading = styled.h5`
  color: #333;
  margin-top: -1vw;
  font-size: 1.5rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;

const Input = styled.input`
  width: 30vw;
  padding: 1vw;
  border: none;
  border-radius: 0.4vw;
  background-color: #bababa;
  font-size: 1rem;
  color: white;
  ::placeholder {
    color: white;
  }
`;

const InputContainer = styled.div`
  background-color: #bababa;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0.7vw 1.5vw 0.7vw 1.5vw;
  border-radius: 1vw;
`;


const YoutubeIconImg = styled.img`
  width: 3vw;
  background: none;
  border: 0.3vw solid #fff;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  margin-right: 1vw;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: 800;
  padding: 0.7vw 1.2vw;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 0.4vw;
  margin-left:1vw;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#000" : "#555")};
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vw; 
`;


const RankingContainer = styled.div`
margin: 8vw 0 2vw 0;

`;

const RankingItem = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const { GPTSummary, homePageDataGET, getMyData } = useAuth();

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

  useEffect(() => {
    homePageDataGET(); // 홈페이지 데이터 호출
    // getMyData();

    const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn) {
          console.log("🔴로그인 되어있음");
          getMyData();
        }
        else{console.log("🔴로그인 xxxxx");}
  }, []);

  const getTitleContent = () => {
    if (isLoading) {
      return (
        <>
          <LoadingIcon spin />
          <LoadingText>
            Loading...
            <br />
            잠깐! 새로고침은 안돼요!
            <br />
            <RedText>
              새로고침 시 영상변환이 초기화되니 유의해주세요.{" "}
            </RedText>{" "}
          </LoadingText>
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
      return "영상을 요약하고 있어요...";
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

  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleLoadVideo = () => {
    const id = extractVideoId(videoUrl);
    setVideoId(id);
  };
  return (
    <Container>
      <Head>
        {getTitleContent()}
        <Detail>
          <InputContainer>
            <YoutubeIconImg
              src={YoutubeIcon} // 이미지 소스 설정
              alt="유튜브 아이콘"
              onClick={handleLoadVideo} // 클릭 이벤트 핸들러
            />
            <Input
              type="text"
              value={videoUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/"
            />
            {isCompleted ? (
              <Button primary onClick={handleStart}>
                Start MEMO
              </Button>
            ) : (
              <Button
                onClick={isLoading ? () => {} : handleUpload}
                disabled={isLoading}
              >
                {isLoading ? "Loading.." : "Load Video"}
              </Button>
            )}
          </InputContainer>
        </Detail>
      </Head>
      <body style={{ marginTop: "1rem" }}>
        <RankingContainer>
        https://www.youtube.com/watch?v=uAmv-8NUGGc
          <RankingItem>▶ 실시간 사용자가 많이 본 영상이예요..</RankingItem>
          <RankVideo/>
        </RankingContainer>
      </body>
    </Container>
  );
};

export default HomePage;
