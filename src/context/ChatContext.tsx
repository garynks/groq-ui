import React, { createContext, useState } from "react";
import { Message } from "@/types/chat";
import { sendMessagetoLLM } from "@/services/llmService";

export const ChatContext = createContext({
  messages: [],
  currentModel: "llama3-8b-8192",
  setCurrentModel: () => {},
  sendMessage: async () => {},
});

// Provider component
export const ChatProvider = ({ children, initialModel = "llama3-8b-8192" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModel, setCurrentModel] = useState(initialModel);

  const sendMessage = async (userMessage: Message) => {
    // Add user message to chat history
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Call LLM service to get response
      const llmResponse = await sendMessagetoLLM(
        userMessage.content,
        currentModel
      );

      // Create LLM response message
      const responseMessage = {
        id: Date.now().toString(),
        content: llmResponse,
        sender: "llm",
        timestamp: new Date(),
      };

      // Add LLM response to chat history
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      console.error("Error getting LLM repsonse:", error);

      // Create error message
      const errorMessage = {
        id: Date.now().toString(),
        content: "Sorry, there was an error processing your message.",
        sender: "system",
        timestamp: new Date(),
      };

      // Add error message to chat history
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, currentModel, setCurrentModel, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
