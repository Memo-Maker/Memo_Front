import React, { useState } from "react";
import styled from "styled-components";
import SearchImage from "../../assets/images/search.png";
import dummyData from "../../assets/dummyDatas/searchDummy.json"; // 더미 데이터 불러오기
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
  width: 30%;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column; /* 결과를 세로로 표시하기 위해 컨테이너 방향 변경 */
`;

const SearchFunction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin-bottom: 1rem; /* 검색 버튼과의 간격을 추가 */
`;

const SearchButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-bottom: 3%;
  margin-left: 5%;
`;

const SearchResultSection = styled.div`
  width: 100%;
  background-color: #4a4a4a;
  margin-top: 1rem; /* 검색 결과와의 간격을 추가 */
  overflow-y: auto; /* 세로 스크롤을 허용 */
  max-height: 30rem; /* 최대 높이 지정 */
`;

const SearchResult = styled.div`
  display: flex;
  background-color: #ffffff;
  margin-top: 0.5%; /* 검색 결과와의 간격을 추가 */
  /* justify-content: space-between; */
`;

const SearchResultContent = styled.div`
  background-color: #ffffff;
`;

const SearchModal = ({ closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { searchMarkdown } = useAuth();

  // const handleSearch = () => {
  //   // 검색된 결과를 필터링하여 저장
  //   const result = dummyData.filter(item =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setSearchResult(result);
  // };

  const handleSearch = async () => {
    try {
      // 검색된 결과를 필터링하여 저장
      const result = await searchMarkdown(searchQuery);
      setSearchResult(result);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
            {searchResult.length > 0 ? (
              searchResult.map((item, index) => (
                <SearchResult key={index}>
                  <img
                    src={item.thumbnailUrl}
                    alt="검색 결과 이미지"
                    style={{
                      width: "100px",
                      marginRight: "5%",
                      borderRadius: "1rem",
                      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)"
                    }}
                  />
                  <SearchResultContent>
                    <h3>{item.videoTitle}</h3>
                    <p>{item.summary}</p>
                  </SearchResultContent>
                </SearchResult>
              ))
            ) : (
              <></>
            )}
          </SearchResultSection>
        </SearchContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default SearchModal;
