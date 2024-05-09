import React, { useEffect } from "react";
import styled from "styled-components";

const RankingContainer = styled.div`
  margin-top: 1vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 0.2vw solid #838383;
  border-radius: 1vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 15vw;
  height: 10vw;
  cursor: pointer;
  transition: background-color 0.3s;

  &:active {
    background-color: #ccc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonImage = styled.img`
  height: 70%;
  object-fit: cover;
  margin: 0.5vw;
`;

const ButtonContent = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const RankingVideo = () => {
  useEffect(() => {
    // 로컬 스토리지에서 각 영상 정보를 가져와서 출력하고 로그를 출력합니다.
    for (let i = 1; i <= 3; i++) {
      const rankingData = JSON.parse(localStorage.getItem(`ranking${i}`));
      if (rankingData) {
        console.log(`Ranking ${i} Data:`, rankingData);
      }
    }
  }, []);

  // rankingData 변수 정의
  const rankingData = [];
  for (let i = 1; i <= 3; i++) {
    const data = JSON.parse(localStorage.getItem(`ranking${i}`));
    if (data) {
      rankingData.push(data);
    }
  }
  return (
    <RankingContainer>
      {rankingData.map((data, index) => (
        <StyledButton key={index}>
          <ButtonImage src={data.thumbnailUrl} alt={data.videoTitle} />
          <ButtonContent>{data.videoTitle}</ButtonContent>
        </StyledButton>
      ))}
    </RankingContainer>
  );
};

export default RankingVideo;