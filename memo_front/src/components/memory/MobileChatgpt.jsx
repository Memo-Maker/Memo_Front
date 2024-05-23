import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import gptIcon from "../../assets/images/GPTIcon.png";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 95%;
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

const GptIcon = styled.img`
  margin-right: 1vw;
  width: 1.5rem;
  height: 1.5rem;
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

const MobileChatgpt = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { GPTQuery } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    const loadedMessages = [];

    questions.forEach((question, index) => {
      loadedMessages.push({ type: "user", content: question });
      if (answers[index]) {
        loadedMessages.push({ type: "bot", content: answers[index] });
      }
    });

    setMessages(loadedMessages);
  }, []);

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

      try {
        const response = await GPTQuery(message);
        const newBotMessage = { type: "bot", content: response.qAnswer };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);

        const updatedQuestions = [
          ...(JSON.parse(localStorage.getItem("questions")) || []),
          message,
        ];
        const updatedAnswers = [
          ...(JSON.parse(localStorage.getItem("answers")) || []),
          response.qAnswer,
        ];
        localStorage.setItem("questions", JSON.stringify(updatedQuestions));
        localStorage.setItem("answers", JSON.stringify(updatedAnswers));
      } catch (error) {
        console.error("GPTQuery 호출 중 에러 발생:", error);
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
    localStorage.removeItem("questions");
    localStorage.removeItem("answers");
  };

  return (
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
                <GptIcon src={gptIcon} alt="GPT Icon" />
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
  );
};

export default MobileChatgpt;
