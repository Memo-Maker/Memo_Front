//첫 화면
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>정리할 영상의 링크를 걸어주세요!</h1>
    </Container>
  );
};

export default HomePage;