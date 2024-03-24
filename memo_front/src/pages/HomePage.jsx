import React from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 73vh; //나중에 지울 거임
`;

const Title = styled.h1`
  color: #333;
  font-weight: bold;
`;

const Subheading = styled.h5`
  color: #333;
  margin-top:-1vw;
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
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

// HomePage 컴포넌트
const HomePage = () => {
  return (
    <Container>
      <Title>정리할 영상의 링크를 걸어주세요!</Title>
      <Subheading>
        정리하고 싶은 YouTube 영상의 링크를 붙여넣어주세요.
      </Subheading>
      <Detail>
      <Input type="text" placeholder="https://www.youtube.com/" />
        <Button>올리기</Button>
      </Detail>
    </Container>
  );
};

export default HomePage;
