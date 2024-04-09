// import React from "react";
// import styled from "styled-components";
// import Pencil from "../../assets/images/pencil.png";

// const SummaryBox = styled.div`
//   padding: 2vw;
//   background-color: #f0f0f0;
// `;

// const Text = styled.div`
//   margin-top: 1vw;
//   position: relative;
// `;

// const PencilImage = styled.img`
//   width: 2vw;
//   height: auto;
//   position: absolute;
// `;

// const Summary = ({ sentences }) => {
//   // 문장을 받아서 마침표를 기준으로 나누고 각 문장의 시작에 연필 이미지를 붙이는 함수
//   const renderSentences = (sentences) => {
//     if (!sentences || sentences.length === 0) return null;

//     return sentences.map((sentence, index) => (
//       <Text key={index}>
//         <PencilImage src={Pencil} alt="Pencil" /> {sentence.trim()}
//       </Text>
//     ));
//   };

//   return <SummaryBox>{renderSentences(sentences)}</SummaryBox>;
// };

// export default Summary;

import React from "react";
import styled from "styled-components";
import Pencil from "../../assets/images/pencil.png";

const GptBox = styled.div`
  padding: 2vw;
  background-color: #f0f0f0;
`;

const Text = styled.div`
  margin-top: 1vw; 
  position: relative;
`;

const PencilImage = styled.img`
  width: 2vw;
  height: auto;
  position: absolute;
`;

const Summary = () => {
  return (
    <GptBox>
      <Text>
        <PencilImage src={Pencil} alt="Pencil" /> 재산의 불법 점유로 인한 소송
        및 소유권 분쟁으로 인한 소송이 발생하였습니다.
      </Text>
      <Text>
        <PencilImage src={Pencil} alt="Pencil" /> 법원은 보상금액을 결정하고,
        이에 대한 타당성에 대한 분쟁이 벌어지고 있습니다.
      </Text>
      <Text>
        <PencilImage src={Pencil} alt="Pencil" /> 보상금 청구의 타당성에 대한
        법원 판단이 중요한 이슈로 떠오르고 있습니다.
      </Text>
      <Text>
        <PencilImage src={Pencil} alt="Pencil" /> 보상금 청구의 합법성에 대한
        법원 결정이 이 문제에 대한 급진적 해결을 제시할 것으로 예상됩니다.
      </Text>
    </GptBox>
  );
};

export default Summary;
