import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import TestEditorForm from "../components/texteditor/TestEditorForm";
import Summary from "../components/memory/Summary";
import ChatIcon from "../assets/images/chat.png"; // 이미지 import

const Layout = styled.div`
  display: flex;
  width : 100%;
  height : 100%;
  flex-direction: row;
  align-items: center;
  background-color : #582fff;
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은 배경 */
  z-index: 999; /* 다른 요소들보다 위에 표시 */
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2vw;
  border-radius: 0.5vw;
`;

const Button = styled.button`
  background-color: #fff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 1vw;

  /* 이미지를 버튼 안에 넣기 */
  background-image: url(${ChatIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 3vw;
  height: 3vw;

  position: relative; /* 위치를 고정시킴 */
  top: -1vh;
  left: -4vw; /* 왼쪽에서 -4vw 지점에 위치 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */

  &:hover {
    background-color: #838383;
  }
`;

const MemoryPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [playerSize, setPlayerSize] = useState({ width: 560, height: 315 });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // 로컬스토리지에서 videoUrl 읽어오기
    const storedVideoUrl = localStorage.getItem("videoUrl");
    if (storedVideoUrl) {
      const videoId = extractVideoId(storedVideoUrl);
      setVideoId(videoId);
    }

    // 초기 사이즈 설정
    handleResize();

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

  // 모달 창을 열고 닫는 함수
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 버튼 클릭 시 동작을 정의하는 함수
  const handleButtonClick = () => {
    // 버튼이 클릭되었을 때 모달 창을 토글합니다.
    toggleModal();
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
        <Button onClick={handleButtonClick}></Button>
      </Container>
      <TestEditorForm />
      

      {/* 모달 창 */}
      <ModalBackground visible={isModalVisible} onClick={toggleModal}>
        <ModalContent>모달 내용이 여기 들어갑니다.</ModalContent>
      </ModalBackground>
    </Layout>
  );
};

export default MemoryPage;
