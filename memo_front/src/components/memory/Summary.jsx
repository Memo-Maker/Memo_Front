import React from "react";
import styled from "styled-components";
import Pencil from "../../assets/images/pencil.png";

const SummaryBox = styled.div`
  width: 95%;
  padding: 1vw;
  background-color: #f0f0f0;
  border-radius: 1vw;
  margin-top: 0.5vw;
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
  font-family: "KCC-Hanbit";
  line-height: 1.5vw;
`;

const SummaryDetail = styled.div`
  font-size: 1vw;
  font-weight: bold;
  text-align: center;
`;

const Summary = () => {
  // 로컬 스토리지에서 summaryData 가져오기
  const summaryData = localStorage.getItem("summary");
  // summaryData가 없거나 비어 있을 경우 빈 배열로 설정
  const sentences = summaryData
    ? summaryData.split(".").filter((sentence) => sentence.trim() !== "")
    : [];

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
    <SummaryBox>
      <SummaryDetail>요약된 내용</SummaryDetail>
      {renderSentences(sentences)}
    </SummaryBox>
  );
};

export default Summary;
