import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext"; // AuthContext에서 useAuth를 import합니다.

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 1.5vw;
  border-radius: 1vw;
  width: 50vw;
  height: 70vh;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5vw;
  border: 1px solid #ccc;
  border-radius: 0.5vw;
  background-color: #f9f9f9;
`;

const UserMessage = styled.div`
  display: flex;
  margin-bottom: 1.5vh;
  padding: 1vh 1.5vw;
  background-color: #f2f2f2;
  border-radius: 1vw;
  align-self: flex-end;
  justify-content: flex-end;
`;

const BotMessage = styled.div`
  display: flex;
  margin-bottom: 1.5vh;
  padding: 1vh 1.5vw;
  background-color: #e6e6e6;
  border-radius: 1vw;
  align-self: flex-start;
`;

const BotIcon = styled.span`
  margin-right: 1vw;
  font-size: 1.5rem;
`;

const UserIcon = styled.span`
  margin-left: 1vw;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 1vh;
`;

const Input = styled.input`
  flex: 1;
  padding: 1vh 1vw;
  border-radius: 1vw;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-left: 1vw;
  padding: 1vh 1.5vw;
  border: none;
  border-radius: 1vw;
  background-color: #582fff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #481de9;
  }
`;

const RefreshButton = styled.button`
  margin-left: 1vw;
  padding: 1vh 1.5vw;
  border: none;
  border-radius: 1vw;
  background-color: #ff3b30;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d9332d;
  }
`;

const Modal = ({ visible, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { GPTQuery } = useAuth(); // AuthContext에서 GPTQuery를 가져옵니다.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newUserMessage = { type: "user", content: message };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  
      // GPTQuery 함수를 호출하여 쿼리 전송
      try {
        const response = await GPTQuery(message);
        // 서버로부터 받은 답변을 화면에 표시
        const newBotMessage = { type: "bot", content: response.qAnswer }; // 받은 답변의 내용을 사용하여 새로운 봇 메시지 생성
        setMessages((prevMessages) => [...prevMessages, newBotMessage]); // 답변을 메시지 목록에 추가
      } catch (error) {
        console.error("GPTQuery 호출 중 에러 발생:", error);
        // 에러 처리
      }
  
      setMessage("");
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleRefresh = () => {
    setMessages([]);
    setMessage("");
  };

  return (
    <ModalBackground visible={visible} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ChatContainer>
          <ChatMessages>
            {messages.map((msg, index) => (
              <>
                {msg.type === "user" ? (
                  <UserMessage key={index}>
                    {msg.content}
                    <UserIcon>🧐</UserIcon>
                  </UserMessage>
                ) : (
                  <BotMessage key={index}>
                    <BotIcon>🤖</BotIcon>
                    {msg.content}
                  </BotMessage>
                )}
              </>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <InputContainer>
            <Input
              type="text"
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
            />
            <Button onClick={handleSendMessage}>전송</Button>
            <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
          </InputContainer>
        </ChatContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
