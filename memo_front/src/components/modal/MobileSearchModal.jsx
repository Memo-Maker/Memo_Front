import React, { useState } from "react";
import styled from "styled-components";
import SearchImage from "../../assets/images/search.png";
import { useAuth } from "../../context/AuthContext";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  width: 70%;
  max-height: 30rem;
  padding: 2vw;
  border: 0.2vw solid #000000;
  border-radius: 0.5rem;
  overflow-y: auto;
  

  &::-webkit-scrollbar {
    width: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #a7a7a7;
    border-radius: 1vw;
    margin-right: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #646464;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
`;

const SearchFunction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const SearchInput = styled.input`
  padding: 1vw;
  width: 100%;
  border: 0.2vw solid #000000;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
`;

const SearchButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-bottom: 3%;
  margin-left: 5%;
`;

const SearchResultSection = styled.div`
`;

const SearchResult = styled.div`
  display: flex;
  background-color: #ffffff;
  margin-top: 1vw;
  align-items: center;
  /* justify-content: space-between; */
`;

const SearchResultContent = styled.div`
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: 3vw;
`;

const Text = styled.div`
font-size: 2.4vw;
`;


const SearchModal = ({ closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchError, setSearchError] = useState(false); // 검색 결과가 없을 때의 에러 상태 추가
  const { searchMarkdown, selectVideo } = useAuth();

  const handleSearch = async () => {
    try {
      // 검색된 결과를 필터링하여 저장
      const result = await searchMarkdown(searchQuery);
      setSearchResult(result || []); // 검색 결과가 undefined일 경우 빈 배열로 초기화

      if (!result || result.length === 0) {
        setSearchError(true); // 검색 결과가 없는 경우만 에러 상태 설정
      } else {
        setSearchError(false); // 검색 결과가 있는 경우에는 에러 상태 초기화
      }
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error);
      setSearchError(true); // 검색 중 오류가 발생하면 에러 상태 설정
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (videoUrl) => {
    selectVideo(videoUrl); // selectVideo 함수 호출
    closeModal(); // 모달 닫기
  };

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SearchContainer>
          <SearchFunction>
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 키 입력 시 handleSearch 실행
            />
            <SearchButton
              src={SearchImage}
              alt="Search"
              onClick={handleSearch}
            />
          </SearchFunction>

          <SearchResultSection>
            {searchResult && searchResult.length > 0 ? (
              searchResult.map((item) => (
                <SearchResult key={item.id}
                onClick={() => handleResultClick(item.videoUrl)}>
                  <img
                    src={item.thumbnailUrl}
                    alt="검색 결과 이미지"
                    style={{
                      width: "30vw",
                      height: "10vh",
                      marginRight: "5%",
                      borderRadius: "1rem",
                      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <SearchResultContent>
                  <Title>{item.videoTitle.replace(/_/g, " ")}</Title>
                    <Text>
                      {item.document
                        // HTML 태그 제거 및 "&nbsp;"를 공백으로 대체
                        .replace(/(<([^>]+)>|&nbsp;)/gi, "")
                        // "&nbsp;"를 공백으로 대체한 후, 줄바꿈 추가
                        .replace(/&nbsp;/g, " ")
                        // 줄바꿈 추가
                        .replace(/\.\s*$/, ".\n")}
                    </Text>

                  </SearchResultContent>
                </SearchResult>
              ))
            ) : searchError ? (
              <p>해당 검색어는 존재하지 않습니다.</p>
            ) : null}
          </SearchResultSection>
        </SearchContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default SearchModal;
