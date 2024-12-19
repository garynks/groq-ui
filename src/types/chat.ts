
export type MessageSender = 'user' | 'llm' | 'system';

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: Date;
}
