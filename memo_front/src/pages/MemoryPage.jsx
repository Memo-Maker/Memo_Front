//메모리 페이지
import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
 justify-content: space-evenly;
  align-items: flex-start;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 300px;
  height: ${({ isLarge }) => (isLarge ? "300px" : "150px")};
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  margin-bottom: ${({ isLarge }) => (isLarge ? "0" : "20px")};
  position: relative;
  background-color: #f0f0f0;
`;

const MainBox = styled(Box)`
  width: 600px;
  height: 600px;
  margin-left: 20px;
  background-color: #f0f0f0;
`;

const MemoryPage = () => {
  return (
    <Layout>
      <BoxContainer>
        <Box />
        <Box isLarge />
      </BoxContainer>
      <MainBox></MainBox>
    </Layout>
  );
};

export default MemoryPage;
