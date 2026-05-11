import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; 

export default function AiChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null); 

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message; 
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();

      const aiMessage = {
        sender: "ai",
        text: data.reply || "No response received",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "عذراً، حدث خطأ في الاتصال بالسيرفر." },
      ]);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <h1 className="text-xl font-semibold">Career AI Chat</h1>
        <p className="text-sm text-white/60">Your personal learning & career assistant</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg
              ${msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white/10 text-white rounded-bl-sm backdrop-blur-md border border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {/* عنصر الـ Ref للنزول لآخر الرسائل */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about roadmap, projects, interviews..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}