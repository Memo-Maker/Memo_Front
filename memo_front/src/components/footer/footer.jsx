import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3vw 5vw;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 0.9rem;
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
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LeftSection>
        <Link href="#">한성대학교</Link>
        <Link href="#">캡스톤</Link>
        <Link href="#">개인정보처리방침</Link>
        <Link href="#">이용약관</Link>
        <Link href="#">광고문의</Link>
      </LeftSection>
      <RightSection>
        <CopyRight>© 2024 HSU MEMO </CopyRight>
        <CopyRight>2024.02.17 ~ All Rights Reserved</CopyRight>
        <CopyRight>(팀)Maker</CopyRight>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;
