import React, { useState } from "react";
import "./ChatBot.css";
import "@fortawesome/fontawesome-free/css/all.css";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    console.log("Chat said:", data);
    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "bot", content: data.message },
    ]);
    setInput("");
  };

  return (
    <div className="chat-container">
      {!isOpen && (
        <div className="message-icon" onClick={toggleChat}>
          <span>Message</span>
          <i className="fas fa-comment"></i>
        </div>
      )}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={{ width: "calc(100% - 70px)", padding: "10px", fontSize: "16px", height:"75px"}}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;