import React from "react";
import robot from "../../assets/robot2.png";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <img src={robot} alt="robot" />}
      
      <div className="message-text">
        {chat.type === "text" ? <p>{chat.content}</p> : chat.content}
      </div>
    </div>
  );
};

export default ChatMessage;
