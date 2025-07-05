import { useRef } from "react";
import Loading from "../UI/Loading";

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    // Add user message to chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", type: "text", content: userMessage },
    ]);

    // Show loading immediately
    setChatHistory((history) => [
      ...history,
      { role: "model", type: "component", content: <Loading /> },
    ]);

    // Add loading indicator and then call bot response
    setTimeout(() => {
    // setChatHistory((history) => [
    //   ...history,
    //   { role: "model", type: "component", content: <Loading /> },
    // ]);
      generateBotResponse(userMessage);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
