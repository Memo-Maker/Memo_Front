import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const ErrorDescription = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>오류가 발생했습니다.</ErrorMessage>
      <ErrorDescription>잠시 후 다시 시도해 주세요.</ErrorDescription>
    </ErrorContainer>
  );
};

export default ErrorPage;
