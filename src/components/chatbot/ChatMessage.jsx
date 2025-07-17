import React from "react";
import robot from "../../assets/robot2.png";
import DevsernalChatbotLogo from "../../assets/DevsernalChatbot.png"

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <img src={DevsernalChatbotLogo} alt="robot" />}
      
      <div className="message-text">
        {chat.type === "text" ? <p>{chat.content}</p> : chat.content}
      </div>
    </div>
  );
};

export default ChatMessage;
