import React from "react";
import styled from "styled-components";

const RankingContainer = styled.div`
  margin-top: 1vw;
  display:flex;
  flex-direction: row; 
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem; 
`;

 // 카드를 나타내는 버튼 스타일 컴포넌트
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


const RankingVideo = ({ ranking, videoDummy }) => {
  return (
    <RankingContainer>
      {ranking.map((videoKey, index) => (
        <StyledButton key={videoKey.id}>
          <ButtonImage
            src={videoDummy[videoKey].thumbnail_url}
            alt={videoDummy[videoKey].title}
          />
          <ButtonContent> {videoDummy[videoKey].title}</ButtonContent>
        </StyledButton>
      ))}
    </RankingContainer>
  );
};

export default RankingVideo;
