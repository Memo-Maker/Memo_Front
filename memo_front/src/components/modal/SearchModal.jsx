import React, { useState } from "react";
import styled from "styled-components";
import SearchImage from "../../assets/images/search.png";
import dummyData from "../../assets/dummyDatas/searchDummy.json"; // 더미 데이터 불러오기

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
  width:100%;
  display: flex;
  align-items: center;
  background-color:#ffffff;
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
  margin-bottom:3%;
  margin-left:5%;
`;

const SearchResult = styled.div`
  margin-top: 1rem; /* 검색 결과와의 간격을 추가 */
`;

const SearchModal = ({ closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    // 검색된 결과를 필터링하여 저장
    const result = dummyData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result);
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
          />
          <SearchButton
            src={SearchImage}
            alt="Search"
            onClick={handleSearch}
          />
          </SearchFunction>
          
          <SearchResult>
            {searchResult.map(item => (
              <div key={item.id}>
                <img src={item.image} alt="검색 결과 이미지" />
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </SearchResult>
        </SearchContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default SearchModal;
