import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import DevsernalPopupButton from "../../assets/Devsernal_Msg Icon.png"
import DevsernalChatbotLogo from "../../assets/DevsernalChatbot.png";
// import Loading from "../UI/Loading";

  // const questions = [
  // "What system are you building?",
  // "What programming language do you want to use?",
  // "Do you have specific features in mind?",
  // ];

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatBot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();
  console.log("API URL:", import.meta.env.VITE_API_URL);
  // const [questionStep, setQuestionStep] = useState(0);
  // const [userAnswers, setUserAnswers] = useState([]);
//   const generateBotResponse = async (userInput) => {
//   // Add user input to chat
//   const updatedChat = [
//     ...chatHistory,
//     { role: "user", type: "text", content: userInput },
//   ];
//   setChatHistory(updatedChat);

//   // Store answer
//   const updatedAnswers = [...userAnswers, userInput];
//   setUserAnswers(updatedAnswers);

//   // If there are more questions, ask the next one
//   if (questionStep < questions.length - 1) {
//     const nextQuestion = questions[questionStep + 1];
//     console.log("Next Question:", nextQuestion);
//     setChatHistory((prev) => [
//       ...prev,
//       { role: "model", type: "text", content: nextQuestion },
//     ]);
//     setQuestionStep((prev) => prev + 1);
//     return;
//   }

//   // Final step: Generate a full message using all answers
//   const finalPrompt = `Suggest the best tech stack for building a ${updatedAnswers[0]} using ${updatedAnswers[1]} with features: ${updatedAnswers[2]}.

//   Format the response like this:
//   Frontend: ...
//   Backend: ...
//   Database: ...
//   Keep it short.`;

//   // Add loading
//   setChatHistory((prev) => [
//     ...prev,
//     { role: "model", type: "component", content: <Loading /> },
//   ]);

//   try {
//     const response = await fetch("http://localhost:3000/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ messages: [{ role: "user", content: finalPrompt }] }),
//     });

//     const data = await response.json();

//     // After generating the final tech stack result
//     setChatHistory((prev) => [
//       ...prev.slice(0, -1), // remove <Loading />
//       { role: "model", type: "text", content: data.reply },
//       {
//         role: "model",
//         type: "text",
//         content: "Want to build something else? Just type it below.",
//       },
//     ]);

//     // 🔁 Reset the conversation
//     setQuestionStep(0);
//     setUserAnswers([]);
//   } catch (err) {
//     console.error("API Error:", err);
//     setChatHistory((prev) => [
//       ...prev.filter((msg) => msg.type !== "component"),
//       {
//         role: "model",
//         type: "text",
//         content: "⚠️ Sorry, something went wrong. Please try again later.",
//       },
//     ]);
//   }
// }

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
      const response = await fetch(import.meta.env.VITE_API_URL, headers);
      
      //const response = await fetch("https://devsernal-server.onrender.com/api/chat", headers);
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
     // Ask the first question when chatbot opens
  // if (chatHistory.length === 0 && showChatBot) {
  //   setChatHistory([
  //     {
  //       role: "model",
  //       type: "text",
  //       content: questions[0],
  //     },
  //   ]);
  // }
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
              Hi! I'm Devsernal AI BOT. <br />
              Need help picking the best tech stack for your project? Ask away!
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
