import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import DevsernalPopupButton from "../../assets/Devsernal_Msg Icon.png"
import DevsernalChatbotLogo from "../../assets/DevsernalChatbot.png";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatBot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (userInput) => {
    const updatedHistory = [...chatHistory, {role: "user", type: "text", content: userInput}];
    
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
      const response = await fetch(import.meta.env.VITE_API_URL, headers);
      
      const data = await response.json();

      if (!data || !data.reply) {
        throw new Error(data?.error || "Something went wrong");
      }

      const apiResponseText = data.reply;

    setChatHistory((prevHistory) => [
      ...prevHistory.slice(0, -1), // remove loading
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
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <img
          src={DevsernalPopupButton}
          alt={'Chatbot popup button'}
        />
      </button>

      {/* Chatbot Popup */}
      <div className="chatbot-popup ">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <img src={DevsernalChatbotLogo} alt="" />
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
        <div ref={chatBodyRef} className="chat-body dark:bg-gray-800">
          <div className="message bot-message">
            <img src={DevsernalChatbotLogo} alt="robot" />
            <p className="message-text bg-[#F6F2FF] dark:bg-gray-900 dark:text-white">
              👋 Welcome! I'm Devsernal AI Bot, your tech stack advisor.
              Ready to build something awesome? Tell me about your project, and I'll help you pick the perfect tools!
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Footer */}
        <div className="chat-footer dark:bg-gray-800">
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
