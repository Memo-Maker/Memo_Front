import React from "react";
import styled from "styled-components";
import Pencil from "../../assets/images/pencil.png";

const SummaryBox = styled.div`
  padding: 1vw;
  background-color: #f0f0f0;
`;

const Text = styled.div`
  margin-top: 1vw;
  position: relative;
`;

const PencilImage = styled.img`
  width: 2vw;
  height: auto;
  position: relative;
`;

const Summary = () => {
  // 로컬 스토리지에서 summaryData 가져오기
  const summaryData = JSON.parse(localStorage.getItem("summaryData"));
  // summaryData가 없거나 비어 있을 경우 빈 배열로 설정
  const sentences = summaryData ? summaryData.split(". ") : [];

  // 문장을 받아서 각 문장의 시작에 연필 이미지를 붙이는 함수
  const renderSentences = (sentences) => {
    if (!sentences || sentences.length === 0) return null;

    return sentences.map((sentence, index) => (
      <Text key={index}>
        <PencilImage src={Pencil} alt="Pencil" /> {sentence.trim()+"."}
      </Text>
    ));
  };

  return <SummaryBox>{renderSentences(sentences)}</SummaryBox>;
};

export default Summary;
