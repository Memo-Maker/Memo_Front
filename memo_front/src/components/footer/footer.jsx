import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 0.9em;
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
        <Link href="#">회사소개</Link>
        <Link href="#">이용약관</Link>
        <Link href="#">개인정보처리방침</Link>
        <Link href="#">청소년보호정책</Link>
        <Link href="#">광고문의</Link>
      </LeftSection>
      <RightSection>
        <CopyRight>© 2024 HSU MEMO </CopyRight>
        <CopyRight>2024.02.17 ~ All Rights Reserved</CopyRight>
        <CopyRight>고객센터: (주)Maker</CopyRight>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;
