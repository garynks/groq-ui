import React from 'react'
import { Message } from '@/types/chat';
import {User, Bot} from 'lucide-react'

function ChatHistory({messages}: {messages: Message[]}) {
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
            <div>{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatHistory
