import React, { useContext, useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { ChatContext } from "../context/ChatContext";

function ChatContainer() {
  const { messages, sendMessage } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);

      const userMessage = {
        id: Date.now().toString(),
        content: userInput,
        sender: "user",
        timestamp: new Date(),
      };

      await sendMessage(userMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ChatHistory messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default ChatContainer;
