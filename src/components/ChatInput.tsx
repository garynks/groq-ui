import React, { FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
}

function ChatInput({ onSendMessage, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (trimmedMessage && !isLoading) {
      try {
        await onSendMessage(trimmedMessage);
        setMessage(""); // Clear input after sending
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter, but allow new line with Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end p-4 bg-white"
    >
      <div className="flex-grow mr-2">
        <Textarea
          className="resize-none min-h-[50px] max-h-[150px] w-full pr-10 rounded"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
          rows={1}
        />
      </div>
      <Button className="mb-1 rounded" type="submit" size="icon" disabled={isLoading || message.trim().length === 0}>
        {isLoading ? (
          <span className="animate-spin">↻</span>
        ) : (
          <Send className="h-5 w-5"/>
        )}
      </Button>
    </form>
  );
}

export default ChatInput;
