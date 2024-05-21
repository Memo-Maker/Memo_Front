import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Pencil from "../../assets/images/pencil.png";

// GlobalStyle을 정의하여 Google Fonts를 불러옵니다.
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

  body {
    font-family: 'Noto Sans', sans-serif;
  }
`;

const SummaryBox = styled.div`
  width: 95%;
  padding: 1vw;
  background-color: #f0f0f0;
  border-radius: 1vw;
  margin-top: 1vw;
  font-family: "Noto Sans", sans-serif; /* 폰트 적용 */
`;

const TextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.7vw;
`;

const PencilImage = styled.img`
  width: 1.5vw;
  height: auto;
  margin-right: 0.5vw;
`;

const Text = styled.div`
  color: #000000;
  flex: 1;
  position: relative;
  font-family: "Noto Sans", sans-serif; /* 폰트 적용 */
`;

const Summary = () => {
  // 로컬 스토리지에서 summaryData 가져오기
  const summaryData = localStorage.getItem("summary");
  // summaryData가 없거나 비어 있을 경우 빈 배열로 설정
  const sentences = summaryData ? summaryData.split(". ") : [];

  // 문장을 받아서 각 문장의 시작에 연필 이미지를 붙이는 함수
  const renderSentences = (sentences) => {
    if (!sentences || sentences.length === 0) return null;

    return sentences.map((sentence, index) => (
      <TextContainer key={index}>
        <PencilImage src={Pencil} alt="Pencil" />
        <Text>{sentence.trim() + "."}</Text>
      </TextContainer>
    ));
  };

  return (
    <>
      <GlobalStyle />
      <SummaryBox>{renderSentences(sentences)}</SummaryBox>
    </>
  );
};

export default Summary;
