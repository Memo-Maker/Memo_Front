import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Banner1 from "../../assets/images/Banner.png";
import Banner2 from "../../assets/images/Banner2.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center; /* 이미지 중앙 정렬 */
  width: 100%;
  margin-top: 5%;
  /* margin-bottom: 5%; */
`;

const BannerImage = styled.img`
  width: 60%;
  height: auto;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const NextButton = styled(NavigationButton)`
  right: 1rem;
`;

const BannerSlider = () => {
  const images = [Banner1, Banner2];
  const [currentSlide, setCurrentSlide] = useState(0);

  // 슬라이드 변경 처리 함수
  const handleSlideChange = (direction) => {
    let newIndex = currentSlide + direction;

    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setCurrentSlide(newIndex);
  };

  // 자동 슬라이드 타이머 설정
  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        let newIndex = prevSlide + 1;
        if (newIndex >= images.length) {
          newIndex = 0;
        }
        return newIndex;
      });
    }, 3000);

    return () => {
      clearInterval(autoSlideTimer);
    };
  }, [images.length]);

  return (
    <Container>
      <BannerWrapper>
        <BannerImage
          src={images[currentSlide]}
          alt={`Banner ${currentSlide + 1}`}
        />
      </BannerWrapper>
      {/* <NextButton onClick={() => handleSlideChange(1)}>›</NextButton> */}
    </Container>
  );
};

export default BannerSlider;
