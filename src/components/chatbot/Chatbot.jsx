import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

import robot from "../../assets/robot-icon.png";
import robotChat from "../../assets/robot2.png";

import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatBot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (userInput) => {
    const updatedHistory = [...chatHistory, {role: "user", type: "text", content: userInput}];

    // Convert to OpenAI-like format
    const messages = [
      ...updatedHistory.map((msg) => ({
        role: msg.role === "model" ? "model" : msg.role,
        content:  msg.content,
      })),
    ];

    const requestBody = { messages };

    const headers = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch("http://localhost:3000/api/chat", headers);
      const data = await response.json();

      if (!data || !data.reply) {
        throw new Error(data?.error || "Something went wrong");
      }

      const apiResponseText = data.reply;

      setChatHistory([
        ...updatedHistory,
        { role: "model", type: "text", content: apiResponseText },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatHistory([
        ...updatedHistory,
        {
          role: "model",
          type: "text",
          content: "⚠️ Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatBot ? "show-chatbot" : ""}`}>
      {/* Chatbot Toggle Button */}
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      {/* Chatbot Popup */}
      <div className="chatbot-popup">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <img src={robot} alt="" />
            <h2 className="logo-text">Devsernal Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <img src={robotChat} alt="robot" />
            <p className="message-text">
              Hi! I'm Devsernal AI BOT. <br />
              Need help picking the best tech stack for your project? Ask away!
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Footer */}
        <div className="chat-footer">
          <ChatForm
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
