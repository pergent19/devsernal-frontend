import { useRef } from "react";
import Loading from "../UI/Loading";

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = inputRef.current.value.trim();
  if (!userMessage) return;

  inputRef.current.value = "";

  // Add user message and loading in one update
  setChatHistory((history) => [
    ...history,
    { role: "user", type: "text", content: userMessage },
    { role: "model", type: "component", content: <Loading /> },
  ]);

  // Delay bot response to simulate API latency
  setTimeout(() => {
    generateBotResponse(userMessage);
  }, 600);
};

  return (
    <form action="#" className="chat-form dark:bg-gray-900" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input dark:text-white "
        required
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
