import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

// HomePage 컴포넌트
const HomePage = () => {
  return (
    <Container>
      <Title>정리한 영상의 링크를 걸어주세요!</Title>
      <Input
        type="text"
        placeholder="학습하고 싶은 YouTube 영상의 링크를 붙여넣어주세요"
      />
      <Button>올리기</Button>
    </Container>
  );
};

export default HomePage;
