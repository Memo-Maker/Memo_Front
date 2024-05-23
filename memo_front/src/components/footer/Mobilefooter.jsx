import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3vw 5vw;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 0.8rem;
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;

const Link = styled.a`
  margin-right: 15px;
  color: #6c757d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CopyRight = styled.span`
  display: block;
  text-align: left;
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* <LeftSection>
        <Link href="#">이용약관</Link>
        <Link href="#">광고문의</Link>
        <Link href="#">개인정보처리방침</Link>
        <Link href="#">청소년보호정책</Link>
        
      </LeftSection>
      <RightSection>
        <CopyRight>© 2024 HSU MEMO </CopyRight>
        <CopyRight>24.02.17 ~ 05.31 Rights Reserved</CopyRight>
        <CopyRight>고객센터: Maker</CopyRight>
      </RightSection> */}
      <LeftSection>
        <CopyRight>Maker 박시현 최영서 김택신 정진혁 </CopyRight>
        <CopyRight>Copyright MEMO.co&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved</CopyRight>
      </LeftSection>
    </FooterContainer>
  );
};

export default Footer;
