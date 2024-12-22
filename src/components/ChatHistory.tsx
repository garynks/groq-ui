import React, { useEffect, useRef } from 'react'
import { Message } from '@/types/chat';
import {User, Bot} from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

function ChatHistory({messages}: {messages: Message[]}) {
  // Automatically scroll to the bottom when new messages are added
  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect (() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const renderMessageIcon = (sender: Message['sender']) => {
    switch (sender) {
      case 'user':
        return <User className="h-5 w-5"/>
      case 'llm':
        return <Bot className="h-5 w-5"/>
      case 'system':
        return <div className="h-5 w-5">ℹ️</div>;
      default:
        return null
    }
  }
  
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="flex items-start p-4">
          <div className="mr-2">{renderMessageIcon(message.sender)}</div>
          <div>
            <div className="font-semibold capitalize">{message.sender}</div>
            <Markdown
              className="prose max-w-none"
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </Markdown>
            <small className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory
