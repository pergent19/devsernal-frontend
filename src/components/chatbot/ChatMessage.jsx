import React from "react";
import DevsernalChatbotLogo from "../../assets/DevsernalChatbot.png"

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <img src={DevsernalChatbotLogo} alt="robot" />}
      
      <div className="message-text bg-[#F6F2FF] dark:bg-gray-900 dark:text-white">
        {chat.type === "text" ? <p>{chat.content}</p> : chat.content}
      </div>
    </div>
  );
};

export default ChatMessage;
